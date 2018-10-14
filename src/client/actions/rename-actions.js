export const editModalTrigger = (textToEdit, pathArray) => {
  return {
    type: 'EDIT_MODAL_TRIGGER',
    textToEdit,
    pathArray
  };
};

export const commitTextChange = (committedText) => {
  return {
    type: 'COMMIT_TEXT_CHANGE',
    committedText
  };
};

export const updateTextToEdit = (updatedText) => {
  return {
    type: 'UPDATE_TEXT_TO_EDIT',
    updatedText
  };
};
