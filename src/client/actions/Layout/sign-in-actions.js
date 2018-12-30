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

export function updateSignUpInputValue(name, value) {
  return {
    type: 'UPDATE_SIGNUP_INPUT_VALUE',
    name,
    value
  };
}

export function updateSignInInputValue(name, value) {
  return {
    type: 'UPDATE_SIGNIN_INPUT_VALUE',
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

export function attemptSignIn(usernameOrEmail, password) {
  return dispatch => callApi('user/sign-in', 'post', {
    usernameOrEmail, password
  }).then((res) => {
    dispatch(setSignedInState(true));
    dispatch(hideSignInSignUp());
  }, (error) => {
    dispatch();
  });
}

export function createUser(username, email, password) {
  return dispatch => callApi('user/create', 'post', {
    username, email, password
  }).then((res) => {
    dispatch(setSignedInState(true));
    dispatch(hideSignInSignUp());
  }, (error) => {
    dispatch();
  });
}

export function signOut() {
  return dispatch => callApi('user/sign-out', 'post')
    .then((res) => {
      dispatch(setSignedInState(false));
    }, (error) => {
      dispatch();
    });
}
