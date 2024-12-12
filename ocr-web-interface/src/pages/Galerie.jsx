import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';

const WelcomeInterface = () => {
    const [images, setImages] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkDeviceType = () => {
            setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
        };

        checkDeviceType();
        window.addEventListener('resize', checkDeviceType);

        return () => {
            window.removeEventListener('resize', checkDeviceType);
        };
    }, []);

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        const imageFiles = files.filter(file => file.type.startsWith('image/'));

        const imageUrls = imageFiles.map(file => URL.createObjectURL(file));
        setImages(prevImages => [...prevImages, ...imageUrls]);
    };

    const openMobileGallery = () => {
        // Vérifier si on est dans un environnement mobile
        if (window.cordova && window.cordova.exec) {
            window.cordova.exec(
                function (results) {
                    const imageUris = results.map(uri => uri);
                    setImages(prevImages => [...prevImages, ...imageUris]);
                },
                function (error) {
                    console.error('Erreur de sélection d\'images', error);
                },
                'ImagePicker',
                'getPictures',
                [{ maximumImagesCount: 10 }]
            );
        } else {
            // Fallback pour les navigateurs web
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.multiple = true;
            fileInput.onchange = handleFileUpload;
            fileInput.click();
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <div className="flex-grow flex flex-col items-center justify-center p-4">
                <h1 className="text-3xl font-bold text-purple-700 text-center mb-4">Galerie</h1>

                {isMobile ? (
                    <button
                        onClick={openMobileGallery}
                        className="bg-purple-600 text-white px-4 py-2 rounded mb-4 shadow-md"
                    >
                        Ouvrir la galerie
                    </button>
                ) : (
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileUpload}
                        className="bg-white border border-gray-300 p-2 rounded mb-4 shadow-md"
                    />
                )}

                {images.length > 0 && (
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
                        {images.map((image, index) => (
                            <div key={index} className="overflow-hidden rounded-lg shadow-md">
                                <img
                                    src={image}
                                    alt={`Image ${index + 1}`}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <NavBar />
        </div>
    );
};

export default WelcomeInterface;