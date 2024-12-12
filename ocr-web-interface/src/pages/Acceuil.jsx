import React, { useState, useRef } from 'react';
import { Camera, Upload, FileText, Image as ImageIcon, Settings } from 'lucide-react';
import NavBar from '../components/NavBar';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css/effect-cards';
import { EffectCards, Pagination, Autoplay } from 'swiper/modules';

const slides = [
    {
        title: "Bienvenue sur MANDIKA OCR",
        description: "Une application intuitive pour extraire du texte à partir d'images.",
        icon: <Settings className="w-16 h-16 text-purple-500 mb-4" />,
    },
    {
        title: "Capture de Document",
        description: "Utilisez votre caméra pour capturer des documents en temps réel.",
        icon: <Camera className="w-16 h-16 text-purple-500 mb-4" />,
    },
    {
        title: "Importation depuis la Galerie",
        description: "Chargez des images directement depuis votre galerie.",
        icon: <ImageIcon className="w-16 h-16 text-purple-500 mb-4" />,
    },
    {
        title: "Traitement Efficace",
        description: "Traitez vos documents rapidement pour extraire le texte.",
        icon: <FileText className="w-16 h-16 text-purple-500 mb-4" />,
    },
];

const OCRFormInterface = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const cameraInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleCameraCapture = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedFile) {
            console.log('Processing file:', selectedFile);
        } else {
            alert('Veuillez sélectionner un document');
        }
    };

    const triggerFileInput = (inputRef) => {
        inputRef.current.click();
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-100 to-purple-300">
            <div className="flex-grow flex flex-col items-center justify-center px-4 py-8">
                <div className="w-full max-w-lg bg-white shadow-lg rounded-3xl p-6 space-y-6 flex flex-col items-center">
                    {/* Diaporama avec effet circulaire */}
                    <Swiper
                        modules={[EffectCards, Pagination, Autoplay]}
                        effect="cards"
                        spaceBetween={30}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000 }}
                        loop={true}
                        className="w-full mb-6"
                    >
                        {slides.map((slide, index) => (
                            <SwiperSlide key={index} className="rounded-2xl shadow-lg">
                                <div className="flex flex-col items-center p-6 bg-purple-50 rounded-2xl shadow-md">
                                    {slide.icon}
                                    <h2 className="text-2xl font-semibold text-purple-700 mb-2">{slide.title}</h2>
                                    <p className="text-gray-700 text-center">{slide.description}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Image Preview */}
                    {imagePreview && (
                        <div className="mb-4 w-full flex justify-center">
                            <img
                                src={imagePreview}
                                alt="Document preview"
                                className="max-h-48 object-contain rounded-lg shadow-md border-2 border-purple-300"
                            />
                        </div>
                    )}

                    {/* Hidden file inputs */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />
                    <input
                        type="file"
                        ref={cameraInputRef}
                        onChange={handleCameraCapture}
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                    />

                    {/* Action Buttons */}
                    <div className="w-full space-y-4">
                        <button
                            type="button"
                            onClick={() => triggerFileInput(cameraInputRef)}
                            className="w-full flex items-center justify-center bg-purple-600 text-white rounded-lg p-4 shadow-lg hover:bg-purple-700 transition transform hover:scale-105"
                        >
                            <Camera className="w-6 h-6 mr-2" />
                            <span className="font-semibold">Capturer un document</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => triggerFileInput(fileInputRef)}
                            className="w-full flex items-center justify-center bg-purple-600 text-white rounded-lg p-4 shadow-lg hover:bg-purple-700 transition transform hover:scale-105"
                        >
                            <Upload className="w-6 h-6 mr-2" />
                            <span className="font-semibold">Charger depuis la galerie</span>
                        </button>

                        {selectedFile && (
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="w-full flex items-center justify-center bg-green-600 text-white rounded-lg p-4 shadow-lg hover:bg-green-700 transition transform hover:scale-105"
                            >
                                <FileText className="w-6 h-6 mr-2" />
                                <span className="font-semibold">Traiter le document</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <NavBar />
        </div>
    );
};

export default OCRFormInterface;
