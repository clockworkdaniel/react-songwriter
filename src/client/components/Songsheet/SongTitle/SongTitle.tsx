import * as React from "react";

type Props = {
  title: string;
  // what is this any?
  rename(editableText: string, label: string, path: any): void;
};

export default function SongTitle({ title, rename }: Props) {
  function handleTitleRename() {
    const editableText = title;
    const path = ["song", "title"];
    rename(editableText, "Rename song", path);
  }

  return (
    <div className="songsheet__title ss-title">
      <h1 className="ss-title__heading controls__container">
        {title}
        <span className="controls">
          <button
            className="controls__edit ss-title__rename-button"
            onClick={handleTitleRename}
            type="button"
          >
            <span className="icon-pencil" />
          </button>
        </span>
      </h1>
    </div>
  );
}
