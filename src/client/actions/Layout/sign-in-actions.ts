export function initSignedInState(isSignedIn) {
  return {
    type: "INIT_SIGNED_IN_STATE",
    isSignedIn
  };
}

export function showSignIn() {
  return {
    type: "SHOW_SIGN_IN"
  };
}

export function hideSignInSignUp() {
  return {
    type: "HIDE_SIGN_IN_SIGN_UP"
  };
}

export function updateInputValue(formKey, name, value) {
  return {
    type: "UPDATE_INPUT_VALUE",
    formKey,
    name,
    value
  };
}

export function setError(errorObj) {
  return {
    type: "SET_ERROR",
    errorObj
  };
}

export function signInRequest(usernameOrEmail, password) {
  return {
    type: "SIGN_IN_REQUEST",
    usernameOrEmail,
    password
  };
}

export function signInSuccess() {
  return {
    type: "SIGN_IN_SUCCESS"
  };
}

export function signOutRequest() {
  return {
    type: "SIGN_OUT_REQUEST"
  };
}

export function signOutSuccess() {
  return {
    type: "SIGN_OUT_SUCCESS"
  };
}

export function signOutFailure(error) {
  return {
    type: "SIGN_OUT_FAILURE",
    error
  };
}

export function showSignUp() {
  return {
    type: "SHOW_SIGN_UP"
  };
}

export function setSignUpStage(stage) {
  return {
    type: "SET_SIGN_UP_STAGE",
    stage
  };
}

export function checkForUserDuplication(username, email) {
  return {
    type: "CHECK_FOR_USER_DUPLICATION",
    username,
    email
  };
}

export function signUpProceed() {
  return {
    type: "SIGN_UP_PROCEED"
  };
}

export function createUser(username, email, password) {
  return {
    type: "CREATE_USER",
    username,
    email,
    password
  };
}
