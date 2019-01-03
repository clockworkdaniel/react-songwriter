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
    showSignIn: false,
    showSignUp: false,
    signUpForm: {
      stage: 1,
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    signInForm: {
      usernameOrEmail: '',
      password: ''
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
          showSignIn: true,
          showSignUp: false
        }
      };
    }

    case 'SHOW_SIGN_UP': {
      return {
        ...state,
        signIn: {
          ...state.signIn,
          showSignUp: true,
          showSignIn: false
        }
      };
    }

    case 'HIDE_SIGN_IN_SIGN_UP': {
      return {
        ...state,
        signIn: {
          ...state.signIn,
          showSignIn: false,
          showSignUp: false
        }
      };
    }

    case 'UPDATE_SIGNUP_INPUT_VALUE': {
      return {
        ...state,
        signIn: {
          ...state.signIn,
          signUpForm: {
            ...state.signIn.signUpForm,
            [action.name]: action.value
          }
        }
      };
    }

    case 'UPDATE_SIGNIN_INPUT_VALUE': {
      return {
        ...state,
        signIn: {
          ...state.signIn,
          signInForm: {
            ...state.signIn.signInForm,
            [action.name]: action.value
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
