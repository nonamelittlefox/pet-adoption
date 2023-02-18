import * as RequestApi from '../request';

export function getListDepartment(SITE, URL, PARAMS = null) {
  return RequestApi.getOne(SITE, URL, PARAMS);
}

export function getListCourse(SITE, URL, PARAMS = null) {
  return RequestApi.getOne(SITE, URL, PARAMS);
}

export function getListStore(SITE, URL, PARAMS = null) {
  return RequestApi.getOne(SITE, URL, PARAMS);
}

export function getImage(SITE, URL, DATA) {
  return RequestApi.getOne(SITE, URL, DATA);
}

export function getStoreInformation(SITE, URL, DATA) {
  return RequestApi.getOne(SITE, URL, DATA);
}

export function postUpdate(SITE, URL, DATA, PARAMS) {
  return RequestApi.postOne(SITE, URL, DATA, PARAMS);
}

export function updateStoreInformation(SITE, HEADERS, URL, DATA, PARAMS) {
  return RequestApi.storePostOne(SITE, HEADERS, URL, DATA, PARAMS);
}