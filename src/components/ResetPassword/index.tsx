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

function ResetPassword(props) {
  const handleClickBackButton = () => {
    props.navigation.goBack();
  };

  const handleClickSendSMSButton = () => {
    props.navigation.navigate('AuthorizationOTPScreen');
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
        <Text style={styles.contentHeaderText}>パスワードリセット用の確認コードを</Text>
        <Text style={styles.contentHeaderText}>SMSで送信します。</Text>
        <Text style={styles.contentHeaderText}>電話番号を入力してください。</Text>
      </View>

      <View style={styles.formInput}>
        <Text style={styles.label}>電話番号</Text>
        <TextInput 
          placeholder=''
          multiline={false}
          style={styles.input}
          autoCapitalize='none'
          keyboardType='numeric'
          onChangeText={() => { }}
          testID='_PhoneNumberInput'
          accessibilityLabel='_PhoneNumberInput'
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.sendButton} onPress={() => {handleClickSendSMSButton()}}>
          <Text style={styles.sendButtonText}>SMSを送信する</Text>
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
    marginTop: 40,
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'center',
  },

  contentHeaderText: {
    fontSize: 18,
    lineHeight: 30,
    color: '#535353',
  },

  formInput: {
    marginTop: 60,
  },

  label: {
    color: '#535353',
    fontSize: 16,
    marginLeft: 30,
  },

  input: {
    height: 50,
    paddingLeft: 20,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 30,
    backgroundColor: '#EEEEEE',
  },

  footer: {
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

export default memo(ResetPassword);