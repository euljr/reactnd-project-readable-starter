import * as API from "../api";
import * as uuidv1 from 'uuid/v1';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SAVE_POST = 'SAVE_POST';
export const DELETE_POST = 'DELETE_POST';


function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts,
  };
}

function savePost(post) {
  return {
    type: SAVE_POST,
    post,
  };
}

function deletePost(post) {
  return {
    type: DELETE_POST,
    post,
  };
}

export function loadPosts() {
  return dispatch => {
    return API.getPosts()
      .then(posts => {
        const normalizedPosts = posts.reduce((prev, next) => ({ ...prev, [next.id]: next }), {});
        return dispatch(receivePosts(normalizedPosts));
      });
  };
}

export function addPost(data) {
  const { title, body, author, category } = data;
  return dispatch => {
    const post = {
      id: uuidv1(),
      timestamp: Date.now(),
      title,
      body,
      author,
      category,
    };
    dispatch(savePost(post));
    return API.addPost(post)
      .then(post => dispatch(savePost(post)))
      .catch(() => dispatch(deletePost(post)));
  }
}

export function removePost(post) {
  return dispatch => {
    dispatch(deletePost(post));
    return API.deletePost(post.id)
      .catch(() => dispatch(savePost(post)));
  }
}

export function upVotePost({ id }) {
  return (dispatch, getState) => {
    const currentPost = getState().posts.byId[id];
    dispatch(savePost({ ...currentPost, voteScore: currentPost.voteScore + 1 }));
    return API.votePost(id, 'upVote')
      .catch(() => dispatch(savePost(currentPost)));
  }
}

export function downVotePost({ id }) {
  return (dispatch, getState) => {
    const currentPost = getState().posts.byId[id];
    dispatch(savePost({ ...currentPost, voteScore: currentPost.voteScore - 1 }));
    return API.votePost(id, 'downVote')
      .catch(() => dispatch(savePost(currentPost)));
  }
}

export function editPost({ id, title, body }) {
  return (dispatch, getState) => {
    const currentPost = getState().posts.byId[id];
    dispatch(savePost({ ...currentPost, title, body }));
    return API.editPost(id, { title, body })
      .catch(() => dispatch(savePost(currentPost)));
  }
}
