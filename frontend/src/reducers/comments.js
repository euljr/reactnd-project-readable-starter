import { RECEIVE_COMMENTS, SAVE_COMMENT, DELETE_COMMENT } from "../actions/comments";

const initialState = {
  byId: {},
  lastUpdate: null,
};

export default function comments(state = initialState, action) {
  switch(action.type) {
    case RECEIVE_COMMENTS:
      return {
        ...state,
        byId: {
          ...state.byId,
          ...action.comments,
        },
        lastUpdate: Date.now(),
      };
    case SAVE_COMMENT:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.comment.id]: {
            ...state.byId[action.comment.id],
            ...action.comment,
          },
        },
      };
    case DELETE_COMMENT:
      let comments = { ...state.byId };
      delete comments[action.comment.id];
      return {
        ...state,
        byId: {
          ...comments,
        },
      };
    default:
      return state;
  }
}
