import { store } from './../store';
import request from './config';

export function getOne(SITE, URL, PARAMS) {
  return request.getRequest(SITE, URL, PARAMS);
}

export function getAll(SITE, URL, PARAMS) {
  return request.getRequest(SITE, URL, PARAMS);
}

export function postOne(SITE, URL, DATA, PARAMS) {
  return request.postRequest(SITE, URL, DATA, PARAMS);
}

export function storePostOne(SITE, HEADERS, URL, DATA, PARAMS) {
  return request.storePostRequest(SITE, URL, HEADERS, DATA, PARAMS);
}

export function putOne(SITE, URL, DATA, PARAMS) {
  return request.putRequest(SITE, URL, DATA, PARAMS);
}

export function deleteOne(SITE, URL, DATA, PARAMS) {
  return request.deleteRequest(SITE, URL, DATA, PARAMS);
}

export function deleteOneHaveBody(SITE, URL, DATA, PARAMS) {
  return request.deleteRequest(SITE, URL, DATA, PARAMS);
}

export function deleteAll(SITE, URL, DATA, PARAMS) {
  return request.deleteRequest(SITE, URL, DATA, PARAMS);
}
