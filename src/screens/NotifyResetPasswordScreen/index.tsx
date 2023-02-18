/* eslint-disable prettier/prettier */
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import BaseButton from '../../components/Button/BaseButton';
import React from 'react';

const NotifyResetPasswordScreen = ({ navigation }) => {
  const returnToLoginScreen = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textLogo}>IZUMI</Text>
        </View>

        <View style={styles.content}>
          <Text style={[styles.description, { paddingTop: 30 }]}>
            登録されたメールアドレスに
          </Text>
          <Text style={[styles.description, { paddingTop: 10 }]}>
            メールアドレス再発行メールを送信しています。
          </Text>

          <Text style={[styles.description, { paddingTop: 30 }]}>
            メールに添付したリンクから
          </Text>
          <Text style={[styles.description, { paddingTop: 10 }]}>
            メールアドレス再設定をお願い致します。
          </Text>
        </View>

        <View style={styles.footer}>
          <BaseButton
            buttonStyles={styles.buttonToLoginScreen}
            title={'ログイン画面に戻る'}
            onPressButton={returnToLoginScreen}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    textAlign: 'center',
  },

  header: {
    top: '17%',
    alignItems: 'center',
  },

  textLogo: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#1534A1',
    textTransform: 'uppercase',
  },

  content: {
    alignItems: 'center',
    top: '26%',
  },

  description: {
    fontSize: 16,
    color: '#1534A1',
    fontWeight: 'bold',
  },

  footer: {
    top: '40%',
    width: '90%',
  },

  buttonToLoginScreen: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default NotifyResetPasswordScreen;
