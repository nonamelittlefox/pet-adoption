import * as RequestApi from '../request';

export function postRegister(SITE, URL, DATA, PARAMS) {
  return RequestApi.postOne(SITE, URL, DATA, PARAMS);
}
