const initialState = {
  showEditModal: false,
  editableText: '',
  userPrompt: '',
  commitedTextObj: {},
  actionToTriggerOnCommit: undefined
};

const editModalReducer = (state = initialState, action) => {

  switch (action.type) {

    case 'EDIT_MODAL_TRIGGER': {
      return {
        ...state,
        showEditModal: true,
        editableText: action.editableText,
        userPrompt: action.userPrompt,
        actionToTriggerOnCommit: action.actionToTriggerOnCommit,
        shouldCloseModal: action.shouldCloseModal
      };
    }

    case 'UPDATE_TEXT_TO_EDIT': {
      return { ...state, editableText: action.updatedText };
    }

    case 'CLOSE_MODAL': {
      return { ...state, showEditModal: false };
    }

    default: {
      return state;
    }

  }
};

export default editModalReducer;
