import { RECEIVE_POSTS, SAVE_POST } from "../actions/posts";

const initialState = {
  byId: {},
  lastUpdate: null,
};

export default function posts(state = initialState, action) {
  switch(action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        byId: {
          ...state.byId,
          ...action.posts,
        },
        lastUpdate: Date.now(),
      };
    case SAVE_POST:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.post.id]: {
            ...state.byId[action.post.id],
            ...action.post,
          },
        },
      };
    default:
      return state;
  }
}
