// Example JSX with enhanced Tailwind CSS and some custom styling
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import { Input } from "./input";
import { TabsList, TabsTrigger, Tabs, TabsContent } from "./tabs";
import { MapPin, Navigation, Wind, Droplets, Sun } from 'lucide-react';
import {Heatmap} from "./HeatMap";

// Mock function to simulate route calculation
const calculateRoute = (start, end) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { lat: 40.7128, lng: -74.0060, aqi: 50 },
        { lat: 40.7300, lng: -73.9950, aqi: 60 },
        { lat: 40.7500, lng: -73.9800, aqi: 55 },
        { lat: 40.7600, lng: -73.9700, aqi: 45 },
      ]);
    }, 1000);
  });
};

// Mock function to simulate fetching air quality data
const fetchAirQualityData = (lat, lon) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        aqi: 75,
        pm25: 15.2,
        no2: 45,
        o3: 35,
        temperature: 22,
        humidity: 60,
        wind_speed: 3.5
      });
    }, 1000);
  });
};

const AirQualityIndicator = ({ value, max, label, icon: Icon }) => (
  <div className="flex items-center space-x-4 bg-white p-2 shadow-lg rounded-md">
    <Icon size={24} className="text-gray-500" />
    <div>
      <div className="text-sm font-medium text-gray-700">{label}</div>
      <div className="text-xl font-bold text-blue-600">{value}</div>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        className="bg-blue-600 h-2.5 rounded-full" 
        style={{ width: `${(value / max) * 100}%` }}
      ></div>
    </div>
  </div>
);

const AirQualityRouteMap = ({ route }) => (
  <div className="relative w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden shadow-lg">
    <Heatmap/>
    <div className="absolute inset-0 flex items-center justify-center">
      <p className="text-gray-500">Map view placeholder</p>
    </div>

    {/* Route visualization */}
    {route && (
      <svg className="absolute inset-0 w-full h-full">
        <path
          d={`M${route.map((point, index) => `${index * 100},${400 - point.aqi * 4}`).join(' L')}`}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="3"
        />
        {route.map((point, index) => (
          <circle
            key={index}
            cx={index * 100}
            cy={400 - point.aqi * 4}
            r="5"
            fill="#3b82f6"
          />
        ))}
      </svg>
    )}
  </div>
);

const AirQualityAwareRoutePlanner = () => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [route, setRoute] = useState(null);
  const [location, setLocation] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRouteCalculation = async () => {
    setLoading(true);
    try {
      const calculatedRoute = await calculateRoute(start, end);
      setRoute(calculatedRoute);
    } catch (err) {
      setError("Failed to calculate route");
    } finally {
      setLoading(false);
    }
  };

  const getLocation = () => {
    setLoading(true);
    setError(null);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        error => {
          setError("Unable to retrieve your location");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location) {
      fetchAirQualityData(location.latitude, location.longitude)
        .then(data => {
          setAirQualityData(data);
          setLoading(false);
        })
        .catch(err => {
          setError("Failed to fetch air quality data");
          setLoading(false);
        });
    }
  }, [location]);

  const getAirQualityStatus = (aqi) => {
    if (aqi <= 50) return { status: 'Good', color: 'text-green-500' };
    if (aqi <= 100) return { status: 'Moderate', color: 'text-yellow-500' };
    if (aqi <= 150) return { status: 'Unhealthy for Sensitive Groups', color: 'text-orange-500' };
    return { status: 'Unhealthy', color: 'text-red-500' };
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader className="bg-blue-600 text-white rounded-t-md">
        <CardTitle className="text-2xl font-bold">Air Quality Aware Route Planner</CardTitle>
      </CardHeader>
      <CardContent className="bg-gray-50 rounded-b-md">
        <Tabs defaultValue="route" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            {/* <TabsTrigger value="route" className="text-blue-600">Plan Route</TabsTrigger>
            <TabsTrigger value="local" className="text-blue-600">My Location</TabsTrigger> */}
          </TabsList>
          <TabsContent value="route">
            <div className="mb-4 flex space-x-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Start location"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="End location"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              <Button onClick={handleRouteCalculation} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                {loading ? 'Calculating...' : 'Find Route'}
              </Button>
            </div>

            <AirQualityRouteMap route={route} />

            {route && (
              <div className="mt-4 bg-white shadow-md p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Route Details</h3>
                <ul className="space-y-2">
                  {route.map((point, index) => (
                    <li key={index} className="flex items-center">
                      {index === 0 ? (
                        <MapPin className="mr-2 text-green-500" />
                      ) : index === route.length - 1 ? (
                        <Navigation className="mr-2 text-red-500" />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white mr-2">
                          {index}
                        </div>
                      )}
                      <span>
                        Lat: {point.lat.toFixed(4)}, Lng: {point.lng.toFixed(4)} - AQI: {point.aqi}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </TabsContent>
          <TabsContent value="local">
            {!location && (
              <Button onClick={getLocation} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                {loading ? 'Fetching Location...' : 'Get My Location'}
              </Button>
            )}

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {location && airQualityData && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <AirQualityIndicator
                  value={airQualityData.aqi}
                  max={500}
                  label="Air Quality Index"
                  icon={Wind}
                />
                <AirQualityIndicator
                  value={airQualityData.pm25}
                  max={100}
                  label="PM2.5"
                  icon={Droplets}
                />
                <AirQualityIndicator
                  value={airQualityData.temperature}
                  max={50}
                  label="Temperature"
                  icon={Sun}
                />
                <AirQualityIndicator
                  value={airQualityData.humidity}
                  max={100}
                  label="Humidity"
                  icon={Droplets}
                />
                <AirQualityIndicator
                  value={airQualityData.wind_speed}
                  max={20}
                  label="Wind Speed"
                  icon={Wind}
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AirQualityAwareRoutePlanner;
