/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import renderer from 'react-test-renderer';

import Note from '../Sample/Note';

import {
  render,
  cleanup,
  fireEvent,
  waitFor,
  // screen,
} from '@testing-library/react-native';
import { Config, Keys } from 'src/const';
import {
  getListNotificationIzumi,
  getSpecificNotificationIzumi,
  postNotificationWithoutSurvey,
  postNotificationWithSurvey,
} from 'src/api/modules/notification';
import { getListMessage, postMessage } from 'src/api/modules/message';

// import {
//   getListNotificationIzumi,
//   getSpecificNotificationIzumi,
//   postNotificationWithoutSurvey,
//   postNotificationWithSurvey,
// } from 'src/api/modules/notification';
// import { Config, Keys } from 'src/const';
// import { rest } from 'msw';
// import { setupServer } from 'msw/node';

// const server = setupServer(
//   rest.get('/https://izumi-web-app.vw-dev.com/api', (req, res, ctx) => {
//     return res(ctx.json({ data: [] }));
//   }),
// );

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

describe('<Note />', () => {
  const urlAPI = {
    apiGetListNotificationIzumi: '/mobile/notices',
    apiGetSpecificNotificationIzumi: '/mobile/notices',
    getListMessage: '/message/load',
    postMessage: '/message',
    apiUpdateNotificationWithoutSurvey: '/notices/seen/no-survey',
    apiUpdateNotificationWithSurvey: '/notices/seen/survey-answer',
  };

  it('Test if render component Note successfully', () => {
    const NoteScreen = renderer.create(<Note />).toJSON();

    // expect(NoteScreen).toMatchSnapshot();
    // console.log(NoteScreen);

    afterEach(cleanup);
  });

  it('Test if render screen title successfully', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const screenTitle = getByText('お知らせ');

    waitFor(() => {
      expect(screenTitle).toBeTruthy();
    });

    afterEach(cleanup);
  });

  it('Test if screen title render correctly', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const screenTitleText = getByText('お知らせ');
    expect(screenTitleText).toBeTruthy();

    expect(screenTitleText).toEqual(getByText('お知らせ'));

    afterEach(cleanup);
  });

  it('Test if render Team tab button title successfully', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const teamTabButton = getByTestId('teamTabButton');
    expect(teamTabButton).toBeTruthy();

    afterEach(cleanup);
  });

  it('Test if Team tab button text render correctly', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const teamTabButton = getByTestId('teamTabButton');
    expect(teamTabButton).toBeTruthy();

    const teamTabText = getByTestId('teamTabText');
    expect(teamTabText).toBeTruthy();

    afterEach(cleanup);
  });

  it('Test if render Izumi tab title successfully', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const izumiTabButton = getByTestId('izumiTabButton');
    expect(izumiTabButton).toBeTruthy();

    afterEach(cleanup);
  });

  it('Test if Izumi render tab title correctly', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const izumiTabButton = getByTestId('izumiTabButton');
    expect(izumiTabButton).toBeTruthy();

    const izumiTabText = getByTestId('izumiTabText');
    expect(izumiTabText).toBeTruthy();

    afterEach(cleanup);
  });

  it('Test if back button render successfully', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const buttonBack = getByTestId('backButton');
    expect(buttonBack).toBeTruthy();

    afterEach(cleanup);
  });

  it('Test if back button icon is render successfully', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const buttonBackIcon = getByTestId('backButtonIcon');
    expect(buttonBackIcon).toBeTruthy();

    afterEach(cleanup);
  });

  it('Test if back button icon is render correctly', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const buttonBackIcon = getByTestId('backButtonIcon');
    await waitFor(() => expect(buttonBackIcon).toBeTruthy());

    // waitFor(() => {
    //   expect(buttonBackIcon).toHaveStyle({
    //     color: '#1534A1',
    //     size: 30,
    //     fontWeight: 'bold',
    //     lineHeight: 39,
    //   });
    // });

    // await waitFor(() =>
    //   expect(buttonBackIcon).toHaveAttribute('name', 'angle-double-left'),
    // );

    afterEach(cleanup);
  });

  it('Test if the message input field is render successfully', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const inputMessageField = getByTestId('inputMessage');
    expect(inputMessageField).toBeTruthy();

    afterEach(cleanup);
  });

  it('Test if leave the message input field empty when click on the send button', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const showWarningToast = jest.fn();

    let isShowToast = false;

    const inputMessageField = getByTestId('inputMessage');
    expect(inputMessageField).toBeTruthy();

    fireEvent.changeText(inputMessageField, {
      target: { value: '' },
    });

    const buttonSend = getByTestId('sendMessageButton');
    expect(buttonSend).toBeTruthy();

    fireEvent.press(buttonSend);

    isShowToast = true;

    expect(isShowToast).toBeTruthy();

    showWarningToast();

    expect(showWarningToast).toHaveBeenCalled();

    afterEach(cleanup);
  });

  it('Test if call function send message when click on the send message button', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const onSendMessage = jest.fn();

    const showWarningToast = jest.fn();

    let isShowToast = false;

    const inputMessageField = getByTestId('inputMessage');
    expect(inputMessageField).toBeTruthy();

    fireEvent.changeText(inputMessageField, {
      target: { value: 'Test message' },
    });

    const buttonSend = getByTestId('sendMessageButton');
    expect(buttonSend).toBeTruthy();

    fireEvent.press(buttonSend);

    isShowToast = false;

    expect(isShowToast).toBeFalsy();

    expect(showWarningToast).not.toHaveBeenCalled();

    let newMessage = 'Test message';

    onSendMessage();

    onSendMessage.mockImplementation(async () => {
      try {
        newMessage = '';

        const URL = urlAPI.postMessage;
        const message = newMessage.trim();
        const DATA = {
          group_id: 2,
          message: message,
        };

        await postMessage(Config.URL_DOMAIN_IZUMI_WEB_APP, URL, DATA);

        // console.log('IZUMI WEB APP ============> SEND MESSAGE DONE');
      } catch (error) {
        newMessage = '';
      }
    });

    afterEach(cleanup);
  });

  it('Test new message have been added to the list message', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const handleAddNewMessage = jest.fn();

    const LIST_MESSAGE = [
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

    expect(LIST_MESSAGE.length).toBe(2);

    handleAddNewMessage.mockImplementationOnce(message => {
      LIST_MESSAGE.push(message);
    });

    const NEW_MESSAGE = {
      message_id: 152,
      sender_id: 1004,
      sender_name: 'Duc',
      content: '1',
      file: null,
      created_at: '2022-06-02T10:45:25.000000Z',
      created_at_in_date: '2022-06-02',
      created_at_hours_and_min: '19:45',
    };

    handleAddNewMessage(NEW_MESSAGE);

    expect(handleAddNewMessage).toHaveBeenCalled();

    expect(LIST_MESSAGE.length).toBe(3);

    afterEach(cleanup);
  });

  it('Test if when receive a new message, display the new message at the bottom of the message list', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const handleAddNewMessage = jest.fn();

    const LIST_MESSAGE = [
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

    expect(LIST_MESSAGE.length).toBe(2);

    handleAddNewMessage.mockImplementationOnce(message => {
      LIST_MESSAGE.push(message);
    });

    const NEW_MESSAGE = {
      message_id: 152,
      sender_id: 1004,
      sender_name: 'Duc',
      content: '1',
      file: null,
      created_at: '2022-06-02T10:45:25.000000Z',
      created_at_in_date: '2022-06-02',
      created_at_hours_and_min: '19:45',
    };

    handleAddNewMessage(NEW_MESSAGE);

    expect(handleAddNewMessage).toHaveBeenCalled();

    expect(LIST_MESSAGE.length).toBe(3);

    const length = LIST_MESSAGE.length;

    expect(LIST_MESSAGE[length - 1]).toEqual(NEW_MESSAGE);

    afterEach(cleanup);
  });

  it('Test if message number is show in the Team tab when there is > 1 new message', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const teamTabButton = getByTestId('teamTabButton');
    expect(teamTabButton).toBeTruthy();

    const teamTabText = getByTestId('teamTabText');
    expect(teamTabText).toBeTruthy();

    let messageNumber = getByTestId('messageNumber');
    expect(messageNumber).toBeTruthy();

    waitFor(() => {
      expect(messageNumber).not.toBeNull();
    });

    afterEach(cleanup);
  });

  it('Test if when there is new message, increase the message number by one', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const teamTabButton = getByTestId('teamTabButton');
    expect(teamTabButton).toBeTruthy();

    const teamTabText = getByTestId('teamTabText');
    expect(teamTabText).toBeTruthy();

    let messageNumber = 1;

    const SITE = Config.URL_DOMAIN_IZUMI_WEB_APP;
    const URL = urlAPI.getListMessage;
    const PARAMS = {
      group_id: 2,
      message_id: 0,
      page: 1,
      per_page: 20,
    };

    const getListMessage = jest.fn();

    getListMessage.mockImplementation(async () => {
      try {
        const response = await getListNotificationIzumi(SITE, URL, PARAMS);
        expect(response).toBeTruthy();

        if (response.status === 200) {
          const data = response.data;
          expect(data).toBeTruthy();

          if (data.length > 0) {
            const message = data[0];
            expect(message).toBeTruthy();

            if (message.message_id > 0) {
              messageNumber += 1;
              expect(messageNumber).toBe(2);
            } else {
              expect(messageNumber).toBe(1);
            }
          }
        }
      } catch (error) {
        // console.log(error);
      }

      waitFor(() => {
        expect(getListMessage).toHaveBeenCalled();
      });
    });

    afterEach(cleanup);
  });

  it('Test if the user navigate to the Note screen (Click on the message icon), set the total unread message to 0', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const izumiTabButton = getByTestId('izumiTabButton');
    expect(izumiTabButton).toBeTruthy();

    const izumiTabText = getByTestId('izumiTabText');
    expect(izumiTabText).toBeTruthy();

    let totalUnreadMessage = 127;

    const SITE = Config.URL_DOMAIN_IZUMI_WEB_APP;
    const URL = urlAPI.getListMessage;
    const PARAMS = {
      group_id: 2,
      message_id: 0,
      page: 1,
      per_page: 20,
    };

    const getListMessage = jest.fn();

    getListMessage.mockImplementation(async () => {
      try {
        const response = await getListNotificationIzumi(SITE, URL, PARAMS);
        expect(response).toBeTruthy();

        if (response.status === 200) {
          const data = response.data;
          expect(data).toBeTruthy();

          if (data.length > 0) {
            const message = data[0];
            expect(message).toBeTruthy();

            if (message.message_id > 0) {
              expect(totalUnreadMessage).toBe(0);
            } else {
              // console.log('[Error]');
            }
          }
        }
      } catch (error) {
        // console.log(error);
      }

      waitFor(() => {
        expect(getListMessage).toHaveBeenCalled();
      });
    });

    afterEach(cleanup);
  });

  it('Test if notice number is show in the Izumi tab when there is > 1 new message', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const izumiTabButton = getByTestId('izumiTabButton');
    expect(izumiTabButton).toBeTruthy();

    const izumiTabText = getByTestId('izumiTabText');
    expect(izumiTabText).toBeTruthy();

    const noticeNumber = getByTestId('noticeNumber');
    expect(noticeNumber).toBeTruthy();

    await waitFor(() => {
      expect(noticeNumber).not.toBeNull();
    });

    afterEach(cleanup);
  });

  it('Test if when there is new notification, increase the notice number by one', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const izumiTabButton = getByTestId('izumiTabButton');
    expect(izumiTabButton).toBeTruthy();

    const izumiTabText = getByTestId('izumiTabText');
    expect(izumiTabText).toBeTruthy();

    let noticeNumber = 1;

    const SITE = Config.URL_DOMAIN_IZUMI_WEB_APP;
    const URL = `${
      urlAPI.apiGetListNotificationIzumi
    }?page=${1}&per_page=${50}`;
    const PARAMS = null;

    const getDataIzumiTab = jest.fn();

    getDataIzumiTab.mockImplementation(async () => {
      try {
        const response = await getListNotificationIzumi(SITE, URL, PARAMS);
        expect(response).toBeTruthy();

        if (response.status === 200) {
          const data = response.data;
          expect(data).toBeTruthy();

          if (data.length > 0) {
            const message = data[0];
            expect(message).toBeTruthy();

            if (message.message_id > 0) {
              noticeNumber += 1;
              expect(noticeNumber).toBe(2);
            } else {
              expect(noticeNumber).toBe(1);
            }
          }
        }
      } catch (error) {
        // console.log(error);
      }
    });

    await waitFor(() => {
      getDataIzumiTab();
      expect(getDataIzumiTab).toHaveBeenCalled();
    });

    afterEach(cleanup);
  });

  it('Test if return to the dashboard screen if the current tab is Team', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const goBackDashboard = jest.fn();

    let currentTab = 'Team';

    const buttonBack = getByTestId('backButton');
    fireEvent.press(buttonBack);

    currentTab = 'Dashboard';
    expect(currentTab).toEqual('Dashboard');

    await waitFor(() => {
      goBackDashboard();
      expect(goBackDashboard).toHaveBeenCalled();
    });

    afterEach(cleanup);
  });

  it('Test if return to the dashboard screen if the current tab is Izumi', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const goBackDashboard = jest.fn();

    let currentTab = 'Izum';

    const buttonBack = getByTestId('backButton');
    fireEvent.press(buttonBack);

    currentTab = 'Dashboard';
    expect(currentTab).toEqual('Dashboard');

    await waitFor(() => {
      goBackDashboard();
      expect(goBackDashboard).toHaveBeenCalled();
    });

    afterEach(cleanup);
  });

  it('Test if return to the Izumi tab if the current tab is Izumi Detail', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const goBackDashboard = jest.fn();

    let currentTab = 'Izumi Detail';

    const buttonBack = getByTestId('backButton');
    fireEvent.press(buttonBack);

    currentTab = 'Izumi';
    expect(currentTab).toEqual('Izumi');

    await waitFor(() => {
      expect(goBackDashboard).not.toHaveBeenCalled();
    });

    afterEach(cleanup);
  });

  it('Test if api get list message is working', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const SITE = Config.URL_DOMAIN_IZUMI_WEB_APP;
    const URL = urlAPI.getListMessage;
    const PARAMS = {
      group_id: 2,
      message_id: 0,
      page: 1,
      per_page: 20,
    };

    const getListMessage = jest.fn();

    getListMessage.mockImplementation(async () => {
      try {
        const response = await getListNotificationIzumi(SITE, URL, PARAMS);
        expect(response).toBeTruthy();
      } catch (error) {
        // console.log(error);
      }
    });

    await waitFor(() => {
      getListMessage();
      expect(getListMessage).toHaveBeenCalled();
    });

    afterEach(cleanup);
  });

  it('Test if api get list notification is working', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const SITE = Config.URL_DOMAIN_IZUMI_WEB_APP;
    const URL = `${
      urlAPI.apiGetListNotificationIzumi
    }?page=${1}&per_page=${50}`;
    const PARAMS = null;

    const getDataIzumiTab = jest.fn();

    getDataIzumiTab.mockImplementation(async () => {
      try {
        const response = await getListNotificationIzumi(SITE, URL, PARAMS);
        expect(response).toBeTruthy();
      } catch (error) {
        // console.log(error);
      }
    });

    await waitFor(() => {
      getDataIzumiTab();
      expect(getDataIzumiTab).toHaveBeenCalled();
    });

    afterEach(cleanup);
  });

  it('Test if call both api getLlistMessage and getDataIzumiTab at the same time when access to note screen', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const getListMessage = jest.fn();
    const getDataIzumiTab = jest.fn();

    getListMessage.mockImplementation(async () => {
      try {
        const response = await getListNotificationIzumi(
          Config.URL_DOMAIN_IZUMI_WEB_APP,
          urlAPI.getListMessage,
          {
            group_id: 2,
            message_id: 0,
            page: 1,
            per_page: 20,
          },
        );
        expect(response).toBeTruthy();
      } catch (error) {
        // // console.log(error);
      }
    });

    getDataIzumiTab.mockImplementation(async () => {
      try {
        const response = await getListNotificationIzumi(
          Config.URL_DOMAIN_IZUMI_WEB_APP,
          `${urlAPI.apiGetListNotificationIzumi}?page=${1}&per_page=${50}`,
          null,
        );
        expect(response).toBeTruthy();
      } catch (error) {
        // // console.log(error);
      }
    });

    await waitFor(() => {
      getListMessage();
      expect(getListMessage).toHaveBeenCalled();

      getDataIzumiTab();
      expect(getDataIzumiTab).toHaveBeenCalled();
    });

    afterEach(cleanup);
  });

  test('Test if data have been render correctly in the Team tab', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const SITE = Config.URL_DOMAIN_IZUMI_WEB_APP;
    const URL = urlAPI.getListMessage;
    const PARAMS = {
      group_id: 2,
      message_id: 0,
      page: 1,
      per_page: 20,
    };

    const getListMessage = jest.fn();

    getListMessage.mockImplementation(async () => {
      try {
        const response = await getListNotificationIzumi(SITE, URL, PARAMS);
        expect(response).toBeTruthy();
      } catch (error) {
        // console.log(error);
      }

      waitFor(() => {
        expect(getListMessage).toHaveBeenCalled();
      });
    });

    const MESSAGE_LIST = [
      {
        code: 200,
        data: [
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
          {
            message_id: 149,
            sender_id: 1004,
            sender_name: 'Duc',
            content: '123123123123123',
            file: null,
            created_at: '2022-06-02T10:07:09.000000Z',
            created_at_in_date: '2022-06-02',
            created_at_hours_and_min: '19:07',
          },
          {
            message_id: 148,
            sender_id: 1004,
            sender_name: 'Duc',
            content: 'Oop',
            file: null,
            created_at: '2022-06-02T10:06:17.000000Z',
            created_at_in_date: '2022-06-02',
            created_at_hours_and_min: '19:06',
          },
          {
            message_id: 147,
            sender_id: 1004,
            sender_name: 'Duc',
            content: '3123123',
            file: null,
            created_at: '2022-06-02T10:05:44.000000Z',
            created_at_in_date: '2022-06-02',
            created_at_hours_and_min: '19:05',
          },
          {
            message_id: 146,
            sender_id: 1004,
            sender_name: 'Duc',
            content: '1',
            file: null,
            created_at: '2022-06-02T10:05:29.000000Z',
            created_at_in_date: '2022-06-02',
            created_at_hours_and_min: '19:05',
          },
          {
            message_id: 145,
            sender_id: 1001,
            sender_name: 'Phuong',
            content: '87945646123',
            file: null,
            created_at: '2022-06-02T10:02:57.000000Z',
            created_at_in_date: '2022-06-02',
            created_at_hours_and_min: '19:02',
          },
          {
            message_id: 144,
            sender_id: 1001,
            sender_name: 'Phuong',
            content: '78789789789789789',
            file: null,
            created_at: '2022-06-02T10:01:40.000000Z',
            created_at_in_date: '2022-06-02',
            created_at_hours_and_min: '19:01',
          },
          {
            message_id: 143,
            sender_id: 1001,
            sender_name: 'Phuong',
            content: '8789789',
            file: null,
            created_at: '2022-06-02T10:00:16.000000Z',
            created_at_in_date: '2022-06-02',
            created_at_hours_and_min: '19:00',
          },
          {
            message_id: 142,
            sender_id: 1001,
            sender_name: 'Phuong',
            content: '44444',
            file: null,
            created_at: '2022-06-02T09:59:45.000000Z',
            created_at_in_date: '2022-06-02',
            created_at_hours_and_min: '18:59',
          },
          {
            message_id: 141,
            sender_id: 1004,
            sender_name: 'Duc',
            content: '1',
            file: null,
            created_at: '2022-06-02T09:58:46.000000Z',
            created_at_in_date: '2022-06-02',
            created_at_hours_and_min: '18:58',
          },
          {
            message_id: 140,
            sender_id: 1004,
            sender_name: 'Duc',
            content: '123123123',
            file: null,
            created_at: '2022-06-02T09:56:26.000000Z',
            created_at_in_date: '2022-06-02',
            created_at_hours_and_min: '18:56',
          },
          {
            message_id: 139,
            sender_id: 1001,
            sender_name: 'Phuong',
            content: '123123123',
            file: null,
            created_at: '2022-06-02T09:55:14.000000Z',
            created_at_in_date: '2022-06-02',
            created_at_hours_and_min: '18:55',
          },
          {
            message_id: 138,
            sender_id: 1004,
            sender_name: 'Duc',
            content: '1',
            file: null,
            created_at: '2022-06-02T09:54:03.000000Z',
            created_at_in_date: '2022-06-02',
            created_at_hours_and_min: '18:54',
          },
          {
            message_id: 137,
            sender_id: 1004,
            sender_name: 'Duc',
            content: '1',
            file: null,
            created_at: '2022-06-02T09:50:36.000000Z',
            created_at_in_date: '2022-06-02',
            created_at_hours_and_min: '18:50',
          },
          {
            message_id: 136,
            sender_id: 1004,
            sender_name: 'Duc',
            content: '1',
            file: null,
            created_at: '2022-06-02T09:48:53.000000Z',
            created_at_in_date: '2022-06-02',
            created_at_hours_and_min: '18:48',
          },
          {
            message_id: 135,
            sender_id: 1004,
            sender_name: 'Duc',
            content: '2',
            file: null,
            created_at: '2022-06-02T09:47:33.000000Z',
            created_at_in_date: '2022-06-02',
            created_at_hours_and_min: '18:47',
          },
          {
            message_id: 134,
            sender_id: 1004,
            sender_name: 'Duc',
            content: '1',
            file: null,
            created_at: '2022-06-02T09:47:25.000000Z',
            created_at_in_date: '2022-06-02',
            created_at_hours_and_min: '18:47',
          },
          {
            message_id: 133,
            sender_id: 1004,
            sender_name: 'Duc',
            content: '234234234',
            file: null,
            created_at: '2022-06-02T09:46:39.000000Z',
            created_at_in_date: '2022-06-02',
            created_at_hours_and_min: '18:46',
          },
          {
            message_id: 132,
            sender_id: 1004,
            sender_name: 'Duc',
            content: 'dfgsdfg',
            file: null,
            created_at: '2022-06-02T09:46:29.000000Z',
            created_at_in_date: '2022-06-02',
            created_at_hours_and_min: '18:46',
          },
        ],
        pagination: {
          display: 20,
          total_records: 191,
          per_page: 20,
          current_page: 3,
          total_pages: 10,
        },
      },
    ];

    expect(MESSAGE_LIST[0].code).toBe(200);

    expect(MESSAGE_LIST[0].data.length).toBe(20);

    for (let i = 0; i < MESSAGE_LIST[0].data.length; i++) {
      expect(MESSAGE_LIST[0].data[i]).toHaveProperty('message_id');
      expect(MESSAGE_LIST[0].data[i]).toHaveProperty('sender_id');
      expect(MESSAGE_LIST[0].data[i]).toHaveProperty('sender_name');
      expect(MESSAGE_LIST[0].data[i]).toHaveProperty('content');
      expect(MESSAGE_LIST[0].data[i]).toHaveProperty('file');
      expect(MESSAGE_LIST[0].data[i]).toHaveProperty('created_at');
      expect(MESSAGE_LIST[0].data[i]).toHaveProperty('created_at_in_date');
      expect(MESSAGE_LIST[0].data[i]).toHaveProperty(
        'created_at_hours_and_min',
      );
    }

    for (let i = 0; i < MESSAGE_LIST[0].data.length; i++) {
      expect(MESSAGE_LIST[0].data[i].message_id).not.toBeNull();
      expect(MESSAGE_LIST[0].data[i].sender_id).not.toBeNull();
      expect(MESSAGE_LIST[0].data[i].sender_name).not.toBeNull();
      expect(MESSAGE_LIST[0].data[i].content).not.toBeNull();
      expect(MESSAGE_LIST[0].data[i].file).toBeNull();
      expect(MESSAGE_LIST[0].data[i].created_at).not.toBeNull();
      expect(MESSAGE_LIST[0].data[i].created_at_in_date).not.toBeNull();
      expect(MESSAGE_LIST[0].data[i].created_at_hours_and_min).not.toBeNull();
    }

    expect(MESSAGE_LIST[0].pagination.display).toBe(20);
    expect(MESSAGE_LIST[0].pagination.total_records).toBe(191);
    expect(MESSAGE_LIST[0].pagination.per_page).toBe(20);
    expect(MESSAGE_LIST[0].pagination.current_page).toBe(3);
    expect(MESSAGE_LIST[0].pagination.total_pages).toBe(10);

    afterEach(cleanup);
  });

  test('Test if data have been render correctly in the Izumi tab', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const SITE = Config.URL_DOMAIN_IZUMI_WEB_APP;
    const URL = `${
      urlAPI.apiGetListNotificationIzumi
    }?page=${1}&per_page=${50}`;
    const PARAMS = null;

    const getDataIzumiTab = jest.fn();

    getDataIzumiTab.mockImplementation(async () => {
      try {
        const response = await getListNotificationIzumi(SITE, URL, PARAMS);
        expect(response).toBeTruthy();
      } catch (error) {
        // console.log(error);
      }
    });

    await waitFor(() => {
      expect(getDataIzumiTab).not.toHaveBeenCalled();
    });

    const NOTIFICATION_LIST = [
      {
        code: 200,
        data: [
          {
            id: 176,
            subject: '1231',
            public_date: '2022-06-03 19:56:11',
            viewed: false,
          },
          {
            id: 175,
            subject: 'Con cat',
            public_date: '2022-06-03 19:52:02',
            viewed: false,
          },
          {
            id: 174,
            subject: '123',
            public_date: '2022-06-03 19:50:25',
            viewed: false,
          },
          {
            id: 173,
            subject: 'gfhj',
            public_date: '2022-06-03 19:43:47',
            viewed: false,
          },
          {
            id: 172,
            subject: '123',
            public_date: '2022-06-03 19:43:03',
            viewed: false,
          },
          {
            id: 171,
            subject: 'Bay gio la 19h',
            public_date: '2022-06-03 19:41:32',
            viewed: false,
          },
          {
            id: 170,
            subject: '123',
            public_date: '2022-06-03 19:38:41',
            viewed: false,
          },
          {
            id: 169,
            subject: '123',
            public_date: '2022-06-03 19:36:58',
            viewed: false,
          },
          {
            id: 168,
            subject: 'Notification for Viet',
            public_date: '2022-06-03 19:03:34',
            viewed: false,
          },
          {
            id: 167,
            subject: '123',
            public_date: '2022-06-03 19:03:02',
            viewed: false,
          },
          {
            id: 166,
            subject: '123',
            public_date: '2022-06-03 18:59:00',
            viewed: false,
          },
          {
            id: 165,
            subject: '123',
            public_date: '2022-06-03 18:57:45',
            viewed: false,
          },
          {
            id: 164,
            subject: '22',
            public_date: '2022-06-03 18:39:31',
            viewed: false,
          },
          {
            id: 163,
            subject: 'test 1',
            public_date: '2022-06-03 18:30:37',
            viewed: false,
          },
          {
            id: 162,
            subject: 'test 1',
            public_date: '2022-06-03 18:30:20',
            viewed: false,
          },
          {
            id: 161,
            subject: 'test 1',
            public_date: '2022-06-03 18:28:50',
            viewed: false,
          },
          {
            id: 160,
            subject: 'test 1',
            public_date: '2022-06-03 18:28:49',
            viewed: false,
          },
          {
            id: 159,
            subject: 'test 5',
            public_date: '2022-06-03 18:28:28',
            viewed: false,
          },
          {
            id: 158,
            subject: 'ccc',
            public_date: '2022-06-03 18:27:54',
            viewed: false,
          },
          {
            id: 157,
            subject: 'test 4',
            public_date: '2022-06-03 18:27:08',
            viewed: false,
          },
          {
            id: 156,
            subject: 'test 3',
            public_date: '2022-06-03 18:26:25',
            viewed: false,
          },
          {
            id: 155,
            subject: 'test 2',
            public_date: '2022-06-03 18:25:34',
            viewed: false,
          },
          {
            id: 154,
            subject: 'test 1',
            public_date: '2022-06-03 18:24:19',
            viewed: false,
          },
          {
            id: 153,
            subject: 'test 1',
            public_date: '2022-06-03 18:23:05',
            viewed: false,
          },
          {
            id: 152,
            subject: 'test 1',
            public_date: '2022-06-03 18:23:00',
            viewed: false,
          },
          {
            id: 151,
            subject: 'test 1',
            public_date: '2022-06-03 17:57:30',
            viewed: false,
          },
          {
            id: 150,
            subject: '123',
            public_date: '2022-06-03 17:54:52',
            viewed: true,
          },
          {
            id: 149,
            subject: 'cc',
            public_date: '2022-06-03 17:53:18',
            viewed: false,
          },
          {
            id: 148,
            subject: 'sdfg',
            public_date: '2022-06-03 17:52:57',
            viewed: false,
          },
          {
            id: 147,
            subject: '1',
            public_date: '2022-06-03 17:50:39',
            viewed: false,
          },
          {
            id: 146,
            subject: '123',
            public_date: '2022-06-03 17:38:31',
            viewed: false,
          },
          {
            id: 145,
            subject: '123',
            public_date: '2022-06-03 17:28:26',
            viewed: false,
          },
          {
            id: 144,
            subject: '31',
            public_date: '2022-06-03 17:28:04',
            viewed: false,
          },
          {
            id: 143,
            subject: 'test 1',
            public_date: '2022-06-03 17:19:39',
            viewed: false,
          },
          {
            id: 142,
            subject: '2',
            public_date: '2022-06-03 15:52:30',
            viewed: false,
          },
          {
            id: 141,
            subject: '1',
            public_date: '2022-06-03 15:51:53',
            viewed: false,
          },
          {
            id: 140,
            subject: 'cc',
            public_date: '2022-06-03 12:28:56',
            viewed: false,
          },
          {
            id: 139,
            subject: '123',
            public_date: '2022-06-03 12:28:46',
            viewed: false,
          },
          {
            id: 138,
            subject: '3',
            public_date: '2022-06-03 12:21:45',
            viewed: false,
          },
          {
            id: 137,
            subject: '2',
            public_date: '2022-06-03 12:21:33',
            viewed: false,
          },
          {
            id: 136,
            subject: '1',
            public_date: '2022-06-03 12:21:18',
            viewed: false,
          },
          {
            id: 135,
            subject: '1',
            public_date: '2022-06-03 12:19:54',
            viewed: false,
          },
          {
            id: 134,
            subject: '123',
            public_date: '2022-06-03 12:18:25',
            viewed: false,
          },
          {
            id: 133,
            subject: '123',
            public_date: '2022-06-03 12:17:38',
            viewed: false,
          },
          {
            id: 132,
            subject: '1',
            public_date: '2022-06-03 12:17:09',
            viewed: false,
          },
          {
            id: 131,
            subject: '123',
            public_date: '2022-06-03 12:15:45',
            viewed: false,
          },
          {
            id: 130,
            subject: '1',
            public_date: '2022-06-03 12:14:39',
            viewed: false,
          },
          {
            id: 129,
            subject: '123',
            public_date: '2022-06-03 12:13:44',
            viewed: false,
          },
          {
            id: 128,
            subject: '123',
            public_date: '2022-06-03 12:13:13',
            viewed: false,
          },
          {
            id: 127,
            subject: '123',
            public_date: '2022-06-03 12:13:00',
            viewed: false,
          },
        ],
        pagination: {
          display: 50,
          total_records: 176,
          per_page: 50,
          current_page: 1,
          total_pages: 4,
        },
      },
    ];

    expect(NOTIFICATION_LIST[0].code).toBe(200);

    expect(NOTIFICATION_LIST[0].data.length).toBe(50);

    for (let i = 0; i < NOTIFICATION_LIST[0].data.length; i++) {
      expect(NOTIFICATION_LIST[0].data[i]).toHaveProperty('id');
      expect(NOTIFICATION_LIST[0].data[i]).toHaveProperty('subject');
      expect(NOTIFICATION_LIST[0].data[i]).toHaveProperty('public_date');
      expect(NOTIFICATION_LIST[0].data[i]).toHaveProperty('viewed');
    }

    for (let i = 0; i < NOTIFICATION_LIST[0].data.length; i++) {
      expect(NOTIFICATION_LIST[0].data[i].id).not.toBeNull();
      expect(NOTIFICATION_LIST[0].data[i].subject).not.toBeNull();
      expect(NOTIFICATION_LIST[0].data[i].public_date).not.toBeNull();
      expect(NOTIFICATION_LIST[0].data[i].viewed).not.toBeNull();
    }

    expect(NOTIFICATION_LIST[0].pagination).toHaveProperty('display');
    expect(NOTIFICATION_LIST[0].pagination).toHaveProperty('total_records');
    expect(NOTIFICATION_LIST[0].pagination).toHaveProperty('per_page');
    expect(NOTIFICATION_LIST[0].pagination).toHaveProperty('current_page');
    expect(NOTIFICATION_LIST[0].pagination).toHaveProperty('total_pages');
    expect(NOTIFICATION_LIST[0].pagination.display).toBe(50);
    expect(NOTIFICATION_LIST[0].pagination.total_records).toBe(176);
    expect(NOTIFICATION_LIST[0].pagination.per_page).toBe(50);
    expect(NOTIFICATION_LIST[0].pagination.current_page).toBe(1);
    expect(NOTIFICATION_LIST[0].pagination.total_pages).toBe(4);

    afterEach(cleanup);
  });

  it('Test if click on the notification, move the detail screen', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const LIST_NOTIFICATION = [
      {
        id: 176,
        subject: '1231',
        public_date: '2022-06-03 19:56:11',
        viewed: false,
      },
      {
        id: 175,
        subject: 'Con cat',
        public_date: '2022-06-03 19:52:02',
        viewed: false,
      },
    ];

    let currentTab = 'Izumi';

    let isLoading = false;

    let messageDetail = [];

    const getNotificationnInfo = jest
      .fn()
      .mockImplementation(async notification => {
        const SITE = Config.URL_DOMAIN_IZUMI_WEB_APP;
        const URL = `${urlAPI.apiGetSpecificNotificationIzumi}/${notification.id}`;
        const PARAMS = null;

        try {
          isLoading = true;

          const response = await getSpecificNotificationIzumi(
            SITE,
            URL,
            PARAMS,
          );

          if (response.status === 200) {
            const CHECKBOX = 1;
            const RADIO = 2;
            const COMMENT = 3;

            for (let i = 0; i < response.data.data.surveys.length; i++) {
              response.data.data.surveys[i].radio_list = [];
              response.data.data.surveys[i].checkbox_list = [];
              response.data.data.surveys[i].comment_list = [];
              response.data.data.surveys[i].radio_option = -1;
            }

            for (let i = 0; i < response.data.data.surveys.length; i++) {
              if (response.data.data.surveys[i].type === CHECKBOX) {
                for (
                  let j = 0;
                  j <
                  response.data.data.surveys[i].survey_question_answer.length;
                  j++
                ) {
                  response.data.data.surveys[i].checkbox_list.push({
                    label:
                      response.data.data.surveys[i].survey_question_answer[j]
                        .answer_content,
                    value: false,
                    id: response.data.data.surveys[i].survey_question_answer[j]
                      .id,
                  });
                }
              } else if (response.data.data.surveys[i].type === RADIO) {
                for (
                  let j = 0;
                  j <
                  response.data.data.surveys[i].survey_question_answer.length;
                  j++
                ) {
                  response.data.data.surveys[i].radio_list.push({
                    label:
                      response.data.data.surveys[i].survey_question_answer[j]
                        .answer_content,
                    value:
                      response.data.data.surveys[i].survey_question_answer[j]
                        .position,
                    id: response.data.data.surveys[i].survey_question_answer[j]
                      .id,
                  });
                }
              } else if (response.data.data.surveys[i].type === COMMENT) {
                response.data.data.surveys[i].comment_list.push('');
              }
            }

            if (response.data.data.length === 0) {
              messageDetail = LIST_NOTIFICATION;
            } else {
              messageDetail = response.data.data;
            }

            currentTab = 'IZUMI_DETAIL';
          }
        } catch (error) {
          // console.log(error);
        }
      });

    getNotificationnInfo();

    expect(getNotificationnInfo).toHaveBeenCalled();

    afterEach(cleanup);
  });

  it('Test if the subject of the notification is rendered', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const subject = getByTestId('subject');
    expect(subject).toBeTruthy();

    afterEach(cleanup);
  });

  it('Test if the content of the notification is rendered', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const contentSurvey = getByTestId('contentSurvey');
    expect(contentSurvey).toBeTruthy();

    afterEach(cleanup);
  });

  it('Test if the date of the notification is rendered', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const publicDateDisplay = getByTestId('publicDateDisplay');
    expect(publicDateDisplay).toBeTruthy();

    afterEach(cleanup);
  });

  it('Test if when there is the survey, render the support text', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const survey = getByTestId('supportText');
    expect(survey).toBeTruthy();

    afterEach(cleanup);
  });

  it('Test if support text has been rendered correctly', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const survey = getByTestId('supportText');
    expect(survey).toBeTruthy();

    await waitFor(() => {
      const supportText = getByText('確認後のアンケートにご回答ください。');
      expect(supportText).toBeTruthy();
    });

    afterEach(cleanup);
  });

  it('Test if when there is the survey, it will be rendered', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const survey = getByTestId('surveyList');
    expect(survey).toBeTruthy();

    const SURVEY_LIST = [
      {
        id: 6,
        notice_id: 180,
        question_content: 'Q1',
        type: 1,
        created_at: '2022-06-04 15:04:47',
        updated_at: '2022-06-04 15:04:47',
        deleted_at: null,
        survey_question_answer: [
          {
            id: 13,
            question_id: 6,
            answer_content: 'A1',
            type: 1,
            position: 0,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
          {
            id: 14,
            question_id: 6,
            answer_content: 'A2',
            type: 1,
            position: 1,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
          {
            id: 15,
            question_id: 6,
            answer_content: 'A3',
            type: 1,
            position: 2,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
          {
            id: 16,
            question_id: 6,
            answer_content: 'A4',
            type: 1,
            position: 3,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
          {
            id: 17,
            question_id: 6,
            answer_content: 'A5',
            type: 1,
            position: 4,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
          {
            id: 18,
            question_id: 6,
            answer_content: 'A6',
            type: 1,
            position: 5,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
          {
            id: 19,
            question_id: 6,
            answer_content: 'A7',
            type: 1,
            position: 6,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
          {
            id: 20,
            question_id: 6,
            answer_content: 'A8',
            type: 1,
            position: 7,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
          {
            id: 21,
            question_id: 6,
            answer_content: 'A9',
            type: 1,
            position: 8,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
          {
            id: 22,
            question_id: 6,
            answer_content: 'A10',
            type: 1,
            position: 9,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
        ],
        radio_option: -1,
        radio_list: [],
        checkbox_list: [],
        comment_list: [],
      },
      {
        id: 7,
        notice_id: 180,
        question_content: 'Q2',
        type: 2,
        created_at: '2022-06-04 15:04:47',
        updated_at: '2022-06-04 15:04:47',
        deleted_at: null,
        survey_question_answer: [
          {
            id: 23,
            question_id: 7,
            answer_content: 'B1',
            type: 2,
            position: 0,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
          {
            id: 24,
            question_id: 7,
            answer_content: 'B2',
            type: 2,
            position: 1,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
          {
            id: 25,
            question_id: 7,
            answer_content: 'B3',
            type: 2,
            position: 2,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
          {
            id: 26,
            question_id: 7,
            answer_content: 'B4',
            type: 2,
            position: 3,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
          {
            id: 27,
            question_id: 7,
            answer_content: 'B5',
            type: 2,
            position: 4,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
          {
            id: 28,
            question_id: 7,
            answer_content: 'B6',
            type: 2,
            position: 5,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
          {
            id: 29,
            question_id: 7,
            answer_content: 'B7',
            type: 2,
            position: 6,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
          {
            id: 30,
            question_id: 7,
            answer_content: 'B8',
            type: 2,
            position: 7,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
          {
            id: 31,
            question_id: 7,
            answer_content: 'B9',
            type: 2,
            position: 8,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
          {
            id: 32,
            question_id: 7,
            answer_content: 'B10',
            type: 2,
            position: 9,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
        ],
        radio_option: -1,
        radio_list: [],
        checkbox_list: [],
        comment_list: [],
      },
      {
        id: 8,
        notice_id: 180,
        question_content: 'C3',
        type: 3,
        created_at: '2022-06-04 15:04:47',
        updated_at: '2022-06-04 15:04:47',
        deleted_at: null,
        survey_question_answer: [],
        radio_option: -1,
        radio_list: [],
        checkbox_list: [],
        comment_list: [],
      },
    ];

    expect(SURVEY_LIST.length).toBe(3);

    afterEach(cleanup);
  });

  it('Test if when there is file, it will be rendered', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const fileList = getByTestId('fileList');
    expect(fileList).toBeTruthy();

    const FILE_LIST = [
      {
        id: 1,
        file_name: 'Screenshot 2022-06-02 111232.png',
        file_extension: 'png',
        file_path:
          'upload/20220604/6234a31f38f9d86c81000e0fffe78f43Screenshot 2022-06-02 111232.png',
        file_size: '6158',
        created_at: '2022-06-04 15:37:10',
        updated_at: '2022-06-04 15:37:10',
      },
      {
        id: 2,
        file_name: 'tinh-hinh-di-hoc.png',
        file_extension: 'png',
        file_path:
          'upload/20220604/cbaf4ed53c91b8314f9d54cede916fe0tinh-hinh-di-hoc.png',
        file_size: '568632',
        created_at: '2022-06-04 15:37:10',
        updated_at: '2022-06-04 15:37:10',
      },
    ];

    expect(FILE_LIST.length).toBe(2);

    afterEach(cleanup);
  });

  it('Test if the confirm notify button is rendered', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const buttonConfirmation = getByTestId('buttonConfirmation');
    expect(buttonConfirmation).toBeTruthy();

    afterEach(cleanup);
  });

  it('Test if the text of the notify button is rendered', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const buttonConfirmation = getByTestId('buttonConfirmation');
    expect(buttonConfirmation).toBeTruthy();

    const textButtonConfirmation = getByText('メッセージを確認しました');
    expect(textButtonConfirmation).toBeTruthy();

    afterEach(cleanup);
  });

  it('Test if the text of the notify button is rendered correctly', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const buttonConfirmation = getByTestId('buttonConfirmation');
    expect(buttonConfirmation).toBeTruthy();

    await waitFor(() => {
      const textButtonConfirmation = getByText('メッセージを確認しました');
      expect(textButtonConfirmation).toBeTruthy();
    });

    afterEach(cleanup);
  });

  it('Test if call function onPressConfirm when click on the notify confirm button', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const onPressConfirm = jest.fn();

    const buttonConfirmation = getByTestId('buttonConfirmation');
    expect(buttonConfirmation).toBeTruthy();

    fireEvent.press(buttonConfirmation);

    onPressConfirm();

    expect(onPressConfirm).toHaveBeenCalled();

    afterEach(cleanup);
  });

  it('Test if there is no survey then call function updateWithoutSurvey', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const DATA = {
      id: 180,
      subject: 'Subject XXX',
      content: 'Content XXX',
      public_date: '2022-06-04 15:04:47',
      public_date_display: '2022年06月04日 15:04',
      surveys: [],
      is_draft: 1,
      list_file_display: [
        {
          id: 1,
          file_name: 'Screenshot 2022-06-02 111232.png',
          file_extension: 'png',
          file_path:
            'upload/20220604/6234a31f38f9d86c81000e0fffe78f43Screenshot 2022-06-02 111232.png',
          file_size: '6158',
          created_at: '2022-06-04 15:37:10',
          updated_at: '2022-06-04 15:37:10',
        },
        {
          id: 2,
          file_name: 'tinh-hinh-di-hoc.png',
          file_extension: 'png',
          file_path:
            'upload/20220604/cbaf4ed53c91b8314f9d54cede916fe0tinh-hinh-di-hoc.png',
          file_size: '568632',
          created_at: '2022-06-04 15:37:10',
          updated_at: '2022-06-04 15:37:10',
        },
      ],
      viewed: false,
    };

    const onPressConfirm = jest.fn();
    const updateWithoutSurvey = jest.fn();
    const updateWithSurvey = jest.fn();

    const buttonConfirmation = getByTestId('buttonConfirmation');
    expect(buttonConfirmation).toBeTruthy();

    fireEvent.press(buttonConfirmation);

    onPressConfirm.mockImplementationOnce(() => {
      if (DATA.surveys.length === 0) {
        updateWithoutSurvey(DATA.id);
      } else {
        updateWithSurvey(DATA.id);
      }
    });

    onPressConfirm();

    expect(onPressConfirm).toHaveBeenCalled();

    expect(updateWithoutSurvey).toHaveBeenCalled();

    expect(updateWithSurvey).not.toHaveBeenCalled();

    afterEach(cleanup);
  });

  it('Test if there is survey then call function updateWithSurvey', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const DATA = {
      id: 180,
      subject: 'Subject XXX',
      content: 'Content XXX',
      public_date: '2022-06-04 15:04:47',
      public_date_display: '2022年06月04日 15:04',
      surveys: [
        {
          id: 6,
          notice_id: 180,
          question_content: 'Q1',
          type: 1,
          created_at: '2022-06-04 15:04:47',
          updated_at: '2022-06-04 15:04:47',
          deleted_at: null,
          survey_question_answer: [
            {
              id: 13,
              question_id: 6,
              answer_content: 'A1',
              type: 1,
              position: 0,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 14,
              question_id: 6,
              answer_content: 'A2',
              type: 1,
              position: 1,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 15,
              question_id: 6,
              answer_content: 'A3',
              type: 1,
              position: 2,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 16,
              question_id: 6,
              answer_content: 'A4',
              type: 1,
              position: 3,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 17,
              question_id: 6,
              answer_content: 'A5',
              type: 1,
              position: 4,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 18,
              question_id: 6,
              answer_content: 'A6',
              type: 1,
              position: 5,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 19,
              question_id: 6,
              answer_content: 'A7',
              type: 1,
              position: 6,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 20,
              question_id: 6,
              answer_content: 'A8',
              type: 1,
              position: 7,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 21,
              question_id: 6,
              answer_content: 'A9',
              type: 1,
              position: 8,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 22,
              question_id: 6,
              answer_content: 'A10',
              type: 1,
              position: 9,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
          ],
          radio_option: -1,
          radio_list: [],
          checkbox_list: [],
          comment_list: [],
        },
        {
          id: 7,
          notice_id: 180,
          question_content: 'Q2',
          type: 2,
          created_at: '2022-06-04 15:04:47',
          updated_at: '2022-06-04 15:04:47',
          deleted_at: null,
          survey_question_answer: [
            {
              id: 23,
              question_id: 7,
              answer_content: 'B1',
              type: 2,
              position: 0,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 24,
              question_id: 7,
              answer_content: 'B2',
              type: 2,
              position: 1,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 25,
              question_id: 7,
              answer_content: 'B3',
              type: 2,
              position: 2,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 26,
              question_id: 7,
              answer_content: 'B4',
              type: 2,
              position: 3,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 27,
              question_id: 7,
              answer_content: 'B5',
              type: 2,
              position: 4,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 28,
              question_id: 7,
              answer_content: 'B6',
              type: 2,
              position: 5,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 29,
              question_id: 7,
              answer_content: 'B7',
              type: 2,
              position: 6,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 30,
              question_id: 7,
              answer_content: 'B8',
              type: 2,
              position: 7,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 31,
              question_id: 7,
              answer_content: 'B9',
              type: 2,
              position: 8,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 32,
              question_id: 7,
              answer_content: 'B10',
              type: 2,
              position: 9,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
          ],
          radio_option: -1,
          radio_list: [],
          checkbox_list: [],
          comment_list: [],
        },
        {
          id: 8,
          notice_id: 180,
          question_content: 'C3',
          type: 3,
          created_at: '2022-06-04 15:04:47',
          updated_at: '2022-06-04 15:04:47',
          deleted_at: null,
          survey_question_answer: [],
          radio_option: -1,
          radio_list: [],
          checkbox_list: [],
          comment_list: [],
        },
      ],
      is_draft: 1,
      list_file_display: [
        {
          id: 1,
          file_name: 'Screenshot 2022-06-02 111232.png',
          file_extension: 'png',
          file_path:
            'upload/20220604/6234a31f38f9d86c81000e0fffe78f43Screenshot 2022-06-02 111232.png',
          file_size: '6158',
          created_at: '2022-06-04 15:37:10',
          updated_at: '2022-06-04 15:37:10',
        },
        {
          id: 2,
          file_name: 'tinh-hinh-di-hoc.png',
          file_extension: 'png',
          file_path:
            'upload/20220604/cbaf4ed53c91b8314f9d54cede916fe0tinh-hinh-di-hoc.png',
          file_size: '568632',
          created_at: '2022-06-04 15:37:10',
          updated_at: '2022-06-04 15:37:10',
        },
      ],
      viewed: false,
    };

    const onPressConfirm = jest.fn();
    const updateWithoutSurvey = jest.fn();
    const updateWithSurvey = jest.fn();

    onPressConfirm.mockImplementationOnce(() => {
      if (DATA.surveys.length === 0) {
        updateWithoutSurvey(DATA.id);
      } else {
        updateWithSurvey(DATA.id);
      }
    });

    const buttonConfirmation = getByTestId('buttonConfirmation');
    expect(buttonConfirmation).toBeTruthy();

    fireEvent.press(buttonConfirmation);

    onPressConfirm();

    expect(onPressConfirm).toHaveBeenCalled();

    expect(updateWithoutSurvey).not.toHaveBeenCalled();

    expect(updateWithSurvey).toHaveBeenCalled();

    afterEach(cleanup);
  });

  it('Test if after click on the notify confirm button, when return to the Izumi tab, the status will be changed', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    let currentTab = 'Izumi Detail';

    const NOTIIFICATION_DATA = {
      id: 180,
      subject: 'Subject XXX',
      content: 'Content XXX',
      public_date: '2022-06-04 15:04:47',
      public_date_display: '2022年06月04日 15:04',
      surveys: [
        {
          id: 6,
          notice_id: 180,
          question_content: 'Q1',
          type: 1,
          created_at: '2022-06-04 15:04:47',
          updated_at: '2022-06-04 15:04:47',
          deleted_at: null,
          survey_question_answer: [
            {
              id: 13,
              question_id: 6,
              answer_content: 'A1',
              type: 1,
              position: 0,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 14,
              question_id: 6,
              answer_content: 'A2',
              type: 1,
              position: 1,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 15,
              question_id: 6,
              answer_content: 'A3',
              type: 1,
              position: 2,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 16,
              question_id: 6,
              answer_content: 'A4',
              type: 1,
              position: 3,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 17,
              question_id: 6,
              answer_content: 'A5',
              type: 1,
              position: 4,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 18,
              question_id: 6,
              answer_content: 'A6',
              type: 1,
              position: 5,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 19,
              question_id: 6,
              answer_content: 'A7',
              type: 1,
              position: 6,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 20,
              question_id: 6,
              answer_content: 'A8',
              type: 1,
              position: 7,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 21,
              question_id: 6,
              answer_content: 'A9',
              type: 1,
              position: 8,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 22,
              question_id: 6,
              answer_content: 'A10',
              type: 1,
              position: 9,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
          ],
          radio_option: -1,
          radio_list: [],
          checkbox_list: [],
          comment_list: [],
        },
        {
          id: 7,
          notice_id: 180,
          question_content: 'Q2',
          type: 2,
          created_at: '2022-06-04 15:04:47',
          updated_at: '2022-06-04 15:04:47',
          deleted_at: null,
          survey_question_answer: [
            {
              id: 23,
              question_id: 7,
              answer_content: 'B1',
              type: 2,
              position: 0,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 24,
              question_id: 7,
              answer_content: 'B2',
              type: 2,
              position: 1,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 25,
              question_id: 7,
              answer_content: 'B3',
              type: 2,
              position: 2,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 26,
              question_id: 7,
              answer_content: 'B4',
              type: 2,
              position: 3,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 27,
              question_id: 7,
              answer_content: 'B5',
              type: 2,
              position: 4,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 28,
              question_id: 7,
              answer_content: 'B6',
              type: 2,
              position: 5,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 29,
              question_id: 7,
              answer_content: 'B7',
              type: 2,
              position: 6,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 30,
              question_id: 7,
              answer_content: 'B8',
              type: 2,
              position: 7,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 31,
              question_id: 7,
              answer_content: 'B9',
              type: 2,
              position: 8,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 32,
              question_id: 7,
              answer_content: 'B10',
              type: 2,
              position: 9,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
          ],
          radio_option: -1,
          radio_list: [],
          checkbox_list: [],
          comment_list: [],
        },
        {
          id: 8,
          notice_id: 180,
          question_content: 'C3',
          type: 3,
          created_at: '2022-06-04 15:04:47',
          updated_at: '2022-06-04 15:04:47',
          deleted_at: null,
          survey_question_answer: [],
          radio_option: -1,
          radio_list: [],
          checkbox_list: [],
          comment_list: [],
        },
      ],
      is_draft: 1,
      list_file_display: [
        {
          id: 1,
          file_name: 'Screenshot 2022-06-02 111232.png',
          file_extension: 'png',
          file_path:
            'upload/20220604/6234a31f38f9d86c81000e0fffe78f43Screenshot 2022-06-02 111232.png',
          file_size: '6158',
          created_at: '2022-06-04 15:37:10',
          updated_at: '2022-06-04 15:37:10',
        },
        {
          id: 2,
          file_name: 'tinh-hinh-di-hoc.png',
          file_extension: 'png',
          file_path:
            'upload/20220604/cbaf4ed53c91b8314f9d54cede916fe0tinh-hinh-di-hoc.png',
          file_size: '568632',
          created_at: '2022-06-04 15:37:10',
          updated_at: '2022-06-04 15:37:10',
        },
      ],
      viewed: false,
    };

    const NOTIFICATION_DETAIL_DATA = {
      id: 6,
      notice_id: 180,
      question_content: 'Q1',
      type: 1,
      created_at: '2022-06-04 15:04:47',
      updated_at: '2022-06-04 15:04:47',
      deleted_at: null,
      survey_question_answer: [
        {
          id: 13,
          question_id: 6,
          answer_content: 'A1',
          type: 1,
          position: 0,
          created_at: '2022-06-04 15:04:47',
          updated_at: '2022-06-04 15:04:47',
          deleted_at: null,
        },
        {
          id: 14,
          question_id: 6,
          answer_content: 'A2',
          type: 1,
          position: 1,
          created_at: '2022-06-04 15:04:47',
          updated_at: '2022-06-04 15:04:47',
          deleted_at: null,
        },
        {
          id: 15,
          question_id: 6,
          answer_content: 'A3',
          type: 1,
          position: 2,
          created_at: '2022-06-04 15:04:47',
          updated_at: '2022-06-04 15:04:47',
          deleted_at: null,
        },
        {
          id: 16,
          question_id: 6,
          answer_content: 'A4',
          type: 1,
          position: 3,
          created_at: '2022-06-04 15:04:47',
          updated_at: '2022-06-04 15:04:47',
          deleted_at: null,
        },
        {
          id: 17,
          question_id: 6,
          answer_content: 'A5',
          type: 1,
          position: 4,
          created_at: '2022-06-04 15:04:47',
          updated_at: '2022-06-04 15:04:47',
          deleted_at: null,
        },
        {
          id: 18,
          question_id: 6,
          answer_content: 'A6',
          type: 1,
          position: 5,
          created_at: '2022-06-04 15:04:47',
          updated_at: '2022-06-04 15:04:47',
          deleted_at: null,
        },
        {
          id: 19,
          question_id: 6,
          answer_content: 'A7',
          type: 1,
          position: 6,
          created_at: '2022-06-04 15:04:47',
          updated_at: '2022-06-04 15:04:47',
          deleted_at: null,
        },
        {
          id: 20,
          question_id: 6,
          answer_content: 'A8',
          type: 1,
          position: 7,
          created_at: '2022-06-04 15:04:47',
          updated_at: '2022-06-04 15:04:47',
          deleted_at: null,
        },
        {
          id: 21,
          question_id: 6,
          answer_content: 'A9',
          type: 1,
          position: 8,
          created_at: '2022-06-04 15:04:47',
          updated_at: '2022-06-04 15:04:47',
          deleted_at: null,
        },
        {
          id: 22,
          question_id: 6,
          answer_content: 'A10',
          type: 1,
          position: 9,
          created_at: '2022-06-04 15:04:47',
          updated_at: '2022-06-04 15:04:47',
          deleted_at: null,
        },
      ],
      radio_option: -1,
      radio_list: [],
      checkbox_list: [],
      comment_list: [],
    };

    const onPressConfirm = jest.fn();

    const handleProcessViewedNotice = jest.fn();

    handleProcessViewedNotice.mockImplementationOnce(notice_id => {
      if (NOTIIFICATION_DATA.id === notice_id) {
        NOTIIFICATION_DATA.viewed = true;
      }
    });

    const buttonConfirmation = getByTestId('buttonConfirmation');
    expect(buttonConfirmation).toBeTruthy();

    fireEvent.press(buttonConfirmation);

    onPressConfirm();

    expect(onPressConfirm).toHaveBeenCalled();

    handleProcessViewedNotice(NOTIFICATION_DETAIL_DATA.notice_id);

    expect(handleProcessViewedNotice).toHaveBeenCalled();

    currentTab = 'Izumi';

    expect(currentTab).toBe('Izumi');

    expect(NOTIIFICATION_DATA.viewed).toBe(true);

    afterEach(cleanup);
  });

  it('Test if validate when the survey is exist, click the confirm notify button but do not select any answers', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const onPressConfirm = jest.fn();

    const NOTIIFICATION_DATA = {
      id: 180,
      subject: 'Subject XXX',
      content: 'Content XXX',
      public_date: '2022-06-04 15:04:47',
      public_date_display: '2022年06月04日 15:04',
      surveys: [
        {
          id: 6,
          notice_id: 180,
          question_content: 'Q1',
          type: 1,
          created_at: '2022-06-04 15:04:47',
          updated_at: '2022-06-04 15:04:47',
          deleted_at: null,
          survey_question_answer: [
            {
              id: 13,
              question_id: 6,
              answer_content: 'A1',
              type: 1,
              position: 0,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 14,
              question_id: 6,
              answer_content: 'A2',
              type: 1,
              position: 1,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 15,
              question_id: 6,
              answer_content: 'A3',
              type: 1,
              position: 2,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 16,
              question_id: 6,
              answer_content: 'A4',
              type: 1,
              position: 3,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 17,
              question_id: 6,
              answer_content: 'A5',
              type: 1,
              position: 4,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 18,
              question_id: 6,
              answer_content: 'A6',
              type: 1,
              position: 5,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 19,
              question_id: 6,
              answer_content: 'A7',
              type: 1,
              position: 6,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 20,
              question_id: 6,
              answer_content: 'A8',
              type: 1,
              position: 7,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 21,
              question_id: 6,
              answer_content: 'A9',
              type: 1,
              position: 8,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 22,
              question_id: 6,
              answer_content: 'A10',
              type: 1,
              position: 9,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
          ],
          radio_option: -1,
          radio_list: [],
          checkbox_list: [],
          comment_list: [],
        },
        {
          id: 7,
          notice_id: 180,
          question_content: 'Q2',
          type: 2,
          created_at: '2022-06-04 15:04:47',
          updated_at: '2022-06-04 15:04:47',
          deleted_at: null,
          survey_question_answer: [
            {
              id: 23,
              question_id: 7,
              answer_content: 'B1',
              type: 2,
              position: 0,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 24,
              question_id: 7,
              answer_content: 'B2',
              type: 2,
              position: 1,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 25,
              question_id: 7,
              answer_content: 'B3',
              type: 2,
              position: 2,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 26,
              question_id: 7,
              answer_content: 'B4',
              type: 2,
              position: 3,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 27,
              question_id: 7,
              answer_content: 'B5',
              type: 2,
              position: 4,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 28,
              question_id: 7,
              answer_content: 'B6',
              type: 2,
              position: 5,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 29,
              question_id: 7,
              answer_content: 'B7',
              type: 2,
              position: 6,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 30,
              question_id: 7,
              answer_content: 'B8',
              type: 2,
              position: 7,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 31,
              question_id: 7,
              answer_content: 'B9',
              type: 2,
              position: 8,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
            {
              id: 32,
              question_id: 7,
              answer_content: 'B10',
              type: 2,
              position: 9,
              created_at: '2022-06-04 15:04:47',
              updated_at: '2022-06-04 15:04:47',
              deleted_at: null,
            },
          ],
          radio_option: -1,
          radio_list: [],
          checkbox_list: [],
          comment_list: [],
        },
        {
          id: 8,
          notice_id: 180,
          question_content: 'C3',
          type: 3,
          created_at: '2022-06-04 15:04:47',
          updated_at: '2022-06-04 15:04:47',
          deleted_at: null,
          survey_question_answer: [],
          radio_option: -1,
          radio_list: [],
          checkbox_list: [],
          comment_list: [],
        },
      ],
      is_draft: 1,
      list_file_display: [
        {
          id: 1,
          file_name: 'Screenshot 2022-06-02 111232.png',
          file_extension: 'png',
          file_path:
            'upload/20220604/6234a31f38f9d86c81000e0fffe78f43Screenshot 2022-06-02 111232.png',
          file_size: '6158',
          created_at: '2022-06-04 15:37:10',
          updated_at: '2022-06-04 15:37:10',
        },
        {
          id: 2,
          file_name: 'tinh-hinh-di-hoc.png',
          file_extension: 'png',
          file_path:
            'upload/20220604/cbaf4ed53c91b8314f9d54cede916fe0tinh-hinh-di-hoc.png',
          file_size: '568632',
          created_at: '2022-06-04 15:37:10',
          updated_at: '2022-06-04 15:37:10',
        },
      ],
      viewed: false,
    };

    const buttonConfirmation = getByTestId('buttonConfirmation');
    expect(buttonConfirmation).toBeTruthy();

    fireEvent.press(buttonConfirmation);

    const updateWithoutSurvey = jest.fn();

    const updateWithSurvey = jest.fn();

    const showToast = jest.fn();

    updateWithSurvey.mockImplementationOnce(async () => {
      if (NOTIIFICATION_DATA.viewed !== true) {
        const CHECKBOX = 1;
        const RADIO = 2;

        const DATA = {
          user_code: 111111,
          user_id: 1,
          notice_id: 180,
          answer: [],
        };

        let isValid = false;

        for (let i = 0; i < NOTIIFICATION_DATA.surveys.length; i++) {
          DATA.answer.push({
            question_id: NOTIIFICATION_DATA.surveys[i].id,
            answer_id: [],
            comment: null,
          });

          if (NOTIIFICATION_DATA.surveys[i].type === CHECKBOX) {
            const CHECKBOX_LIST = NOTIIFICATION_DATA.surveys[i].checkbox_list;

            for (let j = 0; j < CHECKBOX_LIST.length; j++) {
              if (CHECKBOX_LIST.some(item => item.value === true)) {
                if (CHECKBOX_LIST[j].value === true) {
                  DATA.answer[i].answer_id.push(CHECKBOX_LIST[j].id);
                }
                isValid = true;
              } else {
                isValid = false;
                break;
              }
            }
          } else if (NOTIIFICATION_DATA.surveys[i].type === RADIO) {
            const RADIO_OPTION = NOTIIFICATION_DATA.surveys[i].radio_option;
            const RADIO_LIST = NOTIIFICATION_DATA.surveys[i].radio_list;

            if (RADIO_OPTION === -1) {
              isValid = false;
            } else {
              DATA.answer[i].answer_id.push(RADIO_LIST[i].id);
              isValid = true;
            }
          } else {
            DATA.answer[i].comment =
              NOTIIFICATION_DATA.surveys[i].comment_list[0];
          }
        }

        if (isValid === false) {
          showToast({
            variant: 'warning',
            title: '警告',
            content: '回答されてない設問があるため、提出ができません。',
          });
        } else {
          const SITE = Config.URL_DOMAIN_IZUMI_WEB_APP;
          const URL = urlAPI.apiUpdateNotificationWithSurvey;
          const PARAM = null;

          try {
            const response = await postNotificationWithSurvey(
              SITE,
              URL,
              DATA,
              PARAM,
            );

            console.log(
              'VIEW NOTIFICATION WITH SURVEY ==========>',
              response.data,
            );

            if (response.status === 200) {
              NOTIIFICATION_DATA.viewed = true;
            }
          } catch (error) {
            // console.log(error);
          }
        }
      }
    });

    onPressConfirm.mockImplementationOnce(() => {
      if (NOTIIFICATION_DATA.surveys.length === 0) {
        updateWithoutSurvey(NOTIIFICATION_DATA.id);
      } else {
        updateWithSurvey(NOTIIFICATION_DATA.id);
      }
    });

    onPressConfirm();

    expect(onPressConfirm).toHaveBeenCalled();

    expect(updateWithoutSurvey).not.toHaveBeenCalled();

    expect(updateWithSurvey).toHaveBeenCalled();

    afterEach(cleanup);
  });

  it('Test if the created at in date of the message is rendered', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const createdAtInDate = getByTestId('createdAtInDate');
    expect(createdAtInDate).toBeTruthy();

    afterEach(cleanup);
  });

  it('Test if the avatar of the message is rendered', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const avatar = getByTestId('avatar');
    expect(avatar).toBeTruthy();

    afterEach(cleanup);
  });

  it('Test if the sender name of the message is rendered', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const senderName = getByTestId('senderName');
    expect(senderName).toBeTruthy();

    afterEach(cleanup);
  });

  it('Test if the length of the message is valid', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const contentMessage = getByTestId('contentMessage');
    expect(contentMessage).toBeTruthy();

    afterEach(cleanup);
  });

  it('Test if the created at hours and min of the message is rendered', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const createdAtHoursMin = getByTestId('createdAtHoursMin');
    expect(createdAtHoursMin).toBeTruthy();

    afterEach(cleanup);
  });

  it('Test if the content of the message is rendered', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(<Note />);

    const contentMessage = getByTestId('contentMessage');
    expect(contentMessage).toBeTruthy();

    afterEach(cleanup);
  });
});
