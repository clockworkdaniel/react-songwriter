import { ActionCreator } from "redux";

export function editModalTrigger({
  editableText = "",
  userPrompt = "",
  actionToTriggerOnCommit,
  shouldCloseModal = true
}: {
  editableText?: string;
  userPrompt?: string;
  actionToTriggerOnCommit: ActionCreator<any>;
  shouldCloseModal?: boolean;
}) {
  return {
    type: "EDIT_MODAL_TRIGGER",
    editableText,
    userPrompt,
    actionToTriggerOnCommit,
    shouldCloseModal
  };
}

export function updateEditableText(updatedText: string) {
  return {
    type: "UPDATE_TEXT_TO_EDIT",
    updatedText
  };
}

export function closeModal() {
  return {
    type: "CLOSE_MODAL"
  };
}

export function commitTextChange({
  committedText,
  actionToTriggerOnCommit,
  shouldCloseModal = true
}: {
  committedText: string;
  actionToTriggerOnCommit: ActionCreator<any>;
  shouldCloseModal: boolean;
}) {
  return {
    type: "COMMIT_TEXT_CHANGE",
    committedText,
    actionToTriggerOnCommit,
    shouldCloseModal
  };
}
