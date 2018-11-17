import React from 'react';

export default function EditModal({
  editModalState,
  updateEditableText,
  commitTextChange
}) {

  function handleChange(event) {
    updateEditableText(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      commitTextChange(event.target.value, editModalState.actionToTriggerOnCommit);
    }
  }

  return (
    editModalState.showEditModal && (
      <div className="edit-modal">
        <div className="edit-modal__input-container">
          <label className="edit-modal__prompt" htmlFor="user-input-text">{editModalState.userPrompt}</label>
          <input
            id="user-input-text"
            className="edit-modal__input"
            value={editModalState.editableText}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    )
  );
}
