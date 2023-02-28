import * as RequestApi from '../request';

export function postLogin(SITE, URL, DATA, PARAMS) {
  return RequestApi.postOne(SITE, URL, DATA, PARAMS);
}

export function postRefreshToken(SITE, URL, DATA = null, PARAMS = null) {
  return RequestApi.postOne(SITE, URL, DATA, PARAMS);
}
