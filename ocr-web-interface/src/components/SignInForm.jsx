import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignInForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        general: ''
    });
    const [loading, setLoading] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));

        // Clear specific errors when user starts typing
        if (id === 'email') {
            setErrors(prev => ({ ...prev, email: '' }));
        }
        if (id === 'password') {
            setErrors(prev => ({ ...prev, general: '' }));
        }
    };

    // Validate email format
    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    // Handle form submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        let formErrors = {};

        // Email validation
        if (!formData.email) {
            formErrors.email = 'Veuillez entrer votre adresse email';
        } else if (!validateEmail(formData.email)) {
            formErrors.email = 'Veuillez entrer une adresse email valide';
        }

        // Password validation
        if (!formData.password) {
            formErrors.general = 'Veuillez entrer votre mot de passe';
        }

        // If there are errors, set them and prevent submission
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', formData); // Assurez-vous que l'URL est correcte

            if (response.status === 200) {
                const { access, refresh } = response.data; // Accédez aux tokens
                localStorage.setItem('access_token', access); // Stocker le token d'accès
                localStorage.setItem('refresh_token', refresh); // Stocker le token de rafraîchissement (si nécessaire)

                // Rediriger après la connexion réussie
                navigate('/acceuil'); // Changez '/dashboard' par votre route de redirection
            }
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.data) {
                setErrors(prev => ({
                    ...prev,
                    general: error.response.data.detail || 'Email ou mot de passe incorrect'
                }));
            } else {
                setErrors({ general: 'Une erreur est survenue, veuillez réessayer' });
            }
        }
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-purple-50 to-purple-100">
            {/* Left Side - Decorative Section */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 to-purple-800 items-center justify-center p-12">
                <div className="text-center text-white">
                    <h1 className="text-4xl font-bold mb-4">Bienvenue sur MANDIKA</h1>
                    <p className="text-xl mb-8">La manière la plus simple de numériser et d'organiser vos documents</p>
                    <div className="space-y-4">
                        <div className="flex items-center justify-center space-x-4">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                <Mail className="text-white" size={32} />
                            </div>
                            <span className="text-lg">Profil Personnalisé</span>
                        </div>
                        <div className="flex items-center justify-center space-x-4">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                <Lock className="text-white" size={32} />
                            </div>
                            <span className="text-lg">Sécurité Garantie</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Sign In Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
                <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6 sm:p-8 border border-purple-100">
                    <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Connexion</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email Input */}
                        <div className="relative">
                            <label htmlFor="email" className="sr-only">Email</label>
                            <div className="flex items-center">
                                <div className="absolute left-3 text-gray-400">
                                    <Mail size={20} />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Adresse email"
                                    className={`w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-200
                                        ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-purple-200 focus:ring-purple-500'}`}
                                    required
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <label htmlFor="password" className="sr-only">Mot de passe</label>
                            <div className="flex items-center">
                                <div className="absolute left-3 text-gray-400">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Mot de passe"
                                    className={`w-full pl-10 pr-10 p-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-200
                                        ${errors.general ? 'border-red-500 focus:ring-red-500' : 'border-purple-200 focus:ring-purple-500'}`}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 text-gray-500 hover:text-purple-600"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.general && <p className="text-red-500 text-sm mt-1">{errors.general}</p>}
                        </div>

                        {/* Forgot Password Link */}
                        <div className="text-right">
                            <a
                                href="#"
                                className="text-sm text-purple-600 hover:underline focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                Mot de passe oublié ?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
                            disabled={loading}
                        >
                            {loading ? 'Chargement...' : 'Se connecter'}
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Vous n'avez pas de compte ? {' '}
                            <Link
                                to="/signup"
                                className="text-purple-600 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                Créer un compte
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignInForm;
