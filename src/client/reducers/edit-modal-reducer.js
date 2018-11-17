const initialState = {
  showEditModal: false,
  editableText: '',
  userPrompt: '',
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
        actionToTriggerOnCommit: action.actionToTriggerOnCommit
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
