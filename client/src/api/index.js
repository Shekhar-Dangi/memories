import axios from "axios";
const API = axios.create({ baseURL: 'http://localhost:5000' })
const url = '/posts';
const url2 = '/user';

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  }
  return req;
})

export const fetchPosts = () => API.get(url);
export const createPost = (newPost) => API.post(url, newPost);
export const updatePost = (id, postData) => API.patch(`${url}/${id}`, postData);
export const deletePost = (id) => API.delete(`${url}/${id}`);
export const likePost = (id) => API.patch(`${url}/${id}/likepost`);

export const signIn = (formData) => API.post(`${url2}/signin`, formData);
export const signUp = (formData) => API.post(`${url2}/signup`, formData);
