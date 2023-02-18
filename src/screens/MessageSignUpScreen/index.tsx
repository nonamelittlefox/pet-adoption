/* eslint-disable prettier/prettier */
import { View, StyleSheet, Text } from 'react-native';
import BaseButton from 'src/components/Button/BaseButton';
import React from 'react';

const MessageSignUpScreen = ({ navigation }) => {
  const onConfirm = () => {
    navigation.push('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.zoneLogo}>
        <Text style={styles.textLogo}>IZUMI</Text>
      </View>

      <View style={styles.zoneDes}>
        <Text style={[styles.textDes, { paddingBottom: 40 }]}>初期設定が完了しました。</Text>

        <Text style={[styles.textDes, { paddingBottom: 10 }]}>
          登録されたメールアドレスに
        </Text>
        <Text style={[styles.textDes, { paddingBottom: 40 }]}>登録完了メールを送信しています。</Text>

        <Text style={[styles.textDes, { paddingBottom: 10 }]}>
          メールに添付したリンクから
        </Text>
        <Text style={styles.textDes}>メールアドレス設定をお願い致します。</Text>
      </View>

      <BaseButton
        buttonStyles={styles.buttonToLoginScreen}
        title={'ログイン画面に戻る'}
        onPressButton={onConfirm}
      />

      <View style={{ flex: 1, justifyContent: 'flex-end' }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },

  zoneLogo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    marginTop: '20%',
  },

  textLogo: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#1534A1',
  },

  zoneDes: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    borderRadius: 5,
    textAlign: 'center',
  },

  textDes: {
    color: '#1534A1',
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  buttonToLoginScreen: {
    width: '90%',
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

export default MessageSignUpScreen;
