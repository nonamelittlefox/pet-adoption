import axios from 'axios';
import { store } from 'src/store';

import * as SecureStore from 'expo-secure-store';

import Toast from 'react-native-toast-message';

const TOKEN_EXPIRED = {
  code: 401,
  data_error: null,
  message: '',
  message_content: 'token expire',
  message_internal: null,
};

const USER_NOT_FOUND = {
  code: 404,
  data_error: null,
  message: '',
  message_content: 'user not found',
  message_internal: null,
};

const handleLogout = async () => {
  store.dispatch({ type: 'LOADING_SET', payload: true });

  await SecureStore.setItemAsync('TOKEN', '');
  store.dispatch({ type: 'SET_TOKEN', payload: '' });

  store.dispatch({ type: 'LOADING_SET', payload: false });
};

const service = axios.create({
  timeout: 100000,
});

service.interceptors.request.use(
  config => {
    config.headers.Authorization = store.getState().misc.token;

    return config;
  },
  error => {
    Promise.reject(error);
  },
);

service.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    console.log('ERROR =========> ', error.response.data);

    const DATA = error.response.data;

    if (
      TOKEN_EXPIRED.code === DATA.code &&
      TOKEN_EXPIRED.message_content === DATA.message_content
    ) {
      console.log('IZUMI APP ===============> TOKEN EXPIRED');

      await handleLogout();

      Toast.show({
        text1: '警告',
        text2: 'ログインの有効期限が切れました',
        type: 'warning',
        position: 'top',
      });
    }

    if (
      USER_NOT_FOUND.code === DATA.code &&
      USER_NOT_FOUND.message_content === DATA.message_content
    ) {
      console.log('IZUMI APP ===============> USER NOT FOUND');

      await handleLogout();

      Toast.show({
        text1: '警告',
        text2: 'ユーザーは存在しません',
        type: 'warning',
        position: 'top',
      });
    }

    return Promise.reject(error);
  },
);

export { service };
