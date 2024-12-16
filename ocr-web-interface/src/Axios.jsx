import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api', // Remplacez par l'URL de votre API Django
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        // Ajoutez d'autres en-têtes si nécessaire
    },
});

// Intercepteur pour les requêtes (exemple pour ajouter un token)
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Exemple de récupération du token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;


