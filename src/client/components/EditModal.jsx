import React from 'react';

export default function EditModal({ editModalState, updateTextToEdit, commitTextChange }) {

  function handleChange(event) {
    updateTextToEdit(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      commitTextChange(event.target.value);
    }
  }

  return (
    editModalState.showEditModal && (
      <div className="song-edit-modal">
        <input
          className="song-edit-modal__input"
          value={editModalState.textToEdit}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    )
  );
}
