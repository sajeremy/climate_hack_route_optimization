from fastapi import FastAPI
import pandas as pd
import simplejson as json
from fastapi.responses import JSONResponse, HTMLResponse
from geo_place_loc import geo_places
import folium 
from folium.plugins import HeatMap
import osmnx as ox
import networkx as nx
from fastapi.middleware.cors import CORSMiddleware

# Read the CSV file
df = pd.read_csv('data/Air_Quality_20240921.csv')
df = df.where(pd.notnull(df), None)

# Add latitude and longitude columns to the DataFrame
df['lat'] = df['Geo Place Name'].map(lambda x: geo_places.get(x, {}).get('lat'))
df['lon'] = df['Geo Place Name'].map(lambda x: geo_places.get(x, {}).get('lon'))

# Create FastAPI app
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your frontend's URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

# Define a route to suggest bike routes
@app.get("/bike-routes")
def get_bike_routes(start_lat: float, start_lon: float, end_lat: float, end_lon: float):
    # Load the graph for NYC
    G = ox.graph_from_place('New York City, New York, USA', network_type='bike')

    # Find the nearest nodes to the start and end points
    orig_node = ox.distance.nearest_nodes(G, start_lon, start_lat)
    dest_node = ox.distance.nearest_nodes(G, end_lon, end_lat)

    # Find the shortest path based on pollution levels
    def pollution_weight(u, v, data):
        lat_u, lon_u = G.nodes[u]['y'], G.nodes[u]['x']
        lat_v, lon_v = G.nodes[v]['y'], G.nodes[v]['x']
        pollution_u = df[(df['lat'] == lat_u) & (df['lon'] == lon_u)]['Data Value'].mean()
        pollution_v = df[(df['lat'] == lat_v) & (df['lon'] == lon_v)]['Data Value'].mean()
        return (pollution_u + pollution_v) / 2

    route = nx.shortest_path(G, orig_node, dest_node, weight=pollution_weight)

    # Convert route to a list of coordinates
    route_coords = [(G.nodes[node]['y'], G.nodes[node]['x']) for node in route]

    return {"route": route_coords}

# Run the server
# Run the following command in your terminal:
# uvicorn main:app --reload
