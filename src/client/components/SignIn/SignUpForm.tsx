import * as React from "react";

import { SignUpFormValues } from "../../types/signInState";
import InputGroup from "./InputGroup";

function validateEmail(email) {
  return !!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
}

function validateUsername(username) {
  return !!username.match(/^[a-zA-Z0-9_]+$/);
}

function validatePasswordsMatch(password, passwordConfirm) {
  return password === passwordConfirm;
}

interface Props {
  signUpFormValues: SignUpFormValues;
  createUser(username: string, email: string, password: string): void;
  // need info
  setError(errorObj: any): void;
  checkForUserDuplication(username: string, email: string): void;
  showSignIn(): void;
  setSignUpStage(stage: number): void;
  updateInputValue(form: string, name: string, value: string): void;
}

export default class SignUpForm extends React.Component<Props> {
  private form = React.createRef<HTMLFormElement>();

  componentDidMount() {
    this.form.current && this.form.current.focus();
  }

  handleSubmit = event => {
    const {
      createUser,
      setError,
      signUpFormValues: { username, email, password, passwordConfirm }
    } = this.props;
    event.preventDefault();
    if (!validatePasswordsMatch(password, passwordConfirm)) {
      return setError({ field: "password", message: "Passwords do not match" });
    }
    createUser(username, email, password);
  };

  validateFirstStage = () => {
    const {
      signUpFormValues: { username, email },
      setError,
      checkForUserDuplication
    } = this.props;

    if (username === "") {
      return setError({ field: "username", message: "Please enter username" });
    }
    if (!validateUsername(username)) {
      return setError({
        field: "username",
        message: "May consist of letters, numbers and underscores"
      });
    }
    if (email === "") {
      return setError({
        field: "email",
        message: "Please enter email address"
      });
    }
    if (!validateEmail(email)) {
      return setError({ field: "email", message: "Check your email!" });
    }
    checkForUserDuplication(username, email);
  };

  switchToSignIn = () => {
    const { showSignIn, setSignUpStage, setError } = this.props;
    setSignUpStage(1);
    setError({ field: null, message: "" });
    showSignIn();
  };

  render() {
    const { signUpFormValues, updateInputValue, setError } = this.props;

    return (
      <form
        className="sign-up__form"
        onSubmit={this.handleSubmit}
        ref={this.form}
        tabIndex={0}
      >
        <h2 className="sign-up__heading">Sign Up</h2>
        {signUpFormValues.stage === 1 && (
          <div className="sign-in__stage">
            <InputGroup
              field="username"
              label="Username"
              type="text"
              updateInputValue={updateInputValue}
              setError={setError}
              form={signUpFormValues}
              formKey="signUpForm"
            />
            <InputGroup
              field="email"
              label="Email"
              type="text"
              updateInputValue={updateInputValue}
              setError={setError}
              form={signUpFormValues}
              formKey="signUpForm"
            />
            <button
              type="button"
              className="sign-up__next-stage"
              onClick={this.validateFirstStage}
            >
              Proceed
            </button>
          </div>
        )}
        {signUpFormValues.stage === 2 && (
          <div className="sign-in__stage">
            <InputGroup
              field="password"
              label="Password"
              type="password"
              updateInputValue={updateInputValue}
              setError={setError}
              form={signUpFormValues}
              formKey="signUpForm"
            />
            <InputGroup
              field="passwordConfirm"
              label="Confirm Password"
              type="password"
              updateInputValue={updateInputValue}
              setError={setError}
              form={signUpFormValues}
              formKey="signUpForm"
            />
            <button type="submit" value="Submit">
              Create account
            </button>
          </div>
        )}
        <p className="sign-up__alternate-prompt">Already have an account?</p>
        <button
          className="sign-up__alternate-btn"
          type="button"
          onClick={this.switchToSignIn}
        >
          Sign In
        </button>
      </form>
    );
  }
}
