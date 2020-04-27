export interface SignUpFormValues {
  stage: number;
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  error: {
    // dunno about this
    field: string | null;
    message: string;
  };
}

export interface SignInFormValues {
  usernameOrEmail: string;
  password: string;
  error: {
    // dunno about this
    field: string | null;
    message: string;
  };
}

export default interface SignInState {
  isSignedIn: boolean;
  signInShown: boolean;
  signUpShown: boolean;
  // change
  currentForm: string;
  signUpFormValues: SignUpFormValues;
  signInFormValues: SignInFormValues;
}
