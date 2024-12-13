import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Assurez-vous d'importer axios

function SignupForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({
        passwordMatch: '',
        email: '',
        general: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));

        // Clear specific errors when user starts typing
        if (id === 'password' || id === 'confirmPassword') {
            setErrors(prev => ({ ...prev, passwordMatch: '' }));
        }
        if (id === 'email') {
            setErrors(prev => ({ ...prev, email: '' }));
        }
    };

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let formErrors = {};

        // Validate username
        if (!formData.name) {
            formErrors.name = 'Veuillez entrer un nom d\'utilisateur';
        }

        // Email validation
        if (!validateEmail(formData.email)) {
            formErrors.email = 'Veuillez entrer une adresse email valide';
        }

        // Validate password
        if (!formData.password) {
            formErrors.password = 'Veuillez entrer votre mot de passe';
        }

        // Password match validation
        if (formData.password !== formData.confirmPassword) {
            formErrors.passwordMatch = 'Les mots de passe ne correspondent pas';
        }

        // If there are errors, set them and prevent submission
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/auth/register/', formData);

            if (response.status === 201) {
                const { access, refresh } = response.data;
                localStorage.setItem('access_token', access);
                localStorage.setItem('refresh_token', refresh);

                navigate('/acceuil');
            }
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.data) {
                setErrors(prev => ({
                    ...prev,
                    general: error.response.data.detail || 'Une erreur est survenue'
                }));
            } else {
                setErrors({ general: 'Une erreur est survenue, veuillez réessayer' });
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-purple-50 to-purple-100">
            {/* Left Side - Decorative Section (Visible on larger screens) */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 to-purple-800 items-center justify-center p-12">
                <div className="text-center text-white">
                    <h1 className="text-4xl font-bold mb-4">Bienvenue sur MANDIKA</h1>
                    <p className="text-xl mb-8">La manière la plus simple de numériser et d'organiser vos documents</p>
                    <div className="space-y-4">
                        <div className="flex items-center justify-center space-x-4">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                <User className="text-white" size={32} />
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

            {/* Right Side - Signup Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
                <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6 sm:p-8 border border-purple-100">
                    <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Créer un compte</h2>

                    {/* General Error Message */}
                    {errors.general && (
                        <div className="text-red-500 text-sm mb-4">
                            {errors.general}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Username Input */}
                        <div className="relative">
                            <label htmlFor="name" className="sr-only">Nom d'utilisateur</label>
                            <div className="flex items-center">
                                <div className="absolute left-3 text-gray-400">
                                    <User size={20} />
                                </div>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Nom d'utilisateur"
                                    className={`w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-200
                                        ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-purple-200 focus:ring-purple-500'}`}
                                    required
                                />
                            </div>
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

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
                                        ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-purple-200 focus:ring-purple-500'}`}
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
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        {/* Confirm Password Input */}
                        <div className="relative">
                            <label htmlFor="confirmPassword" className="sr-only">Confirmer le mot de passe</label>
                            <div className="flex items-center">
                                <div className="absolute left-3 text-gray-400">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirmer le mot de passe"
                                    className={`w-full pl-10 pr-10 p-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-200
                                        ${errors.passwordMatch ? 'border-red-500 focus:ring-red-500' : 'border-purple-200 focus:ring-purple-500'}`}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="absolute right-3 text-gray-500 hover:text-purple-600"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.passwordMatch && <p className="text-red-500 text-sm mt-1">{errors.passwordMatch}</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
                            disabled={loading}
                        >
                            {loading ? 'Chargement...' : 'Créer un compte'}
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <p>
                            Vous avez déjà un compte ?{' '}
                            <Link to="/signin" className="text-purple-600 hover:text-purple-800">
                                Se connecter
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupForm;
