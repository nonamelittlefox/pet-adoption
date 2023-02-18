/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  // ScrollView,
  // FlatList,
  // ActivityIndicator,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import { bytesToSize } from 'src/utils/bytesToFileSize';

import Icon from 'react-native-vector-icons/FontAwesome';
import BaseInput from 'src/components/Input/BaseInput';
import BaseButton from 'src/components/Button/BaseButton';

export interface propsType {
  navigation: any;
  route: any;
}

const Notification = () => {
  const [tab, setTab] = useState<string>('TEAM');
  const [newMessage, setNewMessage] = useState<string>('');

  // const [listMessage, setListMessage] = useState([]);
  // const [listNotification, setListNotification] = useState([]);

  const getDataIzumiTab = () => {};

  const goBackDashboard = () => {};

  const onSendMessage = () => {};

  const onPressConfirm = () => {};

  const idUserCurrent = 1;

  const numberNoticeAndMessage = {
    unread_messages: 12218,
    unread_notices: 612312,
  };

  const DATA_MESSAGE = {
    message_id: 151,
    sender_id: 1004,
    sender_name: 'Duc',
    content: '1',
    file: null,
    created_at: '2022-06-02T10:45:25.000000Z',
    created_at_in_date: '2022-06-02',
    created_at_hours_and_min: '19:45',
  };

  let DATA_NOTIFICATION = {
    id: 180,
    subject: 'Subject XXX',
    content: 'Content XXX',
    public_date: '2022-06-04 15:04:47',
    public_date_display: '2022年06月04日 15:04',
    surveys: [
      {
        id: 6,
        notice_id: 180,
        question_content: 'Q1',
        type: 1,
        created_at: '2022-06-04 15:04:47',
        updated_at: '2022-06-04 15:04:47',
        deleted_at: null,
        survey_question_answer: [
          {
            id: 13,
            question_id: 6,
            answer_content: 'A1',
            type: 1,
            position: 0,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
          {
            id: 14,
            question_id: 6,
            answer_content: 'A2',
            type: 1,
            position: 1,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
          {
            id: 15,
            question_id: 6,
            answer_content: 'A3',
            type: 1,
            position: 2,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
          {
            id: 16,
            question_id: 6,
            answer_content: 'A4',
            type: 1,
            position: 3,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
          {
            id: 17,
            question_id: 6,
            answer_content: 'A5',
            type: 1,
            position: 4,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
          {
            id: 18,
            question_id: 6,
            answer_content: 'A6',
            type: 1,
            position: 5,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
          {
            id: 19,
            question_id: 6,
            answer_content: 'A7',
            type: 1,
            position: 6,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
          {
            id: 20,
            question_id: 6,
            answer_content: 'A8',
            type: 1,
            position: 7,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
          {
            id: 21,
            question_id: 6,
            answer_content: 'A9',
            type: 1,
            position: 8,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
          {
            id: 22,
            question_id: 6,
            answer_content: 'A10',
            type: 1,
            position: 9,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
        ],
        radio_option: -1,
        radio_list: [],
        checkbox_list: [],
        comment_list: [],
      },
      {
        id: 7,
        notice_id: 180,
        question_content: 'Q2',
        type: 2,
        created_at: '2022-06-04 15:04:47',
        updated_at: '2022-06-04 15:04:47',
        deleted_at: null,
        survey_question_answer: [
          {
            id: 23,
            question_id: 7,
            answer_content: 'B1',
            type: 2,
            position: 0,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
          {
            id: 24,
            question_id: 7,
            answer_content: 'B2',
            type: 2,
            position: 1,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
          {
            id: 25,
            question_id: 7,
            answer_content: 'B3',
            type: 2,
            position: 2,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
          {
            id: 26,
            question_id: 7,
            answer_content: 'B4',
            type: 2,
            position: 3,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
          {
            id: 27,
            question_id: 7,
            answer_content: 'B5',
            type: 2,
            position: 4,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
          {
            id: 28,
            question_id: 7,
            answer_content: 'B6',
            type: 2,
            position: 5,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
          {
            id: 29,
            question_id: 7,
            answer_content: 'B7',
            type: 2,
            position: 6,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
          {
            id: 30,
            question_id: 7,
            answer_content: 'B8',
            type: 2,
            position: 7,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
          {
            id: 31,
            question_id: 7,
            answer_content: 'B9',
            type: 2,
            position: 8,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
          {
            id: 32,
            question_id: 7,
            answer_content: 'B10',
            type: 2,
            position: 9,
            created_at: '2022-06-04 15:04:47',
            updated_at: '2022-06-04 15:04:47',
            deleted_at: null,
          },
        ],
        radio_option: -1,
        radio_list: [],
        checkbox_list: [],
        comment_list: [],
      },
      {
        id: 8,
        notice_id: 180,
        question_content: 'C3',
        type: 3,
        created_at: '2022-06-04 15:04:47',
        updated_at: '2022-06-04 15:04:47',
        deleted_at: null,
        survey_question_answer: [],
        radio_option: -1,
        radio_list: [],
        checkbox_list: [],
        comment_list: [],
      },
    ],
    is_draft: 1,
    list_file_display: [
      {
        id: 1,
        file_name: 'Screenshot 2022-06-02 111232.png',
        file_extension: 'png',
        file_path:
          'upload/20220604/6234a31f38f9d86c81000e0fffe78f43Screenshot 2022-06-02 111232.png',
        file_size: '6158',
        created_at: '2022-06-04 15:37:10',
        updated_at: '2022-06-04 15:37:10',
      },
      {
        id: 2,
        file_name: 'tinh-hinh-di-hoc.png',
        file_extension: 'png',
        file_path:
          'upload/20220604/cbaf4ed53c91b8314f9d54cede916fe0tinh-hinh-di-hoc.png',
        file_size: '568632',
        created_at: '2022-06-04 15:37:10',
        updated_at: '2022-06-04 15:37:10',
      },
    ],
    viewed: false,
  };

  useEffect(() => {
    getDataIzumiTab();

    const CHECKBOX = 1;
    const RADIO = 2;
    const COMMENT = 3;

    for (let i = 0; i < DATA_NOTIFICATION.surveys.length; i++) {
      DATA_NOTIFICATION.surveys[i].radio_list = [];
      DATA_NOTIFICATION.surveys[i].checkbox_list = [];
      DATA_NOTIFICATION.surveys[i].comment_list = [];
      DATA_NOTIFICATION.surveys[i].radio_option = -1;
    }

    for (let i = 0; i < DATA_NOTIFICATION.surveys.length; i++) {
      if (DATA_NOTIFICATION.surveys[i].type === CHECKBOX) {
        for (
          let j = 0;
          j < DATA_NOTIFICATION.surveys[i].survey_question_answer.length;
          j++
        ) {
          DATA_NOTIFICATION.surveys[i].checkbox_list.push({
            label:
              DATA_NOTIFICATION.surveys[i].survey_question_answer[j]
                .answer_content,
            value: false,
            id: DATA_NOTIFICATION.surveys[i].survey_question_answer[j].id,
          });
        }
      } else if (DATA_NOTIFICATION.surveys[i].type === RADIO) {
        for (
          let j = 0;
          j < DATA_NOTIFICATION.surveys[i].survey_question_answer.length;
          j++
        ) {
          DATA_NOTIFICATION.surveys[i].radio_list.push({
            label:
              DATA_NOTIFICATION.surveys[i].survey_question_answer[j]
                .answer_content,
            value:
              DATA_NOTIFICATION.surveys[i].survey_question_answer[j].position,
            id: DATA_NOTIFICATION.surveys[i].survey_question_answer[j].id,
          });
        }
      } else if (DATA_NOTIFICATION.surveys[i].type === COMMENT) {
        DATA_NOTIFICATION.surveys[i].comment_list.push('');
      }
    }
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Pressable
              testID="backButton"
              onPress={() => {
                goBackDashboard();
              }}>
              <Icon
                testID="backButtonIcon"
                style={styles.iconBack}
                name="angle-double-left"
                size={30}
                color="#1534A1"
              />
            </Pressable>
          </View>

          <View style={styles.headerText}>
            <Text style={styles.titleScreen}>お知らせ</Text>
          </View>
        </View>

        <View style={styles.zoneTab}>
          <Pressable
            testID="teamTabButton"
            style={[styles.tabStyle, tab === 'TEAM' ? styles.tabActive : {}]}
            onPress={() => {
              setTab('TEAM');
              setNewMessage('');
            }}>
            <Text
              testID="teamTabText"
              style={[
                styles.tabText,
                tab === 'TEAM' ? styles.tabTextActive : {},
              ]}>
              Team
            </Text>

            {numberNoticeAndMessage.unread_messages > 0 && (
              <View style={styles.messageText}>
                <Text style={styles.textNotify} testID="messageNumber">
                  {numberNoticeAndMessage.unread_messages}
                </Text>
              </View>
            )}
          </Pressable>

          <Pressable
            testID="izumiTabButton"
            style={[
              styles.tabStyle,
              tab === 'IZUMI' || tab === 'IZUMI_DETAIL' ? styles.tabActive : {},
            ]}
            onPress={() => {
              setTab('IZUMI');
              setNewMessage('');
            }}>
            <Text
              testID="izumiTabText"
              style={[
                styles.tabText,
                tab === 'IZUMI' || tab === 'IZUMI_DETAIL'
                  ? styles.tabTextActive
                  : {},
              ]}>
              IZUMI
            </Text>
            {numberNoticeAndMessage.unread_notices > 0 && (
              <View style={styles.messageText}>
                <Text style={styles.textNotify} testID="noticeNumber">
                  {numberNoticeAndMessage.unread_notices}
                </Text>
              </View>
            )}
          </Pressable>
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text>{'Team'}</Text>

            <View>
              <View style={styles.zoneBreakDate}>
                <Text testID="createdAtInDate" style={styles.textBreakDate}>
                  {DATA_MESSAGE.created_at_in_date}
                </Text>
              </View>

              <View style={styleMessage.container}>
                <View style={styleMessage.infoUser}>
                  <Image
                    testID="avatar"
                    style={styleMessage.avatarUser}
                    source={{
                      uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                  />
                </View>

                <View style={styleMessage.zoneMessage}>
                  <View style={styleMessage.infoUser}>
                    <Text testID="senderName" style={styleMessage.nameUser}>
                      {DATA_MESSAGE.sender_name}
                    </Text>
                    <Text testID="createdAtHoursMin" style={styleMessage.time}>
                      {DATA_MESSAGE.created_at_hours_and_min}
                    </Text>
                  </View>
                  <View
                    style={[
                      styleMessage.message,
                      DATA_MESSAGE.sender_id === idUserCurrent
                        ? styleMessage.mePeople
                        : styleMessage.otherPeople,
                    ]}>
                    <Text testID="contentMessage">{DATA_MESSAGE.content}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.zoneTyping}>
              <View style={styles.zoneInput}>
                <View style={styles.inputMessage}>
                  <BaseInput
                    testID="inputMessage"
                    placeholder={'Enter text here !'}
                    value={newMessage}
                    onChangeValue={setNewMessage}
                    textInputStyle={styles.messageInputField}
                  />
                </View>

                <Pressable style={styles.iconSend} onPress={onSendMessage}>
                  <Icon
                    testID="sendMessageButton"
                    style={{ lineHeight: 60 }}
                    name="send"
                    size={20}
                    color="#1534A1"
                  />
                </Pressable>
              </View>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <Text>{'Izumi'}</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text>{'Izumi Detail'}</Text>
            <View style={styleNotificationDetail.messageDetail}>
              <View>
                <Text testID="subject" style={styleNotificationDetail.message}>
                  {DATA_NOTIFICATION.subject}
                </Text>
              </View>

              <View style={styleNotificationDetail.date}>
                <Text testID="publicDateDisplay">
                  {DATA_NOTIFICATION.public_date_display}
                </Text>
              </View>

              <View style={styleNotificationDetail.detail}>
                <Text
                  testID="contentSurvey"
                  style={styleNotificationDetail.textDetail}>
                  {DATA_NOTIFICATION.content}
                </Text>
              </View>

              {DATA_NOTIFICATION.surveys.length > 0 ? (
                <View style={styleNotificationDetail.zoneHelper}>
                  <Text
                    testID="supportText"
                    style={styleNotificationDetail.textHelper}>
                    {'確認後のアンケートにご回答ください。'}
                  </Text>
                </View>
              ) : (
                <View />
              )}

              {DATA_NOTIFICATION.viewed === true ? (
                <View testID="surveyList" />
              ) : (
                <View
                  testID="surveyList"
                  style={styleNotificationDetail.zoneSurvey}>
                  <View>
                    {DATA_NOTIFICATION.surveys.map((item, indexQuestion) => (
                      <View key={indexQuestion}>
                        <Text
                          style={[
                            styleNotificationDetail.textDetail,
                            styleNotificationDetail.surveyQuestion,
                          ]}>
                          {item.question_content}
                        </Text>

                        {item.type === 1 && (
                          <View style={styleNotificationDetail.itemSurvey}>
                            {item.checkbox_list.map(
                              (checkbox, indexCheckbox) => (
                                <View
                                  key={indexCheckbox}
                                  style={{ flexDirection: 'row' }}>
                                  <Checkbox
                                    style={styleNotificationDetail.checkbox}
                                    value={checkbox.value}
                                    // onValueChange={value => {
                                    //   handleSelectAnswerCheckbox(
                                    //     value,
                                    //     item.id,
                                    //     indexCheckbox,
                                    //   );
                                    // }}
                                  />
                                  <Text
                                    style={styleNotificationDetail.paragraph}>
                                    {checkbox.label}
                                  </Text>
                                </View>
                              ),
                            )}
                          </View>
                        )}

                        {item.type === 2 && (
                          <View style={styleNotificationDetail.itemSurvey}>
                            <RadioForm animation={true}>
                              {item.radio_list.map((radio, indexRadio) => (
                                <RadioButton
                                  labelHorizontal={true}
                                  key={indexRadio}>
                                  <RadioButtonInput
                                    obj={radio}
                                    isSelected={
                                      item.radio_option === indexRadio
                                    }
                                    index={indexRadio}
                                    // onPress={value => {
                                    //   handleSelectAnswerRadio(value, item.id);
                                    // }}
                                    buttonSize={14}
                                    buttonInnerColor={'#009688'}
                                    buttonOuterColor={
                                      item.radio_option ? '#657786' : '#657786'
                                    }
                                    buttonWrapStyle={{ marginLeft: 7 }}
                                  />
                                  <RadioButtonLabel
                                    obj={radio}
                                    index={indexRadio}
                                    labelHorizontal={true}
                                    // onPress={value => {
                                    //   handleSelectAnswerRadio(value, item.id);
                                    // }}
                                    labelStyle={{ fontSize: 14 }}
                                    labelWrapStyle={{}}
                                  />
                                </RadioButton>
                              ))}
                            </RadioForm>
                          </View>
                        )}

                        {item.type === 3 && (
                          <View style={styleNotificationDetail.commentInput}>
                            <BaseInput
                              multiline={true}
                              numberOfLines={4}
                              value={item.comment_list[0]}
                              // onChangeValue={value => {
                              //   handleChangeText(value, item.id);
                              // }}
                              autoFocus={false}
                              inputStyle={styleNotificationDetail.baseInput}
                              textInputStyle={styleNotificationDetail.textArea}
                            />
                          </View>
                        )}
                      </View>
                    ))}
                  </View>
                </View>
              )}

              <View style={styleNotificationDetail.messageDetailFooterButton}>
                <View
                  testID="fileList"
                  style={styleNotificationDetail.messageDetailFile}>
                  {DATA_NOTIFICATION.list_file_display.length > 0 &&
                    DATA_NOTIFICATION.list_file_display.map((file, index) => {
                      return (
                        <Text
                          style={styleNotificationDetail.textFileDetail}
                          key={`file-${index}`}>
                          {file.file_name + ' '}

                          <Text style={{ fontSize: 12 }}>
                            {bytesToSize(file.file_size)}
                          </Text>
                        </Text>
                      );
                    })}
                </View>

                <BaseButton
                  testID="buttonConfirmation"
                  title={'メッセージを確認しました'}
                  onPressButton={onPressConfirm}
                  // disabled={isLoading}
                  buttonStyles={[
                    DATA_NOTIFICATION.viewed === true
                      ? {
                          backgroundColor: '#E5E5E5',
                          borderColor: '#E5E5E5',
                        }
                      : {
                          backgroundColor: '#0FAE71',
                          borderColor: '#0FAE71',
                        },
                    { marginTop: '100%' },
                  ]}
                  textStyles={
                    DATA_NOTIFICATION.viewed === true
                      ? {
                          color: '#000050',
                        }
                      : {
                          color: '#FFF',
                        }
                  }
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const Message = () => {
  const idUserCurrent = 1;

  const DATA = {
    message_id: 151,
    sender_id: 1004,
    sender_name: 'Duc',
    content: '1',
    file: null,
    created_at: '2022-06-02T10:45:25.000000Z',
    created_at_in_date: '2022-06-02',
    created_at_hours_and_min: '19:45',
  };

  return (
    <View>
      <View style={styles.zoneBreakDate}>
        <Text testID="createdAtInDate" style={styles.textBreakDate}>
          {DATA.created_at_in_date}
        </Text>
      </View>

      <View style={styleMessage.container}>
        <View style={styleMessage.infoUser}>
          <Image
            testID="avatar"
            style={styleMessage.avatarUser}
            source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png',
            }}
          />
        </View>

        <View style={styleMessage.zoneMessage}>
          <View style={styleMessage.infoUser}>
            <Text testID="senderName" style={styleMessage.nameUser}>
              {DATA.sender_name}
            </Text>
            <Text testID="createdAtHoursMin" style={styleMessage.time}>
              {DATA.created_at_hours_and_min}
            </Text>
          </View>
          <View
            style={[
              styleMessage.message,
              DATA.sender_id === idUserCurrent
                ? styleMessage.mePeople
                : styleMessage.otherPeople,
            ]}>
            <Text testID="content">{DATA.content}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const NotificationDetail = ({ data }) => {
  return (
    <View>
      <Text>{'Notification Detail'}</Text>
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  detailMessageArea: {
    flex: 1,
  },

  wrapper: {
    flex: 1,
  },

  header: {
    height: 39,
    flexDirection: 'row',
    lineHeight: 39,
  },

  footer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    alignItems: 'center',
  },

  headerIcon: {
    flex: 1,
    marginLeft: 15,
  },

  iconBack: {
    fontWeight: 'bold',
    lineHeight: 39,
  },

  headerText: {
    flex: 5,
    alignItems: 'center',
    paddingRight: 65,
  },

  titleScreen: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0FAE71',
    lineHeight: 39,
  },

  zoneTab: {
    flexDirection: 'row',
    marginTop: 15,
  },

  tabStyle: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#E5E5E5',
  },

  tabActive: {
    backgroundColor: '#1534A1',
  },

  tabText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#00000050',
  },

  tabTextActive: {
    color: '#FFF',
  },

  messageText: {
    position: 'absolute',
    top: -15,
    right: 10,
    minWidth: 30,
    minHeight: 30,
    borderRadius: 30,
    lineHeight: 30,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: '#FFF',
    backgroundColor: 'red',
  },

  textNotify: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  zoneChat: {
    marginTop: 10,
    padding: 10,
    flexGrow: 1,
    marginBottom: 20,
  },

  zoneTyping: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 45,
  },

  zoneInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputMessage: {
    flex: 1,
    borderTopLeftRadius: 15,
    marginBottom: 20,
  },

  iconSend: {
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    width: 50,
    textAlign: 'center',
    paddingHorizontal: 10,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },

  messageInputField: {
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderRightColor: '#FFFFFF',
  },

  showButtonArea: {
    alignItems: 'flex-end',
    paddingRight: 20,
    paddingBottom: 20,
  },

  showInputMessage: {
    backgroundColor: '#1534A1',
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  },

  zoneBreakDate: {
    marginVertical: 10,
  },
  textBreakDate: {
    textAlign: 'center',
    color: '#8F8F9D',
  },
});

const styleMessage = StyleSheet.create({
  container: {
    marginBottom: 15,
    flex: 1,
    flexDirection: 'row',
  },
  infoUser: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 3,
  },
  avatarUser: {
    width: 35,
    height: 35,
    borderRadius: 40 / 2,
    // marginTop: 28,
  },
  nameUser: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  time: {
    fontSize: 11,
    alignSelf: 'flex-end',
    marginBottom: 2,
    color: '#8F8F9D',
  },
  date: {
    textAlign: 'right',
    fontSize: 11,
    marginBottom: 3,
  },
  zoneMessage: {
    flex: 9,
    flexWrap: 'wrap',
  },
  message: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 10,

    marginLeft: 7,

    padding: 15,
  },
  mePeople: {
    backgroundColor: '#BDE6D8',
  },
  otherPeople: {
    backgroundColor: '#E5E5E5',
  },
});

const styleNotificationDetail = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontSize: 14,
  },
  messageDetailFile: {
    backgroundColor: '#F5F5F5',
    marginHorizontal: 10,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  textFileDetail: {
    color: '#1534A1',
    fontWeight: 'bold',
    paddingVertical: 15,
    textAlign: 'justify',
    fontSize: 14,
  },
  messageDetailFooterButton: {
    flex: 1,
    flexDirection: 'column',
    textAlign: 'center',
    marginBottom: 35,
  },
  messageDetail: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    fontSize: 14,
  },
  message: {
    paddingVertical: 15,
    paddingLeft: 10,
    fontSize: 16,
  },
  date: {
    color: '#000000',
    opacity: 0.5,
    alignSelf: 'flex-end',
    paddingRight: 10,
    fontSize: 14,
  },
  detail: {
    paddingHorizontal: 10,
    marginTop: 10,
    fontSize: 14,
  },
  textDetail: {
    paddingVertical: 15,
    textAlign: 'justify',
    fontSize: 14,
  },
  zoneHelper: {
    display: 'flex',
    backgroundColor: '#1534A1',
    marginHorizontal: 10,
    marginTop: 10,
  },
  textHelper: {
    color: '#FFF',
    fontWeight: '500',
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
  },
  zoneSurvey: {
    display: 'flex',
    margin: 10,
    fontSize: 14,
  },
  itemSurvey: {
    marginTop: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontSize: 14,
    width: '100%',
  },
  paragraph: {
    marginTop: 8,
    fontSize: 14,
  },
  checkbox: {
    margin: 8,
  },
  textArea: {
    borderColor: '#000',
    borderWidth: 0.5,
    fontSize: 14,
    marginBottom: 15,
  },
  surveyQuestion: {
    backgroundColor: '#BDE6D8',
    paddingLeft: 10,
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    fontWeight: 'bold',
  },
  surveyAnswer: {
    marginVertical: 10,
    fontSize: 16,
    paddingLeft: 10,
  },
  commentInput: {
    marginTop: 15,
    borderColor: '#000',
  },
  baseInput: {
    backgroundColor: 'white',
  },
});

export default Notification;
