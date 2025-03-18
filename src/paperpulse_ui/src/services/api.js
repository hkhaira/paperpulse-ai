import axios from 'axios';

// This demonstrates how to organize API calls in a service module using axios, 
// a popular HTTP client for making AJAX requests. 
// The async/await syntax is modern JavaScript for handling Promises more elegantly.

// Base API URL - would point to your Flask backend
const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API functions
export const processPaper = async (paperText) => {
  try {
    const response = await api.post('/process', { text: paperText });
    return response.data;
  } catch (error) {
    console.error('Error processing paper:', error);
    throw error;
  }
};

export const getSummary = async (paperText) => {
  try {
    const response = await api.post('/summary', { text: paperText });
    return response.data.summary;
  } catch (error) {
    console.error('Error getting summary:', error);
    throw error;
  }
};

export const getExplanation = async (paperText) => {
  try {
    const response = await api.post('/explanation', { text: paperText });
    return response.data.explanation;
  } catch (error) {
    console.error('Error getting explanation:', error);
    throw error;
  }
};

export const getReproduction = async (paperText) => {
  try {
    const response = await api.post('/reproduction', { text: paperText });
    return response.data.reproduction;
  } catch (error) {
    console.error('Error getting reproduction instructions:', error);
    throw error;
  }
};

export const sendChatMessage = async (message, context) => {
  try {
    const response = await api.post('/chat', { message, context });
    return response.data.reply;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
};

export default api;