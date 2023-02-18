/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import renderer from 'react-test-renderer';
import { Keyboard } from 'react-native';
import { Provider } from 'react-redux';
import { store } from 'src/store';
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import Toast from 'react-native-toast-message';
import { postLogin } from 'src/api/modules/login';
import { setProfile, setToken } from 'src/actions/miscActions';
import { Config, Validate } from 'src/const';
import { useDispatch } from 'react-redux';
import { setLoading } from 'src/actions/miscActions';

import * as SecureStore from 'expo-secure-store';
import LoginScreen from 'src/screens/LoginScreen';

describe('<LoginScreen />', () => {
  it('Test if login screen have been rendered successfully', () => {
    const props = {
      navigation: {},
    };

    const tree = renderer
      .create(
        <Provider store={store}>
          <LoginScreen {...props} />
        </Provider>,
      )
      .toJSON();

    afterEach(cleanup);
  });

  it('Test if call function getToken when in the login screen', async () => {
    const props = {
      navigation: {},
    };

    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <LoginScreen {...props} />
      </Provider>,
    );

    const getToken = jest.fn();

    getToken.mockImplementationOnce(async () => {
      const TOKEN = await SecureStore.getItemAsync('TOKEN');

      if (TOKEN) {
        return TOKEN;
      }

      return '';
    });

    await waitFor(() => {
      getToken();
      expect(getToken).toHaveBeenCalled();
    });

    afterEach(cleanup);
  });

  it('Test if call function getProfile when in the login screen', async () => {
    const props = {
      navigation: {},
    };

    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <LoginScreen {...props} />
      </Provider>,
    );

    const getProfile = jest.fn();

    getProfile.mockImplementationOnce(async () => {
      const PROFILE = await SecureStore.getItemAsync('PROFILE');

      if (PROFILE) {
        return JSON.parse(PROFILE);
      }

      return {
        id: null,
        uuid: null,
        name: '',
        email: '',
        role: '',
        department_code: '',
        supervisor_email: '',
      };
    });

    await waitFor(() => {
      getProfile();
      expect(getProfile).toHaveBeenCalled();
    });

    afterEach(cleanup);
  });

  it('Test if the user ID input field have been rendered successfully', () => {
    const props = {
      navigation: {},
    };

    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <LoginScreen {...props} />
      </Provider>,
    );

    const userIDInput = getByTestId('userIDInput');
    expect(userIDInput).toBeTruthy();

    afterEach(cleanup);
  });

  it('Test if the password input field have been rendered successfully', () => {
    const props = {
      navigation: {},
    };

    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <LoginScreen {...props} />
      </Provider>,
    );

    const passwordInput = getByTestId('passwordInput');
    expect(passwordInput).toBeTruthy();

    afterEach(cleanup);
  });

  it('Test if the login button have been rendered successfully', () => {
    const props = {
      navigation: {},
    };

    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <LoginScreen {...props} />
      </Provider>,
    );

    const loginButton = getByTestId('buttonLogin');
    expect(loginButton).toBeTruthy();

    afterEach(cleanup);
  });

  it('Test if the text of the login button have been rendered correctly', () => {
    const props = {
      navigation: {},
    };

    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <LoginScreen {...props} />
      </Provider>,
    );

    const loginButton = getByTestId('buttonLogin');
    expect(loginButton).toBeTruthy();

    const loginButtonText = getByText('Login');
    expect(loginButtonText).toBeTruthy();

    afterEach(cleanup);
  });

  it('Test if validate the user ID input when click on the login button', async () => {
    const props = {
      navigation: {},
    };

    const dispatch = useDispatch();

    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <LoginScreen {...props} />
      </Provider>,
    );

    let isInvalidUserID = false;
    let isShowInvalidUserID = false;

    const onLogin = jest.fn();

    const handleValidateUserCode = jest.fn();

    handleValidateUserCode.mockImplementationOnce(async account => {
      const nonNumericRegex = /^[1-9][0-9]*$/;

      if (account.user_id === '') {
        isInvalidUserID = false;
        isShowInvalidUserID = true;
      } else if (!nonNumericRegex.test(account.user_id)) {
        isInvalidUserID = false;
        isShowInvalidUserID = true;
      } else {
        isInvalidUserID = true;
        isShowInvalidUserID = false;
      }
    });

    const handleValidatePassword = jest.fn();

    let isInvalidPWD = false;
    let isShowInvalidPWD = false;

    handleValidatePassword.mockImplementationOnce(async account => {
      if (account.password === '') {
        isInvalidPWD = false;
        isShowInvalidPWD = true;
      } else if (account.password.length < 8 || account.password.length > 16) {
        isInvalidPWD = false;
        isShowInvalidPWD = false;
      } else {
        isInvalidPWD = true;
        isShowInvalidPWD = false;
      }
    });

    const showToast = jest.fn();

    showToast.mockImplementation(params => {
      Toast.show({
        text1: params.title,
        text2: params.content,
        type: params.variant,
        position: 'top',
      });
    });

    const urlAPI = {
      apiLogin: '/auth/login',
    };

    onLogin.mockImplementation(async account => {
      await Keyboard.dismiss();

      const ACCOUNT = {
        id: account.id,
        password: account.password,
      };

      handleValidateUserCode();
      handleValidatePassword();

      if (isShowInvalidUserID === false && isShowInvalidPWD === false) {
        dispatch(setLoading(true));

        isShowInvalidUserID = false;
        isShowInvalidPWD = false;

        try {
          const response = await postLogin(
            Config.URL_DOMAIN_CLOUD,
            urlAPI.apiLogin,
            ACCOUNT,
            '',
          );

          if (response.status === 200) {
            const DATA = response.data.data.profile;
            const TOKEN = response.data.data.access_token;

            const RES_PROFILE = {
              id: DATA.id,
              uuid: DATA.uuid,
              name: DATA.name,
              email: DATA.email,
              role: DATA.role,
              department_code: DATA.department_code,
              supervisor_email: DATA.supervisor_email,
            };

            dispatch(setProfile(RES_PROFILE));
            await SecureStore.setItemAsync(
              'PROFILE',
              JSON.stringify(RES_PROFILE),
            );

            dispatch(setToken(TOKEN));
            await SecureStore.setItemAsync('TOKEN', TOKEN);
          } else {
            showToast({
              variant: 'warning',
              title: '警告',
              content: 'サインインに失敗しました。',
            });
          }
        } catch (error) {
          console.log(error.response);

          showToast({
            variant: 'error',
            title: 'エラー',
            content: error.response.data.message,
          });
        }
      }

      dispatch(setLoading(false));
    });

    const userIDInput = getByTestId('userIDInput');
    expect(userIDInput).toBeTruthy();

    const passwordInput = getByTestId('passwordInput');
    expect(passwordInput).toBeTruthy();

    const loginButton = getByTestId('buttonLogin');
    expect(loginButton).toBeTruthy();

    await waitFor(() => {
      fireEvent.changeText(userIDInput, '');
      fireEvent.changeText(passwordInput, '123456789');

      fireEvent.press(loginButton);

      expect(onLogin).toHaveBeenCalled();

      expect(userIDInput.props.value).toBe('');
      expect(passwordInput.props.value).toBe('123456789');

      expect(handleValidateUserCode).toHaveBeenCalled();

      expect(handleValidatePassword).toHaveBeenCalled();

      expect(isInvalidUserID).toBe(false);
      expect(isShowInvalidUserID).toBe(true);

      expect(isInvalidPWD).toBe(false);
      expect(isShowInvalidPWD).toBe(false);
    });

    afterEach(cleanup);
  });

  it('Test if validate the password input when click on the login button', async () => {
    const props = {
      navigation: {},
    };

    const dispatch = useDispatch();

    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <LoginScreen {...props} />
      </Provider>,
    );

    let isInvalidUserID = false;
    let isShowInvalidUserID = false;

    const onLogin = jest.fn();

    const handleValidateUserCode = jest.fn();

    handleValidateUserCode.mockImplementationOnce(async account => {
      const nonNumericRegex = /^[1-9][0-9]*$/;

      if (account.user_id === '') {
        isInvalidUserID = false;
        isShowInvalidUserID = true;
      } else if (!nonNumericRegex.test(account.user_id)) {
        isInvalidUserID = false;
        isShowInvalidUserID = true;
      } else {
        isInvalidUserID = true;
        isShowInvalidUserID = false;
      }
    });

    const handleValidatePassword = jest.fn();

    let isInvalidPWD = false;
    let isShowInvalidPWD = false;

    handleValidatePassword.mockImplementationOnce(async account => {
      if (account.password === '') {
        isInvalidPWD = false;
        isShowInvalidPWD = true;
      } else if (account.password.length < 8 || account.password.length > 16) {
        isInvalidPWD = false;
        isShowInvalidPWD = false;
      } else {
        isInvalidPWD = true;
        isShowInvalidPWD = false;
      }
    });

    const showToast = jest.fn();

    showToast.mockImplementation(params => {
      Toast.show({
        text1: params.title,
        text2: params.content,
        type: params.variant,
        position: 'top',
      });
    });

    const urlAPI = {
      apiLogin: '/auth/login',
    };

    onLogin.mockImplementation(async account => {
      await Keyboard.dismiss();

      const ACCOUNT = {
        id: account.id,
        password: account.password,
      };

      handleValidateUserCode();
      handleValidatePassword();

      if (isShowInvalidUserID === false && isShowInvalidPWD === false) {
        dispatch(setLoading(true));

        isShowInvalidUserID = false;
        isShowInvalidPWD = false;

        try {
          const response = await postLogin(
            Config.URL_DOMAIN_CLOUD,
            urlAPI.apiLogin,
            ACCOUNT,
            '',
          );

          if (response.status === 200) {
            const DATA = response.data.data.profile;
            const TOKEN = response.data.data.access_token;

            const RES_PROFILE = {
              id: DATA.id,
              uuid: DATA.uuid,
              name: DATA.name,
              email: DATA.email,
              role: DATA.role,
              department_code: DATA.department_code,
              supervisor_email: DATA.supervisor_email,
            };

            dispatch(setProfile(RES_PROFILE));
            await SecureStore.setItemAsync(
              'PROFILE',
              JSON.stringify(RES_PROFILE),
            );

            dispatch(setToken(TOKEN));
            await SecureStore.setItemAsync('TOKEN', TOKEN);
          } else {
            showToast({
              variant: 'warning',
              title: '警告',
              content: 'サインインに失敗しました。',
            });
          }
        } catch (error) {
          console.log(error.response);

          showToast({
            variant: 'error',
            title: 'エラー',
            content: error.response.data.message,
          });
        }
      }

      dispatch(setLoading(false));
    });

    const userIDInput = getByTestId('userIDInput');
    expect(userIDInput).toBeTruthy();

    const passwordInput = getByTestId('passwordInput');
    expect(passwordInput).toBeTruthy();

    const loginButton = getByTestId('buttonLogin');
    expect(loginButton).toBeTruthy();

    await waitFor(() => {
      fireEvent.changeText(userIDInput, '111111');
      fireEvent.changeText(passwordInput, '');

      fireEvent.press(loginButton);

      expect(onLogin).toHaveBeenCalled();

      expect(userIDInput.props.value).toBe('111111');
      expect(passwordInput.props.value).toBe('');

      expect(handleValidateUserCode).toHaveBeenCalled();

      expect(handleValidatePassword).toHaveBeenCalled();

      expect(isInvalidUserID).toBe(false);
      expect(isShowInvalidUserID).toBe(false);

      expect(isInvalidPWD).toBe(false);
      expect(isShowInvalidPWD).toBe(true);
    });

    afterEach(cleanup);
  });

  it('Test if call api login when click on the login button', async () => {
    const props = {
      navigation: {},
    };

    const dispatch = useDispatch();

    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <LoginScreen {...props} />
      </Provider>,
    );

    let currentScreen = 'LoginScreen';

    let isInvalidUserID = false;
    let isShowInvalidUserID = false;

    const onLogin = jest.fn();

    const handleValidateUserCode = jest.fn();

    handleValidateUserCode.mockImplementationOnce(async account => {
      const nonNumericRegex = /^[1-9][0-9]*$/;

      if (account.user_id === '') {
        isInvalidUserID = false;
        isShowInvalidUserID = true;
      } else if (!nonNumericRegex.test(account.user_id)) {
        isInvalidUserID = false;
        isShowInvalidUserID = true;
      } else {
        isInvalidUserID = true;
        isShowInvalidUserID = false;
      }
    });

    const handleValidatePassword = jest.fn();

    let isInvalidPWD = false;
    let isShowInvalidPWD = false;

    handleValidatePassword.mockImplementationOnce(async account => {
      if (account.password === '') {
        isInvalidPWD = false;
        isShowInvalidPWD = true;
      } else if (account.password.length < 8 || account.password.length > 16) {
        isInvalidPWD = false;
        isShowInvalidPWD = false;
      } else {
        isInvalidPWD = true;
        isShowInvalidPWD = false;
      }
    });

    const showToast = jest.fn();

    showToast.mockImplementation(params => {
      Toast.show({
        text1: params.title,
        text2: params.content,
        type: params.variant,
        position: 'top',
      });
    });

    const urlAPI = {
      apiLogin: '/auth/login',
    };

    onLogin.mockImplementation(async account => {
      await Keyboard.dismiss();

      const ACCOUNT = {
        id: account.id,
        password: account.password,
      };

      handleValidateUserCode();
      handleValidatePassword();

      if (isShowInvalidUserID === false && isShowInvalidPWD === false) {
        dispatch(setLoading(true));

        isShowInvalidUserID = false;
        isShowInvalidPWD = false;

        try {
          const response = await postLogin(
            Config.URL_DOMAIN_CLOUD,
            urlAPI.apiLogin,
            ACCOUNT,
            '',
          );

          if (response.status === 200) {
            const DATA = response.data.data.profile;
            const TOKEN = response.data.data.access_token;

            const RES_PROFILE = {
              id: DATA.id,
              uuid: DATA.uuid,
              name: DATA.name,
              email: DATA.email,
              role: DATA.role,
              department_code: DATA.department_code,
              supervisor_email: DATA.supervisor_email,
            };

            dispatch(setProfile(RES_PROFILE));
            await SecureStore.setItemAsync(
              'PROFILE',
              JSON.stringify(RES_PROFILE),
            );

            dispatch(setToken(TOKEN));
            await SecureStore.setItemAsync('TOKEN', TOKEN);
          } else {
            showToast({
              variant: 'warning',
              title: '警告',
              content: 'サインインに失敗しました。',
            });
          }
        } catch (error) {
          console.log(error.response);

          showToast({
            variant: 'error',
            title: 'エラー',
            content: error.response.data.message,
          });
        }
      }

      dispatch(setLoading(false));
    });

    const userIDInput = getByTestId('userIDInput');
    expect(userIDInput).toBeTruthy();

    const passwordInput = getByTestId('passwordInput');
    expect(passwordInput).toBeTruthy();

    const loginButton = getByTestId('buttonLogin');
    expect(loginButton).toBeTruthy();

    await waitFor(() => {
      fireEvent.changeText(userIDInput, '111111');
      fireEvent.changeText(passwordInput, '123456789');

      fireEvent.press(loginButton);

      expect(onLogin).toHaveBeenCalled();

      expect(userIDInput.props.value).toBe('111111');
      expect(passwordInput.props.value).toBe('123456789');

      expect(handleValidateUserCode).toHaveBeenCalled();

      expect(handleValidatePassword).toHaveBeenCalled();

      expect(isInvalidUserID).toBe(false);
      expect(isShowInvalidUserID).toBe(false);

      expect(isInvalidPWD).toBe(false);
      expect(isShowInvalidPWD).toBe(false);

      currentScreen = 'DashboardScreen';

      expect(currentScreen).toBe('DashboardScreen');
    });

    afterEach(cleanup);
  });
});
