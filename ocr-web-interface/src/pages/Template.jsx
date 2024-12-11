import React from 'react';
import { Camera, Upload } from 'lucide-react';
import NavBar from '../components/NavBar';

const WelcomeInterface = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <div className="flex-grow flex flex-col items-center justify-center px-4 py-8">
                <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-6 flex flex-col items-center">
                    <h1 className="text-2xl font-bold text-purple-700 text-center mb-4">Bienvenue dans MANDIKA</h1>
                    <p className="text-gray-600 text-center mb-6">Choisissez une option ci-dessous pour commencer</p>

                    <button className="flex flex-col items-center bg-purple-600 text-white rounded-lg p-4 shadow-md hover:bg-purple-700 transition transform hover:scale-105 mb-4">
                        <Camera className="w-16 h-16 mb-2" />
                        <span className="text-sm font-semibold">Capturer un document</span>
                    </button>

                    <button className="flex flex-col items-center bg-purple-600 text-white rounded-lg p-4 shadow-md hover:bg-purple-700 transition transform hover:scale-105">
                        <Upload className="w-16 h-16 mb-2" />
                        <span className="text-sm font-semibold">Charger depuis la galerie</span>
                    </button>
                </div>
            </div>
            <NavBar />
        </div>
    );
};

export default WelcomeInterface;