import { service } from './service';

export default {
  async getRequest(SITE, URL, PARAMS) {
    return await service(`${SITE}${URL}`, {
      method: 'GET',
      params: PARAMS,
    });
  },

  async postRequest(SITE, URL, DATA, PARAMS) {
    return await service(`${SITE}${URL}`, {
      method: 'POST',
      data: DATA,
      params: PARAMS,
    });
  },

  async storePostRequest(SITE, URL, HEADERS, DATA, PARAMS) {
    return await service(`${SITE}${URL}`, {
      method: 'POST',
      data: DATA,
      params: PARAMS,
      headers: HEADERS,
    });
  },

  async putRequest(SITE, URL, DATA, PARAMS) {
    return await service(`${SITE}${URL}`, {
      method: 'PUT',
      data: DATA,
      params: PARAMS,
    });
  },

  async deleteRequest(SITE, URL, DATA, PARAMS) {
    return await service(`${SITE}${URL}`, {
      method: 'DELETE',
      data: DATA,
      params: PARAMS,
    });
  },
};
