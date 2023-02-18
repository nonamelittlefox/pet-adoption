/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import BaseButton from 'src/components/Button/BaseButton';
import BaseInput from 'src/components/Input/BaseInput';
import { Feather } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { postLogin } from 'src/api/modules/login';
import { setProfile, setToken } from 'src/actions/miscActions';
import { Config, Validate } from 'src/const';
import { useDispatch } from 'react-redux';
import { setLoading } from 'src/actions/miscActions';
import * as SecureStore from 'expo-secure-store';

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
    role_name: '',
    department_name: '',
    department_code: '',
    supervisor_email: '',
  };
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

  const showToast = props => {
    Toast.show({
      text1: props.title,
      text2: props.content,
      type: props.variant,
      position: 'top',
    });
  };

  useEffect(() => {
    const checkLogin = async () => {
      dispatch(setLoading(true));

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
    if (user_id) {
      handleValidateUserCode();
    }
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

  const urlAPI = {
    apiLogin: '/auth/login',
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
          const DATA = response.data.data.profile;
          const TOKEN = response.data.data.access_token;

          const RES_PROFILE = {
            id: DATA.id,
            uuid: DATA.uuid,
            name: DATA.name,
            email: DATA.email,
            role: DATA.role,
            role_name: response.data.data.roles[0] || null,
            department_code: DATA.department_code,
            department_name: DATA.department.name,
            supervisor_email: DATA.supervisor_email,
          };

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
        console.log(error.response);

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
              <Text style={styles.textLogo}>IZUMI</Text>
            </View>

            <View style={styles.zoneInput}>
              <View style={styles.inputUserId}>
                <View style={styles.iconUser}>
                  <Feather
                    style={{ lineHeight: 60 }}
                    name="user"
                    size={30}
                    color="#1534A1"
                  />
                </View>

                <BaseInput
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
                    style={{ lineHeight: 60 }}
                    name="lock"
                    size={30}
                    color="#1534A1"
                    backgroundColor="#FFFFFF"
                  />
                </View>

                <BaseInput
                  placeholder={'パスワード'}
                  value={password}
                  multiline={false}
                  onChangeValue={setPassword}
                  autoFocus={false}
                  inputStyle={styles.baseInput}
                  secureTextEntry={showPassword}
                />
                <Pressable
                  style={styles.iconEye}
                  onPress={() => togglePassword()}>
                  {showPassword ? (
                    <Feather
                      style={{ lineHeight: 60 }}
                      name="eye"
                      size={25}
                      color="#1534A1"
                    />
                  ) : (
                    <Feather
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
              <BaseButton
                title={'ログイン'}
                onPressButton={onLogin}
                buttonStyles={{ marginBottom: 20 }}
              />
              <BaseButton
                title="初めて使用する場合"
                onPressButton={onRegister}
                buttonStyles={{ marginBottom: 20 }}
              />
              <BaseButton
                title="パスワードを忘れてしまった場合"
                onPressButton={onForgetPassword}
              />
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
    justifyContent: 'center',
    padding: 10,
  },

  zoneLogo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textLogo: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#1534A1',
    textTransform: 'uppercase',
  },

  zoneInput: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 100,
  },

  inputUserId: {
    height: 60,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 24,
  },

  iconUser: {
    height: 60,
    width: 50,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 24,
  },

  inputPassword: {
    height: 60,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 45,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 24,
  },

  iconKey: {
    lineHeight: 60,
    width: 50,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 24,
  },

  iconEye: {
    lineHeight: 60,
    width: 50,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },

  zoneHelper: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },

  baseInput: {
    backgroundColor: 'white',
    width: '90%',
    height: 60,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },

  userInputStyle: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },

  invalidErrorArea: {
    paddingVertical: 10,
    paddingLeft: 20,
    borderRadius: 20,
    marginHorizontal: 10,
  },

  invalidErrorText: {
    color: '#FF0000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
