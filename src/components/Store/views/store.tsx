/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  Modal,
  Platform,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  BackHandler,
} from 'react-native';

import Navbar from '../../Navbar';
import useSelector from 'src/utils/useSelector';
import storeStyleSheet from '../styles/storeStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';

import { Config } from 'src/const';
import { useDispatch } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { object2Path } from 'src/utils/object2Path';
import { cleanObject } from 'src/utils/handleObject';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getListStore, getStoreInformation } from 'src/api/modules/store';
import { setLoading, setInitDataCourse, setInitDataStore, setInitDataStoreDetail, setListAuthorizedStore } from 'src/actions/miscActions';
export interface propsType {
  route: any;
  navigation: any;
}

const Base = (props: propsType) => {
  const dispatch = useDispatch();

  const [store, setStore] = useState('');
  const [storeID, setStoreID] = useState('');
  const [orderBy, setOrderBy] = useState(1);
  const [password, setPassword] = useState('');
  const [listStore, setListStore] = useState([]);
  const [sortKeyword, setSortKeyword] = useState('');
  const [wrapperOpacity, setWrapperOpacity] = useState(1);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { base_id, course_id, course_name } = props.route.params;

  const initData = useSelector(state => state.misc.initDataStore);

  const listAuthorizedStore = useSelector(state => state.misc.listAuthorizedStore);

  const [modalSortVisible, setModalSortVisible] = useState(false);
  const [invalidPasswordMessage, setInvalidPasswordMessage] = useState('');
  const [modalAuthorizeIdentityVisible, setModalAuthorizeIdentityVisible] = useState(false);

  const urlAPI = {
    apiGetListStore: `/mobile/store/list`,
    apiGetStoreInformation: '/mobile/store',
  };

  useEffect(() => {
    const backAction = () => {
      dispatch(setLoading(false));

      setWrapperOpacity(1);
      
      dispatch(setInitDataCourse(true));
  
      props.navigation.navigate('Course', {
        base_id: base_id,
      });

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const handleGetListStore = async () => {
      try {
        dispatch(setLoading(true));
        dispatch(setInitDataStore(false));

        const URL = `${urlAPI.apiGetListStore}/${course_id}`;

        const LIST_STORE = await getListStore(
          Config.URL_DOMAIN_CLOUD,
          URL,
          null
        );

        if (LIST_STORE.data) {
          setListStore(LIST_STORE.data);
        } else {
          setListStore([]);
        }

        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));

        console.log(error);
      }
    }

    if (initData) {
      handleGetListStore();
    } else {
      // console.log('initData: ', initData);
    }
  });

  const handleSortAction = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setInitDataStore(false));

      let PARAMS = {
        store_name: sortKeyword || '',
        order_by: orderBy === 1 ? 'id' : 'store_name',
        order_type: orderBy ? 'asc' : '',
      };

      PARAMS = cleanObject(PARAMS);

      const URL = `${urlAPI.apiGetListStore}/${course_id}?${object2Path(PARAMS)}`;

      console.log('URL: ', URL);

      const LIST_STORE = await getListStore(
        Config.URL_DOMAIN_CLOUD,
        URL,
        null
      );

      if (LIST_STORE.data) {
        setListStore(LIST_STORE.data);
      } else {
        setListStore([]);
      }

      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));

      console.log(error);
    }
  }

  const goBackCourseScreen = () => {
    dispatch(setInitDataCourse(true));

    props.navigation.navigate('Course', {
      base_id: base_id,
    });
  };

  const handleChangeKeyword = value => {
    setSortKeyword(value);
  };

  const handleChangePassword = value => {
    setPassword(value);
  };

  const handleCancelAuthorization = () => {
    setWrapperOpacity(1);
    setModalAuthorizeIdentityVisible(!modalAuthorizeIdentityVisible);
    setInvalidPasswordMessage('');
    setPassword('');
    setStore('');
  };

  const handleAuthorizePassword = async () => {
    if (password.length === 0) {
      setInvalidPasswordMessage('パスコードが必要です。');
    } else if (password.length < 4) {
      setInvalidPasswordMessage('パスコードの長さは 4 文字以上にする必要があります。');
    } else {
      try {
        dispatch(setLoading(true));
        dispatch(setInitDataStore(false));

        const URL = `${urlAPI.apiGetStoreInformation}/${storeID}`;

        const DATA = {
          pass_code: parseInt(password),
        };

        const response = await getStoreInformation(
          Config.URL_DOMAIN_CLOUD,
          URL,
          DATA
        );

        setWrapperOpacity(1);
        setModalAuthorizeIdentityVisible(!modalAuthorizeIdentityVisible);

        if (response.data) { 
          dispatch(setListAuthorizedStore([storeID]));

          setInvalidPasswordMessage('');
          setPassword('');
          setStore('');
          
          dispatch(setLoading(false));

          dispatch(setInitDataStoreDetail(true));

          props.navigation.navigate('StoreInformation', {
            base_id: base_id,
            store_name: store,
            store_id: storeID,
            pass_code: parseInt(password),
            course_id: course_id,
            course_name: course_name,
          });
        }
      } catch (error) {
        dispatch(setLoading(false));
        console.log(error);
        setInvalidPasswordMessage('パスコードが正しくありません。');
      }
    }
  };

  const DROPDOWN_LIST = [
    { value: 1, text: 'ID順' },
    { value: 2, text: 'A~Z順' },
  ];

  return (
    <KeyboardAvoidingView
      style={storeStyleSheet.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Navbar />

      <View style={[{ opacity: wrapperOpacity },storeStyleSheet.wrapper]}>
        <View style={storeStyleSheet.header}>
          <View style={storeStyleSheet.headerIcon}>
            <Pressable
              testID="backButton"
              accessibilityLabel='_BackButton'
              onPress={() => {
                goBackCourseScreen();
              }}>
              <Icon
                testID="backButtonIcon"
                accessibilityLabel='_BackButtonIcon'
                style={storeStyleSheet.iconBack}
                name="angle-double-left"
                size={30}
                color="#1534A1"
              />
            </Pressable>
          </View>

          <View style={storeStyleSheet.headerText}>
            <Text style={storeStyleSheet.titleScreen}>店舗カルテ</Text>
          </View>
        </View>

        <View style={storeStyleSheet.listHeader}>
          <Text style={storeStyleSheet.listHeaderText}>
            {`${course_name}コース  -  店舗選択`}
          </Text>

          <Pressable
            testID='sortButton'
            accessibilityLabel='_SortButton'
            onPress={() => {
              setWrapperOpacity(0.2);
              setModalSortVisible(true);
            }}
            style={storeStyleSheet.sortButton}
          >
            <MaterialCommunityIcons
              testID="sortButtonIcon"
              accessibilityLabel='_SortButtonIcon'
              style={storeStyleSheet.iconTune}
              name="tune"
              size={30}
              color="#FFFFFF"
            />
          </Pressable>

          <View style={storeStyleSheet.modalSort}>
            <Modal
              animationType="slide"
              presentationStyle="overFullScreen"
              transparent={true}
              visible={modalSortVisible}
              onRequestClose={() => {
                setWrapperOpacity(1);
                setModalSortVisible(!modalSortVisible);
              }}>
              <View style={storeStyleSheet.modalSortContent}>
                <Text style={storeStyleSheet.modalSortHeaderText}>検索フィルタ</Text>

                <View style={[{ marginTop: 30 },storeStyleSheet.modalSortField]}>
                  <View style={[{ flex: 1 },storeStyleSheet.modalSortColLeft]}>
                    <Text>並び替え</Text>
                  </View>

                  <View style={[{ flex: 2 },storeStyleSheet.modalSortColRight]}>
                    <SelectDropdown
                      data={DROPDOWN_LIST}
                      onSelect={(selectedItem, selectedItemIndex) => {
                        setOrderBy(selectedItem.value);
                      }}
                      buttonTextAfterSelection={item => {
                        return item.text;
                      }}
                      rowTextForSelection={item => {
                        return item.text;
                      }}
                      renderDropdownIcon={isOpened => {
                        return (
                          <Icon
                            testID="selectDropdownIcon"
                            accessibilityLabel='_SelectDropdownIcon'
                            name={isOpened ? 'chevron-up' : 'chevron-down'}
                            color="#444444"
                            size={18}
                          />
                        );
                      }}
                      defaultValueByIndex={(DROPDOWN_LIST[0].value - 1)}
                      dropdownIconPosition="right"
                      defaultButtonText={'選択してください'}
                      buttonStyle={storeStyleSheet.dropdownButton}
                      buttonTextStyle={storeStyleSheet.dropdownButtonText}
                      dropdownStyle={storeStyleSheet.dropdownContent}
                      rowStyle={storeStyleSheet.dropdownRow}
                      rowTextStyle={storeStyleSheet.dropdownRowText}
                    />
                  </View>
                </View>

                <View style={[{ marginTop: 10 },storeStyleSheet.modalSortField]}>
                  <View style={[{ flex: 1 },storeStyleSheet.modalSortColLeft]}>
                    <Text>キーワード</Text>
                  </View>

                  <View style={[{ flex: 2 },storeStyleSheet.modalSortColRight]}>
                    <TextInput
                      testID="sortKeywordInput"
                      accessibilityLabel={'_SortKeywordInput'}
                      keyboardType={'default'}
                      selectTextOnFocus={true}
                      returnKeyType={'done'}
                      value={sortKeyword}
                      onChangeText={value => {
                        handleChangeKeyword(value);
                      }}
                      autoFocus={false}
                      style={[storeStyleSheet.keywordInputText]}
                      placeholder={'入力してください'}
                      placeholderTextColor={'#444444'}
                    />
                  </View>
                </View>

                <View style={[{ marginTop: 10 },storeStyleSheet.modalSortFunctional]}>
                  <View style={storeStyleSheet.horizontalBar} />

                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Pressable
                        testID='sortButtonCancel'
                        accessibilityLabel='_SortButtonCancel'
                        style={storeStyleSheet.buttonCancel}
                        onPress={() => {
                          setWrapperOpacity(1);
                          setModalSortVisible(!modalSortVisible);
                          setSortKeyword('');
                          setOrderBy(DROPDOWN_LIST[0].value)
                        }}>
                        <Text style={storeStyleSheet.buttonCancelText}>キャンセル</Text>
                      </Pressable>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Pressable
                        testID='sortButtonApply'
                        accessibilityLabel='_SortButtonApply'
                        style={storeStyleSheet.buttonApply}
                        onPress={() => {
                          setWrapperOpacity(1);
                          setModalSortVisible(!modalSortVisible);
                          handleSortAction();
                          setSortKeyword('');
                          setOrderBy(DROPDOWN_LIST[0].value)
                        }}>
                        <Text style={storeStyleSheet.buttonApplyText}>適用</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>

        <View style={storeStyleSheet.listContent}>
          {
            listStore.length > 0 ? (
              <ScrollView>
                {listStore.map((item, storeIndex) => (
                  <Pressable
                    testID={`store${storeIndex}`}
                    accessibilityLabel={`_Store${storeIndex}`}
                    onPress={async () => {
                      setStore(item.store_name);
                      setStoreID(item.id);

                      if (item.pass_code === null) {
                        setInvalidPasswordMessage('');

                        await props.navigation.navigate('StoreInformation', {
                          base_id: base_id,
                          store_name: item.store_name,
                          store_id: item.id,
                          pass_code: item.pass_code,
                          course_id: course_id,
                          course_name: course_name,
                        });

                        dispatch(setInitDataStoreDetail(true));
                      } else {
                        if (listAuthorizedStore.length > 0) {
                          console.log('List length > 0.');

                          for (let i = 0; i < listAuthorizedStore.length; i++) {
                            if (parseInt(item.id) === parseInt(listAuthorizedStore[i])) {
                              await props.navigation.navigate('StoreInformation', {
                                base_id: base_id,
                                store_name: item.store_name,
                                store_id: item.id,
                                pass_code: item.pass_code,
                                course_id: course_id,
                                course_name: course_name,
                              });

                              dispatch(setInitDataStoreDetail(true));
                            } else {
                              setModalAuthorizeIdentityVisible(true);
                              setWrapperOpacity(0.2);
                            }
                          }
                        } else {
                          setModalAuthorizeIdentityVisible(true);
                          setWrapperOpacity(0.2);
                        }
                      }
                    }}
                    key={storeIndex}>
                    <View
                      style={[
                        storeStyleSheet.listItem,
                        storeIndex % 2 === 0 ? storeStyleSheet.evenRow : storeStyleSheet.oddRow,
                      ]}>
                      <Text style={storeStyleSheet.listItemText}>{item.store_name}</Text>
                    </View>
                  </Pressable>
                ))}
              </ScrollView>
            ) : (
              <View style={storeStyleSheet.noDataTextArea}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                  <AntDesign
                    testID="warningIcon"
                    accessibilityLabel='_WarningIcon'
                    name="warning"
                    size={20}
                    color="orange"
                    style={{ marginRight: 10 }}
                  />

                  <Text style={storeStyleSheet.noDataText}>データなし</Text>
                </View>
              </View>
            )
          }
        </View>

        <View style={storeStyleSheet.modalAuthorizeIdentity}>
          <Modal
            animationType="slide"
            presentationStyle="overFullScreen"
            transparent={true}
            visible={modalAuthorizeIdentityVisible}
            onRequestClose={() => {
              setWrapperOpacity(1);
              setModalAuthorizeIdentityVisible(!modalAuthorizeIdentityVisible);
            }}>
            <View style={storeStyleSheet.modalSortContent}>
              <Text style={storeStyleSheet.modalSortHeaderText}>
                この店舗カルテを開くには
              </Text>

              <Text style={storeStyleSheet.modalSortHeaderText}>
                パスコードが必要です。
              </Text>

              <View style={[{ marginTop: 10 },storeStyleSheet.modalSortField]}>
                <View style={[{ flex: 5 },storeStyleSheet.modalSortColLeft]}>
                  <TextInput
                    testID='passwordTextInput'
                    accessibilityLabel={'_PasswordTextInput'}
                    keyboardType={'default'}
                    returnKeyType={'done'}
                    value={password}
                    onChangeText={value => {
                      handleChangePassword(value);
                    }}
                    autoFocus={false}
                    style={[storeStyleSheet.keywordInputText]}
                    placeholder={'入力してください'}
                    placeholderTextColor={'#444444'}
                    secureTextEntry={secureTextEntry}
                    autoCapitalize={'none'}
                    maxLength={4}
                  />
                </View>

                <View style={[{ flex: 1 },storeStyleSheet.modalSortColRight]}>
                  <Pressable
                    testID='showPasswordButton'
                    accessibilityLabel='_ShowPasswordButton'
                    style={storeStyleSheet.buttonSecureTextInput}
                    onPress={() => {
                      setSecureTextEntry(!secureTextEntry);
                    }}
                  >
                    <Icon
                      testID="showPasswordButtonIcon"
                      accessibilityLabel='_ShowPasswordButtonIcon'
                      name={secureTextEntry ? 'eye-slash' : 'eye'}
                      color="#444444"
                      size={30}
                    />
                  </Pressable>
                </View>
              </View>

              <View style={[{ marginTop: 10 },storeStyleSheet.modalSortFunctional]}>
                <View style={storeStyleSheet.horizontalBar} />

                {
                  invalidPasswordMessage.length > 0 && (
                    <View style={{ flex: 1,  alignItems: 'center' }}>
                      <Text style={{ color: 'red' }}>{invalidPasswordMessage}</Text>
                    </View>
                  )
                }

                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Pressable
                      testID='buttonCancelModalAuthorize'
                      accessibilityLabel='_ButtonCancelModalAuthorize'
                      style={storeStyleSheet.buttonCancel}
                      onPress={() => {
                        handleCancelAuthorization();
                      }}>
                      <Text style={storeStyleSheet.buttonCancelText}>キャンセル</Text>
                    </Pressable>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Pressable
                      testID='buttonApplyModalAuthorize'
                      accessibilityLabel='_ButtonApplyModalAuthorize'
                      style={storeStyleSheet.buttonApply}
                      onPress={() => {
                        handleAuthorizePassword();
                      }}>
                      <Text style={storeStyleSheet.buttonApplyText}>次へ</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Base;
