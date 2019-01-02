import { RECEIVE_POSTS, SAVE_POST, DELETE_POST } from "../actions/posts";
import { SAVE_COMMENT, DELETE_COMMENT } from "../actions/comments";

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
    case DELETE_POST:
      let posts = { ...state.byId };
      delete posts[action.post.id];
      return {
        ...state,
        byId: {
          ...posts,
        },
      };
    case SAVE_COMMENT:
      if(!action.newComment) {
        return state;
      }
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.comment.parentId]: {
            ...state.byId[action.comment.parentId],
            commentCount: state.byId[action.comment.parentId].commentCount + 1,
          },
        },
      };
    case DELETE_COMMENT:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.comment.parentId]: {
            ...state.byId[action.comment.parentId],
            commentCount: state.byId[action.comment.parentId].commentCount - 1,
          },
        },
      };
    default:
      return state;
  }
}
