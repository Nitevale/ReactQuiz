import React from 'react'
import Modal from 'react-modal'

const CreateModal = ({isOpen, onRequestClose, children}) => {
    return (
        <Modal
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          className="fixed inset-0 flex items-center justify-center z-50"
          overlayClassName="fixed inset-0 bg-black bg-opacity-20 z-40"
          ariaHideApp={false}
        >
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-96">
            <button
              onClick={onRequestClose}
              className="absolute top-0 right-2 text-red-500 text-2xl py-1 px-2
              hover:text-red-300"
            >
              <i className='fa-solid fa-xmark'></i>
            </button>
            {children}
          </div>
        </Modal>
    );
}

export default CreateModal
