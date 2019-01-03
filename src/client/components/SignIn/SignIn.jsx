import React from 'react';
import SignUp from './SignUp';

export default function SignIn({
  signInState,
  showSignIn,
  showSignUp,
  hideSignInSignUp,
  updateSignInInputValue,
  attemptSignIn,
  updateSignUpInputValue,
  createUser
}) {

  function handleFieldChange(event) {
    const { target } = event;
    const { value } = target;
    const { name } = target;
    updateSignInInputValue(name, value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    attemptSignIn(
      signInState.signInForm.usernameOrEmail,
      signInState.signInForm.password
    );
  }

  return (
    <div className={`sign-in ${(signInState.showSignIn || signInState.showSignUp) && 'sign-in--modal-active'}`}>
      {signInState.showSignIn
        && (
        <form className="sign-in__form" onSubmit={handleSubmit}>
          <h2 className="sign-in__heading">Sign In</h2>
          <div className="sign-in__input-group">
            <label className="sign-in__label" htmlFor="usernameOrEmail">
              Username or email
            </label>
            <input
              className="sign-in__text-input"
              type="text"
              name="usernameOrEmail"
              id="usernameOrEmail"
              onChange={handleFieldChange}
            />
          </div>
          <div className="sign-in__input-group">
            <label className="sign-in__label" htmlFor="password">
              Password
            </label>
            <input
              className="sign-in__text-input"
              type="password"
              name="password"
              id="password"
              onChange={handleFieldChange}
            />
          </div>
          <button type="submit" value="Submit">
            Proceed
          </button>
          <p>Don't have an account yet?</p>
          <button 
            type="submit"
            onClick={showSignUp}
          >
            Sign Up
          </button>
        </form>
        )
      }
      {signInState.showSignUp && (
        <SignUp
          showSignIn={showSignIn}
          signUpForm={signInState.signUpForm}
          updateSignUpInputValue={updateSignUpInputValue}
          createUser={createUser}
        />
      )}
    </div>
  );
}
