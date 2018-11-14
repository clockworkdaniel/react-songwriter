const initialState = {
  showEditModal: false,
  editableText: '',
};

const editModalReducer = (state = initialState, action) => {

  switch (action.type) {

    case 'EDIT_MODAL_TRIGGER': {
      return Object.assign({}, state, {
        showEditModal: true,
        editableText: action.editableText
      });
    }

    case 'UPDATE_TEXT_TO_EDIT': {
      return Object.assign({}, state, {
        editableText: action.updatedText
      });
    }

    case 'COMMIT_TEXT_CHANGE': {
      return Object.assign({}, state, {
        showEditModal: false
      });
    }

    default: {
      return state;
    }

  }
};

export default editModalReducer;
