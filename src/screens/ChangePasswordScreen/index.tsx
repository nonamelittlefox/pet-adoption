/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import BaseButton from 'src/components/Button/BaseButton';
import BaseInput from 'src/components/Input/BaseInput';
import { Feather } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { Validate } from 'src/const';

const ChangePasswordScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const [isValidatePassword, setIsValidatePassword] = useState(true);
  const [textValidatePassword, setTextValidatePassword] = useState('');
  const [isValidateConfirmPassword, setValidateConfirmPassword] = useState(true);
  const [textValidateConfirmPassword, setTextValidateConfirmPassword] = useState('');

  useEffect(() => {
    if (password) {
      handleValidatePassword();
    }
  }, [password]);

  useEffect(() => {
    if (confirmPassword) {
      handleValidatConfirmPassword();
    }
  }, [password]);

  const handleValidatePassword = () => {
    if (password === '') {
      setTextValidatePassword(Validate.Login.Password.Blank);

      setIsValidatePassword(true);
    } else if (password.length < 8 || password.length > 16) {
      setTextValidatePassword(Validate.ResetPassword.Password.NewPasswordInvalid);

      setIsValidatePassword(true);
    } else {
      setIsValidatePassword(false);
    }
  };

  const handleValidatConfirmPassword = () => {
    if (confirmPassword === '') {
      setTextValidateConfirmPassword(Validate.Login.Password.Blank);

      setValidateConfirmPassword(true);
    } else if (password.length < 8 || password.length > 16) {
      setTextValidateConfirmPassword(Validate.ResetPassword.Password.NewPasswordInvalid);

      setValidateConfirmPassword(true);
    } else {
      setValidateConfirmPassword(false);
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onChangePassword = () => {
    handleValidatePassword();
    handleValidatConfirmPassword();

    if (!isValidatePassword && !isValidateConfirmPassword) {
      navigation.push('MessageConfirmPasswordScreen');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: 'https://gitlab.com/lyphuong1990/izumi-git-cloud/-/raw/main/izumi-background.jpg' }}
          resizeMode="cover"
          style={styles.backgroundImage}>
          <View style={styles.zoneLogo}>
            <Text style={styles.textLogo}>IZUMI</Text>
          </View>

          <View style={styles.zoneInput}>
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
                placeholder={'メールアドレス'}
                value={password}
                multiline={false}
                onChangeValue={setPassword}
                inputStyle={styles.baseInput}
                secureTextEntry={showPassword}
              />
              <Pressable style={styles.iconEye} onPress={() => togglePassword()}>
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

            {isValidatePassword === true ? (
              <View style={styles.invalidErrorArea}>
                <Text style={styles.invalidErrorText}>
                  {textValidatePassword}
                </Text>
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
                placeholder={'メールアドレス'}
                value={confirmPassword}
                multiline={false}
                onChangeValue={setConfirmPassword}
                inputStyle={styles.baseInput}
                secureTextEntry={showConfirmPassword}
              />
              <Pressable
                style={styles.iconEye}
                onPress={() => toggleConfirmPassword()}>
                {showConfirmPassword ? (
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

            {isValidateConfirmPassword === true ? (
              <View style={styles.invalidErrorArea}>
                <Text style={styles.invalidErrorText}>
                  {textValidateConfirmPassword}
                </Text>
              </View>
            ) : (
              <View style={{ marginVertical: 20.8 }} />
            )}

            <BaseButton
              title={'メールアドレスを設定'}
              onPressButton={onChangePassword}
            />
          </View>

          <View style={{ flex: 1, justifyContent: 'flex-end' }} />
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
  },

  zoneInput: {
    flex: 1,
    justifyContent: 'center',
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

  baseInput: {
    backgroundColor: 'white',
    width: '90%',
    height: 60,
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

export default ChangePasswordScreen;
