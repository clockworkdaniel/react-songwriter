import React from 'react';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

export default function SignIn({
  signInShown,
  signUpShown,
  signInForm,
  signUpForm,
  showSignIn,
  showSignUp,
  hideSignInSignUp,
  updateInputValue,
  attemptSignIn,
  createUser,
  setError,
  setSignUpStage,
  checkForUserDuplication
}) {

  return (
    <div
      className={`sign-in${(signInShown || signUpShown) ? ' sign-in--modal-active' : ''}`}
      tabIndex="0" // eslint-disable-line
      onClick={(e) => { if (e.target.classList.contains('sign-in--modal-active')) hideSignInSignUp(); }}
      onKeyDown={(e) => { if (e.keyCode === 27) { hideSignInSignUp(); } }}
      role="dialog"
    >
      {signInShown
        && (
          <SignInForm
            signInForm={signInForm}
            updateInputValue={updateInputValue}
            setError={setError}
            showSignUp={showSignUp}
            attemptSignIn={attemptSignIn}
          />
        )
      }
      {signUpShown && (
        <SignUpForm
          showSignIn={showSignIn}
          signUpForm={signUpForm}
          updateInputValue={updateInputValue}
          createUser={createUser}
          setSignUpStage={setSignUpStage}
          checkForUserDuplication={checkForUserDuplication}
          setError={setError}
        />
      )}
    </div>
  );
}
