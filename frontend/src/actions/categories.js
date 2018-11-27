import * as API from "../api";

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

function receiveCategories(categories) {
  return {
    type: RECEIVE_CATEGORIES,
    categories,
  };
}

export function loadCategories() {
  return dispatch => {
    return API.getCategories()
      .then(categories => dispatch(receiveCategories(categories)));
  }
}
