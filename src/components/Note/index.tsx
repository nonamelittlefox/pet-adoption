/* eslint-disable prettier/prettier */
/* eslint-disable radix */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
  Platform,
  Keyboard,
  FlatList,
  ActivityIndicator,
  TextInput,
  BackHandler,
} from 'react-native';
import React, { useState, useEffect, memo } from 'react';
import Navbar from '../Navbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import BaseButton from 'src/components/Button/BaseButton';
import Checkbox from 'expo-checkbox';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {
  getListNotificationIzumi,
  getSpecificNotificationIzumi,
  postNotificationWithoutSurvey,
  postNotificationWithSurvey,
} from 'src/api/modules/notification';
import { bytesToSize } from 'src/utils/bytesToFileSize';
import Toast from 'react-native-toast-message';
import useSelector from 'src/utils/useSelector';
import { Config, Keys } from 'src/const';
import { useDispatch } from 'react-redux';
import {
  setLoading,
  setListMessageState,
  setTypeAddMessage,
  setNumberNoticeAndMessage,
  setTabMessage,
  setConfirmedNotification,
  setStateSeenMessage,
  setListNotiIzumi,
} from 'src/actions/miscActions';
import { getListMessage, postMessage } from 'src/api/modules/message';
import { Pagination, SeenMessage } from 'src/types';
import * as SecureStore from 'expo-secure-store';
import * as Linking from 'expo-linking';
import NetInfo from '@react-native-community/netinfo';
import { Feather } from '@expo/vector-icons';

const showToast = props => {
  Toast.show({
    text1: props.title,
    text2: props.content,
    type: props.variant,
    position: 'top',
  });
};

const handleBreakLastDate = data => {
  let lastDate = '';

  const len = data.length;
  let idx = 0;

  while (idx < len) {
    if (data[idx].created_at_in_date !== lastDate) {
      lastDate = data[idx].created_at_in_date;

      data[idx].lastDate = true;
    } else {
      data[idx].lastDate = false;
    }

    idx++;
  }

  return data;
};

const Message = ({ data }) => {
  // const idUserCurrent = useSelector(state => state.misc.profile.uuid);
  const idUserCurrent = useSelector(state => state.misc.profile.id);

  return (
    <View>
      {data.lastDate && (
        <View style={styles.zoneBreakDate}>
          <Text style={styles.textBreakDate}>{data.created_at_in_date}</Text>
        </View>
      )}

      <View style={styleMessage.container}>
        <View style={styleMessage.infoUser}>
          <Image
            style={styleMessage.avatarUser}
            source={{
              uri: 'https://gitlab.com/vietvd13/izumi-logo/-/raw/main/Izumi.png',
            }}
          />
        </View>

        <View style={styleMessage.zoneMessage}>
          <View style={styleMessage.infoUser}>
            <Text style={styleMessage.nameUser}> {data.sender_name} </Text>
            <Text style={styleMessage.time}>
              {' '}
              {data.created_at_hours_and_min}{' '}
            </Text>
          </View>
          <View
            style={[
              styleMessage.message,
              data.sender_code === idUserCurrent
                ? styleMessage.mePeople
                : styleMessage.otherPeople,
            ]}>
            <Text selectable={true}>{data.content}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

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

const styleNotification = StyleSheet.create({
  container: {
    padding: 15,
  },
  message: {
    marginBottom: 15,
  },
  date: {
    flex: 1,
    color: '#000',
    opacity: 0.5,
    fontSize: 11,
    alignSelf: 'flex-end',
  },
  bgWhite: {
    backgroundColor: '#FFF',
  },
  bgBlue: {
    backgroundColor: '#F1F5FA',
  },
  backgroundImage: {
    alignSelf: 'center',
    marginTop: 50,
    width: 150,
    height: 150,
  },
  sorryText: {
    textAlign: 'center',
    fontSize: 28,
  },
});

const NotificationDetail = ({ data }) => {
  console.log('DATA NOTIFICATON ============> ', data);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isReRender, setIsReRender] = useState(false);
  const [isTyping, setIsTyping] = useState<Boolean>(false);

  // eslint-disable-next-line no-shadow
  const showToast = props => {
    Toast.show({
      text1: props.title,
      text2: props.content,
      type: props.variant,
      position: 'top',
    });
  };

  useEffect(() => {
    setIsReRender(false);
  }, [isReRender]);

  const profile = useSelector(state => state.misc.profile);

  const currentNotification = useSelector(
    state => state.misc.numberNoticeAndMessage,
  );

  const urlAPI = {
    apiUpdateNotificationWithoutSurvey: '/notices/seen/no-survey',
    apiUpdateNotificationWithSurvey: '/notices/seen/survey-answer',
  };

  const onPressConfirm = () => {
    if (data.surveys.length === 0) {
      updateWithoutSurvey(data.id);
    } else {
      updateWithSurvey(data.id);
    }
  };

  async function updateWithSurvey(notification_id) {
    if (data.viewed !== true) {
      const CHECKBOX = 1;
      const RADIO = 2;

      const DATA = {
        user_code: profile.id,
        user_id: profile.uuid,
        notice_id: notification_id,
        answer: [],
      };

      let isValid = true;

      for (let i = 0; i < data.surveys.length; i++) {
        DATA.answer.push({
          question_id: data.surveys[i].id,
          answer_id: [],
          comment: null,
        });

        if (data.surveys[i].type === CHECKBOX) {
          const CHECKBOX_LIST = data.surveys[i].checkbox_list;

          for (let j = 0; j < CHECKBOX_LIST.length; j++) {
            if (CHECKBOX_LIST.some(item => item.value === true)) {
              if (CHECKBOX_LIST[j].value === true) {
                DATA.answer[i].answer_id.push(CHECKBOX_LIST[j].id);
              }
              isValid = true;
            } else {
              isValid = false;
              break;
            }
          }
        } else if (data.surveys[i].type === RADIO) {
          const RADIO_OPTION = data.surveys[i].radio_option;
          const RADIO_LIST = data.surveys[i].radio_list;

          if (RADIO_OPTION === -1) {
            isValid = false;
            break;
          } else {
            DATA.answer[i].answer_id.push(RADIO_LIST[i].id);
            isValid = true;
          }
        } else {
          DATA.answer[i].comment = data.surveys[i].comment_list[0];
        }
      }

      if (isValid === false) {
        showToast({
          variant: 'warning',
          title: '警告',
          content: '回答されてない設問があるため、提出ができません。',
        });
      } else {
        const SITE = Config.URL_DOMAIN_IZUMI_WEB_APP;
        const URL = urlAPI.apiUpdateNotificationWithSurvey;
        const PARAM = null;

        try {
          setIsLoading(true);

          dispatch(setLoading(true));

          const response = await postNotificationWithSurvey(
            SITE,
            URL,
            DATA,
            PARAM,
          );

          console.log(
            'VIEW NOTIFICATION WITH SURVEY ==========>',
            response.data,
          );

          if (response.status === 200) {
            data.viewed = true;
            setIsReRender(!isReRender);
            setIsLoading(false);

            dispatch(
              setConfirmedNotification({
                notification_id: notification_id,
              }),
            );

            dispatch(
              setNumberNoticeAndMessage({
                ...currentNotification,
                unread_notices: currentNotification.unread_notices - 1,
              }),
            );
          } else {
            setIsLoading(false);
          }
        } catch (error) {
          console.log(error);
        }
      }

      dispatch(setLoading(false));
    }
  }

  async function updateWithoutSurvey(notification_id) {
    dispatch(setLoading(true));

    const DATA = {
      user_code: profile.id,
      user_id: profile.uuid,
      notice_id: notification_id,
    };

    const PARAM = null;

    try {
      setIsLoading(true);

      const response = await postNotificationWithoutSurvey(
        Config.URL_DOMAIN_IZUMI_WEB_APP,
        urlAPI.apiUpdateNotificationWithoutSurvey,
        DATA,
        PARAM,
      );

      console.log(
        'VIEWED NOTIFICATION WITH OUT SURVEY ==========> ',
        response.data,
      );

      if (response.status === 200) {
        data.viewed = true;

        dispatch(
          setConfirmedNotification({
            notification_id: notification_id,
          }),
        );

        if (currentNotification.unread_notices > 0) {
          dispatch(
            setNumberNoticeAndMessage({
              ...currentNotification,
              unread_notices: currentNotification.unread_notices - 1,
            }),
          );
        } else {
          dispatch(
            setNumberNoticeAndMessage({
              ...currentNotification,
              unread_notices: 0,
            }),
          );
        }

        setIsReRender(!isReRender);

        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }

    dispatch(setLoading(false));
  }

  function handleSelectAnswerCheckbox(value, question_id, answer_id) {
    setIsReRender(!isReRender);

    for (let i = 0; i < data.surveys.length; i++) {
      if (data.surveys[i].id === question_id) {
        for (let j = 0; j < data.surveys[i].checkbox_list.length; j++) {
          data.surveys[i].checkbox_list[answer_id].value = value;
        }
      }
    }
  }

  function handleSelectAnswerRadio(value, question_id) {
    setIsReRender(!isReRender);

    for (let i = 0; i < data.surveys.length; i++) {
      if (data.surveys[i].id === question_id) {
        data.surveys[i].radio_option = value;
      }
    }
  }

  function handleChangeText(value, question_id) {
    setIsReRender(!isReRender);

    for (let i = 0; i < data.surveys.length; i++) {
      if (data.surveys[i].id === question_id) {
        data.surveys[i].comment_list[0] = value;
      }
    }
  }

  const handleViewFile = (file: any) => {
    const URL = `${Config.URL_DOMAIN_IZUMI_WEB_APP_DOWNLOAD}/${file.file_path}`;
    console.log('VIEW FILE ======================> ', URL);

    Linking.canOpenURL(URL).then(isCanOpen => {
      if (isCanOpen) {
        Linking.openURL(URL);
      }
    });
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        {data && (
          <View style={styleNotificationDetail.messageDetail}>
            <View>
              <Text style={styleNotificationDetail.message}>
                {data.subject}
              </Text>
            </View>

            <View style={styleNotificationDetail.date}>
              <Text>{data.public_date_display}</Text>
            </View>

            <View style={styleNotificationDetail.detail}>
              <Text style={styleNotificationDetail.textDetail}>
                {data.content}
              </Text>
            </View>

            {data.surveys.length !== 0 && data.viewed === false ? (
              <View style={styleNotificationDetail.zoneHelper}>
                <Text style={styleNotificationDetail.textHelper}>
                  {'確認後のアンケートにご回答ください。'}
                </Text>
              </View>
            ) : (
              <View />
            )}

            {data.viewed === true ? (
              <View />
            ) : (
              <View style={styleNotificationDetail.zoneSurvey}>
                <View>
                  {data.surveys.map((item, indexQuestion) => (
                    <View key={indexQuestion}>
                      <View style={styleNotificationDetail.surveyQuestion}>
                        <View style={styleNotificationDetail.verticalBar} />
                        <Text style={styleNotificationDetail.textDetail}>
                          {'設問' +
                            (indexQuestion + 1) +
                            ' : ' +
                            item.question_content}
                        </Text>
                      </View>

                      {item.type === 1 && (
                        <View style={styleNotificationDetail.itemSurvey}>
                          {item.checkbox_list.map((checkbox, indexCheckbox) => (
                            <Pressable
                              key={indexCheckbox}
                              onPress={() => {
                                handleSelectAnswerCheckbox(
                                  !checkbox.value,
                                  item.id,
                                  indexCheckbox,
                                );
                              }}
                              style={{ width: '100%' }}>
                              <View
                                style={[
                                  styleNotificationDetail.surveyAnswer,
                                  { flexDirection: 'row' },
                                ]}>
                                <Checkbox
                                  style={styleNotificationDetail.checkbox}
                                  value={checkbox.value}
                                  onValueChange={value => {
                                    handleSelectAnswerCheckbox(
                                      value,
                                      item.id,
                                      indexCheckbox,
                                    );
                                  }}
                                />
                                <Text style={styleNotificationDetail.paragraph}>
                                  {checkbox.label}
                                </Text>
                              </View>
                            </Pressable>
                          ))}
                        </View>
                      )}

                      {item.type === 2 && (
                        <View style={{ marginBottom: 10 }}>
                          <RadioForm animation={true}>
                            {item.radio_list.map((radio, indexRadio) => (
                              <Pressable
                                key={indexRadio}
                                onPress={() => {
                                  handleSelectAnswerRadio(radio.value, item.id);
                                }}
                                style={{ width: '100%' }}>
                                <View
                                  style={[
                                    styleNotificationDetail.surveyAnswerRadio,
                                    { flexDirection: 'row' },
                                  ]}>
                                  <RadioButton labelHorizontal={true}>
                                    <RadioButtonInput
                                      obj={radio}
                                      isSelected={
                                        item.radio_option === indexRadio
                                      }
                                      index={indexRadio}
                                      onPress={value => {
                                        handleSelectAnswerRadio(value, item.id);
                                      }}
                                      buttonSize={12}
                                      buttonInnerColor={'#009688'}
                                      buttonOuterColor={
                                        item.radio_option
                                          ? '#657786'
                                          : '#657786'
                                      }
                                      buttonWrapStyle={{
                                        marginLeft: 7,
                                        marginTop: 3,
                                      }}
                                    />
                                    <RadioButtonLabel
                                      obj={radio}
                                      index={indexRadio}
                                      labelHorizontal={true}
                                      onPress={value => {
                                        handleSelectAnswerRadio(value, item.id);
                                      }}
                                      labelStyle={{ fontSize: 14 }}
                                      labelWrapStyle={{}}
                                    />
                                  </RadioButton>
                                </View>
                              </Pressable>
                            ))}
                          </RadioForm>
                        </View>
                      )}

                      {item.type === 3 && (
                        <View style={styleNotificationDetail.commentInput}>
                          <TextInput
                            accessibilityLabel={'_CommentInput'}
                            keyboardType={'default'}
                            returnKeyType={'done'}
                            multiline={true}
                            numberOfLines={4}
                            value={item.comment_list[0]}
                            onChangeText={value => {
                              handleChangeText(value, item.id);
                            }}
                            autoFocus={false}
                            style={[styleNotificationDetail.textArea]}
                            onFocus={() => {
                              setTimeout(() => {
                                setIsTyping(true);
                              }, 100);
                            }}
                            onBlur={() => {
                              setIsTyping(false);
                            }}
                          />
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              </View>
            )}

            <View style={styleNotificationDetail.messageDetailFooterButton}>
              {data.list_file_display.length > 0 ? (
                <View style={styleNotificationDetail.messageDetailFile}>
                  {data.list_file_display.map((file, index) => {
                    return (
                      <Pressable onPress={() => handleViewFile(file)}>
                        <Text
                          style={styleNotificationDetail.textFileDetail}
                          key={`file-${index}`}>
                          {file.file_name + ' '}

                          <Text style={{ fontSize: 12 }}>
                            {bytesToSize(file.file_size)}
                          </Text>
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              ) : (
                <View />
              )}

              <BaseButton
                accessibilityLabel={'_ConfirmNotificationButton'}
                title={
                  data.surveys.length === 0
                    ? data.viewed === true
                      ? 'メッセージは確認済みです'
                      : 'メッセージを確認しました'
                    : data.viewed === true
                    ? 'アンケートは提出済みです'
                    : 'アンケートを提出します'
                }
                onPressButton={onPressConfirm}
                disabled={data.viewed}
                buttonStyles={[
                  data.viewed === true
                    ? {
                        backgroundColor: '#E5E5E5',
                        borderColor: '#E5E5E5',
                      }
                    : {
                        backgroundColor: '#0FAE71',
                        borderColor: '#0FAE71',
                      },
                  { marginBottom: 15 },
                ]}
                textStyles={
                  data.viewed === true
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
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

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
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  textFileDetail: {
    color: '#1534A1',
    fontWeight: 'bold',
    paddingVertical: 15,
    textAlign: 'justify',
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1534A1',
  },
  messageDetailFooterButton: {
    flex: 1,
    flexDirection: 'column',
    textAlign: 'center',
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
    marginTop: 10,
    marginHorizontal: 10,
    fontSize: 14,
  },
  itemSurvey: {
    marginVertical: 5,
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
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#1b2e9e',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    height: 200,
    paddingTop: 10,
    paddingBottom: 0,
    textAlignVertical: 'top',
  },
  surveyQuestion: {
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 25,
    borderWidth: 1,
    borderColor: '#1b2e9e',
    fontWeight: 'bold',
  },
  surveyAnswerRadio: {
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    paddingVertical: 5,
    marginTop: 10,
    fontSize: 16,
    paddingLeft: 10,
    borderColor: '#1b2e9e',
  },
  surveyAnswer: {
    width: '100%',
    marginVertical: 5,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#1b2e9e',
    paddingLeft: 10,
  },
  commentInput: {
    marginVertical: 10,
    height: 200,
    borderColor: '#1b2e9e',
    borderRadius: 5,
  },
  verticalBar: {
    marginTop: 10,
    marginRight: 10,
    width: 7,
    height: 30,
    backgroundColor: '#1b2e9e',
  },
});

export interface propsType {
  navigation: any;
  route: any;
}

const Note = (props: propsType) => {
  const dispatch = useDispatch();

  const numberNoticeAndMessage = useSelector(
    state => state.misc.numberNoticeAndMessage,
  );
  const userId = useSelector(state => state.misc.profile.uuid);
  // eslint-disable-next-line no-shadow
  const groupID = useSelector(state => state.misc.groupChatId);
  const listSeen = useSelector(state => state.misc.listSeen);

  const scrollMessage = React.useRef(null);
  const scrollNotification = React.useRef(null);
  const [tab, setTab] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [listMessage, setListMessage] = useState([]);
  const [listNotification, setListNotification] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [perPage, setPerPage] = useState(50);
  const [isLoading, setIsLoading] = useState(false);
  const [messageDetail, setMessageDetail] = useState([]);
  const [pagination, setPagination] = useState<Pagination>({
    current_page: 1,
    display: 0,
    per_page: 20,
    total_pages: 0,
    total_records: 0,
  });
  const [idPagination, setIdPagination] = useState<number>();
  const listMessageState = useSelector(state => state.misc.listMessage);
  const typeAddMessageState = useSelector(state => state.misc.typeAddMessage);
  const currentTab = useSelector((state: any) => state.misc.tab.current_tab);
  const confirmedNotificationID = useSelector(
    state => state.misc.confirmedNotification.notification_id,
  );
  const [isTyping, setIsTyping] = useState<Boolean>(false);
  const listNotiIzumiState = useSelector(state => state.misc.listNotiIzumi);
  const [isScrollEnd, setIsScrollEnd] = useState<boolean>(false);
  const isConnect = useSelector(state => state.misc.isConnectPusher);
  const department_code = useSelector(
    state => state.misc.profile.department_code,
  );
  const [connect, setConnect] = useState(false);
  const token = useSelector(state => state.misc.token);
  const urlAPI = {
    apiGetListNotificationIzumi: '/mobile/notices',
    apiGetSpecificNotificationIzumi: '/mobile/notices',
    getListMessage: '/message/load',
    postMessage: '/message',
  };
  const role = useSelector(state => state.misc.profile.role);
  const [isAvailableRole, setIsAvailableRole] = useState<boolean>(false);

  useEffect(() => {
    if (parseInt(role) >= 4) {
      setIsAvailableRole(false);
    } else {
      setIsAvailableRole(true);
    }
  }, []);

  useEffect(() => {
    dispatch(setTabMessage({ current_tab: 'TEAM' }));
  }, []);

  useEffect(() => {
    if (tab === 'TEAM' && isAvailableRole === true) {
      if (typeAddMessageState === Keys.TYPE_ADD_MESSAGE.INIT) {
        setTimeout(() => {
          if (scrollMessage.current) {
            if (isAvailableRole === true) {
              scrollMessage.current.scrollToEnd({ animated: true });
            }
          }
        }, 500);
      }

      if (typeAddMessageState === Keys.TYPE_ADD_MESSAGE.ADD_ME) {
        setTimeout(() => {
          if (scrollMessage.current) {
            if (isAvailableRole === true) {
              scrollMessage.current.scrollToEnd({ animated: true });
            }
          }
        }, 500);
      }
    }
  }, [listMessageState]);

  useEffect(() => {
    const handleListSeen = async () => {
      setIsLoading(true);

      if (listMessageState.length > 0) {
        const LAST_MESSAGE = listMessageState[listMessageState.length - 1];

        const USER_ID = userId;
        const GROUP_ID = groupID;
        const MESSAGE_ID = LAST_MESSAGE.message_id || LAST_MESSAGE.id;

        const NEW_SEEN: SeenMessage = {
          user_id: USER_ID,
          group_id: GROUP_ID,
          message_id: MESSAGE_ID,
        };

        const isExit = isExitUserSeenMessage(USER_ID);

        const LIST = listSeen;

        if (isExit >= 0) {
          console.log('LIST MESSAGE SEEN =============> EDIT');
          LIST[isExit] = NEW_SEEN;

          dispatch(setStateSeenMessage(LIST));
          await SecureStore.setItemAsync('LIST_SEEN', JSON.stringify(LIST));
        } else {
          LIST.push(NEW_SEEN);

          dispatch(setStateSeenMessage(LIST));
          await SecureStore.setItemAsync('LIST_SEEN', JSON.stringify(LIST));
        }

        console.log('LIST MESSAGE SEEN ================> ', LIST);
      }

      setIsLoading(false);
    };

    handleListSeen();

    setTab('TEAM');
  }, [listMessageState]);

  const isExitUserSeenMessage = (user_id: number) => {
    if (listSeen) {
      const len = listSeen.length;
      let idx = 0;

      while (idx < len) {
        if (listSeen[idx].user_id === user_id) {
          return idx;
        }

        idx++;
      }
    } else {
      return -1;
    }
  };

  useEffect(() => {
    const onBackAction = () => {
      if (currentTab === 'TEAM') {
        props.navigation.push('DashboardScreen');
      } else if (currentTab === 'IZUMI') {
        props.navigation.push('DashboardScreen');
      } else if (currentTab === 'IZUMI_DETAIL') {
        setTab('IZUMI');
        handleSetViewState(confirmedNotificationID);
        dispatch(setTabMessage({ current_tab: 'IZUMI' }));
      }

      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackAction);
  }, [currentTab]);

  useEffect(() => {
    const handleInitData = async () => {
      if (groupID) {
        console.log('START INIT DATA');
        await Keyboard.dismiss();

        try {
          setIsLoading(true);

          const URL = urlAPI.getListMessage;
          const PARAMS = {
            group_id: groupID,
            page: pagination.current_page,
            per_page: pagination.per_page,
          };

          const res = await getListMessage(
            Config.URL_DOMAIN_IZUMI_WEB_APP,
            URL,
            PARAMS,
          );

          const DATA = res.data;

          if (DATA.code === 200) {
            const RESULT = handleBreakLastDate(DATA.data.reverse());
            setListMessage(RESULT);
            dispatch(setTypeAddMessage(Keys.TYPE_ADD_MESSAGE.INIT));
            dispatch(setListMessageState(RESULT));

            const len = RESULT.length;
            const ID = RESULT[len - 1].message_id;
            setIdPagination(ID);

            dispatch(
              setNumberNoticeAndMessage({
                unread_messages: 0,
                unread_notices: numberNoticeAndMessage.unread_notices,
              }),
            );

            setPagination(DATA.pagination);
            setIsLoading(false);

            console.log('INTI DATA DONE');
          }
        } catch (error) {
          setIsLoading(false);
          console.log(error);
        }
      } else {
        showToast({
          variant: 'warning',
          title: '警告',
          content:
            'グループチャットに追加されていません。管理者に連絡してください',
        });
      }
    };

    handleInitData();

    setTimeout(() => {
      if (isAvailableRole === true) {
        scrollMessage.current.scrollToEnd({ animated: true });
      }
    }, 100);
  }, []);

  const handleScroll = (event: any) => {
    if (listMessageState.length > 0) {
      const MAX_HIGHT_SCROLL = event.nativeEvent.contentSize.height;
      const POSITION = event.nativeEvent.contentOffset.y;
      const BONUS = event.nativeEvent.layoutMeasurement.height;

      const SHOW_SCROLL_END = MAX_HIGHT_SCROLL - (POSITION + BONUS);

      if (SHOW_SCROLL_END > 300) {
        setIsScrollEnd(true);
      } else {
        setIsScrollEnd(false);
      }
    }

    if (!isLoading) {
      if (event.nativeEvent.contentOffset.y <= 0) {
        if (pagination.current_page < pagination.total_pages) {
          const PAGE = pagination.current_page + 1;

          setPagination({
            current_page: PAGE,
            display: pagination.display,
            per_page: pagination.per_page,
            total_pages: pagination.total_pages,
            total_records: pagination.total_records,
          });

          handleGetListMessage(PAGE);
        }
      }
    }
  };

  const handleGetListMessage = async (page: number) => {
    if (groupID) {
      await Keyboard.dismiss();

      try {
        setIsLoading(true);
        const URL = urlAPI.getListMessage;
        const PARAMS = {
          group_id: groupID,
          message_id: idPagination,
          page: page,
          per_page: pagination.per_page,
        };

        const res = await getListMessage(
          Config.URL_DOMAIN_IZUMI_WEB_APP,
          URL,
          PARAMS,
        );

        const DATA = res.data;

        if (DATA.code === 200) {
          const RESULT = handleBreakLastDate(
            DATA.data.reverse().concat(listMessage),
          );
          dispatch(setTypeAddMessage(Keys.TYPE_ADD_MESSAGE.OLD));
          setListMessage(RESULT);
          dispatch(setListMessageState(RESULT));
          setPagination(DATA.pagination);
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    } else {
      showToast({
        variant: 'warning',
        title: '警告',
        content:
          'グループチャットに追加されていません。管理者に連絡してください',
      });
    }
  };

  useEffect(() => {
    handleSetViewState(confirmedNotificationID);

    if (tab !== 'TEAM') {
      setIsScrollEnd(false);
    } else {
      if (isAvailableRole === true) {
        scrollMessage.current.scrollToEnd({ animated: true });
      }

      dispatch(
        setNumberNoticeAndMessage({
          ...numberNoticeAndMessage,
          unread_messages: 0,
        }),
      );
    }
  }, [tab]);

  const onPressScrollEnd = () => {
    console.log('IZUMI APP ================> PRESS SCROLL END');

    if (isAvailableRole === true) {
      scrollMessage.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    async function getDataIzumiTab() {
      const SITE = Config.URL_DOMAIN_IZUMI_WEB_APP;
      const URL = `${urlAPI.apiGetListNotificationIzumi}?page=${currentPage}&per_page=${perPage}`;
      const PARAMS = null;

      try {
        dispatch(setLoading(true));

        const response = await getListNotificationIzumi(SITE, URL, PARAMS);

        if (response.status === 200) {
          setListNotification(response.data.data);
          dispatch(setListNotiIzumi(response.data.data));
          setTotalPage(response.data.pagination.total_pages);
        }
      } catch (error) {
        console.log(error);
      }

      dispatch(setLoading(false));
    }

    getDataIzumiTab();
  }, []);

  async function getNotificationNInfo(notification) {
    const SITE = Config.URL_DOMAIN_IZUMI_WEB_APP;
    const URL = `${urlAPI.apiGetSpecificNotificationIzumi}/${notification.id}`;
    const PARAMS = null;

    try {
      dispatch(setLoading(true));

      const response = await getSpecificNotificationIzumi(SITE, URL, PARAMS);

      if (response.status === 200) {
        const CHECKBOX = 1;
        const RADIO = 2;
        const COMMENT = 3;

        for (let i = 0; i < response.data.data.surveys.length; i++) {
          response.data.data.surveys[i].radio_list = [];
          response.data.data.surveys[i].checkbox_list = [];
          response.data.data.surveys[i].comment_list = [];
          response.data.data.surveys[i].radio_option = -1;
        }

        for (let i = 0; i < response.data.data.surveys.length; i++) {
          if (response.data.data.surveys[i].type === CHECKBOX) {
            for (
              let j = 0;
              j < response.data.data.surveys[i].survey_question_answer.length;
              j++
            ) {
              response.data.data.surveys[i].checkbox_list.push({
                label:
                  response.data.data.surveys[i].survey_question_answer[j]
                    .answer_content,
                value: false,
                id: response.data.data.surveys[i].survey_question_answer[j].id,
              });
            }
          } else if (response.data.data.surveys[i].type === RADIO) {
            for (
              let j = 0;
              j < response.data.data.surveys[i].survey_question_answer.length;
              j++
            ) {
              response.data.data.surveys[i].radio_list.push({
                label:
                  response.data.data.surveys[i].survey_question_answer[j]
                    .answer_content,
                value:
                  response.data.data.surveys[i].survey_question_answer[j]
                    .position,
                id: response.data.data.surveys[i].survey_question_answer[j].id,
              });
            }
          } else if (response.data.data.surveys[i].type === COMMENT) {
            response.data.data.surveys[i].comment_list.push('');
          }
        }

        setMessageDetail(response.data.data);

        setTab('IZUMI_DETAIL');
        dispatch(setTabMessage({ current_tab: 'IZUMI_DETAIL' }));
      }
    } catch (error) {
      console.log(error);
    }

    dispatch(setLoading(false));
  }

  const onSendMessage = async () => {
    if (groupID) {
      if (newMessage) {
        await NetInfo.fetch().then(state => {
          if (state.isConnected === false) {
            showToast({
              variant: 'warning',
              title: '警告',
              content: 'メッセージが送信できません',
            });
          }
        });

        try {
          setNewMessage('');
          if (isAvailableRole === true) {
            scrollMessage.current.scrollToEnd({ animated: true });
          }

          const URL = urlAPI.postMessage;
          const message = newMessage.trim();
          const DATA = {
            group_id: groupID,
            message: message,
          };

          await postMessage(Config.URL_DOMAIN_IZUMI_WEB_APP, URL, DATA);

          console.log('IZUMI WEB APP ============> SEND MESSAGE DONE');

          if (isAvailableRole === true) {
            scrollMessage.current.scrollToEnd({ animated: true });
          }
        } catch (error) {
          setNewMessage('');

          console.log(
            'IZUMI APP =======> Deo gui duoc tin nhan dau ong chau a',
          );
        }
      }
    } else {
      showToast({
        variant: 'warning',
        title: '警告',
        content:
          'グループチャットに追加されていません。管理者に連絡してください',
      });
    }
  };

  async function handleLazyLoading() {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);

      setIsLoading(true);

      const SITE = Config.URL_DOMAIN_IZUMI_WEB_APP;
      const URL = `${urlAPI.apiGetListNotificationIzumi}?page=${currentPage}&per_page=${perPage}`;
      const PARAMS = null;

      try {
        const response = await getListNotificationIzumi(SITE, URL, PARAMS);

        if (response.status === 200) {
          for (let i = 0; i < response.data.data.length; i++) {
            listNotification.push(response.data.data[i]);
          }

          dispatch(setListNotiIzumi(listNotification));
        }
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    }
  }

  function handleSetViewState(notification_id) {
    listNotification.filter(item => {
      if (item.id === notification_id) {
        item.viewed = true;
      }
    });
  }

  const goBackDashboard = () => {
    if (currentTab === 'TEAM') {
      props.navigation.push('DashboardScreen');
    } else if (currentTab === 'IZUMI') {
      props.navigation.push('DashboardScreen');
    } else if (currentTab === 'IZUMI_DETAIL') {
      setTab('IZUMI');
      handleSetViewState(confirmedNotificationID);
      dispatch(setTabMessage({ current_tab: 'IZUMI' }));
    }
  };

  const renderFooter = () => {
    return isLoading === true ? (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : (
      <View />
    );
  };

  useEffect(() => {
    if (
      JSON.stringify(listNotiIzumiState) !== JSON.stringify(listNotification)
    ) {
      setListNotification(listMessageState);
    }
  }, [listNotiIzumiState]);

  const handleKeyboard = () => {
    if (tab === 'TEAM') {
      if (Platform.OS === 'ios') {
        return 48;
      }

      return 60;
    }

    return 0;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={handleKeyboard()}
      enabled>
      <View style={{ flex: 1 }}>
        <Navbar />
        <View style={styles.wrapper}>
          <View style={styles.header}>
            <View style={styles.headerIcon}>
              <Pressable
                accessibilityLabel={'_ReturnButton'}
                onPress={() => {
                  goBackDashboard();
                }}>
                <Icon
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
              accessibilityLabel={'_TeamTabButton'}
              style={[styles.tabStyle, tab === 'TEAM' ? styles.tabActive : {}]}
              onPress={() => {
                setTab('TEAM');
                dispatch(setTabMessage({ current_tab: 'TEAM' }));
                setNewMessage('');
              }}>
              <Text
                style={[
                  styles.tabText,
                  tab === 'TEAM' ? styles.tabTextActive : {},
                ]}>
                Team
              </Text>

              {numberNoticeAndMessage.unread_messages > 0 && (
                <View style={styles.messageText}>
                  <Text style={styles.textNotify}>
                    {numberNoticeAndMessage.unread_messages}
                  </Text>
                </View>
              )}
            </Pressable>
            <Pressable
              accessibilityLabel={'_IzumiTabButton'}
              style={[
                styles.tabStyle,
                tab === 'IZUMI' || tab === 'IZUMI_DETAIL'
                  ? styles.tabActive
                  : {},
              ]}
              onPress={() => {
                setTab('IZUMI');
                dispatch(setTabMessage({ current_tab: 'IZUMI' }));
                setNewMessage('');
              }}>
              <Text
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
                  <Text style={styles.textNotify}>
                    {numberNoticeAndMessage.unread_notices}
                  </Text>
                </View>
              )}
            </Pressable>
          </View>

          <View style={{ flex: 1 }}>
            {tab === 'TEAM' ? (
              <View style={{ flex: 1, backgroundColor: '#F1F5FA' }}>
                {isAvailableRole === false ? (
                  <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                    <View style={{ marginTop: 80 }}>
                      <Text style={styleNotification.sorryText}>
                        この機能は
                      </Text>
                      <Text
                        style={[
                          styleNotification.sorryText,
                          { fontWeight: '900' },
                        ]}>
                        拠点に所属したユーザーのみ
                      </Text>
                      <Text style={styleNotification.sorryText}>
                        利用可能です。
                      </Text>

                      <Image
                        style={styleNotification.backgroundImage}
                        source={{
                          uri: 'https://gitlab.com/vietvd13/izumi-logo/-/raw/main/Izumi.png',
                        }}
                      />
                    </View>
                  </View>
                ) : (
                  <View style={{ flex: 1 }}>
                    {isScrollEnd && (
                      <Pressable
                        style={styles.buttonScrollEnd}
                        onPress={onPressScrollEnd}>
                        <Feather name="arrow-down" size={27} color="#1534A1" />
                      </Pressable>
                    )}

                    <ScrollView
                      style={styles.zoneChat}
                      ref={scrollMessage}
                      onScroll={handleScroll}>
                      {isLoading && <ActivityIndicator size="small" />}
                      {listMessageState &&
                        listMessageState.map((item, index) => {
                          return (
                            <Message
                              key={`message-no-${index + 1}`}
                              data={item}
                            />
                          );
                        })}
                    </ScrollView>

                    <View>
                      <View style={styles.zoneInput}>
                        <View
                          style={[
                            isTyping
                              ? styles.inputMessage
                              : styles.inputMessageFocus,
                          ]}>
                          <TextInput
                            accessibilityLabel={'_NewMessageInput'}
                            keyboardType={'default'}
                            returnKeyType={'done'}
                            placeholder={''}
                            multiline={true}
                            numberOfLines={4}
                            value={newMessage}
                            onChangeText={setNewMessage}
                            style={styles.messageInputField}
                            onFocus={() => {
                              setTimeout(() => {
                                if (isAvailableRole === true) {
                                  scrollMessage.current.scrollToEnd({
                                    animated: true,
                                  });
                                }
                              }, 100);
                            }}
                          />
                        </View>
                        <Pressable
                          accessibilityLabel={'_SendNewMessageButton'}
                          style={[
                            isTyping ? styles.iconSend : styles.iconSendFocus,
                          ]}
                          onPress={onSendMessage}>
                          <Icon
                            style={{ lineHeight: 60 }}
                            name="send"
                            size={20}
                            color="#1534A1"
                          />
                        </Pressable>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            ) : (
              <View />
            )}

            {tab === 'IZUMI' ? (
              <View style={{ flex: 1 }}>
                <FlatList
                  data={listNotification}
                  renderItem={({ item, index }) => (
                    <Pressable
                      accessibilityLabel={'_NotificationItem-' + item.id}
                      onPress={() => {
                        getNotificationNInfo(item);
                      }}>
                      <View
                        style={[
                          styleNotification.container,
                          index % 2 !== 0
                            ? styleNotification.bgWhite
                            : styleNotification.bgBlue,
                        ]}>
                        <View>
                          <Text
                            style={[
                              styleNotification.message,
                              item.viewed === true
                                ? { opacity: 0.5 }
                                : { fontWeight: 'bold' },
                            ]}>
                            {item.subject}
                          </Text>
                        </View>

                        <View style={styleNotification.date}>
                          <Text
                            style={
                              item.viewed === true
                                ? { opacity: 0.5 }
                                : { fontWeight: 'bold' }
                            }>
                            {item.public_date}
                          </Text>
                        </View>
                      </View>
                    </Pressable>
                  )}
                  keyExtractor={(item, index) => `notification-no-${index + 1}`}
                  onEndReached={handleLazyLoading}
                  onEndReachedThreshold={0.1}
                  ListFooterComponent={renderFooter}
                />
              </View>
            ) : (
              <View />
            )}

            {tab === 'IZUMI_DETAIL' ? (
              <View style={{ flex: 1 }}>
                <ScrollView
                  ref={scrollNotification}
                  onContentSizeChange={() =>
                    scrollNotification.current.scrollToEnd({ animated: true })
                  }>
                  <NotificationDetail data={messageDetail} />
                </ScrollView>
              </View>
            ) : (
              <View />
            )}
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
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
    padding: 10,
    flexGrow: 1,
    marginBottom: 10,
  },

  zoneInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputMessage: {
    flex: 1,
  },

  inputMessageFocus: {
    flex: 1,
  },

  iconSend: {
    backgroundColor: '#FFFFFF',
    width: 50,
    textAlign: 'center',
    paddingHorizontal: 10,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },

  iconSendFocus: {
    backgroundColor: '#FFFFFF',
    width: 50,
    textAlign: 'center',
    paddingHorizontal: 10,
  },

  messageInputField: {
    width: '100%',
    height: 60,

    textAlignVertical: 'top',
    paddingTop: 15,

    paddingLeft: 15,
    paddingRight: 15,

    fontSize: 16,

    backgroundColor: '#FFFFFF',

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,

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

  buttonScrollEnd: {
    zIndex: 2,
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 100,
    right: 20,

    backgroundColor: '#FFF',
    borderRadius: 27,

    padding: 5,
  },
});

export default memo(Note);
