const initialState = {
  editModal: {
    showEditModal: false,
    editableText: '',
    userPrompt: '',
    commitedTextObj: {},
    actionToTriggerOnCommit: undefined
  }
};

const editModalReducer = (state = initialState, action) => {

  switch (action.type) {

    case 'EDIT_MODAL_TRIGGER': {
      return {
        ...state,
        editModal: {
          showEditModal: true,
          editableText: action.editableText,
          userPrompt: action.userPrompt,
          actionToTriggerOnCommit: action.actionToTriggerOnCommit,
          shouldCloseModal: action.shouldCloseModal
        }

      };
    }

    case 'UPDATE_TEXT_TO_EDIT': {
      return {
        ...state,
        editModal: {
          ...state.editModal,
          editableText: action.updatedText
        }
      };
    }

    case 'CLOSE_MODAL': {
      return {
        ...state,
        editModal: {
          ...state.editModal,
          showEditModal: false
        }
      };
    }

    default: {
      return state;
    }

  }
};

export default editModalReducer;
