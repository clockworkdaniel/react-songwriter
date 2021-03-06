import * as React from "react";

import Line from "../Line/Line";
import { Section } from "../../../types/song";

type Props = {
  chordMode: boolean;
  updateChord(characterKey: number, lineKey: number, sectionKey: number): void;
  deleteSection(sectionKey: number): void;
  duplicateSection(sectionKey: number): void;
  moveSection(originalSectionKey: number, destinationSectionKey: number): void;
  // fix
  rename(editableText: string, label: string, path: any): void;
  section: Section;
  sectionKey: number;
  isMouseDown: boolean;
  isEditable: boolean;
};

export default function Section({
  chordMode,
  updateChord,
  deleteSection,
  duplicateSection,
  moveSection,
  rename,
  section,
  sectionKey,
  isMouseDown,
  isEditable
}: Props) {
  function handleDelete() {
    deleteSection(sectionKey);
  }

  function handleDuplicate() {
    duplicateSection(sectionKey);
  }

  function handleRename() {
    const editableText = section.sectionName;
    const path = ["song", "structure", Number(sectionKey), "sectionName"];
    rename(editableText, "Rename section", path);
  }

  function handleMoveUp() {
    moveSection(sectionKey, sectionKey - 1);
  }

  function handleMoveDown() {
    moveSection(sectionKey, sectionKey + 1);
  }

  return (
    <div className="songsheet__section">
      <div className="section__ui">
        {isEditable && (
          <div className="section__controls">
            <button
              className="section__edit"
              onClick={handleRename}
              type="button"
            >
              <span className="icon-pencil" />
            </button>
            <button
              className="section__duplicate"
              onClick={handleDuplicate}
              type="button"
            >
              <span className="icon-copy" />
            </button>
            <button
              className="section__delete"
              onClick={handleDelete}
              type="button"
            >
              <span className="icon-cross" />
            </button>
          </div>
        )}
        <h4 className="section__name">
          {section.sectionName}
          {isEditable && (
            <span className="section__move-labels">
              <button
                className="section__move-up"
                onClick={handleMoveUp}
                type="button"
              >
                <span className="icon-move-up" />
              </button>
              <button
                className="section__move-down"
                onClick={handleMoveDown}
                type="button"
              >
                <span className="icon-move-down" />
              </button>
            </span>
          )}
        </h4>
      </div>
      <div className="section__lines">
        {section.lines.map((line, index) => (
          <Line
            line={line}
            key={index}
            lineKey={index}
            sectionKey={sectionKey}
            chordMode={chordMode}
            updateChord={updateChord}
            isMouseDown={isMouseDown}
            isEditable={isEditable}
          />
        ))}
      </div>
    </div>
  );
}
