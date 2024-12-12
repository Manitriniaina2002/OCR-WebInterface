import React, { useState } from 'react';
import { FileText, Plus, Edit, Trash2, Save, X, Layers, AlertTriangle } from 'lucide-react';
import NavBar from '../components/NavBar';
import Modal from '../components/Modals/TemplateModal';

// Configuration initiale des modèles
const INITIAL_TEMPLATES = [
    {
        id: 1,
        name: "Reçu de paiement",
        description: "Un modèle de reçu pour extraire les informations de paiement",
        icon: <FileText className="w-6 h-6 text-purple-600" />,
        fields: [
            {
                id: 'date',
                name: 'Date',
                type: 'text',
                ocrConfig: {
                    confidence: 0.9,
                    dateFormat: 'DD/MM/YYYY',
                    region: { x: 0, y: 0, width: 100, height: 50 }
                }
            },
            {
                id: 'amount',
                name: 'Montant',
                type: 'number',
                ocrConfig: {
                    confidence: 0.85,
                    numberFormat: 'currency',
                    region: { x: 0, y: 50, width: 100, height: 50 }
                }
            }
        ]
    }
];

const TemplateConfigurationPage = () => {
    const [templates, setTemplates] = useState(INITIAL_TEMPLATES);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [editingTemplate, setEditingTemplate] = useState(null);

    // États pour les modals
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [templateToDelete, setTemplateToDelete] = useState(null);

    // Fonctions de gestion des modèles
    const handleCreateTemplate = (newTemplate) => {
        const templateWithId = {
            ...newTemplate,
            id: templates.length + 1,
            icon: <FileText className="w-6 h-6 text-purple-600" />
        };
        setTemplates(prev => [...prev, templateWithId]);
        setIsCreateModalOpen(false);
    };

    const handleEditTemplate = (updatedTemplate) => {
        setTemplates(prev =>
            prev.map(template =>
                template.id === updatedTemplate.id ? updatedTemplate : template
            )
        );
        setIsEditModalOpen(false);
        setEditingTemplate(null);
    };

    const confirmDeleteTemplate = () => {
        if (templateToDelete) {
            setTemplates(prev => prev.filter(t => t.id !== templateToDelete.id));
            setIsDeleteModalOpen(false);
            setTemplateToDelete(null);
        }
    };

    const openEditModal = (template) => {
        setEditingTemplate(template);
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (template) => {
        setTemplateToDelete(template);
        setIsDeleteModalOpen(true);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <div className="flex-grow px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-2xl font-bold text-purple-700 text-center mb-6">
                        Configuration des Modèles de Formulaires
                    </h1>

                    {/* Bouton de création de modèle */}
                    <div className="mb-6">
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="w-full flex items-center justify-center bg-purple-600 text-white rounded-lg p-4 shadow-md hover:bg-purple-700 transition transform hover:scale-105"
                        >
                            <Plus className="w-6 h-6 mr-2" />
                            <span className="font-semibold">Créer un Nouveau Modèle</span>
                        </button>
                    </div>

                    {/* Liste des modèles */}
                    <div className="space-y-4">
                        {templates.map((template) => (
                            <div
                                key={template.id}
                                className="flex items-center bg-white rounded-lg p-4 shadow-md"
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
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => openEditModal(template)}
                                        className="text-gray-500 hover:text-purple-600"
                                    >
                                        <Edit className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => openDeleteModal(template)}
                                        className="text-red-500 hover:text-red-600"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal de création de modèle */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Créer un Nouveau Modèle"
                onSubmit={handleCreateTemplate}
                initialTemplate={{
                    name: "",
                    description: "",
                    fields: []
                }}
            />

            {/* Modal d'édition de modèle */}
            {editingTemplate && (
                <Modal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setEditingTemplate(null);
                    }}
                    title="Modifier le Modèle"
                    onSubmit={handleEditTemplate}
                    initialTemplate={editingTemplate}
                />
            )}

            {/* Modal de confirmation de suppression */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setTemplateToDelete(null);
                }}
                variant="danger"
            >
                <div className="text-center">
                    <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold mb-2">Supprimer le modèle</h2>
                    <p className="mb-6">
                        Êtes-vous sûr de vouloir supprimer le modèle "{templateToDelete?.name}" ?
                        Cette action est irréversible.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                        >
                            Annuler
                        </button>
                        <button
                            onClick={confirmDeleteTemplate}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                            Supprimer
                        </button>
                    </div>
                </div>
            </Modal>

            <NavBar />
        </div>
    );
};

export default TemplateConfigurationPage;