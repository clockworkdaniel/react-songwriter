import callApi from '../../util/callApi';

export function showSignIn() {
  return {
    type: 'SHOW_SIGN_IN'
  };
}

export function showSignUp() {
  return {
    type: 'SHOW_SIGN_UP'
  };
}

export function hideSignInSignUp() {
  return {
    type: 'HIDE_SIGN_IN_SIGN_UP'
  };
}

export function updateInputValue(formKey, name, value) {
  return {
    type: 'UPDATE_INPUT_VALUE',
    formKey,
    name,
    value
  };
}

export function setSignedInState(signedIn) {
  return {
    type: 'SET_SIGNED_IN_STATE',
    signedIn
  };
}

export function setError(formKey, errorObj) {
  return {
    type: 'SET_ERROR',
    formKey,
    errorObj
  };
}

export function attemptSignIn(usernameOrEmail, password) {
  return dispatch => callApi('user/sign-in', 'post', {
    usernameOrEmail, password
  }).then(() => {
    dispatch(setSignedInState(true));
    dispatch(hideSignInSignUp());
  }, (error) => {
    dispatch(setError('signInForm', error));
  });
}

export function createUser(username, email, password) {
  return dispatch => callApi('user/create', 'post', {
    username, email, password
  }).then(() => {
    dispatch(setSignedInState(true));
    dispatch(hideSignInSignUp());
  }, (error) => {
    dispatch(setError('signUpForm', error));
  });
}

export function signOut() {
  return dispatch => callApi('user/sign-out', 'post')
    .then(() => {
      dispatch(setSignedInState(false));
    }, (error) => {
      console.error(error.message);
    });
}

export function setSignUpStage(stage) {
  return {
    type: 'SET_SIGN_UP_STAGE',
    stage
  };
}

export function checkForUserDuplication(username, email) {
  return dispatch => callApi('user/check', 'post', {
    username, email
  }).then(() => {
    dispatch(setSignUpStage(2));
  }, (error) => {
    dispatch(setError('signUpForm', error));
  });
}
