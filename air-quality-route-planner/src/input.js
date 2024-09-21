import React from 'react';

export const Input = ({ value, onChange, placeholder }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="border rounded px-3 py-2 w-full"
  />
);
