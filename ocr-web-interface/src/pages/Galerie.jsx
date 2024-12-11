import React from 'react';
import NavBar from '../components/NavBar';

const WelcomeInterface = () => {
    const images = [
        'image1.jpg',
        'image2.jpg',
        'image3.jpg',
        'image4.jpg',
        'image5.jpg',
        // Ajoutez d'autres images ici
    ];

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <div className="flex-grow flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold text-purple-700 text-center mb-4">Galerie</h1>
                <p className="text-gray-600 text-center mb-6">Voici vos images téléchargées.</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                        <div key={index} className="overflow-hidden rounded-lg shadow-md">
                            <img src={image} alt={`Image ${index + 1}`} className="w-full h-auto" />
                        </div>
                    ))}
                </div>
            </div>
            <NavBar />
        </div>
    );
};

export default WelcomeInterface;