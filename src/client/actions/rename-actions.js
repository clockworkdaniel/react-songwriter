export const editModalTrigger = (textToEdit, pathArray) => ({
  type: 'EDIT_MODAL_TRIGGER',
  textToEdit,
  pathArray
});

export const commitTextChange = committedText => ({
  type: 'COMMIT_TEXT_CHANGE',
  committedText
});

export const updateTextToEdit = updatedText => ({
  type: 'UPDATE_TEXT_TO_EDIT',
  updatedText
});
