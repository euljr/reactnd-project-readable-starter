import { RECEIVE_CATEGORIES } from "../actions/categories";

const initialState = [];

export default function categories(state = initialState, action) {
  switch(action.type) {
    case RECEIVE_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
}
