// src/LimitContext.js
import React, { createContext, useState } from 'react';

export const LimitContext = createContext({
  selectedBranch: null,
  setSelectedBranch: () => {},
  cpRating: '',
  setCpRating: () => {},
  user: null,          // Add user to context
  setUser: () => {}    // Add setUser function
});

export const LimitProvider = ({ children }) => {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [cpRating, setCpRating] = useState('');
  const [user, setUser] = useState(null);  // Add user state

  return (
    <LimitContext.Provider value={{ selectedBranch, setSelectedBranch, cpRating, setCpRating ,user,setUser}}>
      {children}
    </LimitContext.Provider>
  );
};