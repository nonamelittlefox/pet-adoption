import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  Platform,
  Pressable,
  ScrollView,
  BackHandler,
  KeyboardAvoidingView,
} from 'react-native';

import Navbar from '../../Navbar';
import useSelector from 'src/utils/useSelector';
import indexStyleSheet from '../styles/indexStyle';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Config } from 'src/const';
import { useDispatch } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { getListDepartment } from 'src/api/modules/store';
import { setLoading, setInitDataDepartment, setInitDataCourse } from 'src/actions/miscActions';
export interface propsType {
  navigation: any;
  route: any;
}

const Base = (props: propsType) => {
  const dispatch = useDispatch();

  const initData = useSelector(state => state.misc.initDataDepartment);

  const [wrapperOpacity, setWrapperOpacity] = useState(1);
  const [listDepartment, setListDepartment] = useState([]);

  useEffect(() => {
    const backAction = () => {
      dispatch(setLoading(false));

      setWrapperOpacity(1);
      
      props.navigation.push('DashboardScreen');

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (initData) {
      handleGetListDepartment();
    }
  }, []);

  const handleGetListDepartment = async () => {
    try {
      dispatch(setLoading(true));

      dispatch(setInitDataDepartment(false));

      const URL = '/department/list-all';

      const LIST_DEPARTMENT: any = await getListDepartment(
        Config.URL_DOMAIN_CLOUD,
        URL,
        null
      );

      const { code, data } = LIST_DEPARTMENT.data;

      if (code === 200) {
        setListDepartment(data);
      } else {
        setListDepartment([]);
      }

      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));

      console.log(error);
    }
  };

  const goBackDashboard = () => {
    props.navigation.push('DashboardScreen');
  };

  const handleToCourseScreen = async  (base_id) => {
    dispatch(setInitDataCourse(true));

    await props.navigation.navigate('Course', { base_id });
  };

  return (
    <KeyboardAvoidingView
      style={indexStyleSheet.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Navbar />

      <View style={[{ opacity: wrapperOpacity }, indexStyleSheet.wrapper]}>
        <View style={indexStyleSheet.header}>
          <View style={indexStyleSheet.headerIcon}>
            <Pressable
              testID="backButton"
              onPress={() => {
                goBackDashboard();
              }}>
              <Icon
                testID="backButtonIcon"
                accessibilityLabel='_BackButtonIcon'
                style={indexStyleSheet.iconBack}
                name="angle-double-left"
                size={30}
                color="#1534A1"
              />
            </Pressable>
          </View>

          <View style={indexStyleSheet.headerText}>
            <Text style={indexStyleSheet.titleScreen}>店舗カルテ</Text>
          </View>
        </View>

        <View style={indexStyleSheet.listHeader}>
          <Text style={indexStyleSheet.listHeaderText}>拠点選択</Text>
        </View>

        <View style={indexStyleSheet.listContent}>
          {listDepartment.length > 0 ? (
              <ScrollView>
                {listDepartment.map((base, baseIndex) => (
                  <Pressable
                    testID={`base${baseIndex}`}
                    accessibilityLabel={`_Base${baseIndex}`}
                    onPress={() => handleToCourseScreen(base.id)}
                    key={baseIndex}>
                    <View
                      style={[
                        indexStyleSheet.listItem,
                        baseIndex % 2 === 0
                          ? indexStyleSheet.evenRow
                          : indexStyleSheet.oddRow,
                      ]}>
                      <Text style={indexStyleSheet.listItemText}>{base.department_name}</Text>
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

export default Base;
