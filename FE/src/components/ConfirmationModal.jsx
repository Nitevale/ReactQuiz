import React from 'react';

const ConfirmationModal = ({ isOpen, onRequestClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-20"
        onClick={onRequestClose}
      ></div>
      <div className="bg-white rounded-2xl shadow-lg p-8 z-50">
        <h2 className="text-lg font-bold mb-4">Confirmation</h2>
        <p>{message}</p>
        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-400"
          >
            Confirm
          </button>
          <button
            onClick={onRequestClose}
            className="bg-gray-300 text-black py-1 px-4 rounded hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
