import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Map, TrendingUp, MessageCircle } from 'lucide-react';

const data = [
  { name: 'Downtown', before: 65, after: 45 },
  { name: 'Midtown', before: 80, after: 60 },
  { name: 'Uptown', before: 55, after: 40 },
  { name: 'Brooklyn', before: 70, after: 50 },
  { name: 'Queens', before: 75, after: 55 },
];

const FeatureButton = ({ icon: Icon, text }) => (
  <button className="bg-white p-4 rounded-lg shadow flex items-center w-full transition duration-300 ease-in-out hover:bg-seafoam-100 focus:outline-none focus:ring-2 focus:ring-seafoam-500">
    <Icon className="text-seafoam-600 mr-3" size={24} />
    <span className="text-gray-700 hover:text-seafoam-800">{text}</span>
  </button>
);

const AIInsightsDashboard = () => {
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Cyclair for Public Officials</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
        <FeatureButton icon={Map} text="Track air quality by neighborhood" />
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
        <FeatureButton icon={TrendingUp} text="Guide transportation policy interventions" />
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
        <FeatureButton icon={MessageCircle} text="Communicate data to NYC residents" />
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Average PM 2.5 Before and After Congestion Pricing Intervention</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="before" name="Before Congestion Pricing" fill="#a0a0a0" />
            <Bar dataKey="after" name="After Congestion Pricing" fill="#013220" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-6 bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Key Insights</h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>All neighborhoods show improved air quality after interventions</li>
          <li>Midtown had the highest initial pollution levels</li>
          <li>Uptown shows the most significant percentage improvement</li>
        </ul>
      </div>
    </div>
  );
};

export default AIInsightsDashboard;
