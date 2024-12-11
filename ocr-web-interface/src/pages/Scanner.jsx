import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Camera } from 'lucide-react';
import NavBar from '../components/NavBar';

const ScannerPage = () => {
    const webcamRef = useRef(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const fileInputRef = useRef(null); // Référence pour l'input de fichier

    useEffect(() => {
        // Détecter si l'utilisateur est sur un appareil mobile
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/android|iphone|ipad|ipod/i.test(userAgent)) {
            setIsMobile(true);
        }
    }, []);

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImageSrc(imageSrc);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageSrc(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleCaptureClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Simule le clic sur l'input de fichier
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <div className="flex-grow flex flex-col items-center justify-center px-4 py-8">
                <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-6 flex flex-col items-center">
                    <h1 className="text-2xl font-bold text-purple-700 text-center mb-4">Scanner de Document</h1>
                    <p className="text-gray-600 text-center mb-6">Utilisez la caméra pour capturer un document</p>

                    {isMobile ? (
                        <div className="flex flex-col items-center">
                            <input
                                type="file"
                                accept="image/*"
                                capture="environment" // Utiliser la caméra arrière sur mobile
                                onChange={handleFileChange}
                                ref={fileInputRef} // Référence à l'input de fichier
                                style={{ display: 'none' }} // Masquer l'input
                            />
                            <button
                                onClick={handleCaptureClick}
                                className="flex items-center bg-purple-600 text-white rounded-lg p-4 shadow-md hover:bg-purple-700 transition transform hover:scale-105 mb-4"
                            >
                                <Camera className="w-6 h-6 mr-2" />
                                <span>Capturer</span>
                            </button>
                        </div>
                    ) : (
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className="rounded-lg mb-4"
                        />
                    )}

                    {!isMobile && (
                        <button
                            onClick={capture}
                            className="flex items-center bg-purple-600 text-white rounded-lg p-4 shadow-md hover:bg-purple-700 transition transform hover:scale-105 mb-4"
                        >
                            <Camera className="w-6 h-6 mr-2" />
                            <span>Capturer</span>
                        </button>
                    )}

                    {imageSrc && (
                        <div className="mt-4">
                            <h2 className="text-lg font-semibold text-gray-700">Image Capturée :</h2>
                            <img src={imageSrc} alt="Captured" className="mt-2 rounded-lg shadow-md" />
                        </div>
                    )}
                </div>
            </div>
            <NavBar />
        </div>
    );
};

export default ScannerPage;