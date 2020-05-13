import * as React from "react";

type Props = {
  field: string;
  updateInputValue(form: string, name: string, value: string);
  // fix
  setError(errorObj: any): void;
  // fix
  form: any;
  label: string;
  // change this to input type values type
  type: string;
  formKey: string;
};

export default class InputGroup extends React.Component<Props, {}> {
  handleFieldChange = event => {
    const {
      field,
      updateInputValue,
      setError,
      form: { error },
      formKey
    } = this.props;

    updateInputValue(formKey, field, event.target.value);

    if (error.field === field) {
      setError({ field: null, message: "" });
    }
  };

  render() {
    const {
      field,
      label,
      type,
      form: { error }
    } = this.props;

    return (
      <div className={`input-group${error.field === field ? " errored" : ""}`}>
        <label className="input-group__label" htmlFor={field}>
          {label}
        </label>
        <input
          className="input-group__text-input"
          type={type}
          name={field}
          id={field}
          onChange={this.handleFieldChange}
        />
        {error.message && (
          <p className="input-group__error-msg">{error.message}</p>
        )}
      </div>
    );
  }
}
