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

function Notification(props) {
  const handleClickBackButton = () => {
    props.navigation.goBack();
  };

  const handleClickReturnLoginButton = () => {
    props.navigation.navigate('LoginScreen');
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
        <Text style={styles.contentHeaderText}>パスワードをリセットしました。</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.sendButton} onPress={() => {handleClickReturnLoginButton()}}>
          <Text style={styles.sendButtonText}>ログイン画面へ</Text>
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
    marginTop: 80,
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'center',
  },

  contentHeaderText: {
    fontSize: 18,
    lineHeight: 30,
    color: '#535353',
  },

  footer: {
    marginTop: 100,
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

export default memo(Notification);