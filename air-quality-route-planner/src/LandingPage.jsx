// LandingPage.jsx
import React from 'react';

const LandingPage = () => {
  return (
    <div>
      <header>
        <h1>Cyclair</h1>
        <p>Your AI-Driven Air Pollution Dashboard for Clean Cycling Routes in NYC</p>
      </header>

      <div className="container">
        <div id="logo-container">
          <img src="CyclAirLogo.webp" alt="AirVibe Rider Logo" />
        </div>

        <section id="executive-summary">
          <h2>The Problem</h2>
          <p>Air pollution is a significant threat to public health, especially for bicycle commuters in New York City.</p>
          <p>Public officials have difficulty getting buy-in for their air pollution policies. This was illustrated in the backlash to the Congestion Pricing Proposals for NYC.</p>
        </section>

        <section id="problem-statement">
          <h2>Problem Statement</h2>
          <p>NYC's congested streets expose cyclists to varying levels of air pollution, but there are currently no tools to help them plan cleaner routes. Public officials also lack localized data to evaluate the success of air quality regulations. Our dashboard addresses these gaps by providing real-time, hyper-local data that helps cyclists avoid polluted areas and supports officials in their policy assessments.</p>
        </section>

        <section id="solution-overview">
          <h2>The Solution</h2>
          <p>This submission proposes an AI-driven Air Pollution Dashboard, designed to provide real-time route planning for cyclists, optimize clean air routes, and enable public officials to leverage crowdsourced data to track the success of their policies in improving air quality.</p>
          <p>Our solution combines AI-optimized route suggestions, crowdsourced data collection via sensors, and AI-driven insights for policymakers, enabling healthier, more informed commuting decisions and supporting data-driven policy-making in NYC.</p>
          <p>Our Air Pollution Dashboard uses AI to predict the cleanest air routes for cyclists based on real-time sensor data. Key components include:</p>
          <ul>
            <li><strong>AI-Powered Route Optimization:</strong> AI analyzes real-time air quality data to predict clean cycling routes, factoring in historical data, weather, and traffic.</li>
            <li><strong>Crowdsourced Data Collection via Sensors:</strong> Cyclists can purchase affordable sensors to monitor air quality and contribute data to the growing network.</li>
            <li><strong>AI Insights for Public Officials:</strong> Policymakers can track air quality improvements and measure the impact of their policies using detailed, localized data.</li>
          </ul>
        </section>

        <section id="ai-integration">
          <h2>AI Integration</h2>
          <p>The AI component drives real-time and predictive route optimization for cyclists. Supervised machine learning models predict air quality trends, while natural language processing (NLP) creates easily digestible reports for policymakers. AI also powers anomaly detection for pollution spikes, helping cyclists avoid unexpected high-pollution areas.</p>
        </section>

        <section id="scale-feasibility">
          <h2>Scale & Feasibility</h2>
          <p>This solution is scalable, practical, and designed for rapid deployment:</p>
          <ul>
            <li><strong>High GHG Reduction Potential:</strong> Clean route recommendations encourage cycling and reduce vehicle dependence, cutting emissions.</li>
            <li><strong>Rapid Time to Market:</strong> Leveraging existing infrastructure, the MVP can be built in 6-8 months using current AI models and off-the-shelf sensors.</li>
            <li><strong>Real-World Practicality:</strong> NYC's growing cycling infrastructure and government focus on sustainability make this solution timely and feasible.</li>
          </ul>
        </section>

        <section id="research-business-case">
          <h2>Research & Business Case</h2>
          <p>This solution is based on solid research and market demand. Cycling in NYC is steadily increasing, and air pollution poses health risks to cyclists. Additionally, city officials are focused on data-driven environmental policies, creating a market for actionable insights provided by our dashboard.</p>
        </section>

        <section id="key-challenges">
          <h2>Key Challenges</h2>
          <ul>
            <li><strong>Data Privacy:</strong> Cyclists may have concerns about sharing their data. Our platform will anonymize data and provide control over what is shared.</li>
            <li><strong>Sensor Reliability:</strong> We will partner with reputable sensor manufacturers to ensure data accuracy and reliability.</li>
          </ul>
        </section>

        <section id="revenue-model">
          <h2>Revenue Model</h2>
          <p>We will generate revenue through sensor sales, subscription-based premium features, and licensing our enriched dataset to third parties like urban planners and health organizations.</p>
        </section>

        <section id="conclusion">
          <h2>Conclusion</h2>
          <p>The Cyclair dashboard provides real-time air quality insights, empowering cyclists to make healthier commuting choices and supporting data-driven policy-making. With scalable AI-driven features, rapid deployment, and a high potential for GHG reduction, this solution addresses the growing need for clean, sustainable cycling in NYC.</p>
        </section>
      </div>

      <footer>
        <p>© 2024 Cyclair - AI-Driven Air Pollution Dashboard</p>
      </footer>
    </div>
  );
};

export default LandingPage;
