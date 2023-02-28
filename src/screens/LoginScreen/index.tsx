import { useDispatch } from 'react-redux';
import { setLoading } from 'src/actions/miscActions';

import React, { memo, useState, useEffect } from 'react';

import {
  View,
  Text,
  Image,
  Keyboard,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

function LoginScreen({ navigation }: { navigation: any }) {
  const dispatch = useDispatch();

  const [employeeCode, setEmployeeCode] = useState('');
  const [password, setPassword] = useState('');


  const onClickLoginButton = async () => {
    dispatch(setLoading(true));

    // ...

    navigation.navigate('HomeScreen');

    dispatch(setLoading(false));
  };

  const onClickResetPasswordButton = () => {
    navigation.navigate('ResetPasswordScreen');
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.logo}>
            <Image 
              resizeMode='contain'
              style={{ width: '100%', height: '100%' }}
              source={{ uri: 'https://raw.githubusercontent.com/nonamelittlefox/dpos-assets/main/dpos-logo.png' }}
            />
          </View>

          <View style={styles.authenticationForm}>
            <View style={styles.employeeCode}>
              <Text style={styles.authenticationFormLabel}>社員番号</Text>
              
              <TextInput
                editable={true}
                autoFocus={false}
                placeholder={'社員番号'}
                value={employeeCode}
                returnKeyType={'done'}
                keyboardType={'default'}
                style={[styles.baseInput]}
                testID={'_EmployeeCodeInput'}
                placeholderTextColor={'#9E9E9E'}
                accessibilityLabel={'_EmployeeCodeInput'}
                onChangeText={value => {
                  setEmployeeCode(value);
                }}
              />
            </View>

            <View style={styles.password}>
              <Text style={styles.authenticationFormLabel}>パスワード</Text>
              
              <TextInput
                editable={true}
                value={password}
                autoFocus={false}
                placeholder={'パスワード'}
                returnKeyType={'done'}
                secureTextEntry={true}
                keyboardType={'default'}
                testID={'_PasswordInput'}
                style={[styles.baseInput]}
                placeholderTextColor={'#9E9E9E'}
                accessibilityLabel={'_PasswordInput'}
                onChangeText={value => {
                  setPassword(value);
                }}
              />
            </View>
          </View>

          <View style={styles.functionalArea}>
            <TouchableOpacity
              testID={'_LoginButton'}
              onPress={onClickLoginButton}
              accessibilityLabel={'_LoginButton'}
            >
              <View style={styles.loginFrame}>
                <Text style={styles.loginFrameText}>ログイン</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              testID={'_ResetPasswordButton'}
              onPress={onClickResetPasswordButton}
              accessibilityLabel={'_ResetPasswordButton'}
            >
              <View style={styles.resetPasswordFrame}>
                <Text style={styles.resetPasswordFrameText}>パスワードの再設定</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

export default memo(LoginScreen);

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },

  logo: {
    flex: 1,
  },

  authenticationForm: {
    flex: 1,
    flexDirection: 'column',
  },

  authenticationFormLabel: {
    fontSize: 18,
    marginLeft: 20,
    color: '#535353',
    fontWeight: '400',
  },

  employeeCode: {},

  password: {
    marginTop: 30,
  },

  baseInput: {
    height: 55,
    fontSize: 18,
    marginTop: 10,
    elevation: 1,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    paddingBottom: 10,
    shadowRadius: 1.00,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    marginHorizontal: 20,
    textAlignVertical: 'top',
    backgroundColor: '#EEEEEE',
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },

  functionalArea: {
    flex: 1,
    justifyContent: 'flex-start',
  },

  loginFrame: {
    height: 50,
    borderRadius: 45,
    alignItems: 'center',
    marginHorizontal: 80,
    justifyContent: 'center',
    backgroundColor: '#289FE1',
  },

  loginFrameText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '900',
  },

  resetPasswordFrame: {
    marginTop: 20,
  },

  resetPasswordFrameText: {
    fontSize: 16,
    color: '#1F7CB0',
    fontWeight: '900',
    textAlign: 'center',
  },
});
