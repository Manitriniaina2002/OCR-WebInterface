import React, { useState, useRef } from 'react';
import { Camera, Upload, FileText } from 'lucide-react';
import NavBar from '../components/NavBar';

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
            // You would typically send this file to your OCR backend here
        } else {
            alert('Veuillez sélectionner un document');
        }
    };

    const triggerFileInput = (inputRef) => {
        inputRef.current.click();
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="flex-grow flex flex-col items-center justify-center px-4 py-8">
                <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-6 flex flex-col items-center">
                    <h1 className="text-2xl font-bold text-purple-700 text-center mb-4">MANDIKA OCR</h1>

                    {/* Image Preview */}
                    {imagePreview && (
                        <div className="mb-4 w-full flex justify-center">
                            <img
                                src={imagePreview}
                                alt="Document preview"
                                className="max-h-48 object-contain rounded-lg shadow-md"
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
                            className="w-full flex items-center justify-center bg-purple-600 text-white rounded-lg p-4 shadow-md hover:bg-purple-700 transition transform hover:scale-105"
                        >
                            <Camera className="w-6 h-6 mr-2" />
                            <span className="font-semibold">Capturer un document</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => triggerFileInput(fileInputRef)}
                            className="w-full flex items-center justify-center bg-purple-600 text-white rounded-lg p-4 shadow-md hover:bg-purple-700 transition transform hover:scale-105"
                        >
                            <Upload className="w-6 h-6 mr-2" />
                            <span className="font-semibold">Charger depuis la galerie</span>
                        </button>

                        {selectedFile && (
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center bg-green-600 text-white rounded-lg p-4 shadow-md hover:bg-green-700 transition transform hover:scale-105"
                            >
                                <FileText className="w-6 h-6 mr-2" />
                                <span className="font-semibold">Traiter le document</span>
                            </button>
                        )}
                    </div>
                </div>
            </form>
            <NavBar />
        </div>
    );
};

export default OCRFormInterface;