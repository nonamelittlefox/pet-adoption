/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { Config, Validate } from 'src/const';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { postLogin } from 'src/api/modules/login';
import { setLoading } from 'src/actions/miscActions';
import React, { memo, useState, useEffect } from 'react';
import { setProfile, setToken } from 'src/actions/miscActions';
import { View, Alert, StyleSheet, ImageBackground, Text, Pressable, TouchableWithoutFeedback, Keyboard, SafeAreaView, TouchableOpacity } from 'react-native';

import TouchID from 'react-native-touch-id';
import Toast from 'react-native-toast-message';
import * as SecureStore from 'expo-secure-store';
import BaseInput from 'src/components/Input/BaseInput';
import BaseButton from 'src/components/Button/BaseButton';

const getToken = async () => {
  const TOKEN = await SecureStore.getItemAsync('TOKEN');

  if (TOKEN) {
    return TOKEN;
  }

  return '';
};

const getProfile = async () => {
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
};

const urlAPI = {
  apiLogin: '/auth/login',
};

function LoginScreen({ navigation }: { navigation: any }) {
  const dispatch = useDispatch();

  const [user_id, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [isShowInvalidUserID, setShowInvalidUserID] = useState(true);
  const [validateUserID, setValidateUserID] = useState('');
  const [isShowInvalidPWD, setShowInvalidPWD] = useState(true);
  const [validatePassword, setValidatePassword] = useState('');

  const optionalConfigObject = {
    title: '認証が必要です',
    imageColor: '#e00606',
    imageErrorColor: '#ff0000',
    sensorDescription: 'タッチセンサー',
    sensorErrorDescription: '失敗した',
    cancelText: 'キャンセル',
    fallbackLabel: 'パスワード入力',
    unifiedErrors: false,
    passcodeFallback: true,
  };

  const alertComponent = (title, message, buttonText, buttonFunction) => {
    return Alert.alert(title, message, [{ text: buttonText, onPress: buttonFunction }], { cancelable: false });
  };

  const fallBack = () => {
    console.log('fallBack');
  };

  const handleBiometricAuthentication = async () => {
    let USER_DATA = {
      id: '',
      password: '',
    };

    await SecureStore.getItemAsync('USER_DATA').then((response) => {
      if (response) {
        USER_DATA.id = JSON.parse(response).id;
        USER_DATA.password = JSON.parse(response).password;
      } else {
        console.log('No login records / 本端末にログインしたことがありません。');
      }
    });

    console.log(USER_DATA.id);
    console.log(USER_DATA.password);

    if (USER_DATA.id !== '' && USER_DATA.password !== '') {
      try {
        const response = await TouchID.authenticate('指紋をスキャンしてください', optionalConfigObject);
  
        if (response) {
          console.log('response', response);
  
            dispatch(setLoading(true));
  
            setUserID(USER_DATA.id);
            setPassword(USER_DATA.password);
  
            await setTimeout(() => {
              dispatch(setLoading(false));
            }, 2000);
        }
      } catch (error) {
        console.log('error', error);
      }
    } else {
      return alertComponent(
        '注意',
        '本端末にログインしたことがありません。ログイン情報を自動入力するには少なくともログイン情報を一回入力してください。',
        'OK',
        fallBack,
      );
    }
  };

  const showToast = props => {
    Toast.show({
      text1: props.title,
      text2: props.content,
      type: props.variant,
      position: 'top',
    });
  };

  useEffect(() => {
    const getUserId = async () => {
      const USER_ID = await SecureStore.getItemAsync('USER_ID');

      if (USER_ID) {
        return USER_ID;
      }

      return '';
    };

    const checkLogin = async () => {
      dispatch(setLoading(true));

      setUserID(await getUserId());

      const TOKEN = await getToken();

      const PROFILE = await getProfile();

      if (TOKEN) {
        dispatch(setToken(TOKEN));
        dispatch(setProfile(PROFILE));

        navigation.push('DashboardScreen');
      }

      dispatch(setLoading(false));
    };

    checkLogin();
  }, []);

  useEffect(() => {
    const saveUserId = async () => {
      await SecureStore.setItemAsync('USER_ID', user_id);
    };

    if (user_id) {
      handleValidateUserCode();
    }

    saveUserId();
  }, [user_id]);

  useEffect(() => {
    if (password) {
      handleValidatePassword();
    }
  });

  const handleValidateUserCode = () => {
    const nonNumericRegex = /^[1-9][0-9]*$/;

    if (user_id === '') {
      setValidateUserID(Validate.Login.EmployeeCode.Blank);

      setShowInvalidUserID(true);
    } else if (!nonNumericRegex.test(user_id)) {
      setValidateUserID(Validate.Login.EmployeeCode.Invalid);

      setShowInvalidUserID(true);
    } else {
      setShowInvalidUserID(false);
    }
  };

  const handleValidatePassword = () => {
    if (password === '') {
      setValidatePassword(Validate.Login.Password.Blank);

      setShowInvalidPWD(true);
    } else if (password.length < 8 || password.length > 16) {
      setValidatePassword(Validate.Login.Password.Invalid);

      setShowInvalidPWD(true);
    } else {
      setShowInvalidPWD(false);
    }
  };

  const onLogin = async () => {
    await Keyboard.dismiss();

    const account = {
      id: user_id,
      password: password,
    };

    handleValidateUserCode();
    handleValidatePassword();

    if (isShowInvalidUserID === false && isShowInvalidPWD === false) {
      dispatch(setLoading(true));

      setShowInvalidPWD(false);
      setShowInvalidUserID(false);

      try {
        const response = await postLogin(
          Config.URL_DOMAIN_CLOUD,
          urlAPI.apiLogin,
          account,
          '',
        );

        if (response.status === 200) {
          await SecureStore.setItemAsync('USER_DATA', JSON.stringify(account));

          const DATA = response.data.data.profile;

          const TOKEN = response.data.data.access_token;

          const RES_PROFILE = {
            id: DATA.id,
            uuid: DATA.uuid,
            name: DATA.name,
            email: DATA.email,
            role: DATA.role,
            role_name: response.data.data.roles[0] || null,
            department_name: DATA.department.name,
            department_code: DATA.department_code,
            supervisor_email: DATA.supervisor_email,
          };

          console.log('++++++++++++++++++++++++++++++++++++++++++++++++');
          console.log(RES_PROFILE);
          console.log('++++++++++++++++++++++++++++++++++++++++++++++++');

          await SecureStore.setItemAsync('IS_REFRESH', '0');

          dispatch(setProfile(RES_PROFILE));
          await SecureStore.setItemAsync(
            'PROFILE',
            JSON.stringify(RES_PROFILE),
          );

          dispatch(setToken(TOKEN));
          await SecureStore.setItemAsync('TOKEN', TOKEN);

          navigation.push('DashboardScreen');
        } else {
          showToast({
            variant: 'warning',
            title: '警告',
            content: 'サインインに失敗しました。',
          });
        }
      } catch (error) {
        console.log(error.response.data);

        showToast({
          variant: 'error',
          title: 'エラー',
          content: error.response.data.message,
        });
      }
    }

    dispatch(setLoading(false));
  };

  const onRegister = () => {
    navigation.push('SignUpScreen');
  };

  const onForgetPassword = () => {
    navigation.push('ForgotPasswordScreen');
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <ImageBackground
            source={{
              uri: 'https://gitlab.com/lyphuong1990/izumi-git-cloud/-/raw/main/izumi-background.jpg',
            }}
            resizeMode="cover"
            style={styles.backgroundImage}>
            <View style={styles.zoneLogo}>
              <Text accessibilityLabel="_Logo" style={styles.textLogo}>
                IZUMI
              </Text>
            </View>

            <View style={styles.zoneInput}>
              <View style={styles.inputUserId}>
                <View style={styles.iconUser}>
                  <Feather
                    accessibilityLabel={'_IconUser'}
                    style={{ lineHeight: 60 }}
                    name="user"
                    size={30}
                    color="#1534A1"
                  />
                </View>

                <BaseInput
                  accessibilityLabel={'_UserIDInput'}
                  testID="userIDInput"
                  placeholder={'社員番号'}
                  value={user_id}
                  onChangeValue={setUserID}
                  autoFocus={false}
                  keyboardType={'numeric'}
                  inputStyle={styles.baseInput}
                  textInputStyle={styles.userInputStyle}
                />
              </View>

              {isShowInvalidUserID === true ? (
                <View style={styles.invalidErrorArea}>
                  <Text style={styles.invalidErrorText}>{validateUserID}</Text>
                </View>
              ) : (
                <View style={{ marginVertical: 20.8 }} />
              )}

              <View style={styles.inputPassword}>
                <View style={styles.iconKey}>
                  <Feather
                    accessibilityLabel={'_IconPassword'}
                    style={{ lineHeight: 60 }}
                    name="lock"
                    size={30}
                    color="#1534A1"
                    backgroundColor="#FFFFFF"
                  />
                </View>

                <BaseInput
                  accessibilityLabel={'_PasswordInput'}
                  testID="passwordInput"
                  placeholder={'パスワード'}
                  value={password}
                  multiline={false}
                  onChangeValue={setPassword}
                  autoFocus={false}
                  inputStyle={styles.authInput}
                  secureTextEntry={showPassword}
                />

                <Pressable
                  accessibilityLabel={'_TogglePasswordButton'}
                  testID="buttonTogglePassword"
                  style={styles.iconEye}
                  onPress={() => togglePassword()}>
                  {showPassword ? (
                    <Feather
                      accessibilityLabel={'_IconShowPassword'}
                      style={{ lineHeight: 60 }}
                      name="eye"
                      size={25}
                      color="#1534A1"
                    />
                  ) : (
                    <Feather
                      accessibilityLabel={'_IconHidePassword'}
                      style={{ lineHeight: 60 }}
                      name="eye-off"
                      size={25}
                      color="#1534A1"
                    />
                  )}
                </Pressable>
              </View>

              {isShowInvalidPWD === true ? (
                <View style={styles.invalidErrorArea}>
                  <Text style={styles.invalidErrorText}>
                    {validatePassword}
                  </Text>
                </View>
              ) : (
                <View style={{ marginVertical: 20.8 }} />
              )}
            </View>

            <View style={styles.zoneHelper}>
              <View style={styles.authenticationGroup}>
                  <View style={styles.buttonLoginHolder}>
                    <TouchableOpacity testID="buttonLogin" onPress={onLogin} style={styles.buttonLogin}>
                      <Text style={styles.buttonLoginText}>ログイン</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.buttonBiomertricAuthenticationHolder}>
                    <TouchableOpacity
                      testID='buttonBiometricAuthentication'
                      onPress={handleBiometricAuthentication}
                      style={styles.buttonBiomertricAuthentication}
                    >
                      <Ionicons
                        name="finger-print-outline"
                        accessibilityLabel={'_IconFingerPrint'}
                        style={{ flex: 1, lineHeight: 60, textAlign: 'center' }}
                        size={35}
                        color="#1534A1"
                      />

                      <MaterialCommunityIcons
                        name="face-recognition"
                        accessibilityLabel={'_IconFaceID'}
                        style={{ flex: 1, lineHeight: 60, textAlign: 'center', marginRight: 10 }}
                        size={35}
                        color="#1534A1"
                      />
                    </TouchableOpacity>
                  </View>
              </View>

              <View style={{ flex: 1, marginVertical: 20 }}>
                <BaseButton
                  accessibilityLabel={'_RegisterButton'}
                  testID="buttonRegister"
                  title="初めて使用する場合"
                  onPressButton={onRegister}
                />
              </View>

              <View style={{ flex: 1, marginVertical: 20 }}>
                <BaseButton
                  accessibilityLabel={'_ForgetPasswordButton'}
                  testID="buttonForgetPassword"
                  title="パスワードを忘れてしまった場合"
                  onPressButton={onForgetPassword}
                />
              </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

export default memo(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundImage: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },

  zoneLogo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textLogo: {
    fontSize: 64,
    color: '#1534A1',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  zoneInput: {
    flex: 1,
    marginBottom: 10,
    justifyContent: 'center',
  },

  inputUserId: {
    height: 60,
    elevation: 24,
    borderRadius: 20,
    shadowRadius: 20.0,
    shadowOpacity: 0.25,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    shadowColor: '#000000',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',

    shadowOffset: {
      width: 0,
      height: 18,
    },
  },

  iconUser: {
    width: 50,
    height: 60,
    elevation: 24,
    shadowRadius: 20.0,
    shadowOpacity: 0.25,
    alignItems: 'center',
    paddingHorizontal: 10,
    shadowColor: '#000000',
    borderTopLeftRadius: 20,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: 'transparent',
    borderBottomLeftRadius: 20,

    shadowOffset: {
      width: 0,
      height: 18,
    },
  },

  inputPassword: {
    height: 60,
    elevation: 24,
    shadowRadius: 20.0,
    shadowOpacity: 0.25,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 45,
    shadowColor: '#000000',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',

    shadowOffset: {
      width: 0,
      height: 18,
    },
  },

  iconKey: {
    width: 50,
    elevation: 24,
    lineHeight: 60,
    shadowRadius: 20.0,
    shadowOpacity: 0.25,
    alignItems: 'center',
    paddingHorizontal: 10,
    shadowColor: '#000000',
    borderTopLeftRadius: 20,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 20,

    shadowOffset: {
      width: 0,
      height: 18,
    },
  },

  iconEye: {
    width: 50,
    lineHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 20,
    backgroundColor: '#FFFFFF',
    borderBottomRightRadius: 20,
  },

  zoneHelper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },

  baseInput: {
    height: 60,
    width: '90%',
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },

  authInput: {
    height: 60,
    width: '90%',
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },

  userInputStyle: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },

  invalidErrorArea: {
    paddingLeft: 20,
    borderRadius: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
  },

  invalidErrorText: {
    fontSize: 16,
    color: '#FF0000',
    fontWeight: 'bold',
  },
  
  confirmButton: {
    bottom: 20,
    width: 150,
    height: 40,
    marginTop: 20,
    borderRadius: 45,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: '#082D4F',
  },

  authenticationGroup: {
    flex: 1,
    elevation: 24,
    maxHeight: 60,
    marginBottom: 20 ,
    shadowRadius: 20.0,
    shadowOpacity: 0.25,
    flexDirection: 'row',
    marginHorizontal: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,

    shadowOffset: {
      width: 0,
      height: 18,
    },
  },

  buttonLoginHolder: {
    flex: 3,
    height: 60,
    borderTopLeftRadius: 15,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 15,
  },

  buttonLogin: {
    height: 60,
    alignContent: 'center',
    justifyContent: 'center',
  },

  buttonLoginText: {
    fontSize: 18,
    color: '#1534A1',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingLeft: 100,
  },

  buttonBiomertricAuthenticationHolder: {
    flex: 1,
    height: 60,
    flexDirection: 'row',
    borderTopRightRadius: 15,
    backgroundColor: '#FFFFFF',
    borderBottomRightRadius: 15,
  },

  buttonBiomertricAuthentication: {
    flex: 1,
    flexDirection: 'row',
    height: 60,
    alignContent: 'center',
    justifyContent: 'center',
  },
});
