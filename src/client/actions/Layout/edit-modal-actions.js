export function editModalTrigger({
  editableText = '',
  userPrompt = '',
  actionToTriggerOnCommit,
  shouldCloseModal = true
} = {}) {
  return {
    type: 'EDIT_MODAL_TRIGGER',
    editableText,
    userPrompt,
    actionToTriggerOnCommit,
    shouldCloseModal
  };
}

export function updateEditableText(updatedText) {
  return {
    type: 'UPDATE_TEXT_TO_EDIT',
    updatedText
  };
}

export function closeModal() {
  return {
    type: 'CLOSE_MODAL'
  };
}

export function commitTextChange({
  commitedText, actionToTriggerOnCommit, shouldCloseModal = true
} = {}) {
  return {
    type: 'COMMIT_TEXT_CHANGE',
    commitedText,
    actionToTriggerOnCommit,
    shouldCloseModal
  };
}
