import React, { useState, useRef } from 'react';
import { Camera, Upload, FileText, User, Settings, LogOut, ChevronDown, X, Check } from 'lucide-react';
import NavBar from '../../components/NavBar';

const ProfileInterface = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const cameraInputRef = useRef(null);
    const [profile, setProfile] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
    });
    const [results, setResults] = useState([]);
    const [ocrSettings, setOcrSettings] = useState({
        language: 'fr',
        format: 'pdf',
    });
    const [activeSection, setActiveSection] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCameraCapture = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedFile) {
            // TODO: Implement OCR processing logic
            console.log('Processing file:', selectedFile);
        } else {
            alert('Veuillez sélectionner un document');
        }
    };

    const handleProfileUpdate = (event) => {
        event.preventDefault();
        // TODO: Implement profile update logic
        console.log('Updating profile:', profile);
    };

    const handleOcrSettingsUpdate = (event) => {
        event.preventDefault();
        // TODO: Implement OCR settings update logic
        console.log('Updating OCR settings:', ocrSettings);
    };

    const handleLogout = () => {
        // TODO: Implement logout logic
        console.log('Logging out...');
    };

    const handleExport = () => {
        // TODO: Implement export logic
        console.log('Exporting data...');
    };

    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex flex-col">
            <div className="flex-grow container mx-auto px-4 py-8 max-w-md">
                <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-purple-600 text-white p-6 relative">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-purple-400 rounded-full flex items-center justify-center text-3xl font-bold">
                                {profile.name.charAt(0)}
                            </div>
                            <div>
                                <h1 className="text-xl font-bold">{profile.name}</h1>
                                <p className="text-purple-100 text-sm">{profile.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Collapsible Sections */}
                    <div className="divide-y divide-gray-200">
                        {/* Profile Information Section */}
                        <div className="px-4 py-2">
                            <button
                                onClick={() => toggleSection('profile')}
                                className="w-full flex justify-between items-center py-4 text-left"
                            >
                                <div className="flex items-center space-x-3">
                                    <User className="w-5 h-5 text-purple-600" />
                                    <span className="font-semibold text-gray-800">Informations de profil</span>
                                </div>
                                <ChevronDown className={`w-5 h-5 transform transition-transform ${activeSection === 'profile' ? 'rotate-180' : ''}`} />
                            </button>

                            {activeSection === 'profile' && (
                                <form onSubmit={handleProfileUpdate} className="space-y-4 pb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                                        <input
                                            type="text"
                                            value={profile.name}
                                            onChange={(event) => setProfile({ ...profile, name: event.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <input
                                            type="email"
                                            value={profile.email}
                                            onChange={(event) => setProfile({ ...profile, email: event.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
                                    >
                                        <Check className="w-5 h-5 mr-2" />
                                        Mettre à jour
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Processing Results Section */}
                        <div className="px-4 py-2">
                            <button
                                onClick={() => toggleSection('results')}
                                className="w-full flex justify-between items-center py-4 text-left"
                            >
                                <div className="flex items-center space-x-3">
                                    <FileText className="w-5 h-5 text-purple-600" />
                                    <span className="font-semibold text-gray-800">Résultats de traitement</span>
                                </div>
                                <ChevronDown className={`w-5 h-5 transform transition-transform ${activeSection === 'results' ? 'rotate-180' : ''}`} />
                            </button>

                            {activeSection === 'results' && (
                                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                                    {results.length > 0 ? (
                                        results.map((result, index) => (
                                            <div key={index} className="bg-white p-3 rounded-md shadow-sm mb-2">
                                                <p className="text-gray-800">{result}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-center">Aucun résultat disponible.</p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* OCR Settings Section */}
                        <div className="px-4 py-2">
                            <button
                                onClick={() => toggleSection('ocr')}
                                className="w-full flex justify-between items-center py-4 text-left"
                            >
                                <div className="flex items-center space-x-3">
                                    <Settings className="w-5 h-5 text-purple-600" />
                                    <span className="font-semibold text-gray-800">Paramètres OCR</span>
                                </div>
                                <ChevronDown className={`w-5 h-5 transform transition-transform ${activeSection === 'ocr' ? 'rotate-180' : ''}`} />
                            </button>

                            {activeSection === 'ocr' && (
                                <form onSubmit={handleOcrSettingsUpdate} className="space-y-4 pb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Langue</label>
                                        <select
                                            value={ocrSettings.language}
                                            onChange={(event) => setOcrSettings({ ...ocrSettings, language: event.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        >
                                            <option value="fr">Français</option>
                                            <option value="en">Anglais</option>
                                            <option value="es">Espagnol</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                                        <select
                                            value={ocrSettings.format}
                                            onChange={(event) => setOcrSettings({ ...ocrSettings, format: event.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        >
                                            <option value="pdf">PDF</option>
                                            <option value="txt">Texte</option>
                                        </select>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
                                    >
                                        <Check className="w-5 h-5 mr-2" />
                                        Mettre à jour
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="p-4 space-y-4">
                            <button
                                onClick={handleExport}
                                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                            >
                                <FileText className="w-5 h-5 mr-2" />
                                Exporter les données
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
                            >
                                <LogOut className="w-5 h-5 mr-2" />
                                Déconnexion
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <NavBar />
        </div>
    );
};

export default ProfileInterface;
