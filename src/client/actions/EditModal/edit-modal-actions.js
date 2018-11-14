export const editModalTrigger = editableText => ({
  type: 'EDIT_MODAL_TRIGGER',
  editableText
});

export const commitTextChange = committedText => ({
  type: 'COMMIT_TEXT_CHANGE',
  committedText
});

export const updateEditableText = updatedText => ({
  type: 'UPDATE_TEXT_TO_EDIT',
  updatedText
});
