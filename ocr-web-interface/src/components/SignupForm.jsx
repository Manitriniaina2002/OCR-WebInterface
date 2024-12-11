import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';


function SignupForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false
    });
    const [errors, setErrors] = useState({
        passwordMatch: '',
        email: ''
    });

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

    const handleSubmit = (event) => {
        event.preventDefault();
        let formErrors = {};

        // Email validation
        if (!validateEmail(formData.email)) {
            formErrors.email = 'Veuillez entrer une adresse email valide';
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

        // If validation passes, proceed with form submission
        console.log('Form submitted:', formData);
        // Add your form submission logic here
    };

    const togglePasswordVisibility = (field) => {
        setShowPassword(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
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
                    <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Inscription</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Input */}
                        <div className="relative">
                            <label htmlFor="name" className="sr-only">Nom complet</label>
                            <div className="flex items-center">
                                <div className="absolute left-3 text-gray-400">
                                    <User size={20} />
                                </div>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Nom complet"
                                    className="w-full pl-10 p-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                                    required
                                />
                            </div>
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
                    ${errors.email
                                            ? 'border-red-500 focus:ring-red-500'
                                            : 'border-purple-200 focus:ring-purple-500'
                                        }`}
                                    required
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <label htmlFor="password" className="sr-only">Mot de passe</label>
                            <div className="flex items-center">
                                <div className="absolute left-3 text-gray-400">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type={showPassword.password ? "text" : "password"}
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Mot de passe"
                                    className="w-full pl-10 pr-10 p-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('password')}
                                    className="absolute right-3 text-gray-500 hover:text-purple-600"
                                >
                                    {showPassword.password ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password Input */}
                        <div className="relative">
                            <label htmlFor="confirmPassword" className="sr-only">Confirmer le mot de passe</label>
                            <div className="flex items-center">
                                <div className="absolute left-3 text-gray-400">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type={showPassword.confirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirmer le mot de passe"
                                    className={`w-full pl-10 pr-10 p-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-200
                    ${errors.passwordMatch
                                            ? 'border-red-500 focus:ring-red-500'
                                            : 'border-purple-200 focus:ring-purple-500'
                                        }`}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('confirmPassword')}
                                    className="absolute right-3 text-gray-500 hover:text-purple-600"
                                >
                                    {showPassword.confirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.passwordMatch && (
                                <p className="text-red-500 text-sm mt-1">{errors.passwordMatch}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
                        >
                            Créer un compte
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Vous avez déjà un compte ? {' '}
                            <Link
                                to="/signin"
                                className="text-purple-600 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                Connectez-vous
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupForm;

