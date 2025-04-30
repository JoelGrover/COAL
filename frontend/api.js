

import axios from "axios";

// The baseURL should be relative since you're using the Vite proxy (this forwards requests to your backend)
const API_URL = "/api";  // This will be automatically forwarded to http://127.0.0.1:8000 by Vite's proxy

console.log("api.js is running...");

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,  // This will be relative, so Vite's proxy handles it
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Request error:", error.message);
    }
    return Promise.reject(error);
  }
);

// Fetch all vessels
export const fetchVessels = async () => {
  try {
    const response = await apiClient.get("/vessels/");
    return response.data;
  } catch (error) {
    console.error("Error fetching vessels:", error);
    throw error;
  }
};

// Fetch data for a specific vessel
export const fetchVesselData = async (vesselName) => {
  try {
    const response = await apiClient.get(`/vessel-data/${vesselName}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for vessel ${vesselName}:`, error);
    throw error;
  }
};

// Save the coal report
export const saveCoalReport = async (data) => {
  console.log("Sending data:", data);  // ✅ Log the payload

  try {
    const response = await apiClient.post("/save-coal1-report/", data);
    console.log("Response:", response.data);  // ✅ Log the server response
    return response.data;
  } catch (error) {
    console.error("Error saving coal report:", error.response?.data || error.message);
    throw error;
  }
};


export const fetchVesselDetails = async (vesselName) => {
  try {
    const response = await fetch(`https://127.0.0.1:8000/vessel-data/${vesselName}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching vessel data:", error);
    return [];
  }
};





export const fetchAllVesselNames = async () => {
  const res = await apiClient.get('/vessels');
  return res.data;
};


