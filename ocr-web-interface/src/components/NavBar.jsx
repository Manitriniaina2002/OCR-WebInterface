import React, { useState, useEffect } from 'react';
import { Home, Camera, Image, File, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useResponsiveNavBar } from '../components/Hooks/useResponsiveNavBar';

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activePage, setActivePage] = useState('Accueil');

    // Utiliser le hook personnalisé pour la responsivité
    const { screenWidth, showLabels, isCompactMode } = useResponsiveNavBar();

    useEffect(() => {
        // Mettez à jour activePage en fonction de la route actuelle
        const pathToPage = {
            '/acceuil': 'Accueil',
            '/scanner': 'Camera',
            '/galerie': 'Galerie',
            '/template': 'Template',
            '/profil': 'Profil'
        };

        setActivePage(pathToPage[location.pathname] || 'Accueil');
    }, [location]);

    const handlePageChange = (page, path) => {
        setActivePage(page);
        navigate(path);
    };

    // Configuration des boutons de navigation
    const navButtons = [
        { page: 'Accueil', path: '/acceuil', icon: Home },
        { page: 'Camera', path: '/scanner', icon: Camera },
        { page: 'Galerie', path: '/galerie', icon: Image },
        { page: 'Template', path: '/template', icon: File },
        { page: 'Profil', path: '/profil', icon: User }
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md">
            <div className="flex items-center justify-around py-2">
                {navButtons.map((button) => {
                    const Icon = button.icon;
                    const isActive = activePage === button.page;

                    return (
                        <button
                            key={button.page}
                            className={`flex flex-col items-center ${isActive ? 'text-white bg-purple-500' : 'text-purple-600'} rounded-full p-2`}
                            style={{
                                width: '60px', // Agrandir le cercle
                                height: '60px', // Agrandir le cercle
                                borderRadius: '50%', // Transformer en cercle
                                border: '2px solid #fff'
                            }}
                            onClick={() => handlePageChange(button.page, button.path)}
                        >
                            <Icon className="h-5 w-5" />
                            {showLabels && (
                                <span className="text-xs">
                                    {button.page}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default NavBar;