/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import renderer from 'react-test-renderer';
import Toast from 'react-native-toast-message';
import ForgotPasswordScreen from 'src/screens/ForgotPasswordScreen';

import { Keyboard } from 'react-native';
import { Provider } from 'react-redux';
import { store } from 'src/store';
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import { postResetPassword } from 'src/api/modules/reset-password';
import { cleanObject } from 'src/utils/handleObject';
import { object2Path } from 'src/utils/object2Path';
import { Config, Validate } from 'src/const';

describe('<ForgotPasswordScreen />', () => {
  const urlAPI = {
    apiResetPassword: '/remind-passwords',
  };

  const props = {
    navigation: {},
  };

  const showToast = jest.fn();

  showToast.mockImplementation(params => {
    Toast.show({
      text1: params.title,
      text2: params.content,
      type: params.variant,
      position: 'top',
    });
  });

  let currentScreen = 'ForgotPasswordScreen';

  const nonNumericRegex = /^[1-9][0-9]*$/;

  const re =
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  it('Test if sign up screen have been rendered successfully', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ForgotPasswordScreen {...props} />
        </Provider>,
      )
      .toJSON();

    afterEach(cleanup);
  });

  it('Test if validate when leave the user ID empty or wrong format when click on forgot password button', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <ForgotPasswordScreen {...props} />
      </Provider>,
    );

    let isValideUserCode = false;

    const onForgotPassword = jest.fn();

    onForgotPassword.mockImplementationOnce(async () => {
      Keyboard.dismiss();

      const DATA = {
        emp_code: '',
      };

      handleValidateUserCode();

      if (isValideUserCode === true) {
        try {
          const response = await postResetPassword(
            Config.URL_DOMAIN_CLOUD,
            urlAPI.apiResetPassword,
            DATA,
            '',
          );

          if (response.status === 200) {
            currentScreen === 'ForgotPasswordScreen';
          } else {
            currentScreen === 'NotifyResetPasswordScreen';
          }
        } catch (error) {
          showToast({
            variant: 'error',
            title: 'エラー',
            content: error.response.data.message,
          });
        }
      }
    });

    const handleValidateUserCode = jest.fn();

    handleValidateUserCode.mockImplementationOnce(user_code => {
      if (user_code === '') {
        isValideUserCode = false;
      } else if (!nonNumericRegex.test(user_code)) {
        isValideUserCode = false;
      } else {
        isValideUserCode = true;
      }
    });

    const buttonForgotPassword = getByTestId('buttonForgotPassword');
    expect(buttonForgotPassword).toBeTruthy();

    expect(buttonForgotPassword).toHaveProperty(
      'props.title',
      'パスワード再発行',
    );

    fireEvent.press(buttonForgotPassword);

    onForgotPassword();

    expect(onForgotPassword).toHaveBeenCalled();
    expect(handleValidateUserCode).toHaveBeenCalled();

    expect(isValideUserCode).toBe(false);

    expect(showToast).toHaveBeenCalled();

    expect(currentScreen).toBe('ForgotPasswordScreen');
  });

  it('Test if call function forgot password when click on the forgot password button', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <ForgotPasswordScreen {...props} />
      </Provider>,
    );

    let isValideUserCode = false;

    const onForgotPassword = jest.fn();

    onForgotPassword.mockImplementationOnce(async () => {
      Keyboard.dismiss();

      const DATA = {
        emp_code: '111111',
      };

      handleValidateUserCode();

      if (isValideUserCode === true) {
        try {
          const response = await postResetPassword(
            Config.URL_DOMAIN_CLOUD,
            urlAPI.apiResetPassword,
            DATA,
            '',
          );

          if (response.status === 200) {
            currentScreen === 'NotifyResetPasswordScreen';
          } else {
            currentScreen === 'ForgotPasswordScreen';
          }
        } catch (error) {
          showToast({
            variant: 'error',
            title: 'エラー',
            content: error.response.data.message,
          });
        }
      }
    });

    const handleValidateUserCode = jest.fn();

    handleValidateUserCode.mockImplementationOnce(user_code => {
      if (user_code === '') {
        isValideUserCode = false;
      } else if (!nonNumericRegex.test(user_code)) {
        isValideUserCode = false;
      } else {
        isValideUserCode = true;
      }
    });

    const buttonForgotPassword = getByTestId('buttonForgotPassword');
    expect(buttonForgotPassword).toBeTruthy();

    expect(buttonForgotPassword).toHaveProperty(
      'props.title',
      'パスワード再発行',
    );

    fireEvent.press(buttonForgotPassword);

    onForgotPassword();
    expect(onForgotPassword).toHaveBeenCalled();

    expect(handleValidateUserCode).toHaveBeenCalled();

    expect(isValideUserCode).toBe(true);

    expect(showToast).not.toHaveBeenCalled();

    expect(currentScreen).toBe('NotifyResetPasswordScreen');
  });
});
