import React from 'react';
import InputGroup from './InputGroup';

export default class SignUp extends React.Component {
  constructor() {
    super();
    this.form = React.createRef();
  }

  componentDidMount() {
    this.form.current.focus();
  }

  handleSubmit = (event) => {
    const { signInForm, attemptSignIn } = this.props;
    event.preventDefault();
    attemptSignIn(
      signInForm.usernameOrEmail,
      signInForm.password
    );
  }

  render() {

    const {
      signInForm,
      showSignUp,
      updateInputValue,
      setError,
    } = this.props;

    return (
      <form className="sign-in__form" onSubmit={this.handleSubmit} ref={this.form} tabIndex="0">
        <h2 className="sign-in__heading">Sign In</h2>
        <InputGroup
          field="usernameOrEmail"
          text="Username or email"
          type="text"
          updateInputValue={updateInputValue}
          setError={setError}
          form={signInForm}
          formKey="signInForm"
        />
        <InputGroup
          field="password"
          text="Password"
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
