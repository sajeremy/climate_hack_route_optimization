// BikeRoutes.js
import React, { useState, useEffect } from 'react';

const BikeRoutes = () => {
    const [route, setRoute] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRoute = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/bike-routes?start_lat=40.7128&start_lon=-74.0060&end_lat=40.730610&end_lon=-73.935242');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRoute(data.route);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRoute();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Bike Route</h1>
            <ul>
                {route.map((coord, index) => (
                    <li key={index}>{`Latitude: ${coord[0]}, Longitude: ${coord[1]}`}</li>
                ))}
            </ul>
        </div>
    );
};

export default BikeRoutes;