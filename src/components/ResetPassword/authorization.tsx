import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { setLoading } from 'src/actions/miscActions';

import {
  View,
  Text,
  Image,
  Keyboard,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import React, { memo, useState, useEffect } from 'react';

import OTPInputView from '@twotalltotems/react-native-otp-input';

function AuthorizationOTP(props) {
  const [phoneNumber, setPhoneNumber] = useState('09037128378');

  const handleClickBackButton = () => {
    props.navigation.goBack();
  };

  const handleClickAuthorizeOTP = () => {
    props.navigation.navigate('NewPasswordScreen');
  };

  const handleSecurePhoneNumber = (phoneNumber) => {
    const phoneNumberLength = phoneNumber.length;
    return phoneNumber.substring(0, 3) + '●'.repeat(phoneNumberLength - 5) + phoneNumber.substring(phoneNumberLength - 2, phoneNumberLength)
  };

  return (
    <View style={styles.send}>
      <View style={styles.back}>
        <TouchableOpacity onPress={() => {handleClickBackButton()}}>
          <AntDesign
            size={30}
            color='#B7B7B7'
            name='close'
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>パスワードの再設定</Text>
      </View>

      <View style={styles.contentHeader}>
        <Text style={{ fontSize: 24 }}>認証コードを入力</Text>
        <Image
          style={styles.contentHeaderImage}
          source={{ uri: 'https://raw.githubusercontent.com/nonamelittlefox/dpos-assets/main/phone_otp.png' }}
        />
        <Text style={styles.contentHeaderText}>{handleSecurePhoneNumber(phoneNumber)} 宛にSMSを送信しました。</Text>
        <Text style={styles.contentHeaderText}>メッセージに記載された6桁の数字を入力し</Text>
        <Text style={styles.contentHeaderText}>てください。</Text>
      </View>

      <View style={styles.OTP}>
        <OTPInputView
          editable={true}
          pinCount={7}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled = {(code => {})}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.sendButton} onPress={() => {handleClickAuthorizeOTP()}}>
          <Text style={styles.sendButtonText}>送信する</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  send: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  back: {
    marginTop: 80,
    paddingBottom: 30,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },

  backIcon: {
    lineHeight: 30,
    marginHorizontal: 10,
  },

  title: {
    fontSize: 20,
    marginLeft: 80,
    lineHeight: 30,
    color: '#535353',
  },

  contentHeader: {
    flex: 5,
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'center',
  },

  contentHeaderImage: {
    width: 120,
    height: 120,
    marginVertical: 20,
  },

  contentHeaderText: {
    fontSize: 18,
    lineHeight: 30,
    color: '#535353',
  },

  OTP: {
    flex: 1,
    marginHorizontal: 30,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
    backgroundColor: '#FFFFFF',
  },

  underlineStyleBase: {
    width: 45,
    height: 45,
    borderRadius: 10,
    color: '#000000',
    backgroundColor: '#EEEEEE',
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  footer: {
    flex: 5,
    marginTop: 60,
  },

  sendButton: {
    height: 50,
    borderRadius: 45,
    alignItems: 'center',
    marginHorizontal: 100,
    justifyContent: 'center',
    backgroundColor: '#289FE1',
  },

  sendButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default memo(AuthorizationOTP);