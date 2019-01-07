const initialState = {
  editModal: {
    showEditModal: false,
    editableText: '',
    userPrompt: '',
    commitedTextObj: {},
    actionToTriggerOnCommit: undefined
  },
  signIn: {
    signedIn: false,
    signInShown: false,
    signUpShown: false,
    signUpForm: {
      stage: 1,
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      error: {
        field: null,
        message: ''
      }
    },
    signInForm: {
      usernameOrEmail: '',
      password: '',
      error: {
        field: null,
        message: ''
      }
    }
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

    case 'SET_SIGNED_IN_STATE': {
      return {
        ...state,
        signIn: {
          ...state.signIn,
          signedIn: action.signedIn
        }
      };
    }

    case 'SHOW_SIGN_IN': {
      return {
        ...state,
        signIn: {
          ...state.signIn,
          signInShown: true,
          signUpShown: false
        }
      };
    }

    case 'SHOW_SIGN_UP': {
      return {
        ...state,
        signIn: {
          ...state.signIn,
          signUpShown: true,
          signInShown: false
        }
      };
    }

    case 'HIDE_SIGN_IN_SIGN_UP': {
      return {
        ...state,
        signIn: {
          ...state.signIn,
          signInShown: false,
          signUpShown: false
        }
      };
    }

    case 'UPDATE_INPUT_VALUE': {
      return {
        ...state,
        signIn: {
          ...state.signIn,
          [action.formKey]: {
            ...state.signIn[action.formKey],
            [action.name]: action.value
          }
        }
      };
    }

    case 'SET_ERROR': {
      return {
        ...state,
        signIn: {
          ...state.signIn,
          [action.formKey]: {
            ...state.signIn[action.formKey],
            error: action.errorObj
          }
        }
      };
    }

    case 'SET_SIGN_UP_STAGE': {
      return {
        ...state,
        signIn: {
          ...state.signIn,
          signUpForm: {
            ...state.signIn.signUpForm,
            stage: action.stage
          }
        }
      };
    }

    default: {
      return state;
    }

  }
};

export default editModalReducer;
