import * as API from "../api";
import * as uuidv1 from 'uuid/v1';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const SAVE_COMMENT = 'SAVE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';


function receiveComments(comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments,
  };
}

function saveComment(comment, newComment = false) {
  return {
    type: SAVE_COMMENT,
    comment,
    newComment,
  };
}

function deleteComment(comment) {
  return {
    type: DELETE_COMMENT,
    comment,
  };
}

export function loadComments(postId) {
  return dispatch => {
    return API.getComments(postId)
      .then(comments => {
        const normalizedComments = comments.reduce((prev, next) => ({ ...prev, [next.id]: next }), {});
        return dispatch(receiveComments(normalizedComments));
      });
  };
}

export function addComment(data) {
  const { body, author, parentId } = data;
  return dispatch => {
    const comment = {
      id: uuidv1(),
      timestamp: Date.now(),
      body,
      author,
      parentId,
    };
    dispatch(saveComment(comment, true));
    return API.addComment(comment)
      .then(comment => dispatch(saveComment(comment)))
      .catch(() => dispatch(deleteComment(comment)));
  }
}

export function removeComment(comment) {
  return dispatch => {
    dispatch(deleteComment(comment));
    return API.deleteComment(comment.id)
      .catch(() => dispatch(saveComment(comment)));
  }
}

export function upVoteComment({ id }) {
  return (dispatch, getState) => {
    const currentComment = getState().comments.byId[id];
    dispatch(saveComment({ ...currentComment, voteScore: currentComment.voteScore + 1 }));
    return API.voteComment(id, 'upVote')
      .catch(() => dispatch(saveComment(currentComment)));
  }
}

export function downVoteComment({ id }) {
  return (dispatch, getState) => {
    const currentComment = getState().comments.byId[id];
    dispatch(saveComment({ ...currentComment, voteScore: currentComment.voteScore - 1 }));
    return API.voteComment(id, 'downVote')
      .catch(() => dispatch(saveComment(currentComment)));
  }
}

export function editComment({ id, body }) {
  return (dispatch, getState) => {
    const currentComment = getState().comments.byId[id];
    dispatch(saveComment({ ...currentComment, body }));
    return API.editComment(id, { body })
      .catch(() => dispatch(saveComment(currentComment)));
  }
}
