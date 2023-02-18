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
} from 'src/actions/miscActions';
import * as SecureStore from 'expo-secure-store';
import { Config } from 'src/const';
import { postTokenFCM } from 'src/api/modules/message';
import useSelector from 'src/utils/useSelector';
import messaging from '@react-native-firebase/messaging';

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

    try {
      const SITE = Config.URL_DOMAIN_IZUMI_WEB_APP;
      const URL = URL_API.postTokenFCM;
      const DATA = {
        token: tokenFCM,
        isLogOut: 1,
      };

      const res = await postTokenFCM(SITE, URL, DATA);

      console.log('REMOVE TOKEN FCM ===========> ', res.data);

      await messaging().deleteToken();
      dispatch(setStateTokenFCM(''));

      dispatch(
        setProfile({
          id: null,
          uuid: null,
          name: '',
          email: '',
          role: '',
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
          department_code: '',
          supervisor_email: '',
        }),
      );

      await SecureStore.setItemAsync('TOKEN', '');
      dispatch(setToken(''));

      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  };

  return (
    <View style={NavbarStyle.container}>
      <Pressable style={NavbarStyle.zoneIcon} onPress={onToggle}>
        <FontAwesome
          style={{ lineHeight: 30 }}
          name="bars"
          size={30}
          color="#1534A1"
        />
      </Pressable>
      <View style={NavbarStyle.zoneText}>
        <Text style={NavbarStyle.displayLogo}>IZUMI</Text>
      </View>
      <Pressable style={NavbarStyle.zoneIcon} onPress={onLogout}>
        <FontAwesome
          style={{ lineHeight: 30 }}
          name="sign-out"
          size={30}
          color="#1534A1"
        />
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
    width: 50,
    height: 50,
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
});

export default Navbar;
