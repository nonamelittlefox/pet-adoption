/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import BaseButton from 'src/components/Button/BaseButton';
import BaseInput from 'src/components/Input/BaseInput';
import { Feather } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { postResetPassword } from 'src/api/modules/reset-password';
import { cleanObject } from 'src/utils/handleObject';
import { object2Path } from 'src/utils/object2Path';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { setLoading } from 'src/actions/miscActions';
import { Config, Validate } from 'src/const';

const urlAPI = {
  apiResetPassword: '/remind-passwords',
};

const ForgotPasswordScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [user_id, setUserID] = useState('');
  const [isShowInvalidUserID, setShowInvalidUserID] = useState(true);
  const [textValidateUserCode, setTextValidateUserCode] = useState('');

  const showToast = props => {
    Toast.show({
      text1: props.title,
      text2: props.content,
      type: props.variant,
      position: 'top',
    });
  };

  useEffect(() => {
    if (user_id) {
      handleValidateUserCode();
    }
  }, [user_id]);

  const handleValidateUserCode = () => {
    const nonNumericRegex = /^[1-9][0-9]*$/;

    if (user_id === '') {
      setTextValidateUserCode(Validate.Login.EmployeeCode.Blank);

      setShowInvalidUserID(true);
    } else if (!nonNumericRegex.test(user_id)) {
      setTextValidateUserCode(Validate.Login.EmployeeCode.Invalid);

      setShowInvalidUserID(true);
    } else {
      setShowInvalidUserID(false);
    }
  };

  const onForgotPassword = async () => {
    await Keyboard.dismiss();

    let QUERY = {
      emp_code: user_id,
    };

    QUERY = cleanObject(QUERY);

    const URL = `${urlAPI.apiResetPassword}?${object2Path(QUERY)}`;

    handleValidateUserCode();

    if (!isShowInvalidUserID) {
      dispatch(setLoading(true));

      setShowInvalidUserID(false);

      try {
        const response = await postResetPassword(Config.URL_DOMAIN_CLOUD, URL);

        if (response.status === 200) {
          navigation.push('NotifyResetPasswordScreen');
        }

        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));

        showToast({
          variant: 'error',
          title: 'エラー',
          content: error.response.data.message,
        });
      }
    }
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
                value={user_id}
                onChangeValue={setUserID}
                keyboardType={'numeric'}
                inputStyle={styles.baseInput}
                textInputStyle={styles.userInputStyle}
              />
            </View>

            {isShowInvalidUserID === true ? (
              <View style={styles.invalidErrorArea}>
                <Text style={styles.invalidErrorText}>
                  {textValidateUserCode}
                </Text>
              </View>
            ) : (
              <View style={{ marginVertical: 20.8 }} />
            )}

            <BaseButton
              title="パスワード再発行"
              onPressButton={onForgotPassword}
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

  inputPassword: {
    height: 60,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 45,
    marginBottom: 30,
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

export default ForgotPasswordScreen;
