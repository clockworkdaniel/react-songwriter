import React from 'react';

export default class InputGroup extends React.Component {
  constructor() {
    super();
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  handleFieldChange(event) {
    const {
      field,
      updateInputValue,
      setError,
      form: {
        error
      },
      formKey
    } = this.props;

    updateInputValue(formKey, field, event.target.value);

    if (error.field === field) {
      setError(formKey, { field: null, message: '' });
    }
  }

  render() {
    const {
      field,
      text,
      type,
      form: {
        error
      }
    } = this.props;

    return (
      <div className={`input-group${(error.field === field) ? ' errored' : ''}`}>
        <label className="input-group__label" htmlFor={field}>
          {text}
        </label>
        <input
          className="input-group__text-input"
          type={type}
          name={field}
          id={field}
          onChange={this.handleFieldChange}
        />
        {error.message && (<p className="input-group__error-msg">{error.message}</p>)}
      </div>
    );
  }
}
