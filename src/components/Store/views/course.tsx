import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  Modal,
  Platform,
  Pressable,
  TextInput,
  ScrollView,
  BackHandler,
  KeyboardAvoidingView,
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import Navbar from '../../Navbar';
import useSelector from 'src/utils/useSelector';
import courseStyleSheet from '../styles/courseStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';

import { Config } from 'src/const';
import { useDispatch } from 'react-redux';
import { object2Path } from 'src/utils/object2Path';
import { cleanObject } from 'src/utils/handleObject';
import { getListCourse } from 'src/api/modules/store';
import { setLoading, setInitDataDepartment, setInitDataCourse, setInitDataStore } from 'src/actions/miscActions';
export interface propsType {
  navigation: any;
  route: any;
}

const Course = (props: propsType) => {
  const dispatch = useDispatch();

  const profile = useSelector(state => state.misc.profile);

  const ROLE = profile.role_name;

  const { base_id } = props.route.params;
  const [orderBy, setOrderBy] = useState(1);
  const [listCourse, setListCourse] = useState([]);
  const [sortKeyword, setSortKeyword] = useState('');
  const [wrapperOpacity, setWrapperOpacity] = useState(1);
  const [modalSortVisible, setModalSortVisible] = useState(false);

  const initData = useSelector(state => state.misc.initDataCourse);

  const urlAPI = {
    apiGetListCourse: '/mobile/course/list-course-by-department',
  };

  useEffect(() => {
    const backAction = () => {
      dispatch(setLoading(false));

      setWrapperOpacity(1);

      dispatch(setInitDataDepartment(true));

      if (ROLE !== 'dx_manager') {
        props.navigation.push('DashboardScreen');
      } else {
        props.navigation.navigate('Base');
      }

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const handleGetListCourse = async () => {
      try {
        dispatch(setLoading(true));
        dispatch(setInitDataCourse(false));

        const URL = urlAPI.apiGetListCourse;

        const PARAMS = {
          department: base_id,
        };

        const LIST_COURSE = await getListCourse(
          Config.URL_DOMAIN_CLOUD,
          URL,
          PARAMS
        );

        const { code, data } = LIST_COURSE.data;

        if (code === 200) {
          setListCourse(data);
        } else {
          setListCourse([]);
        }

        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));

        console.log(error);
      }
    }

    if (initData) {
      handleGetListCourse();
    } else {
      console.log('initData: ', initData);
    }
  });

  const handleSortAction = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setInitDataCourse(false));

      let PARAMS = {
        department: base_id,
        course_code: sortKeyword || '',
        order_by: orderBy === 1 ? 'id' : 'course_code',
        order_type: orderBy ? 'asc' : '',
      };

      PARAMS = cleanObject(PARAMS);

      const URL = `${urlAPI.apiGetListCourse}?${object2Path(PARAMS)}`;

      console.log('------------------');
      console.log(URL);

      const LIST_COURSE = await getListCourse(
        Config.URL_DOMAIN_CLOUD,
        URL,
        PARAMS
      );

      const { code, data } = LIST_COURSE.data;

      if (code === 200) {
        setListCourse(data);
      } else {
        setListCourse([]);
      }

      setSortKeyword('');

      setOrderBy(DROPDOWN_LIST[0].value);

      dispatch(setLoading(false));
    } catch (error) {
      setSortKeyword('');

      setOrderBy(DROPDOWN_LIST[0].value);
  
      dispatch(setLoading(false));

      console.log(error);
    }
  }

  const goBackBaseScreen = () => {
    dispatch(setInitDataDepartment(true));
    dispatch(setInitDataCourse(true));

    if (ROLE !== 'dx_manager') {
      props.navigation.push('DashboardScreen');
    } else {
      props.navigation.navigate('Base');
    }
  };

  const handleToStoreScreen = (course_id, course_name) => {
    dispatch(setInitDataStore(true));
    dispatch(setInitDataCourse(true));

    props.navigation.navigate('Store', {
      base_id: base_id,
      course_id: course_id,
      course_name: course_name,
    });
  };

  const handleChangeText = value => {
    setSortKeyword(value);
  };

  const DROPDOWN_LIST = [
    { value: 1, text: 'ID順' },
    { value: 2, text: 'A~Z順' },
  ];

  return (
    <KeyboardAvoidingView
      style={courseStyleSheet.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Navbar />

      <View style={[{ opacity: wrapperOpacity }, courseStyleSheet.wrapper]}>
        <View style={courseStyleSheet.header}>
          <View style={courseStyleSheet.headerIcon}>
            <Pressable
              testID="backButton"
              accessibilityLabel='_backButton'
              onPress={() => {
                goBackBaseScreen();
              }}>
              <Icon
                testID="backButtonIcon"
                accessibilityLabel='_BackButtonIcon'
                style={courseStyleSheet.iconBack}
                name="angle-double-left"
                size={30}
                color="#1534A1"
              />
            </Pressable>
          </View>

          <View style={courseStyleSheet.headerText}>
            <Text style={courseStyleSheet.titleScreen}>店舗カルテ</Text>
          </View>
        </View>

        <View style={courseStyleSheet.listHeader}>
          <Text style={courseStyleSheet.listHeaderText}>コース選択</Text>

          <Pressable
            onPress={() => {
              setWrapperOpacity(0.2);
              setModalSortVisible(true);
            }}
            style={courseStyleSheet.sortButton}>
            <MaterialCommunityIcons
              testID="sortButtonIcon"
              accessibilityLabel='_SortButtonIcon'
              style={courseStyleSheet.iconTune}
              name="tune"
              size={30}
              color="#FFFFFF"
            />
          </Pressable>

          <View style={courseStyleSheet.modalSort}>
            <Modal
              animationType="slide"
              presentationStyle="overFullScreen"
              transparent={true}
              visible={modalSortVisible}
              onRequestClose={() => {
                setWrapperOpacity(1);
                setModalSortVisible(!modalSortVisible);
              }}>
              <View style={courseStyleSheet.modalSortContent}>
                <Text style={courseStyleSheet.modalSortHeaderText}>
                  検索フィルタ
                </Text>

                <View
                  style={[{ marginTop: 30 }, courseStyleSheet.modalSortField]}>
                  <View
                    style={[{ flex: 1 }, courseStyleSheet.modalSortColLeft]}>
                    <Text>並び替え</Text>
                  </View>

                  <View
                    style={[{ flex: 2 }, courseStyleSheet.modalSortColRight]}>
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
                      buttonStyle={courseStyleSheet.dropdownButton}
                      buttonTextStyle={courseStyleSheet.dropdownButtonText}
                      dropdownStyle={courseStyleSheet.dropdownContent}
                      rowStyle={courseStyleSheet.dropdownRow}
                      rowTextStyle={courseStyleSheet.dropdownRowText}
                    />
                  </View>
                </View>

                <View
                  style={[{ marginTop: 10 }, courseStyleSheet.modalSortField]}>
                  <View
                    style={[{ flex: 1 }, courseStyleSheet.modalSortColLeft]}>
                    <Text>キーワード</Text>
                  </View>

                  <View
                    style={[{ flex: 2 }, courseStyleSheet.modalSortColRight]}>
                    <TextInput
                      testID="sortKeywordInput"
                      accessibilityLabel={'_SortKeywordInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={sortKeyword}
                      onChangeText={value => {
                        handleChangeText(value);
                      }}
                      autoFocus={false}
                      style={[courseStyleSheet.keywordInputText]}
                      placeholder={'入力してください'}
                      placeholderTextColor={'#444444'}
                    />
                  </View>
                </View>

                <View
                  style={[
                    { marginTop: 10 },
                    courseStyleSheet.modalSortFunctional,
                  ]}>
                  <View style={courseStyleSheet.horizontalBar} />

                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Pressable
                        style={courseStyleSheet.buttonCancel}
                        testID="closeModalSortButton"
                        accessibilityLabel='_CloseModalSortButton'
                        onPress={() => {
                          setWrapperOpacity(1);
                          setModalSortVisible(!modalSortVisible);
                          setSortKeyword('');
                        }}>
                        <Text style={courseStyleSheet.buttonCancelText}>
                          キャンセル
                        </Text>
                      </Pressable>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Pressable
                        style={courseStyleSheet.buttonApply}
                        testID="applyModalSortButton"
                        accessibilityLabel='_ApplyModalSortButton'
                        onPress={() => {
                          setWrapperOpacity(1);
                          setModalSortVisible(!modalSortVisible);
                          handleSortAction();
                        }}>
                        <Text style={courseStyleSheet.buttonApplyText}>
                          適用
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>

        <View style={courseStyleSheet.listContent}>
          {listCourse.length > 0 ? (
              <ScrollView>
                {listCourse.map((course, courseIndex) => (
                  <Pressable
                    testID={`course${courseIndex}`}
                    accessibilityLabel={`_Course${courseIndex}`}
                    onPress={() => handleToStoreScreen(course.id, course.course_code)}
                    key={courseIndex}>
                    <View
                      style={[
                        courseStyleSheet.listItem,
                        courseIndex % 2 === 0
                          ? courseStyleSheet.evenRow
                          : courseStyleSheet.oddRow,
                      ]}>
                      <Text style={courseStyleSheet.listItemText}>
                        {course.course_code}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </ScrollView>
            ) : (
              <View />
            )
          }
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Course;
