import { loop, Cmd } from 'redux-loop';

import callApi from '../util/callApi';
import {
  signInSuccess,
  setError,
  hideSignInSignUp,
  signUpProceed,
  setSignUpStage,
  signOutSuccess,
  signOutFailure
} from '../actions/Layout/sign-in-actions';

import { closeModal } from '../actions/Layout/edit-modal-actions';

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
    currentForm: '',
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

    case 'COMMIT_TEXT_CHANGE': {

      const actionList = [Cmd.action(action.actionToTriggerOnCommit(action.commitedText))];
      action.shouldCloseModal && actionList.push(Cmd.action(closeModal()));

      return loop(
        state,
        Cmd.list(actionList)
      );
    }

    case 'CLOSE_MODAL': {
      return { ...state, editModal: { ...state.editModal, showEditModal: false } };
    }

    case 'INIT_SIGNED_IN_STATE': {
      return { ...state, signIn: { ...state.signIn, signedIn: action.signedIn } };
    }

    case 'SHOW_SIGN_IN': {
      return {
        ...state,
        signIn: {
          ...state.signIn,
          signInShown: true,
          signUpShown: false,
          currentForm: 'signInForm'
        }
      };
    }

    case 'HIDE_SIGN_IN_SIGN_UP': {
      return {
        ...state,
        signIn: {
          ...initialState.signIn,
          signedIn: state.signIn.signedIn
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
          [state.signIn.currentForm]: {
            ...state.signIn[state.signIn.currentForm],
            error: action.errorObj
          }
        }
      };
    }

    case 'SIGN_IN_REQUEST': {
      return loop(
        state,
        Cmd.run(callApi, {
          args: [
            'user/sign-in',
            'post', {
              usernameOrEmail: action.usernameOrEmail,
              password: action.password
            }
          ],
          successActionCreator: signInSuccess,
          failActionCreator: setError
        })
      );
    }

    case 'SIGN_IN_SUCCESS': {
      return loop(
        { ...state, signIn: { ...state.signIn, signedIn: true } },
        Cmd.action(hideSignInSignUp())
      );
    }

    case 'SIGN_OUT_REQUEST': {
      return loop(
        state,
        Cmd.run(callApi, {
          args: ['user/sign-out', 'post'],
          successActionCreator: signOutSuccess,
          failActionCreator: signOutFailure
        })
      );
    }

    case 'SIGN_OUT_SUCCESS': {
      return { ...state, signIn: { ...state.signIn, signedIn: false } };
    }

    case 'SIGN_OUT_FAILURE': {
      console.log(action.error.message);
      return state;
    }

    case 'SHOW_SIGN_UP': {
      return {
        ...state,
        signIn: {
          ...state.signIn,
          signUpShown: true,
          signInShown: false,
          currentForm: 'signUpForm'
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

    case 'CHECK_FOR_USER_DUPLICATION': {
      return loop(
        state,
        Cmd.run(callApi, {
          args: ['user/check', 'post', {
            username: action.username,
            email: action.email
          }],
          successActionCreator: signUpProceed,
          failActionCreator: setError
        })
      );
    }

    case 'SIGN_UP_PROCEED': {
      return loop(state, Cmd.action(setSignUpStage(2)));
    }

    case 'CREATE_USER': {
      return loop(
        state,
        Cmd.run(callApi, {
          args: ['user/create', 'post', {
            username: action.username,
            email: action.email,
            password: action.password
          }],
          successActionCreator: signInSuccess,
          failActionCreator: setError
        })
      );
    }
 
    default: {
      return state;
    }

  }
};

export default editModalReducer;
