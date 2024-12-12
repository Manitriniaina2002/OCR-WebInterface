import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileTextIcon as FileText } from 'lucide-react';

const Modal = ({ selectedTemplate, handleCloseModal }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 backdrop-filter "
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2, ease: 'easeInOut', delay: 0.1 }}
        className="bg-white rounded-lg p-6 shadow-md w-full max-w-md mx-auto z-50"
      >
        <h3 className="text-xl font-bold text-purple-700 mb-4">
          Détails du Modèle : {selectedTemplate.name}
        </h3>
        <div>
          <h4 className="font-semibold mb-2">Champs :</h4>
          <ul className="space-y-2">
            {selectedTemplate.fields.map((field, index) => (
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1, ease: 'easeInOut', delay: index * 0.05 }}
                key={index}
                className="bg-gray-100 p-2 rounded flex items-center"
              >
                <FileText className="w-4 h-4 mr-2 text-purple-600" />
                {field}
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="mt-4 flex space-x-4 justify-center">
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1, ease: 'easeInOut', delay: 0.2 }}
            className="bg-purple-600 text-white rounded-lg p-3 hover:bg-purple-700 transition"
          >
            Utiliser ce modèle
          </motion.button>
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1, ease: 'easeInOut', delay: 0.25 }}
            className="bg-gray-200 text-gray-800 rounded-lg p-3 hover:bg-gray-300 transition"
            onClick={handleCloseModal}
          >
            Fermer
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;