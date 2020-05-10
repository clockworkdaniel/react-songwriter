import * as React from "react";
import { ActionCreator } from "redux";

export interface EditModalUiState {
  showEditModal: boolean;
  editableText: string;
  userPrompt: string;
  // hmmmmmm
  committedTextObj?: Object;
  actionToTriggerOnCommit?: ActionCreator<any>;
  shouldCloseModal?: boolean;
}

interface Props {
  editModalState: EditModalUiState;
  updateEditableText(udatedText: string): void;
  // centralise
  commitTextChange(object: {
    committedText: string;
    actionToTriggerOnCommit: ActionCreator<any>;
    shouldCloseModal?: boolean;
  });
}

export default function EditModal({
  editModalState: {
    actionToTriggerOnCommit,
    editableText,
    shouldCloseModal,
    showEditModal,
    userPrompt
  },
  updateEditableText,
  commitTextChange
}: Props) {
  function handleChange(event) {
    updateEditableText(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.keyCode === 13 && actionToTriggerOnCommit) {
      commitTextChange({
        committedText: editableText,
        actionToTriggerOnCommit,
        shouldCloseModal
      });
    }
  }

  return showEditModal ? (
    <div className="edit-modal">
      <div className="edit-modal__input-container">
        <label className="edit-modal__prompt" htmlFor="user-input-text">
          {userPrompt}
        </label>
        <input
          id="user-input-text"
          className="edit-modal__input"
          value={editableText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  ) : null;
}
