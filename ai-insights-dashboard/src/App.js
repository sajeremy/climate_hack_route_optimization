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

const AIInsightsDashboard = () => {
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">AI Insights for Public Officials</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <Map className="text-seafoam-600 mr-3" size={24} />
          <span className="text-gray-700">Track air quality by neighborhood</span>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <TrendingUp className="text-seafoam-600 mr-3" size={24} />
          <span className="text-gray-700">Guide transportation policy interventions</span>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <MessageCircle className="text-seafoam-600 mr-3" size={24} />
          <span className="text-gray-700">Communicate data to NYC residents</span>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Air Quality Before and After Intervention</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="before" name="Before Intervention" fill="#a0a0a0" />
            <Bar dataKey="after" name="After Intervention" fill="#98d8d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-6 bg-white p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">Key Insights</h3>
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
