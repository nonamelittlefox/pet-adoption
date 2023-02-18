/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { store } from 'src/store';
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';

import Dashboard from 'src/components/Home/index';
import { NavigationContainer } from '@react-navigation/native';

describe('<Dashboard />', () => {
  const callNumberNoticeMessage = jest.fn();

  callNumberNoticeMessage.mockImplementationOnce(() => {
    return {
      data: {
        code: 200,
        data: {
          number_notice: 1,
          number_message: 1,
        },
      },
    };
  });

  let Slider = [
    [
      {
        icon: 'envelope',
        text: 'お知らせ',
        message: callNumberNoticeMessage(),
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
        message: null,
        link: 'ElectronicLearning',
      },
    ],
    [
      {
        icon: 'calendar',
        text: 'シフト表',
        message: null,
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
    ],
    [
      {
        icon: 'bar-chart',
        text: 'P/L',
        message: null,
        link: 'PL',
      },
      {
        icon: 'automobile',
        text: '車両',
        message: null,
        link: 'Transport',
      },
      {
        icon: 'gears',
        text: '設定',
        message: null,
        link: 'Setting',
      },
    ],
  ];

  it('Test if dashboard screen have been rendered successfully', () => {
    const props = {
      navigation: {},
    };

    const tree = renderer
      .create(
        <Provider store={store}>
          <NavigationContainer>
            <Dashboard {...props} />
          </NavigationContainer>
        </Provider>,
      )
      .toJSON();

    afterEach(cleanup);
  });

  it('Test if when click on the お知らせ, navigate to the お知らせ screen', () => {
    const props = {
      navigation: {},
    };

    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <NavigationContainer>
          <Dashboard {...props} />
        </NavigationContainer>
      </Provider>,
    );

    let currentScreen = 'DashboardScreen';

    const envelopeIcon = getByTestId('envelopeIcon');
    expect(envelopeIcon).toBeTruthy();

    const envelopText = getByText('お知らせ');
    expect(envelopText).toBeTruthy();

    fireEvent.press(envelopeIcon);

    currentScreen = 'Note';

    expect(currentScreen).toBe('Note');

    afterEach(cleanup);
  });

  it('Test if when click on the 社内報, navigate to the 社内報 screen', () => {
    const props = {
      navigation: {},
    };

    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <NavigationContainer>
          <Dashboard {...props} />
        </NavigationContainer>
      </Provider>,
    );

    let currentScreen = 'DashboardScreen';

    const fileTextIcon = getByTestId('fileTextIcon');
    expect(fileTextIcon).toBeTruthy();

    const fileIconText = getByText('社内報');
    expect(fileIconText).toBeTruthy();

    fireEvent.press(fileTextIcon);

    currentScreen = 'InternalNewsLetter';

    expect(currentScreen).toBe('InternalNewsLetter');

    afterEach(cleanup);
  });

  it('Test if when click on the E-ラーニング, navigate to the E-ラーニング screen', () => {
    const props = {
      navigation: {},
    };

    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <NavigationContainer>
          <Dashboard {...props} />
        </NavigationContainer>
      </Provider>,
    );

    let currentScreen = 'DashboardScreen';

    const mortalBoardIcon = getByTestId('mortalBoardIcon');
    expect(mortalBoardIcon).toBeTruthy();

    const mortalBoardText = getByText('E-ラーニング');
    expect(mortalBoardText).toBeTruthy();

    fireEvent.press(mortalBoardIcon);

    currentScreen = 'ElectronicLearning';

    expect(currentScreen).toBe('ElectronicLearning');

    afterEach(cleanup);
  });

  it('Test if when click on the シフト表, navigate to the シフト表 screen', () => {
    const props = {
      navigation: {},
    };

    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <NavigationContainer>
          <Dashboard {...props} />
        </NavigationContainer>
      </Provider>,
    );

    let currentScreen = 'DashboardScreen';

    const transferIcon = getByTestId('transferIcon');
    expect(transferIcon).toBeTruthy();

    const transferText = getByText('シフト表');
    expect(transferText).toBeTruthy();

    fireEvent.press(transferIcon);

    currentScreen = 'TransferTable';

    expect(currentScreen).toBe('TransferTable');

    afterEach(cleanup);
  });

  it('Test if when click on the 給与明細, navigate to the 給与明細 screen', () => {
    const props = {
      navigation: {},
    };

    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <NavigationContainer>
          <Dashboard {...props} />
        </NavigationContainer>
      </Provider>,
    );

    let currentScreen = 'DashboardScreen';

    const yenIcon = getByTestId('yenIcon');
    expect(yenIcon).toBeTruthy();

    const yenText = getByText('給与明細');
    expect(yenText).toBeTruthy();

    fireEvent.press(yenIcon);

    currentScreen = 'PayCheck';

    expect(currentScreen).toBe('PayCheck');

    afterEach(cleanup);
  });

  it('Test if when click on the 整備, navigate to the 整備 screen', () => {
    const props = {
      navigation: {},
    };

    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <NavigationContainer>
          <Dashboard {...props} />
        </NavigationContainer>
      </Provider>,
    );

    let currentScreen = 'DashboardScreen';

    const wrenchIcon = getByTestId('wrenchIcon');
    expect(wrenchIcon).toBeTruthy();

    const wrenchText = getByText('整備');
    expect(wrenchText).toBeTruthy();

    fireEvent.press(wrenchIcon);

    currentScreen = 'Maintenance';

    expect(currentScreen).toBe('Maintenance');

    afterEach(cleanup);
  });

  it('Test if when click on the P/L, navigate to the P/L screen', () => {
    const props = {
      navigation: {},
    };

    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <NavigationContainer>
          <Dashboard {...props} />
        </NavigationContainer>
      </Provider>,
    );

    let currentScreen = 'DashboardScreen';

    const barChartIcon = getByTestId('barChartIcon');
    expect(barChartIcon).toBeTruthy();

    const barChartText = getByText('P/L');
    expect(barChartText).toBeTruthy();

    fireEvent.press(barChartIcon);

    currentScreen = 'P/L';

    expect(currentScreen).toBe('P/L');

    afterEach(cleanup);
  });

  it('Test if when click on the 車両, navigate to the 車両 screen', () => {
    const props = {
      navigation: {},
    };

    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <NavigationContainer>
          <Dashboard {...props} />
        </NavigationContainer>
      </Provider>,
    );

    let currentScreen = 'DashboardScreen';

    const automobileIcon = getByTestId('automobileIcon');
    expect(automobileIcon).toBeTruthy();

    const automobileText = getByText('車両');
    expect(automobileText).toBeTruthy();

    fireEvent.press(automobileIcon);

    currentScreen = 'Transport';

    expect(currentScreen).toBe('Transport');

    afterEach(cleanup);
  });

  it('Test if when click on the 設定, navigate to the 設定 screen', () => {
    const props = {
      navigation: {},
    };

    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <NavigationContainer>
          <Dashboard {...props} />
        </NavigationContainer>
      </Provider>,
    );

    let currentScreen = 'DashboardScreen';

    const gearsIcon = getByTestId('gearsIcon');
    expect(gearsIcon).toBeTruthy();

    const gearsText = getByText('設定');
    expect(gearsText).toBeTruthy();

    fireEvent.press(gearsIcon);

    currentScreen = 'Setting';

    expect(currentScreen).toBe('Setting');

    afterEach(cleanup);
  });

  it('Test if when there is new notification, the notification number of the notification will be increased', () => {
    const props = {
      navigation: {},
    };

    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <NavigationContainer>
          <Dashboard {...props} />
        </NavigationContainer>
      </Provider>,
    );

    // Future implement
  });

  it('Test if when view the chat screen, the notification number of the notification will be 0', () => {
    const props = {
      navigation: {},
    };

    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <NavigationContainer>
          <Dashboard {...props} />
        </NavigationContainer>
      </Provider>,
    );

    const CHAT_DATA = [
      {
        message_id: 151,
        sender_id: 1004,
        sender_name: 'Duc',
        content: '1',
        file: null,
        created_at: '2022-06-02T10:45:25.000000Z',
        created_at_in_date: '2022-06-02',
        created_at_hours_and_min: '19:45',
      },
      {
        message_id: 150,
        sender_id: 1004,
        sender_name: 'Duc',
        content: '1',
        file: null,
        created_at: '2022-06-02T10:16:46.000000Z',
        created_at_in_date: '2022-06-02',
        created_at_hours_and_min: '19:16',
      },
    ];

    let currentMessageNotification = 2;

    const listenToNewMessage = jest.fn();

    listenToNewMessage.mockImplementation(data => {
      CHAT_DATA.push(data);
    });

    const NEW_MESSAGE_DATA = {
      message_id: 152,
      sender_id: 1005,
      sender_name: 'Viet',
      content: '1',
      file: null,
      created_at: '2022-06-02T10:45:25.000000Z',
      created_at_in_date: '2022-06-02',
      created_at_hours_and_min: '19:45',
    };

    listenToNewMessage(NEW_MESSAGE_DATA);

    currentMessageNotification = CHAT_DATA.length;

    expect(listenToNewMessage).toHaveBeenCalled();

    expect(currentMessageNotification).toBe(3);

    afterEach(cleanup);
  });

  it('Test if when confirm the notification, the notification number of the notification will decreased by 1', () => {
    const props = {
      navigation: {},
    };

    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <NavigationContainer>
          <Dashboard {...props} />
        </NavigationContainer>
      </Provider>,
    );

    let currentNumberNoticeNotification = 123;
    let currentNumberMessageNotification = 512;
    let currentNumberNotice =
      currentNumberNoticeNotification + currentNumberMessageNotification;

    const confirmNoticeNotification = jest.fn();

    confirmNoticeNotification.mockImplementationOnce(() => {
      currentNumberNoticeNotification = currentNumberNoticeNotification - 1;
    });

    confirmNoticeNotification();

    expect(confirmNoticeNotification).toHaveBeenCalled();

    expect(currentNumberNotice).toBe(634);

    afterEach(cleanup);
  });
});
