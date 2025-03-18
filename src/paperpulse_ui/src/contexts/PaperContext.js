import React, { createContext, useState, useContext } from 'react';

// Context API provides a way to share state across the component tree without prop drilling
// useState is a React Hook that lets you add state to functional components
// The Provider pattern makes the context value available to all child components


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