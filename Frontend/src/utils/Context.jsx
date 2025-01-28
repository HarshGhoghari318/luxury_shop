import React, { useState, createContext } from 'react';

// Create the context
export const activeContext = createContext();

function Context({ children }) {
  const [active, setActive] = useState(""); // Initial value of active state
  
  return (
    <activeContext.Provider value={{ active, setActive }}>
      {children}
    </activeContext.Provider>
  );
}

export default Context; // Default export for Context component
