/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput
} from 'react-native';
import BaseButton from 'src/components/Button/BaseButton';
import BaseInput from 'src/components/Input/BaseInput';
import { Feather } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { postRegister } from 'src/api/modules/register';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { setLoading } from 'src/actions/miscActions';
import { Config, Validate } from 'src/const';

const urlAPI = {
  apiRegister: '/register-account',
};

const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [user_code, setUserCode] = useState('');
  const [email, setEmail] = useState('');
  const [isShowInvalidUserID, setShowInvalidUserID] = useState(true);
  const [validateUserID, setValidateUserID] = useState('');
  const [isShowInvalidEmail, setShowInvalidEmail] = useState(true);
  const [validateEmail, setValidateEmail] = useState('');

  const showToast = props => {
    Toast.show({
      text1: props.title,
      text2: props.content,
      type: props.variant,
      position: 'top',
    });
  };

  useEffect(() => {
    if (user_code) {
      handleValidateUserCode();
    }
  }, [user_code]);

  useEffect(() => {
    if (email) {
      handleValidateEmail();
    }
  }, [email]);

  const handleValidateUserCode = () => {
    const nonNumericRegex = /^[1-9][0-9]*$/;

    if (user_code === '') {
      setValidateUserID(Validate.Login.EmployeeCode.Blank);

      setShowInvalidUserID(true);
    } else if (!nonNumericRegex.test(user_code)) {
      setValidateUserID(Validate.Login.EmployeeCode.Invalid);

      setShowInvalidUserID(true);
    } else {
      setShowInvalidUserID(false);
    }
  };

  const handleValidateEmail = () => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email === '') {
      setValidateEmail(Validate.SignUp.Mail.Blank);

      setShowInvalidEmail(true);
    } else if (!re.test(email)) {
      setValidateEmail(Validate.SignUp.Mail.Invalid);

      setShowInvalidEmail(true);
    } else {
      setShowInvalidEmail(false);
    }
  };

  const onSignUp = async () => {
    await Keyboard.dismiss();

    const DATA = {
      user_code: user_code,
      email: email,
    };

    handleValidateUserCode();
    handleValidateEmail();

    if (!isShowInvalidUserID && !isShowInvalidEmail) {
      dispatch(setLoading(true));

      setShowInvalidUserID(false);

      setShowInvalidEmail(false);

      try {
        const response = await postRegister(
          Config.URL_DOMAIN_CLOUD,
          urlAPI.apiRegister,
          DATA,
          '',
        );

        if (response.status === 200) {
          navigation.push('MessageSignUpScreen');
        }
      } catch (error) {
        showToast({
          variant: 'error',
          title: 'エラー',
          content: error.response.data.message,
        });
      }
    }

    dispatch(setLoading(false));
  };

  return (
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
                value={user_code}
                onChangeValue={setUserCode}
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

            <View style={styles.inputEmail}>
              <View style={styles.iconKey}>
                <Feather
                  style={{ lineHeight: 60 }}
                  name="mail"
                  size={30}
                  color="#1534A1"
                  backgroundColor="#FFFFFF"
                />
              </View>
              <TextInput
                placeholder={'メールアドレス'}
                value={email}
                multiline={false}
                onChangeText={setEmail}
                style={styles.baseInput}
              />
            </View>

            {isShowInvalidEmail === true ? (
              <View style={styles.invalidErrorArea}>
                <Text style={styles.invalidErrorText}>{validateEmail}</Text>
              </View>
            ) : (
              <View style={{ marginVertical: 20.8 }} />
            )}

            <BaseButton
              testID="buttonSignUp"
              title={'登録'}
              onPressButton={onSignUp}
            />
          </View>

          <View style={styles.zoneHelper} />
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

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
  },

  inputUserId: {
    height: 60,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 20,
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
  },

  inputEmail: {
    height: 60,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 20,
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

export default SignUpScreen;
