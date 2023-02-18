/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Platform } from 'react-native';
import Toast, { BaseToast } from 'react-native-toast-message';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import Loading from 'src/components/Loading';
import useSelector from 'src/utils/useSelector';
import LoginScreen from 'src/screens/LoginScreen/index';
import DashboardScreen from 'src/screens/DashboardScreen/index';
import SignUpScreen from './src/screens/SignUpScreen/index';
import MessageSignUpScreen from './src/screens/MessageSignUpScreen/index';
import ChangePasswordScreen from './src/screens/ChangePasswordScreen/index';
import MessageConfirmPasswordScreen from './src/screens/MessageConfirmPasswordScreen/index';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen/index';
import NotifyResetPasswordScreen from './src/screens/NotifyResetPasswordScreen/index';
import { StackName, Options } from './src/const/Stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from 'src/store';
import { enableScreens } from 'react-native-screens';
import { useDispatch } from 'react-redux';
import {
  setRenderMenu,
  setStateTokenFCM,
  setNumberNoticeAndMessage,
  setStateSeenMessage,
  disconnectPusher,
  isConnectPusher,
  setToken,
} from 'src/actions/miscActions';
import { Config, Keys } from 'src/const';
import { postTokenFCM, postSeenMessage } from 'src/api/modules/message';
import { postRefreshToken } from 'src/api/modules/login';
import { isCheckTokenExp } from 'src/utils/handleRefreshToken';
import { decodeToken } from 'src/utils/decodeToken';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import messaging from '@react-native-firebase/messaging';
import { NumberNoticeAndMessage, ExpToken } from 'src/types';
import * as SecureStore from 'expo-secure-store';

const URL_API = {
  postTokenFCM: '/user/save-token-fcm',
  postSeenMessage: '/seen-message',
  refreshToken: '/auth/refresh',
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Stack = createNativeStackNavigator();

function MyStack() {
  const token = useSelector(state => state.misc.token);

  return (
    <Stack.Navigator>
      {!token ? (
        <>
          <Stack.Screen
            options={Options.LoginScreen}
            name={StackName.LoginScreen}
            component={LoginScreen}
          />

          <Stack.Screen
            options={Options.SignUpScreen}
            name={StackName.SignUpScreen}
            component={SignUpScreen}
          />

          <Stack.Screen
            options={Options.ForgotPasswordScreen}
            name={StackName.ForgotPasswordScreen}
            component={ForgotPasswordScreen}
          />

          <Stack.Screen
            options={Options.MessageConfirmPasswordScreen}
            name={StackName.MessageConfirmPasswordScreen}
            component={MessageConfirmPasswordScreen}
          />

          <Stack.Screen
            options={Options.MessageSignUpScreen}
            name={StackName.MessageSignUpScreen}
            component={MessageSignUpScreen}
          />

          <Stack.Screen
            options={Options.NotifyResetPasswordScreen}
            name={StackName.NotifyResetPasswordScreen}
            component={NotifyResetPasswordScreen}
          />

          <Stack.Screen
            options={Options.ChangePasswordScreen}
            name={StackName.ChangePasswordScreen}
            component={ChangePasswordScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            options={Options.DashboardScreen}
            name={StackName.DashboardScreen}
            component={DashboardScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={styles.successToast}
      text1Style={{
        color: '#444444',
        fontWeight: 'bold',
        fontSize: 18,
      }}
      text2Style={{
        fontSize: 14,
      }}
      text2NumberOfLines={2}
      duration={2000}
    />
  ),

  warning: props => (
    <BaseToast
      {...props}
      style={styles.warningToast}
      text1Style={{
        color: '#444444',
        fontWeight: 'bold',
        fontSize: 18,
      }}
      text2Style={{
        fontSize: 14,
      }}
      text2NumberOfLines={2}
      duration={2000}
    />
  ),

  error: props => (
    <BaseToast
      {...props}
      style={styles.errorToast}
      text1Style={{
        color: '#444444',
        fontWeight: 'bold',
        fontSize: 18,
      }}
      text2Style={{
        fontSize: 14,
      }}
      text2NumberOfLines={2}
      duration={2000}
    />
  ),
};

/**
 * Optimize memory usage and performance: https://reactnavigation.org/docs/react-native-screens/
 */
enableScreens();

const App = () => {
  const dispatch = useDispatch();
  const navigationRef = useNavigationContainerRef();

  const stateLoading = useSelector(state => state.misc.isLoading);
  const stateToken = useSelector(state => state.misc.token);
  const stateTokenFCM = useSelector(state => state.misc.tokenFCM);
  const listSeen = useSelector(state => state.misc.listSeen);
  const renderMenu = useSelector(state => state.misc.renderMenu);
  const numberNoticeAndMessage = useSelector(
    state => state.misc.numberNoticeAndMessage,
  );
  const [isProcess, setIsProcess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(stateLoading);
  }, [stateLoading]);

  useEffect(() => {
    const handleGetListSeen = async () => {
      const listSeen = await SecureStore.getItemAsync('LIST_SEEN');

      if (listSeen) {
        if (Array.isArray(JSON.parse(listSeen))) {
          return JSON.parse(listSeen);
        } else {
          return [];
        }
      }

      return [];
    };

    const handleSetOldListSeen = async () => {
      dispatch(setStateSeenMessage(await handleGetListSeen()));
    };

    handleSetOldListSeen();
  }, []);

  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      console.log('PERMISSON ========> REGISTER FOR PUSH NOTIFICATIONS ASYNC');

      if (Device.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();

        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();

          finalStatus = status;
        }

        if (finalStatus !== 'granted') {
          console.log(
            'PERMISSON ========> FAILED TO GET PUSH TOKEN FOR PUSH NOTIFICATION!',
          );

          return;
        }
      } else {
        console.log(
          'PERMISSON ========> MUST USE PHYSICAL DEVICE FOR PUSH NOTIFICATIONS',
        );
      }

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [400, 400, 400, 400],
          lightColor: '#FF231F7C',
        });
      }
    };

    registerForPushNotificationsAsync();
  }, []);

  useEffect(() => {
    const onAppBootstrap = async () => {
      let authorizationStatus;

      if (Platform.OS === 'android') {
        // await messaging().registerDeviceForRemoteMessages();

        const token = await messaging().getToken();
        console.log('FCM TOKEN ======> ', token);
        dispatch(setStateTokenFCM(token));
      } else {
        console.log('PERMISSON IOS ========> GET AUTHORIZATION STATUS');
        authorizationStatus = await messaging().requestPermission();

        if (authorizationStatus) {
          // await messaging().registerDeviceForRemoteMessages();

          const token = await messaging().getToken();
          console.log('FCM TOKEN ======> ', token);
          dispatch(setStateTokenFCM(token));
        }
      }
    };

    onAppBootstrap();
  }, []);

  useEffect(() => {
    const showNotification = async (message: any, isHidden?: Boolean) => {
      console.log('IZUMI APP ==============> showNotification');
      const token = store.getState().misc.token;

      if (token) {
        let numberNotification = store.getState().misc.numberNoticeAndMessage;

        const TYPE = message.data.type;

        if (TYPE === Keys.TYPE_NOTIFICATION.MESSAGE) {
          dispatch(
            setNumberNoticeAndMessage({
              ...numberNotification,
              unread_messages: numberNotification.unread_messages + 1,
            }),
          );
        }

        if (TYPE === Keys.TYPE_NOTIFICATION.NOTICE) {
          dispatch(
            setNumberNoticeAndMessage({
              ...numberNotification,
              unread_notices: numberNotification.unread_notices + 1,
            }),
          );
        }

        if (!isHidden) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: message.notification.title,
              body: message.notification.body,
              sound: Platform.OS === 'android' ? null : 'default',
              vibrate: [400, 400, 400, 400],
            },
            trigger: null,
          });
        }
      }
    };

    const onMessageBackground = async message => {
      console.log('IZUMI APP ==============> onMessageBackground');
      const token = store.getState().misc.token;

      if (token) {
        let numberNotification = store.getState().misc.numberNoticeAndMessage;

        const TYPE = message.data.type;

        if (TYPE === Keys.TYPE_NOTIFICATION.MESSAGE) {
          dispatch(
            setNumberNoticeAndMessage({
              ...numberNotification,
              unread_messages: numberNotification.unread_messages + 1,
            }),
          );
        }

        if (TYPE === Keys.TYPE_NOTIFICATION.NOTICE) {
          dispatch(
            setNumberNoticeAndMessage({
              ...numberNotification,
              unread_notices: numberNotification.unread_notices + 1,
            }),
          );
        }
      }
    };

    const onMessageReceived = async message => {
      console.log('FCM MESSAGE ======> ', message);

      let SCREEN = '';

      if (navigationRef.isReady()) {
        SCREEN = navigationRef.current.getCurrentRoute().name;
      }

      const TYPE = message.data.type;
      const USER_CODE = store.getState().misc.profile.uuid;

      const ENV_NOTIFICATION = message.data.app_env;

      if (ENV_NOTIFICATION === Config.APP_ENV) {
        if (Keys.IGNORE_NOTIFICATION.includes(SCREEN) === false) {
          if (TYPE === Keys.TYPE_NOTIFICATION.MESSAGE) {
            if (message.data.user_code !== USER_CODE) {
              showNotification(message);
            }
          } else {
            showNotification(message);
          }
        }

        if (Keys.IGNORE_NOTIFICATION.includes(SCREEN)) {
          const CURRENT_TAB = store.getState().misc.tab.current_tab;

          if (CURRENT_TAB === Keys.TAB_NOTE.TEAM) {
            if (TYPE === Keys.TYPE_NOTIFICATION.NOTICE) {
              showNotification(message);
            }

            if (TYPE === Keys.TYPE_NOTIFICATION.MESSAGE) {
              let numberNotification =
                store.getState().misc.numberNoticeAndMessage;

              dispatch(
                setNumberNoticeAndMessage({
                  ...numberNotification,
                  unread_messages: 0,
                }),
              );
            }
          }

          if (CURRENT_TAB === Keys.TAB_NOTE.IZUMI) {
            if (TYPE === Keys.TYPE_NOTIFICATION.MESSAGE) {
              if (message.data.user_code !== USER_CODE) {
                showNotification(message);
              }
            }

            if (TYPE === Keys.TYPE_NOTIFICATION.NOTICE) {
              let numberNotification =
                store.getState().misc.numberNoticeAndMessage;

              dispatch(
                setNumberNoticeAndMessage({
                  ...numberNotification,
                  unread_notices: numberNotification.unread_notices + 1,
                }),
              );
            }
          }

          if (CURRENT_TAB === Keys.TAB_NOTE.IZUMI_DETAIL) {
            if (TYPE === Keys.TYPE_NOTIFICATION.MESSAGE) {
              if (message.data.user_code !== USER_CODE) {
                showNotification(message);
              }
            }

            if (TYPE === Keys.TYPE_NOTIFICATION.NOTICE) {
              showNotification(message);
            }
          }
        }
      }
    };

    console.log('FCM ============> SET BACKGROUND MESSAGE LISTENER');
    messaging().onMessage(onMessageReceived);
    messaging().setBackgroundMessageHandler(onMessageBackground);
  }, []);

  useEffect(() => {
    const handleTokenFCM = async () => {
      const TOKEN_FCM = stateTokenFCM || (await messaging().getToken());
      dispatch(setStateTokenFCM(TOKEN_FCM));
      console.log('FCM TOKEN ======> ', TOKEN_FCM);
      console.log('TOKEN ========> ', stateToken);

      try {
        const SITE = Config.URL_DOMAIN_IZUMI_WEB_APP;
        const URL = URL_API.postTokenFCM;
        const DATA = {
          token: TOKEN_FCM,
          isLogOut: 0,
        };

        const res = await postTokenFCM(SITE, URL, DATA);

        console.log('SAVE TOKEN FCM ===========> ', res.data);
      } catch (error) {
        console.log('SAVE TOKEN FCM ===========> ', error.response.data);
      }
    };

    if (stateToken) {
      handleTokenFCM();
    }
  }, [stateToken]);

  const sumValues = (obj: NumberNoticeAndMessage) => {
    return Object.values(obj).reduce((a, b) => a + b);
  };

  useEffect(() => {
    const handleSeenMessage = async () => {
      const handleSeenMessage = async data => {
        const SITE = Config.URL_DOMAIN_IZUMI_WEB_APP;
        const URL = URL_API.postSeenMessage;
        const DATA = data;

        const res = await postSeenMessage(SITE, URL, DATA);

        console.log('SEEN MESSAGE ==================> ', res.data);

        return res.data.code === 200 ? true : false;
      };

      if (navigationRef) {
        let SCREEN = '';

        if (navigationRef.isReady()) {
          SCREEN = navigationRef.current.getCurrentRoute().name;

          console.log('CURRENT ROUTE =============> ', SCREEN);
        }

        if (SCREEN !== 'Note') {
          if (listSeen.length && isProcess === false) {
            const len = listSeen.length;
            let idx = 0;

            setIsProcess(true);

            while (idx < len) {
              console.log(
                'CALL API SEEN MESSAGE =======================> ',
                listSeen[idx],
              );
              const res = handleSeenMessage(listSeen[idx]);

              if (res) {
                let LIST = listSeen;
                LIST.shift();
                dispatch(setStateSeenMessage(LIST));
                await SecureStore.setItemAsync(
                  'LIST_SEEN',
                  JSON.stringify(listSeen),
                );
              }

              idx++;
            }

            setIsProcess(false);
            const PROCESS_MENU = renderMenu + 1;
            setRenderMenu(PROCESS_MENU);
          }

          dispatch(disconnectPusher(true));
          dispatch(isConnectPusher(false));
        } else {
          dispatch(disconnectPusher(false));
        }
      }
    };

    if (stateToken) {
      handleSeenMessage();
      console.log('SEEN MESSAGE ===========================> DONE');
    }
  });

  useEffect(() => {
    const handleSetBadge = async () => {
      const TOTAL = sumValues(numberNoticeAndMessage);

      await Notifications.setBadgeCountAsync(TOTAL);
    };

    handleSetBadge();
  }, [numberNoticeAndMessage]);

  useEffect(() => {
    const refreshTokenInterval = setInterval(async () => {
      const EXP_TOKEN: ExpToken = decodeToken(stateToken);

      const GET_IS_REFRESH = await SecureStore.getItemAsync('IS_REFRESH');
      const IS_REFRESH = Boolean(parseInt(GET_IS_REFRESH));

      // console.log('RUN REFRESH =============> ', IS_REFRESH);

      if (EXP_TOKEN) {
        if (isCheckTokenExp(EXP_TOKEN.exp)) {
          const GET_IS_REFRESH = await SecureStore.getItemAsync('IS_REFRESH');
          const IS_REFRESH = Boolean(parseInt(GET_IS_REFRESH));

          console.log('IZUMI APP =====> CHECK REFRESH: ', IS_REFRESH);

          if (!IS_REFRESH) {
            console.log('WORKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK');
            await SecureStore.setItemAsync('IS_REFRESH', '1');
            const SITE = Config.URL_DOMAIN_CLOUD;
            const URL = URL_API.refreshToken;

            const REFRESH_TOKEN = await postRefreshToken(SITE, URL);

            const DATA = REFRESH_TOKEN.data;

            if (DATA.code === 200) {
              const NEW_TOKEN = `Bearer ${DATA.data.access_token}`;
              dispatch(setToken(NEW_TOKEN));

              console.log('REFRESH TOKEN ==================> ', NEW_TOKEN);
            }

            await SecureStore.setItemAsync('IS_REFRESH', '0');

            console.log('ENDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');
          }
        }
      }
    }, 1000);

    return () => {
      clearInterval(refreshTokenInterval);
    };
  });

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          <StatusBar style="auto" />
          <MyStack />
          <Toast config={toastConfig} />
        </NavigationContainer>
        {isLoading ? <Loading /> : <></>}
      </SafeAreaProvider>
    </View>
  );
};

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate loading={<View />} persistor={persistor}>
        <SafeAreaProvider>
          <App />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  warningToast: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    borderLeftColor: '#FCD900',
    borderLeftWidth: 8,
    borderRadius: 5,
    width: '90%',
    height: 80,
    backgroundColor: '#FFFFFF',
  },
  successToast: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    borderLeftColor: '#81B214',
    borderLeftWidth: 8,
    borderRadius: 5,
    width: '90%',
    height: 80,
    backgroundColor: '#FFFFFF',
  },
  errorToast: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    borderLeftColor: '#BE0000',
    borderLeftWidth: 8,
    borderRadius: 5,
    width: '90%',
    height: 80,
    backgroundColor: '#FFFFFF',
  },
});
