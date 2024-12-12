import React, { useState, useEffect } from 'react';
import { FileText, Plus, Edit, Layers, ChevronLeft, ChevronRight } from 'lucide-react';
import NavBar from '../components/NavBar';
import { motion } from 'framer-motion';
import Modal from '../components/Modals/TempalteModal';

// Modèles de formulaires pour OCR prédéfinis
const PREDEFINED_TEMPLATES = [
    {
        id: 1,
        name: "Reçu de paiement",
        description: "Un modèle de reçu pour extraire les informations de paiement",
        icon: <FileText className="w-6 h-6 text-purple-600" />,
        fields: ["Date", "Montant", "Nom du commerçant", "Mode de paiement"]
    },
    {
        id: 2,
        name: "Facture",
        description: "Un modèle de facture pour extraire les détails de facturation",
        icon: <FileText className="w-6 h-6 text-purple-600" />,
        fields: ["Numéro de facture", "Date", "Nom du client", "Montant total", "Adresse"]
    },
    {
        id: 3,
        name: "Carte d'identité",
        description: "Un modèle pour extraire les informations des cartes d'identité",
        icon: <FileText className="w-6 h-6 text-purple-600" />,
        fields: ["Nom", "Prénom", "Date de naissance", "Numéro de carte", "Date d'expiration"]
    },
    {
        id: 4,
        name: "Formulaire d'entreprise",
        description: "Un modèle pour extraire les informations des documents d'entreprise",
        icon: <FileText className="w-6 h-6 text-purple-600" />,
        fields: ["Nom de l'entreprise", "Adresse", "Numéro de SIRET", "Secteur d'activité"]
    },
    {
        id: 5,
        name: "Formulaire de permis de conduire",
        description: "Un modèle pour extraire les informations des permis de conduire",
        icon: <FileText className="w-6 h-6 text-purple-600" />,
        fields: ["Nom", "Prénom", "Numéro de permis", "Date de délivrance", "Catégorie"]
    }
];

const TEMPLATES_PER_PAGE = 2;

const TemplateSelectionPage = () => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const handleTemplateSelect = (template) => {
        setSelectedTemplate(template);
        setIsModalOpen(true);
    };

    const handleCreateNewTemplate = () => {
        console.log('Créer un nouveau modèle');
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Pagination logic
    const totalPages = Math.ceil(PREDEFINED_TEMPLATES.length / TEMPLATES_PER_PAGE);
    const currentTemplates = PREDEFINED_TEMPLATES.slice(
        (currentPage - 1) * TEMPLATES_PER_PAGE,
        currentPage * TEMPLATES_PER_PAGE
    );

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

     const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const handleTouchStart = (event) => {
        setTouchStart(event.touches[0].clientX);
    };

    const handleTouchMove = (event) => {
        setTouchEnd(event.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStart && touchEnd) {
            const diff = touchEnd - touchStart;
            if (diff > 50) {
                prevPage();
            } else if (diff < -50) {
                nextPage();
            }
        }
        setTouchStart(null);
        setTouchEnd(null);
    };

    useEffect(() => {
        document.addEventListener('touchstart', handleTouchStart);
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <div className="flex-grow px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-2xl font-bold text-purple-700 text-center mb-6">
                        Modèles de Formulaires
                    </h1>

                    {/* Bouton Créer Nouveau Modèle */}
                    <div className="mb-6">
                        <button
                            onClick={handleCreateNewTemplate}
                            className="w-full flex items-center justify-center bg-purple-600 text-white rounded-lg p-4 shadow-md hover:bg-purple-700 transition transform hover:scale-105"
                        >
                            <Plus className="w-6 h-6 mr-2" />
                            <span className="font-semibold">Créer un Nouveau Modèle</span>
                        </button>
                    </div>

                    {/* Liste des Modèles Prédéfinis */}
                    <div className="space-y-4">
                        {currentTemplates.map((template) => (
                            <div
                                key={template.id}
                                onClick={() => handleTemplateSelect(template)}
                                className={`
                                    flex items-center bg-white rounded-lg p-4 shadow-md cursor-pointer
                                    transition hover:scale-105 hover:shadow-lg
                                    ${selectedTemplate?.id === template.id ? 'border-2 border-purple-600' : ''}
                                `}
                            >
                                <div className="mr-4">{template.icon}</div>
                                <div className="flex-grow">
                                    <h2 className="text-lg font-semibold text-gray-800">{template.name}</h2>
                                    <p className="text-sm text-gray-600">{template.description}</p>
                                    <div className="mt-2 flex items-center">
                                        <Layers className="w-4 h-4 mr-2 text-gray-500" />
                                        <span className="text-xs text-gray-500">
                                            {template.fields.length} champs
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <Edit className="w-5 h-5 text-gray-400 hover:text-purple-600" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-between items-center mt-6">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className={`p-2 bg-gray-200 rounded-full ${currentPage === 1 ? 'opacity-50' : 'hover:bg-gray-300'}`}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <span className="text-sm font-medium">
                            Page {currentPage} sur {totalPages}
                        </span>
                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className={`p-2 bg-gray-200 rounded-full ${currentPage === totalPages ? 'opacity-50' : 'hover:bg-gray-300'}`}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Modal */}
                    {isModalOpen && (
                        <Modal selectedTemplate={selectedTemplate} handleCloseModal={handleCloseModal} />
                    )}
                </div>
            </div>
            <NavBar />
        </div>
    );
};

export default TemplateSelectionPage;
