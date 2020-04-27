import * as React from "react";

type Props = {
  newSection(): void;
};

export default function NewSectionButton({ newSection }: Props) {
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
