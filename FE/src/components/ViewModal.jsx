import React from "react";
import AddModal from "./CreateModal"; // Assuming your modal component is named `AddModal`
import QuestionForm from "./QuestionForm";

const ViewModal = ({ isOpen, onRequestClose, viewData, toggleEditMode, isEditMode }) => {
  return (
    <AddModal isOpen={isOpen} onRequestClose={onRequestClose} onClick={onRequestClose}>
      <div className="relative">
        <QuestionForm
          initialData={viewData}
          readOnly={!isEditMode}
        />
        <button
          onClick={toggleEditMode}
          className="bg-blue-500 text-white rounded px-4 py-2 w-full font-semibold hover:bg-blue-400 mt-4"
        >
          {isEditMode ? "Submit Changes" : "Edit"}
        </button>
      </div>
    </AddModal>
  );
};

export default ViewModal;
