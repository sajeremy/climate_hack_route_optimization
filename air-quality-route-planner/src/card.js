import React from 'react';

export const Card = ({ children, className }) => (
  <div className={`shadow-md rounded-md p-4 bg-white ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ children }) => (
  <div className="border-b pb-2 mb-4">
    {children}
  </div>
);

export const CardTitle = ({ children }) => (
  <h2 className="text-xl font-semibold">{children}</h2>
);

export const CardContent = ({ children }) => (
  <div className="text-gray-700">
    {children}
  </div>
);
