
import React, { createContext, useState } from 'react';

export const AmbulanceContext = createContext();

export const AmbulanceProvider = ({ children }) => {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);

  return (
    <AmbulanceContext.Provider value={{ isEmergencyActive, setIsEmergencyActive }}>
      {children}
    </AmbulanceContext.Provider>
  );
};
