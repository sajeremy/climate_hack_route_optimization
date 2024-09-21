import React, { useState } from 'react';

export const Tabs = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div>
      <TabsList>
        {children.map(child =>
          React.cloneElement(child, { activeTab, setActiveTab })
        )}
      </TabsList>
    </div>
  );
};

export const TabsList = ({ children }) => (
  <div className="flex mb-4">
    {children}
  </div>
);

export const TabsTrigger = ({ value, children, activeTab, setActiveTab }) => (
  <button
    onClick={() => setActiveTab(value)}
    className={`flex-1 text-center p-2 rounded ${activeTab === value ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
  >
    {children}
  </button>
);

export const TabsContent = ({ value, children, activeTab }) => (
  activeTab === value ? <div>{children}</div> : null
);
