import { Ionicons, FontAwesome } from '@expo/vector-icons';
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

function Send(props) {
  const handleClickBackButton = () => {
    props.navigation.goBack();
  };

  return (
    <View style={styles.send}>
      <View style={styles.back}>
        <TouchableOpacity onPress={() => {handleClickBackButton()}}>
          <Ionicons
            size={30}
            color='#B7B7B7'
            name='chevron-back'
            style={{ marginHorizontal: 10, lineHeight: 30 }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Text style={{ fontSize: 18 }}>よくあるお問い合せ／ヘルプ</Text>
      </View>

      <View style={styles.searchBar}>
        <TouchableOpacity>
          <Ionicons
            size={30}
            color='#B7B7B7'
            name='search'
            style={{ marginHorizontal: 10, lineHeight: 30 }}
          />
        </TouchableOpacity>

        <TextInput 
          multiline={false}
          placeholder='検索する'
          testID='_SearchInput'
          autoCapitalize='none'
          onChangeText={() => { }}
          accessibilityLabel='_SearchInput'
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>複数人宛ての投稿について</Text>
        
        <View style={styles.list}>
          <Text style={styles.listItem}>複数人宛ての投稿に拍手したとき、ポイントはどのように割り振られますか？</Text>
          <Text style={styles.listItem}>1回の投稿で、最大何名に宛てておくれますか？</Text>
          <Text style={styles.listItem}>1回の投稿で、ポイントは最大で何ptおくれますか？</Text>
          <Text style={styles.listItem}>投稿をもらったメンバー全員を確認する方法を教えてください</Text>
          <Text style={styles.listItem}>もらったポイントはどのように表示されますか？</Text>
          <Text style={styles.listItem}>もらったポイントはどのように表示されますか？</Text>
        </View>
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
  },

  header: {
    height: 120,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#CBCBCB',
  },

  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchBar: {
    height: 45,
    borderWidth: 1,
    borderRadius: 45,
    marginVertical: 20,
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
    borderColor: '#CBCBCB',
  },

  title: {
    fontSize: 24,
    marginTop: 20,
    color: '#4A4A4A',
  },

  list: {
    marginTop: 20,
    marginHorizontal: 20,
  },

  listItem: {
    fontSize: 16,
    marginTop: 20,
    color: '#4A4A4A',
  },
});

export default memo(Send);