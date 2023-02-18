import * as RequestApi from '../request';

export function postNumberNoticeAndMessage(
  SITE,
  URL,
  DATA = null,
  PARAMS = null,
) {
  return RequestApi.postOne(SITE, URL, DATA, PARAMS);
}

export function getListMessage(SITE, URL, PARAMS) {
  return RequestApi.getOne(SITE, URL, PARAMS);
}

export function postMessage(SITE, URL, DATA, PARAMS = null) {
  return RequestApi.postOne(SITE, URL, DATA, PARAMS);
}

export function postTokenFCM(SITE, URL, DATA, PARAMS = null) {
  return RequestApi.postOne(SITE, URL, DATA, PARAMS);
}

export function postSeenMessage(SITE, URL, DATA, PARAMS = null) {
  return RequestApi.postOne(SITE, URL, DATA, PARAMS);
}
