import axios from 'axios';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications
import { useNavigate } from 'react-router-dom'; // Assuming React Router for navigation
import { BACKEND_URL } from './env.config';

const apiClient = axios.create({
  baseURL: BACKEND_URL, // Your API base URL
});

// Axios request interceptor to add auth headers directly in the apiClient
apiClient.interceptors.request.use(
  (config) => {
    // Directly adding the auth header in the interceptor
    const token = localStorage.getItem('access_token'); // Retrieve token (or from other storage)
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Axios response interceptor to handle 401 errors globally
apiClient.interceptors.response.use(
  (response) => {
    // Return the successful response
    return response;
  },
  (err) => {
    if (err.response && err.response.status === 401) {
      toast.error('Session expired. Please login again.');
      sessionStorage.clear();

      const navigate = useNavigate(); // Use React Router's navigate function
      navigate('/login'); // Redirect to login page
    } else {
      console.log('Error fetching data', err);
    }

    return Promise.reject(err); // Ensure the error is still thrown for local handling
  },
);

export default apiClient;
