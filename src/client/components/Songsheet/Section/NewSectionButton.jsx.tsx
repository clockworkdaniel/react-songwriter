import React from 'react';

export default function NewSectionButton({ newSection }) {
  return (
    <button
      className="new-section-button"
      type="button"
      onClick={() => newSection()}
    >
      New Section
    </button>
  );
}
