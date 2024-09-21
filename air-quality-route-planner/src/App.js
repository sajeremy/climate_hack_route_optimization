// App.jsx
import React from 'react';
import './index.css'; // Ensure this file includes Tailwind directives
import AirQualityAwareRoutePlanner from './AirQualityAwareRoutePlanner';
import LandingPage from './LandingPage'; // Import the new LandingPage component

function App() {
  return (
    <div className="App">
      {/* <LandingPage /> */}
      <AirQualityAwareRoutePlanner />
    </div>
  );
}

export default App;
