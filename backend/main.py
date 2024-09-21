from fastapi import FastAPI
import pandas as pd
import simplejson as json
from fastapi.responses import JSONResponse, HTMLResponse
from geo_place_loc import geo_places
import folium 
from folium.plugins import HeatMap

# Read the CSV file
df = pd.read_csv('data/Air_Quality_20240921.csv')
df = df.where(pd.notnull(df), None)

# Add latitude and longitude columns to the DataFrame
df['lat'] = df['Geo Place Name'].map(lambda x: geo_places.get(x, {}).get('lat'))
df['lon'] = df['Geo Place Name'].map(lambda x: geo_places.get(x, {}).get('lon'))

# Create FastAPI app
app = FastAPI()

# Define Health Check
@app.get("/health")
def health():
    return {"status": "ok"}

# Define a route to fetch data
@app.get("/data")
def get_data():
    # Convert DataFrame to JSON
    data = df.to_dict(orient='records')
    return JSONResponse(content=json.loads(json.dumps(data, ignore_nan=True)))

# Define a route to get unique Geo type names
@app.get("/geo-places")
def get_geo_types():
    # Extract unique Geo type names
    unique_geo_types = df["Geo Place Name"].dropna().unique().tolist()
    return {"unique_geo_types": unique_geo_types}

# Define a route to get unique Name attributes
@app.get("/unique-names")
def get_unique_names():
    # Extract unique Name attributes
    name_counts = df["Name"].dropna().value_counts().to_dict()
    return {"unique_names": name_counts}

# Define a route to print column names
@app.get("/columns")
def get_columns():
    # Get column names
    columns = df.columns.tolist()
    return {"columns": columns}

# Define a route to generate heat map
@app.get("/heatmap", response_class=HTMLResponse)
def get_heatmap():
    # Filter the DataFrame for "Fine particles (PM 2.5)"
    filtered_df = df[df["Name"] == "Fine particles (PM 2.5)"]

    # Create a map centered around NYC
    m = folium.Map(location=[40.7128, -74.0060], zoom_start=11)

    # Add heat map data
    heat_data = [
        [row['lat'], row['lon'], row['Data Value']]
        for index, row in filtered_df.iterrows()
        if row['lat'] is not None and row['lon'] is not None and row['Data Value'] is not None
    ]
    HeatMap(heat_data).add_to(m)

    # Save map to HTML
    map_html = m._repr_html_()
    return map_html
