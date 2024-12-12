import { useState, useEffect } from 'react';

// Hook personnalisé pour la gestion de la responsivité de la navbar
export const useResponsiveNavBar = () => {
    // State pour stocker la largeur actuelle de l'écran
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    // State pour gérer l'affichage des libellés
    const [showLabels, setShowLabels] = useState(true);

    // State pour gérer le mode compact (pour les petits écrans)
    const [isCompactMode, setIsCompactMode] = useState(false);

    useEffect(() => {
        // Fonction pour mettre à jour la largeur de l'écran
        const handleResize = () => {
            const newWidth = window.innerWidth;
            setScreenWidth(newWidth);

            // Définir des breakpoints pour la responsivité
            if (newWidth < 640) { // Tailwind sm breakpoint
                setShowLabels(true); // Modification ici : toujours afficher les labels
                setIsCompactMode(true);
            } else if (newWidth < 768) { // Tailwind md breakpoint
                setShowLabels(true);
                setIsCompactMode(false);
            } else {
                setShowLabels(true);
                setIsCompactMode(false);
            }
        };

        // Ajouter l'écouteur d'événement de redimensionnement
        window.addEventListener('resize', handleResize);

        // Appeler handleResize initialement pour définir l'état initial
        handleResize();

        // Nettoyer l'écouteur d'événement lors du démontage du composant
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return {
        screenWidth,
        showLabels,
        isCompactMode
    };
};