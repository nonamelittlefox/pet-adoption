import React from 'react';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import {
  setLoading,
  setToken,
  setProfile,
  setStateTokenFCM,
  setGroupChatId,
  setNumberNoticeAndMessage,
  setListMessageState,
} from 'src/actions/miscActions';
import * as SecureStore from 'expo-secure-store';
import { Config } from 'src/const';
import { postTokenFCM } from 'src/api/modules/message';
import useSelector from 'src/utils/useSelector';
import messaging from '@react-native-firebase/messaging';
import { setListAuthorizedStore } from 'src/actions/miscActions';

const URL_API = {
  postTokenFCM: '/user/save-token-fcm',
};

const Navbar = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const tokenFCM = useSelector(state => state.misc.tokenFCM);

  const onToggle = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const onLogout = async () => {
    dispatch(setLoading(true));

    dispatch(setListAuthorizedStore([]));

    try {
      const SITE = Config.URL_DOMAIN_IZUMI_WEB_APP;
      const URL = URL_API.postTokenFCM;
      const DATA = {
        token: tokenFCM,
        isLogOut: 1,
      };

      const res = await postTokenFCM(SITE, URL, DATA);

      console.log('REMOVE TOKEN FCM ===========> ', res.data);

      await SecureStore.setItemAsync('IS_REFRESH', '0');
      dispatch(setGroupChatId(null));

      dispatch(
        setNumberNoticeAndMessage({
          unread_messages: 0,
          unread_notices: 0,
        }),
      );

      dispatch(setListMessageState([]));

      await messaging().deleteToken();
      dispatch(setStateTokenFCM(''));

      dispatch(
        setProfile({
          id: null,
          uuid: null,
          name: '',
          email: '',
          role: '',
          role_name: '',
          department_name: '',
          department_code: '',
          supervisor_email: '',
        }),
      );
      await SecureStore.setItemAsync(
        'PROFILE',
        JSON.stringify({
          id: null,
          uuid: null,
          name: '',
          email: '',
          role: '',
          role_name: '',
          department_name: '',
          department_code: '',
          supervisor_email: '',
        }),
      );

      await SecureStore.setItemAsync('TOKEN', '');
      dispatch(setToken(''));

      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);

      await messaging().deleteToken();
      dispatch(setStateTokenFCM(''));

      dispatch(
        setProfile({
          id: null,
          uuid: null,
          name: '',
          email: '',
          role: '',
          role_name: '',
          department_name: '',
          department_code: '',
          supervisor_email: '',
        }),
      );
      await SecureStore.setItemAsync(
        'PROFILE',
        JSON.stringify({
          id: null,
          uuid: null,
          name: '',
          email: '',
          role: '',
          role_name: '',
          department_name: '',
          department_code: '',
          supervisor_email: '',
        }),
      );

      await SecureStore.setItemAsync('TOKEN', '');
      dispatch(setToken(''));

      dispatch(setLoading(false));
    }
  };

  return (
    <View style={NavbarStyle.container}>
      <Pressable
        accessibilityLabel={'_ToggleMenuButton'}
        testID="buttonMenu"
        style={NavbarStyle.zoneIcon}
        onPress={onToggle}>
        <FontAwesome
          style={{ lineHeight: 30 }}
          name="bars"
          size={30}
          color="#1534A1"
        />
        <Text style={NavbarStyle.textIconLeft}>メニュー</Text>
      </Pressable>
      <View style={NavbarStyle.zoneText}>
        <Text
          accessibilityLabel={'_LogoIzumi'}
          testID="logo"
          style={NavbarStyle.displayLogo}>
          IZUMI
        </Text>
      </View>
      <Pressable
        accessibilityLabel={'_LogoutButton'}
        testID="buttonLogout"
        style={NavbarStyle.zoneIcon}
        onPress={onLogout}>
        <FontAwesome
          style={{ lineHeight: 30 }}
          name="sign-out"
          size={30}
          color="#1534A1"
        />
        <Text style={NavbarStyle.textIconRight}>ログアウト</Text>
      </Pressable>
    </View>
  );
};

const NavbarStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },

  zoneIcon: {
    marginTop: 20,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },

  zoneText: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  displayLogo: {
    lineHeight: 45,
    fontSize: 40,
    fontWeight: '900',
    color: '#1534A1',
    textTransform: 'uppercase',
  },

  textIconLeft: {
    fontSize: 8,
    fontWeight: '900',
    display: 'flex',
    marginTop: 5,
    marginLeft: 5,
    color: '#1534A1',
  },

  textIconRight: {
    fontSize: 8,
    fontWeight: '900',
    display: 'flex',
    marginTop: 5,
    marginRight: 5,
    color: '#1534A1',
  },
});

export default Navbar;
