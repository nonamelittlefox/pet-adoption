import * as RequestApi from '../request';

export function postLogin(SITE, URL, DATA, PARAMS) {
  return RequestApi.postOne(SITE, URL, DATA, PARAMS);
}

export function postRefreshToken(SITE, URL, DATA = null, PARAMS = null) {
  return RequestApi.postOne(SITE, URL, DATA, PARAMS);
}

export function getGroupChat(SITE, URL, PARAMS = null) {
  return RequestApi.getOne(SITE, URL, PARAMS);
}
