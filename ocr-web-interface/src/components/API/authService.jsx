import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth/';

const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}login/`, { 
        email, 
        password 
      });
      
      // Si la connexion réussit, stocker le token
      if (response.data.token) {
        localStorage.setItem('user_token', response.data.token);
        localStorage.setItem('user_info', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      // Gérer les erreurs d'authentification
      console.error('Erreur de connexion', error.response?.data);
      throw error;
    }
  },

  logout: () => {
    // Supprimer les informations de l'utilisateur
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_info');
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user_info'));
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('user_token');
  }
};

export default authService;