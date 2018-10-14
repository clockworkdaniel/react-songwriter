const initialState = {
  showEditModal: false,
  textToEdit: ''
};

const editModalReducer = (state = initialState, action) => {

  switch (action.type) {

    case 'UPDATE_TEXT_TO_EDIT': {
      return Object.assign({}, state, {
        textToEdit: action.updatedText
      });
    }

    case 'COMMIT_TEXT_CHANGE': {
      return Object.assign({}, state, {
        showEditModal: false
      });
    }

    case 'EDIT_MODAL_TRIGGER': {
      return Object.assign({}, state, {
        showEditModal: true,
        textToEdit: action.textToEdit
      });
    }

    default: {
      return state;
    }

  }
};

export default editModalReducer;
