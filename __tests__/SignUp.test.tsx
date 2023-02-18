/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import renderer from 'react-test-renderer';
import Toast from 'react-native-toast-message';
import SignUpScreen from 'src/screens/SignUpScreen';

import { Keyboard } from 'react-native';
import { Provider } from 'react-redux';
import { store } from 'src/store';
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import { postRegister } from 'src/api/modules/register';
import { Config, Validate } from 'src/const';

describe('<SignUpScreen />', () => {
  const urlAPI = {
    apiRegister: '/register-account',
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

  let currentScreen = 'SignUpScreen';

  const nonNumericRegex = /^[1-9][0-9]*$/;

  const re =
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  it('Test if sign up screen have been rendered successfully', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <SignUpScreen {...props} />
        </Provider>,
      )
      .toJSON();

    afterEach(cleanup);
  });

  it('Test if validate when leave the user ID empty or wrong format when click on sign up button', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <SignUpScreen {...props} />
      </Provider>,
    );

    let isValideUserCode = false;

    const onSignUp = jest.fn();

    onSignUp.mockImplementationOnce(async () => {
      Keyboard.dismiss();

      const DATA = {
        user_code: '',
        email: 'hathaiviet411@gmail.com',
      };

      handleValidateUserCode();

      if (isValideUserCode === true) {
        try {
          const response = await postRegister(
            Config.URL_DOMAIN_CLOUD,
            urlAPI.apiRegister,
            DATA,
            '',
          );

          if (response.status === 200) {
            currentScreen === 'MessageSignUpScreen';
          } else {
            currentScreen === 'SignUpScreen';
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

    const buttonSignUp = getByTestId('buttonSignUp');
    expect(buttonSignUp).toBeTruthy();

    expect(buttonSignUp).toHaveProperty('props.title', '登録');

    fireEvent.press(buttonSignUp);

    onSignUp();

    expect(onSignUp).toHaveBeenCalled();
    expect(handleValidateUserCode).toHaveBeenCalled();

    expect(isValideUserCode).toBe(false);

    expect(showToast).toHaveBeenCalled();

    expect(currentScreen).toBe('SignUpScreen');
  });

  it('Test if validate when leave the email empty or wrong format when click on sign up button', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <SignUpScreen {...props} />
      </Provider>,
    );

    let isValidEmail = false;

    const onSignUp = jest.fn();

    onSignUp.mockImplementationOnce(async () => {
      Keyboard.dismiss();

      const DATA = {
        user_code: '111111',
        email: '',
      };

      handleValidateEmail();

      if (isValidEmail === true) {
        try {
          const response = await postRegister(
            Config.URL_DOMAIN_CLOUD,
            urlAPI.apiRegister,
            DATA,
            '',
          );

          if (response.status === 200) {
            currentScreen === 'MessageSignUpScreen';
          } else {
            currentScreen === 'SignUpScreen';
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

    const handleValidateEmail = jest.fn();

    handleValidateEmail.mockImplementationOnce(email => {
      if (email === '') {
        isValidEmail = false;
      } else if (!re.test(email)) {
        isValidEmail = false;
      } else {
        isValidEmail = true;
      }
    });

    const buttonSignUp = getByTestId('buttonSignUp');
    expect(buttonSignUp).toBeTruthy();

    expect(buttonSignUp).toHaveProperty('props.title', '登録');

    fireEvent.press(buttonSignUp);

    onSignUp();

    expect(onSignUp).toHaveBeenCalled();
    expect(handleValidateEmail).toHaveBeenCalled();

    expect(isValidEmail).toBe(false);

    expect(showToast).toHaveBeenCalled();

    expect(currentScreen).toBe('SignUpScreen');
  });

  it('Test if call function sign up when click on the sign up button', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <SignUpScreen {...props} />
      </Provider>,
    );

    let isValideUserCode = false;
    let isValidEmail = false;

    const onSignUp = jest.fn();

    onSignUp.mockImplementationOnce(async () => {
      Keyboard.dismiss();

      const DATA = {
        user_code: '111111',
        email: 'hathaiviet411@gmail.com',
      };

      handleValidateUserCode();
      handleValidateEmail();

      if (isValideUserCode === true) {
        try {
          const response = await postRegister(
            Config.URL_DOMAIN_CLOUD,
            urlAPI.apiRegister,
            DATA,
            '',
          );

          if (response.status === 200) {
            currentScreen === 'MessageSignUpScreen';
          } else {
            currentScreen === 'SignUpScreen';
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

    const handleValidateEmail = jest.fn();

    handleValidateEmail.mockImplementationOnce(email => {
      if (email === '') {
        isValidEmail = false;
      } else if (!re.test(email)) {
        isValidEmail = false;
      } else {
        isValidEmail = true;
      }
    });

    const buttonSignUp = getByTestId('buttonSignUp');
    expect(buttonSignUp).toBeTruthy();

    expect(buttonSignUp).toHaveProperty('props.title', '登録');

    fireEvent.press(buttonSignUp);

    onSignUp();

    expect(onSignUp).toHaveBeenCalled();

    expect(handleValidateUserCode).toHaveBeenCalled();
    expect(handleValidateEmail).toHaveBeenCalled();

    expect(isValideUserCode).toBe(true);

    expect(isValidEmail).toBe(true);

    expect(showToast).not.toHaveBeenCalled();

    expect(currentScreen).toBe('MessageSignUpScreen');
  });
});
