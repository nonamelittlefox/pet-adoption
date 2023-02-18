import axios from 'axios';
import { store } from 'src/store';

import * as SecureStore from 'expo-secure-store';
import messaging from '@react-native-firebase/messaging';

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

  await SecureStore.setItemAsync('IS_REFRESH', '0');

  await messaging().deleteToken();
  store.dispatch({ type: 'SET_TOKEN_FCM', payload: '' });

  store.dispatch({
    type: 'SET_NUMBER_NOTICE_AND_MESSAGE',
    payload: {
      unread_messages: 0,
      unread_notices: 0,
    },
  });

  store.dispatch({
    type: 'SET_LIST_MESSAGE',
    payload: [],
  });

  store.dispatch({
    type: 'SET_GROUP_CHAT_ID',
    payload: null,
  });

  store.dispatch({
    type: 'SET_PROFILE',
    payload: {
      id: null,
      uuid: null,
      name: '',
      email: '',
      role: '',
      department_code: '',
      supervisor_email: '',
    },
  });
  await SecureStore.setItemAsync(
    'PROFILE',
    JSON.stringify({
      id: null,
      uuid: null,
      name: '',
      email: '',
      role: '',
      department_code: '',
      supervisor_email: '',
    }),
  );

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
