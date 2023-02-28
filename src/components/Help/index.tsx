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

interface props {
  navigation: any;
};

function HelpIndex(props : props) {
  const handleNavigateToSendScreen = () => {
    props.navigation.navigate('SendScreen');
  };
  
  const handleNavigateToQuestionScreen = () => {
    props.navigation.navigate('QuestionScreen');
  };

  const handleClickBackButton = () => {
    props.navigation.goBack();
  };

  return (
    <View style={styles.helpIndex}>
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

      <View style={styles.content}>
        <Image
          style={styles.image}
          source={{ uri: 'https://raw.githubusercontent.com/nonamelittlefox/dpos-assets/main/light.png' }}
        />
      </View>

      <TouchableOpacity style={styles.box}>
        <Text style={styles.text}>初めてご利用される方へ</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box} onPress={() => {handleNavigateToSendScreen()}}>
        <Text style={styles.text}>複数人宛ての投稿について</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box}>
        <Text style={styles.text}>ポイントについて</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box}>
        <Text style={styles.text}>設定について</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box} onPress={() => {handleNavigateToQuestionScreen()}}>
        <Text style={styles.text}>その他お問い合わせ</Text>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  helpIndex: {
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

  image: {
    width: 120,
    height: 120,
    marginVertical: 20,
  },

  box: {
    height: 80,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 20,
    borderColor: '#289FE1',
    justifyContent: 'center',
  },

  text: {
    fontSize: 16,
    color: '#289FE1',
    fontWeight: 'bold',
  },
});

export default memo(HelpIndex);