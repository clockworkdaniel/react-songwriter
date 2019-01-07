import React from 'react';
import InputGroup from './InputGroup';

function validateEmail(email) {
  return !!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
}

function validateUsername(username) {
  return !!username.match(/^[a-zA-Z0-9_]+$/);
}

function validatePasswords(password, passwordConfirm) {
  return (password === passwordConfirm);
}

export default class SignUp extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateFirstStage = this.validateFirstStage.bind(this);
    this.switchToSignIn = this.switchToSignIn.bind(this);
    this.form = React.createRef();
  }

  componentDidMount() {
    this.form.current.focus();
  }

  handleSubmit(event) {
    const {
      createUser,
      setError,
      signUpForm: {
        username, email, password, passwordConfirm
      }
    } = this.props;
    event.preventDefault();
    if (!validatePasswords(password, passwordConfirm)) {
      return setError('signUpForm', { field: 'password', message: 'Passwords do not match' });
    }
    createUser(username, email, password);
  }

  validateFirstStage() {
    const {
      signUpForm: { username, email },
      setError,
      checkForUserDuplication
    } = this.props;

    if (username === '') {
      return setError('signUpForm', { field: 'username', message: 'Please enter username' });
    }
    if (!validateUsername(username)) {
      return setError('signUpForm', {
        field: 'username',
        message: 'May consist of letters, numbers and underscores'
      });
    }
    if (email === '') {
      return setError('signUpForm', { field: 'email', message: 'Please enter email address' });
    }
    if (!validateEmail(email)) {
      return setError('signUpForm', { field: 'email', message: 'Check your email!' });
    }
    checkForUserDuplication(username, email);
  }

  switchToSignIn() {
    const { showSignIn, setSignUpStage, setError } = this.props;
    setSignUpStage(1);
    setError('signUpForm', { field: null, message: '' });
    showSignIn();
  }

  render() {

    const {
      signUpForm,
      updateInputValue,
      setError
    } = this.props;

    return (
      <form className="sign-up__form" onSubmit={this.handleSubmit} ref={this.form} tabIndex="0">
        <h2 className="sign-up__heading">Sign Up</h2>
        {(signUpForm.stage === 1) && (
          <div className="sign-in__stage">
            <InputGroup
              field="username"
              text="Username"
              type="text"
              updateInputValue={updateInputValue}
              setError={setError}
              form={signUpForm}
              formKey="signUpForm"
            />
            <InputGroup
              field="email"
              text="Email"
              type="text"
              updateInputValue={updateInputValue}
              setError={setError}
              form={signUpForm}
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
        {(signUpForm.stage === 2) && (
          <div className="sign-in__stage">
            <InputGroup
              field="password"
              text="Password"
              type="password"
              updateInputValue={updateInputValue}
              setError={setError}
              form={signUpForm}
              formKey="signUpForm"
            />
            <InputGroup
              field="passwordConfirm"
              text="Confirm Password"
              type="password"
              updateInputValue={updateInputValue}
              setError={setError}
              form={signUpForm}
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
