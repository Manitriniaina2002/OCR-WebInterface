import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Modal = ({
  isOpen,
  onClose,
  title,
  onSubmit,
  initialTemplate = { name: '', description: '', fields: [] },
  variant = 'default'
}) => {
  const [template, setTemplate] = useState(initialTemplate);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTemplate(initialTemplate);
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, initialTemplate]);

  const addField = () => {
    const newField = {
      id: `field_${Date.now()}`,
      name: "Nouveau Champ",
      type: "text",
      ocrConfig: {
        confidence: 0.8,
        region: { x: 0, y: 0, width: 100, height: 50 }
      }
    };
    setTemplate(prev => ({
      ...prev,
      fields: [...(prev.fields || []), newField]
    }));
  };

  const updateField = (fieldId, updates) => {
    setTemplate(prev => ({
      ...prev,
      fields: prev.fields.map(field =>
        field.id === fieldId ? { ...field, ...updates } : field
      )
    }));
  };

  const deleteField = (fieldId) => {
    setTemplate(prev => ({
      ...prev,
      fields: prev.fields.filter(field => field.id !== fieldId)
    }));
  };

  const handleSubmit = () => {
    if (!template.name.trim()) {
      alert('Veuillez entrer un nom de modèle');
      return;
    }
    onSubmit(template);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-6"
      // Ajouter un défilement si nécessaire sur mobile
      style={{ overscrollBehavior: 'contain' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className={`
          bg-white rounded-lg shadow-xl 
          w-full max-w-2xl 
          max-h-[90vh] 
          overflow-y-auto 
          relative
          ${variant === 'danger' ? 'border-2 border-red-500' : ''}
          mobile:p-4 sm:p-6 
        `}
      >
        {/* Close button - positioned absolutely for better mobile touch target */}
        <button
          onClick={onClose}
          className="
            absolute top-3 right-3 
            text-gray-500 hover:text-gray-700 
            z-10 
            bg-gray-100 rounded-full 
            p-2 
            hover:bg-gray-200 
            transition duration-200
          "
        >
          <X className="w-6 h-6" />
        </button>

        {title && (
          <h2 className="text-xl font-bold text-gray-800 mb-6 pr-10">{title}</h2>
        )}

        <div>
          {/* Nom du Modèle - Plus grand et plus lisible sur mobile */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Nom du Modèle</label>
            <input
              type="text"
              value={template.name}
              onChange={(e) => setTemplate(prev => ({ ...prev, name: e.target.value }))}
              className="
                w-full 
                rounded-md 
                border-gray-300 
                shadow-sm 
                focus:border-purple-500 
                focus:ring-purple-500
                text-base 
                py-2 
                px-3 
                mobile:text-lg
              "
              placeholder="Entrez le nom du modèle"
            />
          </div>

          {/* Description - Ajustée pour mobile */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={template.description}
              onChange={(e) => setTemplate(prev => ({ ...prev, description: e.target.value }))}
              className="
                w-full 
                rounded-md 
                border-gray-300 
                shadow-sm 
                focus:border-purple-500 
                focus:ring-purple-500
                text-base 
                py-2 
                px-3 
                mobile:text-lg
              "
              placeholder="Décrivez le modèle"
              rows={3}
            />
          </div>

          {/* Champs du Formulaire avec bouton d'ajout plus accessible */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800">Champs du Formulaire</h3>
              <button
                onClick={addField}
                className="
                  bg-green-500 
                  text-white 
                  p-2 
                  rounded-full 
                  hover:bg-green-600 
                  transition 
                  duration-200
                  mobile:p-3  // Bouton plus grand pour le tactile
                "
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>

            {/* Liste des champs - Optimisée pour mobile */}
            {template.fields.map((field) => (
              <div
                key={field.id}
                className="
                  bg-gray-100 
                  rounded-lg 
                  p-3 
                  mb-3 
                  flex 
                  flex-col 
                  sm:flex-row 
                  items-stretch 
                  sm:items-center 
                  space-y-2 
                  sm:space-y-0 
                  sm:space-x-2 
                  transition-transform 
                  transform 
                  hover:scale-105
                "
              >
                <div className="flex-grow space-y-2">
                  <input
                    type="text"
                    value={field.name}
                    onChange={(e) => updateField(field.id, { name: e.target.value })}
                    className="
                      w-full 
                      rounded-md 
                      border-gray-300 
                      shadow-sm 
                      focus:border-purple-500 
                      focus:ring-purple-500
                      text-base 
                      mobile:text-lg
                    "
                    placeholder="Nom du champ"
                  />
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <select
                      value={field.type}
                      onChange={(e) => updateField(field.id, { type: e.target.value })}
                      className="
                        w-full 
                        rounded-md 
                        border-gray-300 
                        shadow-sm 
                        focus:border-purple-500 
                        focus:ring-purple-500
                        text-base 
                        mobile:text-lg
                      "
                    >
                      <option value="text">Texte</option>
                      <option value="number">Nombre</option>
                      <option value="date">Date</option>
                      <option value="checkbox">Case à cocher</option>
                    </select>

                    {/* Configuration OCR - Réorganisée pour mobile */}
                    <div className="flex items-center space-x-2">
                      <label className="text-sm text-gray-700 mobile:text-base">Conf.</label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="1"
                        value={field.ocrConfig?.confidence || 0.8}
                        onChange={(e) => updateField(field.id, {
                          ocrConfig: {
                            ...field.ocrConfig,
                            confidence: parseFloat(e.target.value)
                          }
                        })}
                        className="
                          w-20 
                          rounded-md 
                          border-gray-300 
                          shadow-sm 
                          focus:border-purple-500 
                          focus:ring-purple-500
                          text-base 
                          mobile:text-lg
                        "
                      />
                    </div>
                  </div>
                </div>

                {/* Bouton de suppression - Plus grand pour le tactile */}
                <div className="flex justify-end sm:block">
                  <button
                    onClick={() => deleteField(field.id)}
                    className="
                      text-red-500 
                      hover:text-red-700 
                      transition 
                      duration-200
                      mt-2 
                      sm:mt-0
                      mobile:p-2  // Zone de toucher plus grande
                    "
                  >
                    <Trash2 className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Actions du modal - Boutons plus accessibles sur mobile */}
          <div className="
            flex 
            flex-col 
            sm:flex-row 
            justify-end 
            space-y-2 
            sm:space-y-0 
            sm:space-x-2 
            mt-6
          ">
            <button
              onClick={onClose}
              className="
                w-full 
                sm:w-auto 
                px-4 
                py-3 
                text-gray-600 
                hover:bg-gray-100 
                rounded-md 
                transition 
                duration-200
                text-base 
                mobile:text-lg
              "
            >
              Annuler
            </button>
            <button
              onClick={handleSubmit}
              className="
                w-full 
                sm:w-auto 
                px-4 
                py-3 
                bg-purple-600 
                text-white 
                rounded-md 
                hover:bg-purple-700 
                flex 
                items-center 
                justify-center 
                transition 
                duration-200
                text-base 
                mobile:text-lg
              "
            >
              <Save className="w-5 h-5 mr-2" />
              Enregistrer
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;