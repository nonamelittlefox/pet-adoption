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

function QuestionDetail(props) {
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

      <View style={styles.content}>
        <Text style={styles.title}>お問い合わせフォーム</Text>

        <View style={styles.form}>
          <View style={styles.subjectHolder}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.label}>件名</Text>
            </View>

            <TextInput 
              multiline={false}
              placeholder=''
              testID='_SubjectInput'
              autoCapitalize='none'
              onChangeText={() => { }}
              accessibilityLabel='_SubjectInput'
              style={styles.subjectInput}
            />
          </View>

          <View style={styles.questionHolder}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.label}>お問い合せ内容</Text>
            </View>

            <TextInput 
              multiline={true}
              placeholder=''
              testID='_QuestionInput'
              autoCapitalize='none'
              onChangeText={() => { }}
              accessibilityLabel='_QuestionInput'
              style={styles.questionInput}
            />
          </View>

          <View style={styles.attachmentHolder}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.label}>添付ファイル</Text>
            </View>

            <TouchableOpacity style={styles.attachmentButton}>
              <Text style={styles.attachmentButtonText}>ファイルを追加</Text>
            </TouchableOpacity>
          </View>

          {/* <View style={styles.submitHolder}>
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitButtonText}>送信</Text>
            </TouchableOpacity>
          </View> */}
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

  title: {
    fontSize: 24,
    marginTop: 20,
    color: '#4A4A4A',
  },

  form: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  label: {
    marginLeft: 20,
    color: '#7D7B7B',
    marginBottom: 10,
  },

  subjectHolder: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'column',
  },

  questionHolder: {
    width: '100%',
    marginVertical: 20,
    flexDirection: 'column',
  },

  subjectInput: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginHorizontal: 20,
    borderColor: '#BFBFBF',
  },

  questionInput: {
    height: 200,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginHorizontal: 20,
    borderColor: '#BFBFBF',
  },

  attachmentHolder: {
    width: '100%',
    flexDirection: 'column',
  },

  attachmentButton: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 20,
    alignItems: 'center',
    borderColor: '#BFBFBF',
    justifyContent: 'center',
  },

  attachmentButtonText: {
    color: '#289FE1',
  },

  submitHolder: {
    marginTop: 80,
    width: '100%',
  },

  submitButton: {
    height: 50,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 20,
    alignItems: 'center',
    borderColor: '#BFBFBF',
    justifyContent: 'center',
    backgroundColor: '#289FE1',
  },

  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default memo(QuestionDetail);