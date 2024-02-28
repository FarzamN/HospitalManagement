// src/redux/connectionModal.js

const initialState = {
  isConnected: true,
  connectionType: '',
  showModal: false,
  hasShownModal: false,
};

// Action types
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

// Action creators
export const showModalAction = () => ({type: SHOW_MODAL});
export const hideModalAction = () => ({type: HIDE_MODAL});

// Reducer
export default function connectionModalReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        showModal: true,
        hasShownModal: true,
      };
    case HIDE_MODAL:
      return {
        ...state,
        showModal: false,
      };
    default:
      return state;
  }
}
