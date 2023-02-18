import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  Platform,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
export interface propsType {
  navigation: any;
  route: any;
}

import { useDispatch } from 'react-redux';
import { setLoading, setInitDataDepartment, setInitDataScheduleMaintenance } from 'src/actions/miscActions';
import { Config } from 'src/const';
import Navbar from '../../Navbar';
import indexStyleSheet from '../styles/indexStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import useSelector from 'src/utils/useSelector';

import { getListDepartment } from 'src/api/modules/maintenance';

const TrackMaintenanceIndex = (props: propsType) => {
  const dispatch = useDispatch();

  const [wrapperOpacity, setWrapperOpacity] = useState(1);
  const [listDepartment, setListDepartment] = useState([]);

  const initData = useSelector(state => state.misc.initDataDepartment);

  useEffect(() => {
    async function handleGetListDepartment() {
      try {
        dispatch(setLoading(true));
        dispatch(setInitDataDepartment(false));

        const URL = '/department/list-all';

        console.log(`[CALL API]: ${Config.URL_DOMAIN_CLOUD}${URL}`);
  
        const { data } = await getListDepartment(Config.URL_DOMAIN_CLOUD, URL);

        if (data.code === 200) {
          setListDepartment([]);
          setListDepartment(data.data);
        }

        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));

        console.log(error);
      }
    };

    if (initData) {
      handleGetListDepartment();
    } else {
      console.log('initData: ', initData);
    }
  })

  const goBackDashboard = () => {
    props.navigation.push('DashboardScreen');
  };

  const handleToVehicleScreen = base_id => {
    dispatch(setInitDataScheduleMaintenance(true));
    props.navigation.navigate('MaintenanceSchedule', { base_id });
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
              accessibilityLabel="backButton"
              onPress={() => {
                goBackDashboard();
              }}>
              <Icon
                testID="backButtonIcon"
                accessibilityLabel="backButtonIcon"
                style={indexStyleSheet.iconBack}
                name="angle-double-left"
                size={30}
                color="#1534A1"
              />
            </Pressable>
          </View>

          <View style={indexStyleSheet.headerText}>
            <Text style={indexStyleSheet.titleScreen}>
              トラックメンテナンス
            </Text>
          </View>
        </View>

        <View style={indexStyleSheet.listHeader}>
          <Text style={indexStyleSheet.listHeaderText}>拠点選択</Text>
        </View>

        <View style={indexStyleSheet.listContent}>
          <ScrollView>
            {listDepartment.map((base, baseIndex) => (
              <Pressable
                testID={`base${baseIndex}`}
                accessibilityLabel={`_Base${baseIndex}`}
                onPress={() => handleToVehicleScreen(base.id)}
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
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default TrackMaintenanceIndex;
