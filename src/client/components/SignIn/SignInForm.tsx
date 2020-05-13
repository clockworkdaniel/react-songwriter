import * as React from "react";

import { signInForm } from "../../types/signInState";
import InputGroup from "./InputGroup";

type Props = {
  signInForm: signInForm;
  updateInputValue(form: string, name: string, value: string): void;
  showSignUp(): void;
  signInRequest(usernameOrEmail: string, password: string): void;
  // need info
  setError(errorObj: any): void;
};

export default class SignInForm extends React.Component<Props, {}> {
  private form = React.createRef<HTMLFormElement>();

  componentDidMount() {
    this.form.current && this.form.current.focus();
  }

  handleSubmit = event => {
    const { signInForm, signInRequest } = this.props;
    event.preventDefault();
    signInRequest(signInForm.usernameOrEmail, signInForm.password);
  };

  render() {
    const { signInForm, showSignUp, updateInputValue, setError } = this.props;

    return (
      <form
        className="sign-in__form"
        onSubmit={this.handleSubmit}
        ref={this.form}
        tabIndex={0}
      >
        <h2 className="sign-in__heading">Sign In</h2>
        <InputGroup
          field="usernameOrEmail"
          label="Username or email"
          type="text"
          updateInputValue={updateInputValue}
          setError={setError}
          form={signInForm}
          formKey="signInForm"
        />
        <InputGroup
          field="password"
          label="Password"
          type="password"
          updateInputValue={updateInputValue}
          setError={setError}
          form={signInForm}
          formKey="signInForm"
        />
        <button type="submit" value="Submit">
          Submit
        </button>
        <p className="sign-in__alternate-prompt">Don't have an account yet?</p>
        <button
          className="sign-in__alternate-btn"
          type="submit"
          onClick={showSignUp}
        >
          Sign Up
        </button>
      </form>
    );
  }
}
