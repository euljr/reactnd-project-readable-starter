const uuidv1 = require('uuid/v1');

const headers = {
  'Accept': 'application/json',
  'Authorization': 'whatever-you-want',
  'Content-Type': 'application/json; charset=UTF-8',
};

const API_URL = 'http://localhost:3001';

const doGET = ep => fetch(API_URL + ep, { method: 'GET', headers })
  .then(response => response.json());

const doPOST = (ep, data) => fetch(API_URL + ep, {
  method: 'POST',
  headers,
  body: JSON.stringify(data)
}).then(response => response.json());

const doPUT = (ep, data) => fetch(API_URL + ep, {
  method: 'PUT',
  headers,
  body: JSON.stringify(data)
}).then(response => response.json());

const doDELETE = ep => fetch(API_URL + ep, { method: 'DELETE', headers })
  .then(response => response.json());

export const getCategories = () => doGET('/categories')
  .then(data => data.categories);
export const getPosts = (category = null) => doGET((category ? `/${category}` : '') + '/posts');
export const addPost = post => doPOST('/posts', post);
export const getPostById = id => doGET(`/posts/${id}`);
export const votePost = (id, option) => doPOST(`/posts/${id}`, { option });
export const editPost = (id, post) => doPUT(`/posts/${id}`, post);
export const deletePost = id => doDELETE(`/posts/${id}`);
export const getComments = postId => doGET(`/posts/${postId}/comments`);
export const addComment = (body, author, parentId) => doPOST(`/comments`, {
  id: uuidv1(),
  timestamp: Date.now(),
  body,
  author,
  parentId,
});
export const getCommentById = id => doGET(`/comments/${id}`);
export const voteComment = (id, option) => doPOST(`/comments/${id}`, { option });
export const editComment = (id, comment) => doPUT(`/comments/${id}`, comment);
export const deleteComment = id => doDELETE(`/comments/${id}`);
