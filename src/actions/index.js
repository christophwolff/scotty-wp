import { ROOT_URL, ROOT_API, POSTS_URL } from '../config/config.js';

import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const CLEAR_POST = 'CLEAR_POST';
export const CLEAR_POSTS = 'CLEAR_POSTS';

export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

export const FETCH_BLOG_INFOS = 'FETCH_BLOG_INFOS';

export const SET_CURRENT_HEADER = 'SET_CURRENT_HEADER';

export function fetchPosts(page = 1) {

  const request = axios.get(`${POSTS_URL}?filter[posts_per_page]=10&page=${page}`);
  return {
    type: FETCH_POSTS,
    payload: request
  };
}

export function clearPost() {
  return {
    type: CLEAR_POST,
    payload: ''
  };
}

export function clearPosts() {
  return {
    type: CLEAR_POSTS,
    payload: ''
  };
}

export function fetchPost(slug) {
  const request = axios.get(`${POSTS_URL}/?filter[name]=/${slug}`);

  return {
    type: FETCH_POST,
    payload: request
  };
}

export function fetchBlogInfos() {
  const request = axios.get(`${ROOT_API}`);

  return {
    type: FETCH_BLOG_INFOS,
    payload: request
  };
}

export function setCurrentPage(page) {
  return {
    type: SET_CURRENT_PAGE,
    payload: page
  };
}

export function setCurrentHeader(header) {
  return {
    type: SET_CURRENT_HEADER,
    payload: header
  };
}
