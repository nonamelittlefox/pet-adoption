import * as RequestApi from '../request';

export function postResetPassword(SITE, URL, DATA = null, PARAMS = null) {
  return RequestApi.postOne(SITE, URL, DATA, PARAMS);
}
