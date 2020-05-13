import * as React from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import SignInState from "../../types/signInState";

type Props = {
  showSignIn(): void;
  showSignUp(): void;
  hideSignInSignUp(): void;
  updateInputValue(form: string, name: string, value: string): void;
  signInRequest(usernameOrEmail: string, password: string): void;
  createUser(username: string, email: string, password: string): void;
  // need info
  setError(errorObj: any): void;
  // guess
  setSignUpStage(stage: number): void;
  // this should probably be happening serverside?!
  checkForUserDuplication(username: string, email: string): void;
} & Omit<SignInState, "isSignedIn" | "currentForm">;

export default function SignIn({
  checkForUserDuplication,
  createUser,
  hideSignInSignUp,
  setError,
  setSignUpStage,
  showSignIn,
  showSignUp,
  signInForm,
  signInRequest,
  signInShown,
  signUpFormValues,
  signUpShown,
  updateInputValue
}: Props) {
  return (
    <div
      className={`sign-in${
        signInShown || signUpShown ? " sign-in--modal-active" : ""
      }`}
      tabIndex={0}
      onClick={e => {
        const element = e.target as HTMLElement;
        if (element.classList.contains("sign-in--modal-active"))
          hideSignInSignUp();
      }}
      onKeyDown={e => {
        if (e.keyCode === 27) {
          hideSignInSignUp();
        }
      }}
      role="dialog"
    >
      {signInShown && (
        <SignInForm
          signInForm={signInForm}
          updateInputValue={updateInputValue}
          setError={setError}
          showSignUp={showSignUp}
          signInRequest={signInRequest}
        />
      )}
      {signUpShown && (
        <SignUpForm
          showSignIn={showSignIn}
          signUpFormValues={signUpFormValues}
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
