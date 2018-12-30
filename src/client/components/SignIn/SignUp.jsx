import React from 'react';

export default function SignUp({
  showSignIn,
  signUpForm,
  updateSignUpInputValue,
  createUser
}) {

  function handleFieldChange(event) {
    const { target } = event;
    const { value } = target;
    const { name } = target;
    updateSignUpInputValue(name, value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    createUser(signUpForm.username, signUpForm.email, signUpForm.password);
  }

  return (
    <form className="sign-in__form" onSubmit={handleSubmit}>
      <h2 className="sign-in__heading">Sign Up</h2>
      <div className="sign-in__input-group">
        <label className="sign-in__label" htmlFor="username">
          Username
        </label>
        <input
          className="sign-in__text-input"
          type="text"
          name="username"
          id="username"
          value={signUpForm.username}
          onChange={handleFieldChange}
        />
      </div>
      <div className="sign-in__input-group">
        <label className="sign-in__label" htmlFor="email">
          Email
        </label>
        <input
          className="sign-in__text-input"
          type="text"
          name="email"
          id="email"
          value={signUpForm.email}
          onChange={handleFieldChange}
        />
      </div>
      {/* {(!firstPasswordEntered) ? (  */}
      <div className="sign-in__input-group">
        <label className="sign-in__label" htmlFor="password">
            Password
        </label>
        <input
          className="sign-in__text-input"
          type="password"
          name="password"
          id="password"
          value={signUpForm.password}
          onChange={handleFieldChange}
        />
      </div>
      {/* ) : ( */}
      {/* <div className="sign-in__input-group">
          <label className="sign-in__label" htmlFor="passwordConfirm">
            Confirm Password
          </label>
          <input
            className="sign-in__text-input"
            type="password" name="passwordConfirm"
            value={signUpForm.passwordConfirmation}
            id="passwordConfirmation"
            onChange={handleFieldChange}
          />
        </div> */}
      {/* )} */}
      <button type="submit">
        Proceed
      </button>
      <p>Already have an account?</p>
      <button
        type="button"
        onClick={showSignIn}
      >
        Sign In
      </button>
    </form>
  );
}
