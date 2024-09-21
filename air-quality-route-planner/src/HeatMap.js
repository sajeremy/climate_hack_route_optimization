// HeatMap.js
import React, { useState, useEffect } from 'react';

const HeatMap = () => {
    const [mapHtml, setMapHtml] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHeatMap = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/heatmap');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.text();
                setMapHtml(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchHeatMap();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: mapHtml }} />
        </div>
    );
};

export default HeatMap;