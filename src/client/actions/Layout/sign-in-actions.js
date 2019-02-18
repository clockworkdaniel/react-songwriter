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

export function setError(errorObj) {
  return {
    type: 'SET_ERROR',
    errorObj
  };
}

export function attemptSignIn(usernameOrEmail, password) {
  return {
    type: 'ATTEMPT_SIGN_IN',
    usernameOrEmail,
    password
  };
}

export function signInSuccess() {
  return {
    type: 'SIGN_IN_SUCCESS'
  };
}

export function createUser(username, email, password) {
  return {
    type: 'CREATE_USER',
    username,
    email,
    password
  };
}

export function signOut() {
  return {
    type: 'SIGN_OUT'
  };
}

export function signOutSuccess() {
  return {
    type: 'SIGN_OUT_SUCCESS'
  };
}

export function signOutFailure(error) {
  return {
    type: 'SIGN_OUT_FAILURE',
    error
  };
}

export function setSignUpStage(stage) {
  return {
    type: 'SET_SIGN_UP_STAGE',
    stage
  };
}

export function signUpProceed() {
  return {
    type: 'SIGN_UP_PROCEED'
  };
}

export function checkForUserDuplication(username, email) {
  return {
    type: 'CHECK_FOR_USER_DUPLICATION',
    username,
    email
  };
}
