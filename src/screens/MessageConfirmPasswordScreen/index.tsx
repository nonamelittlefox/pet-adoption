import { View, Text, StyleSheet } from 'react-native';
import BaseButton from 'src/components/Button/BaseButton';
import React from 'react';

const MessageConfirmPasswordScreen = ({ navigation }) => {
  const onConfirm = () => {
    navigation.push('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.zoneLogo}>
        <Text style={styles.textLogo}>IZUMI</Text>
      </View>

      <View style={styles.zoneDes}>
        <View>
          <Text style={styles.textDes}>
            メールアドレスの設定が{'\n'}完了しました。
          </Text>
        </View>
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
  },

  textLogo: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#1534A1',
  },

  zoneDes: {
    height: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 50,
  },

  textDes: {
    color: '#1534A1',
    fontSize: 19,
    fontWeight: 'bold',
    marginVertical: 25,
    borderRadius: 5,
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

export default MessageConfirmPasswordScreen;
