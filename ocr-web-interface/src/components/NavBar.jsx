import React, { useState } from 'react';
import { Home, Camera, Image, File, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 

const NavBar = () => {
    const [activePage, setActivePage] = useState('Accueil');
    const navigate = useNavigate(); // Utilisez useNavigate pour naviguer

    const handlePageChange = (page, path) => {
        setActivePage(page);
        navigate(path); // Naviguez vers le chemin correspondant
    };

    return (
        <div className="flex justify-between items-center px-4 py-2 bg-white shadow-md sm:px-6 md:px-8 lg:px-10">
            <div className="flex items-center space-x-4">
                <button
                    className={`flex flex-col items-center text-purple-600 ${activePage === 'Accueil' ? 'font-bold' : ''}`}
                    onClick={() => handlePageChange('Accueil', '/acceuil')}
                >
                    <Home className="h-5 w-5" />
                    {activePage === 'Accueil' && <span className="text-xs">Accueil</span>}
                </button>
                <button
                    className={`flex flex-col items-center text-purple-600 ${activePage === 'Camera' ? 'font-bold' : ''}`}
                    onClick={() => handlePageChange('Camera', '/scanner')} // Lien vers la page Scanner
                >
                    <Camera className="h-5 w-5" />
                    {activePage === 'Camera' && <span className="text-xs">Scanner</span>}
                </button>
                <button
                    className={`flex flex-col items-center text-purple-600 ${activePage === 'Galerie' ? 'font-bold' : ''}`}
                    onClick={() => handlePageChange('Galerie', '/galerie')}
                >
                    <Image className="h-5 w-5" />
                    {activePage === 'Galerie' && <span className="text-xs">Galerie</span>}
                </button>
                <button
                    className={`flex flex-col items-center text-purple-600 ${activePage === 'Template' ? 'font-bold' : ''}`}
                    onClick={() => handlePageChange('Template', '/template')}
                >
                    <File className="h-5 w-5" />
                    {activePage === 'Template' && <span className="text-xs">Template</span>}
                </button>
                <button
                    className={`flex flex-col items-center text-purple-600 ${activePage === 'Profil' ? 'font-bold' : ''}`}
                    onClick={() => handlePageChange('Profil', '/profil')}
                >
                    <User className="h-5 w-5" />
                    {activePage === 'Profil' && <span className="text-xs">Profil</span>}
                </button>
            </div>
        </div>
    );
};

export default NavBar;