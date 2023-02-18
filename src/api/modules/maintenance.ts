import * as RequestApi from '../request';

export function getListDepartment(SITE, URL, PARAMS = null) {
  return RequestApi.getOne(SITE, URL, PARAMS);
}

export function getListSchedule(SITE, URL, PARAMS = null) {
  return RequestApi.getOne(SITE, URL, PARAMS);
}

export function postSchedule(SITE, URL, DATA, PARAMS = null) {
  return RequestApi.postOne(SITE, URL, DATA, PARAMS);
}