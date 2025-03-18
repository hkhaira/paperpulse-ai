import React, { createContext, useState, useContext } from 'react';

// Create a context for paper data
const PaperContext = createContext();

// Custom hook to use the context
export const usePaper = () => useContext(PaperContext);

// Provider component
export const PaperProvider = ({ children }) => {
  const [paper, setPaper] = useState({
    file: null,
    text: '',
    summary: '',
    explanation: '',
    reproduction: '',
    chatHistory: []
  });

  // Function to update paper data
  const updatePaper = (newData) => {
    setPaper(prevData => ({ ...prevData, ...newData }));
  };

  return (
    <PaperContext.Provider value={{ paper, updatePaper }}>
      {children}
    </PaperContext.Provider>
  );
};