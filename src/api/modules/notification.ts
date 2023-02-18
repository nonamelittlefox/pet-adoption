import * as RequestApi from '../request';

export function getListNotificationIzumi(SITE, URL, PARAMS = null) {
  return RequestApi.getAll(SITE, URL, PARAMS);
}

export function getSpecificNotificationIzumi(SITE, URL, PARAMS = null) {
  return RequestApi.getOne(SITE, URL, PARAMS);
}

export function postNotificationWithoutSurvey(SITE, URL, DATA, PARAMS) {
  return RequestApi.postOne(SITE, URL, DATA, PARAMS);
}

export function postNotificationWithSurvey(SITE, URL, DATA, PARAMS) {
  return RequestApi.postOne(SITE, URL, DATA, PARAMS);
}

export function postSeenMessage(SITE, URL, DATA, PARAMS) {
  return RequestApi.postOne(SITE, URL, DATA, PARAMS);
}
