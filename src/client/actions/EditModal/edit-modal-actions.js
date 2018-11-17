export const editModalTrigger = (editableText, userPrompt, actionToTriggerOnCommit) => ({
  type: 'EDIT_MODAL_TRIGGER',
  editableText,
  userPrompt,
  actionToTriggerOnCommit
});

export const updateEditableText = updatedText => ({
  type: 'UPDATE_TEXT_TO_EDIT',
  updatedText
});

export const closeModal = () => ({
  type: 'CLOSE_MODAL'
});

export const commitTextChange = (commitedText, actionToTriggerOnCommit) => (dispatch) => {
  dispatch(actionToTriggerOnCommit(commitedText));
  dispatch(closeModal());
};
