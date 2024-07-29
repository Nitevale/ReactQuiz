import React from 'react'

const QModal = () => {
    if (!isVisible) return null;

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow-lg w-1/2 relative">
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">X</button>
          {children}
        </div>
      </div>
    );
}

export default QModal
