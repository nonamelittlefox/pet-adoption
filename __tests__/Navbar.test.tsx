/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { store } from 'src/store';
import { NavigationContainer } from '@react-navigation/native';
import { Config } from 'src/const';
import { postTokenFCM } from 'src/api/modules/message';
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
  // screen,
} from '@testing-library/react-native';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';

import Navbar from 'src/components/Navbar/index';

describe('<Navbar />', () => {
  it('Test if nav bar component have been rendered successfully', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <NavigationContainer>
            <Navbar />
          </NavigationContainer>
        </Provider>,
      )
      .toJSON();

    afterEach(cleanup);
  });

  it('Test if button menu is render successfully', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <NavigationContainer>
          <Navbar />
        </NavigationContainer>
      </Provider>,
    );

    const buttonMenu = getByTestId('buttonMenu');
    expect(buttonMenu).toBeTruthy();

    const buttonMenuText = getByText('Menu');
    expect(buttonMenuText).toBeTruthy();

    afterEach(cleanup);
  });

  it('Test if button logout is render successfully', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <NavigationContainer>
          <Navbar />
        </NavigationContainer>
      </Provider>,
    );

    const buttonLogiut = getByTestId('buttonLogout');
    expect(buttonLogiut).toBeTruthy();

    const buttonLogoutText = getByText('Logout');
    expect(buttonLogoutText).toBeTruthy();

    afterEach(cleanup);
  });

  it('Test if the logo is render successfully', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <NavigationContainer>
          <Navbar />
        </NavigationContainer>
      </Provider>,
    );

    const logo = getByTestId('logo');
    expect(logo).toBeTruthy();

    const logoText = getByText('IZUMI');
    expect(logoText).toBeTruthy();

    afterEach(cleanup);
  });

  it('Test if click on the menu button show the menu list', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <NavigationContainer>
          <Navbar />
        </NavigationContainer>
      </Provider>,
    );

    const dispatch = useDispatch();

    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    let isShowSidebar = false;

    const onToggle = jest.fn();

    onToggle.mockImplementationOnce(() => {
      navigation.dispatch(DrawerActions.toggleDrawer());
    });

    const buttonMenu = getByTestId('buttonMenu');
    expect(buttonMenu).toBeTruthy();

    fireEvent.press(buttonMenu);

    onToggle();

    isShowSidebar = true;

    expect(onToggle).toHaveBeenCalled();

    expect(isShowSidebar).toBe(true);

    afterEach(cleanup);
  });

  it('Test if the menu list have been rendered correctly', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <NavigationContainer>
          <Navbar />
        </NavigationContainer>
      </Provider>,
    );

    const dispatch = useDispatch();

    let MENU_LIST = [];

    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    let isShowSidebar = false;

    const onToggle = jest.fn();

    onToggle.mockImplementationOnce(() => {
      navigation.dispatch(DrawerActions.toggleDrawer());

      MENU_LIST = [
        {
          icon: 'envelope',
          text: 'お知らせ',
          message: '1',
          link: 'Note',
        },
        {
          icon: 'file-text',
          text: '社内報',
          message: null,
          link: 'InternalNewsLetter',
        },
        {
          icon: 'mortar-board',
          text: 'E-ラーニング',
          message: '25',
          link: 'ElectronicLearning',
        },
        {
          icon: 'calendar',
          text: 'シフト表',
          message: '5',
          link: 'TransferTable',
        },
        {
          icon: 'yen',
          text: '給与明細',
          message: null,
          link: 'PayCheck',
        },
        {
          icon: 'wrench',
          text: '整備',
          message: null,
          link: 'Maintenance',
        },
        {
          icon: 'bar-chart',
          text: 'P/L',
          message: null,
          link: 'PL',
        },
        {
          icon: 'automobile',
          text: '車両',
          message: '10',
          link: 'Transport',
        },
        {
          icon: 'gears',
          text: '設定',
          message: null,
          link: 'Setting',
        },
      ];
    });

    const buttonMenu = getByTestId('buttonMenu');
    expect(buttonMenu).toBeTruthy();

    fireEvent.press(buttonMenu);

    onToggle();

    isShowSidebar = true;

    expect(onToggle).toHaveBeenCalled();

    expect(isShowSidebar).toBe(true);

    expect(MENU_LIST).toEqual([
      {
        icon: 'envelope',
        text: 'お知らせ',
        message: '1',
        link: 'Note',
      },
      {
        icon: 'file-text',
        text: '社内報',
        message: null,
        link: 'InternalNewsLetter',
      },
      {
        icon: 'mortar-board',
        text: 'E-ラーニング',
        message: '25',
        link: 'ElectronicLearning',
      },
      {
        icon: 'calendar',
        text: 'シフト表',
        message: '5',
        link: 'TransferTable',
      },
      {
        icon: 'yen',
        text: '給与明細',
        message: null,
        link: 'PayCheck',
      },
      {
        icon: 'wrench',
        text: '整備',
        message: null,
        link: 'Maintenance',
      },
      {
        icon: 'bar-chart',
        text: 'P/L',
        message: null,
        link: 'PL',
      },
      {
        icon: 'automobile',
        text: '車両',
        message: '10',
        link: 'Transport',
      },
      {
        icon: 'gears',
        text: '設定',
        message: null,
        link: 'Setting',
      },
    ]);

    afterEach(cleanup);
  });

  it('Test if call function logout when click on the logout button', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <NavigationContainer>
          <Navbar />
        </NavigationContainer>
      </Provider>,
    );

    const onLogout = jest.fn();

    let tokenFCM =
      'Z4Au8tjsLkfL3u+4uNWZr+7dblegCgYIKoZIzj0DAQehRANCAASzarSn/hyuRfx9';

    const URL_API = {
      postTokenFCM: '/user/save-token-fcm',
    };

    onLogout.mockImplementation(async () => {
      try {
        const SITE = Config.URL_DOMAIN_IZUMI_WEB_APP;
        const URL = URL_API.postTokenFCM;
        const DATA = {
          token: tokenFCM,
          isLogOut: 1,
        };

        const res = await postTokenFCM(SITE, URL, DATA);

        console.log('REMOVE TOKEN FCM ===========> ', res.data);

        const Profile = {
          id: null,
          uuid: null,
          name: '',
          email: '',
          role: '',
          department_code: '',
          supervisor_email: '',
        };
      } catch (error) {
        // console.log(error);
      }
    });

    const buttonLogout = getByTestId('buttonLogout');
    expect(buttonLogout).toBeTruthy();

    fireEvent.press(buttonLogout);

    await waitFor(() => {
      onLogout();
    });

    expect(onLogout).toHaveBeenCalled();

    afterEach(cleanup);
  });
});
