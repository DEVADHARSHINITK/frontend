import axios from "axios";

// Define API URLs
const API_BASE_URL = "http://localhost:8080"; // Change this to your backend URL

const DashboardService = {
  // Get user count
  getUserCount: async () => {
    const response = await axios.get(`${API_BASE_URL}/users/count`);
    return response.data;  // Assuming response contains { count: number }
  },

  // Get product count
  getProductCount: async () => {
    const response = await axios.get(`${API_BASE_URL}/product/count`);
    return response.data;  // Assuming response contains { count: number }
  },

  getOrderCount: async () => {
    const response = await axios.get(`${API_BASE_URL}/orders/count`);
    return response.data;  // Assuming response contains { count: number }
  }
};

export default DashboardService;
