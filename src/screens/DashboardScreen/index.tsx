/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { StyleSheet } from 'react-native';
import React, { useEffect, memo } from 'react';
import Layout from '../../layout';
import { SafeAreaView } from 'react-native-safe-area-context';
import useSelector from 'src/utils/useSelector';
import { useDispatch } from 'react-redux';
import { store } from 'src/store';
import {
  setListMessageState,
  setTypeAddMessage,
  setListNotiIzumi,
  setGroupChatId,
  setLoading,
} from 'src/actions/miscActions';
import { handleBreakLastDate } from 'src/utils/handleMessage';
import { getGroupChat } from 'src/api/modules/login';
import Toast from 'react-native-toast-message';
const showToast = props => {
  Toast.show({
    text1: props.title,
    text2: props.content,
    type: props.variant,
    position: 'top',
  });
};

// Config Pusher
import Pusher from 'pusher-js/react-native';
import { CONFIG_PUSHER, Keys, Config } from 'src/const';
Pusher.logToConsole = false;

const PUSHER = new Pusher(CONFIG_PUSHER.APP.APP_KEY, {
  wssPort: CONFIG_PUSHER.APP.WWS_PORT,
  wsPort: CONFIG_PUSHER.APP.WS_PORT,
  wsHost: CONFIG_PUSHER.APP.WS_HOST,
  httpPort: CONFIG_PUSHER.APP.HTTP_PORT,
  forceTLS: CONFIG_PUSHER.APP.FORCE_TLS,
  httpHost: CONFIG_PUSHER.APP.HTTP_HOST,
  cluster: CONFIG_PUSHER.APP.CLUSTER,
});

const CHANNEL_MESSAGE = PUSHER.subscribe(CONFIG_PUSHER.MESSAGE.CHANNEL);
const CHANNEL_NOTIFICATION = PUSHER.subscribe(CONFIG_PUSHER.NOTICE.CHANNEL);

let isConnect = false;

const urlAPI = {
  getGroupChat: '/group-chat',
};

const Dashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.misc.token);
  const userId = useSelector(state => state.misc.profile.id);
  const groupID = useSelector(state => state.misc.groupChatId);

  const handleAddMessage = (listMessage: any, message: any) => {
    const NEW_LIST_MESSAGE = handleBreakLastDate([...listMessage, message]);

    dispatch(setListMessageState(NEW_LIST_MESSAGE));
  };

  const handleTypeAddMessage = (isMe: boolean) => {
    const TYPE = isMe
      ? Keys.TYPE_ADD_MESSAGE.ADD_ME
      : Keys.TYPE_ADD_MESSAGE.ADD_OTHER;

    dispatch(setTypeAddMessage(TYPE));
  };

  const handleAddNoti = (notification: any) => {
    const listNotificationOld = store.getState().misc.listNotiIzumi;

    let listOld = listNotificationOld;
    listOld.unshift(notification);

    dispatch(setListNotiIzumi(listOld));
  };

  useEffect(() => {
    const handleConnectPusher = async () => {
      dispatch(setLoading(true));

      console.log('[IS CONNECT] =================> ', isConnect);
      if (token) {
        if (!isConnect) {
          isConnect = true;

          const SITE = Config.URL_DOMAIN_IZUMI_WEB_APP;
          const URL = urlAPI.getGroupChat;

          const response = await getGroupChat(SITE, URL);

          console.log('[GET GROUP ID] ===============> ', response.data);

          const GROUP_CHAT_ID = response.data.group_id;

          if (GROUP_CHAT_ID) {
            dispatch(setGroupChatId(GROUP_CHAT_ID));

            console.log(
              `[PUSHER MESSAGE] ================> CONNECT: ${CONFIG_PUSHER.MESSAGE.EVENT}${GROUP_CHAT_ID}`,
            );

            const EVENT_MESSAGE = `${CONFIG_PUSHER.MESSAGE.EVENT}${GROUP_CHAT_ID}`;

            CHANNEL_MESSAGE.bind(EVENT_MESSAGE, message => {
              const listMessage = store.getState().misc.listMessage;
              const MESSAGE = message.message;

              console.log('PUSHER MESSAGE =============> ', message);

              handleAddMessage(listMessage, MESSAGE);
              handleTypeAddMessage(userId === MESSAGE.sender_id);
            });
          } else {
            showToast({
              variant: 'warning',
              title: '警告',
              content:
                'グループチャットに追加されていません。管理者に連絡してください',
            });
          }

          console.log(
            `[PUSHER NOTIFICATION] ================> CONNECT: ${CONFIG_PUSHER.NOTICE.EVENT}`,
          );

          CHANNEL_NOTIFICATION.bind(
            CONFIG_PUSHER.NOTICE.EVENT,
            notification => {
              const ENV_NOTIFICATION = notification.app_env;

              if (Config.APP_ENV === ENV_NOTIFICATION) {
                const MESSAGE = notification.message;
                handleAddNoti(MESSAGE);
              }
            },
          );
        }
      }
    };

    handleConnectPusher();

    return () => {
      console.log('[PUSHER] ================> DISCONNECT');
      CHANNEL_MESSAGE.unbind_all();
      CHANNEL_NOTIFICATION.unbind_all();
      isConnect = false;
    };
  }, []);

  useEffect(() => {
    if (groupID) {
      console.log('[IZUMI APP] ===================> PROCESS START APP DONE');

      dispatch(setLoading(false));
    }
  }, [groupID]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Layout navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Dashboard;
