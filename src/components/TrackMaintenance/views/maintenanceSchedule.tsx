import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  Modal,
  Platform,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import DatePicker from 'react-native-date-picker';

import Navbar from '../../Navbar';
import { Config } from 'src/const';
import { useDispatch } from 'react-redux';
import { setLoading, setInitDataDepartment, setInitDataScheduleMaintenance } from 'src/actions/miscActions';
import maintenanceScheduleStyleSheet from '../styles/vehicleStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import { getListSchedule, postSchedule } from 'src/api/modules/maintenance';
import { object2Path } from 'src/utils/object2Path';
import { cleanObject } from 'src/utils/handleObject';
import useSelector from 'src/utils/useSelector';

export interface propsType {
  navigation: any;
  route: any;
}

const getCurrentYearMonth = (type) => {
  const d = new Date();

  if (type === 'year') {
    return d.getFullYear();
  }

  if (type === 'month') {
    return d.getMonth() + 1;
  }

  return d;
}

const getDateJapanese = (date) => {
  const d = new Date(date);

  return `${d.getDate()}日`;
}

const convertMobileStatus = (status) => {
  const LIBRARY = {
    1: '未完了',
    2: '完了 ',
    3: '確定'
  }

  return LIBRARY[status] || '未定';
}

const formatYearMonth = (year, month) => {
  return `${year}-${month < 10 ? `0${month}` : `${month}`}`;
}

const convertType2Text = (type) => {
  const LIBRARY = {
    1: '定期',
    2: '定期',
    3: '部品',
  }

  return LIBRARY[type] || '';
}

const NodeMaintanceAccessory = (prop: { type: Number; }) => {
  return (
    <View>
      {
        prop.type == 0 && (
          <View style={{ width: 20, height: 20, backgroundColor: 'red', marginLeft: 10, borderRadius: 20 }}></View>
        )
      }

      {
        prop.type === 1 && (
          <View style={{ marginLeft: 10 }}>
            <FontAwesome name="check-circle" size={24} color="green" />
          </View>
        )
      }

      {
        prop.type === 3 && (
          <View style={{ width: 20, height: 20, backgroundColor: 'white', marginLeft: 10 }}></View>
        )
      }
    </View>
  )
};

const MaintenanceSchedule = (props: propsType) => {
  const dispatch = useDispatch();

  const { base_id } = props.route.params;

  const initData = useSelector(state => state.misc.initDataScheduleMaintenance);

  const [vehicleNumber, setVehicleNumber] = useState('');
  const [wrapperOpacity, setWrapperOpacity] = useState(1);
  const [modalSortVisible, setModalSortVisible] = useState(false);

  const [year, setYear] = useState(getCurrentYearMonth('year'));
  const [month, setMonth] = useState(getCurrentYearMonth('month'));

  // prettier/prettier
  // eslint-disable-next-line prettier/prettier
  const [modalPeriodicInspectionVisible, setModalPeriodicInspectionVisible] = useState(false);
  const [modalAccessoryVisible, setModalAccessoryVisible] = useState(false);

  const [listSchedule, setListSchedule] = useState<any>([]);

  // State sort
  const [sortKeyword, setSortKeyword] = useState('');
  const [sortCol, setSortCol] = useState(null);
  const [sortMaintenaceType, setSortMaintenaceType] = useState(null);
  const [showScheduledDatePeriodic, setShowScheduledDatePeriodic] = useState(false);
  const [showScheduledDateAccessory, setShowScheduledDateAccessory] = useState(false);
  const [scheduledDatePeriodic, setScheduledDatePeriodic] = useState(new Date());
  const [scheduledDateAccessory, setScheduledDateAccessory] = useState(new Date());

  const [listAccessory, setListAccessory] = useState([]);
  const [statusSchedule, setStatusSchedule] = useState(null);
  const [itemSchedule, setItemSchedule] = useState(null);

  const profile = useSelector((state) => state.misc.profile);

  const [oldDate, setOldDate] = useState(new Date());
  const [messageValidateDate, setMessageValidateDate] = useState('');

  useEffect(() => {
    const year = oldDate.getFullYear();
    const month = oldDate.getMonth() + 1;

    const _year = scheduledDatePeriodic.getFullYear();
    const _month = scheduledDatePeriodic.getMonth() + 1;

    if (year === _year && month === _month) {
      setMessageValidateDate('');
    } else {
      setMessageValidateDate('整備予定の年月と一致しません。');
    }

  }, [scheduledDatePeriodic]);

  useEffect(() => {
    const year = oldDate.getFullYear();
    const month = oldDate.getMonth() + 1;

    const _year = scheduledDateAccessory.getFullYear();
    const _month = scheduledDateAccessory.getMonth() + 1;

    if (year === _year && month === _month) {
      setMessageValidateDate('');
    } else {
      setMessageValidateDate('整備予定の年月と一致しません。');
    }

  }, [scheduledDateAccessory]);

  useEffect(() => {
    const handleGetListSchedule = async() => {
      try {
        dispatch(setLoading(true));
        dispatch(setInitDataScheduleMaintenance(false));

        const URL = '/mobile/schedule';
        let PARAMS = {
          department_id: base_id,
          month: formatYearMonth(year, month),
          order_by: sortCol,
          order_type: sortCol ? 'asc' : null,
          type: sortMaintenaceType,
          no_number_plate: sortKeyword,
        }

        PARAMS = cleanObject(PARAMS);

        console.log(`[CALL API] ${Config.URL_DOMAIN_IZUMI_MAINTENANCE}${URL}?${object2Path(PARAMS)}`);

        const { data } = await getListSchedule(Config.URL_DOMAIN_IZUMI_MAINTENANCE, `${URL}?${object2Path(PARAMS)}`);

        console.log('Get List Schedule', data);

        setListSchedule([]);
        setListSchedule(data);

        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));

        console.log(error);
      }
    }

    if (initData) {
      handleGetListSchedule();
    }
  });

  useEffect(() => {
    const handleGetListSchedule = async() => {
      try {
        dispatch(setLoading(true));
        dispatch(setInitDataScheduleMaintenance(false));

        const URL = '/mobile/schedule';
        let PARAMS = {
          department_id: base_id,
          month: formatYearMonth(year, month),
          order_by: sortCol,
          order_type: sortCol ? 'asc' : null,
          type: sortMaintenaceType,
          no_number_plate: sortKeyword,
        }

        PARAMS = cleanObject(PARAMS);

        console.log(`[CALL API] ${Config.URL_DOMAIN_IZUMI_MAINTENANCE}${URL}?${object2Path(PARAMS)}`);

        const { data } = await getListSchedule(Config.URL_DOMAIN_IZUMI_MAINTENANCE, `${URL}?${object2Path(PARAMS)}`);

        setListSchedule([]);
        setListSchedule(data);

        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));

        console.log(error);
      }
    }

    if (year && month) {
      handleGetListSchedule();
    }
  }, [month])

  const onClickApplySort = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setInitDataScheduleMaintenance(false));

      const URL = '/mobile/schedule';
      let PARAMS = {
        department_id: base_id,
        month: formatYearMonth(year, month),
        order_by: sortCol,
        order_type: sortCol ? 'asc' : null,
        type: sortMaintenaceType,
        no_number_plate: sortKeyword,
      }

      PARAMS = cleanObject(PARAMS);

      console.log(`${Config.URL_DOMAIN_IZUMI_MAINTENANCE}${URL}?${object2Path(PARAMS)}`);

      console.log(`[CALL API]: ${Config.URL_DOMAIN_IZUMI_MAINTENANCE}${URL}?${object2Path(PARAMS)}`);

      const { data } = await getListSchedule(Config.URL_DOMAIN_IZUMI_MAINTENANCE, `${URL}?${object2Path(PARAMS)}`);

      setListSchedule([]);
      setListSchedule(data);

      // console.log(data);

      setSortKeyword('');
      setSortCol(null);
      setSortMaintenaceType(null);

      dispatch(setLoading(false));
    } catch (error) {
      setSortKeyword('');
      setSortCol(null);
      setSortMaintenaceType(null);
      
      dispatch(setLoading(false));

      console.log(error);
    }
  }

  const goBackTrackMaintenanceScreen = () => {
    dispatch(setInitDataDepartment(true));
    dispatch(setInitDataScheduleMaintenance(true));

    const ROLE_CAN_NOT_ACCESS = [
      'crew',
      'clerks',
      'tl',
    ];

    const ROLE = profile.role_name;

    if (!(ROLE_CAN_NOT_ACCESS.includes(ROLE))) {
      props.navigation.navigate('TrackMaintenance', {
        base_id: base_id,
      });
    } else {
      props.navigation.navigate('Home');
    }
  };

  const handleChangeText = value => {
    setSortKeyword(value);
  };

  const handelOpenModal = (type, status) => {
    if (status !== 3) {
      const PERIODIC_INSPECTION = [1, 2];
      const ACCESSORY = [3];
  
      if (PERIODIC_INSPECTION.includes(type)) {
        setWrapperOpacity(0.2);
        setModalPeriodicInspectionVisible(true);
      }
      
      if (ACCESSORY.includes(type)) {
        setWrapperOpacity(0.2);
        setModalAccessoryVisible(true);
      }
    }
  };

  const handleChangeMonth = action => {
    const PREVIOUS_MONTH = 0;
    const NEXT_MONTH = 1;

    let temp_month:any = month;
    let temp_year:any = year;

    switch (action) {
      case PREVIOUS_MONTH:
        if (temp_month > 1 && temp_month <= 12) {
          temp_month -= 1;
          setMonth(temp_month);
        } else if (temp_month <= 1) {
          temp_year -= 1;
          temp_month = 12;
          setYear(temp_year);
          setMonth(temp_month);
        } else {
          console.log('ERROR');
        }
        break;

      case NEXT_MONTH:
        if (temp_month >= 1 && temp_month < 12) {
          temp_month += 1;
          setMonth(temp_month);
        } else if (temp_month >= 12) {
          temp_year += 1;
          temp_month = 1;
          setYear(temp_year);
          setMonth(temp_month);
        } else {
          console.log('ERROR');
        }
        break;

      default:
        console.log('Unknow Case');
        break;
    }
  };

  const getTextYMD = (date: Date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`}-${(date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`}`;
  }

  const getYMD = (date: String) => {
    const re = /^\d{4}-\d{2}-\d{2}/

    if (date) {
      const ymd = date.match(re);

      if (Array.isArray(ymd)) {
        if (ymd.length > 0) {
          return ymd[0];
        }
      }
    }

    return null;
  }

  const handleUpdateSchedule = async () => {
    if (statusSchedule !== 3) {
      try {
        dispatch(setLoading(true));
  
        let DATE = null;
  
        const PERIODIC_INSPECTION = [1, 2];
        const ACCESSORY = [3];
    
        if (PERIODIC_INSPECTION.includes(itemSchedule.type)) {
          DATE = getTextYMD(scheduledDatePeriodic);
        }
        
        if (ACCESSORY.includes(itemSchedule.type)) {
          DATE = getTextYMD(scheduledDateAccessory);
        }
  
        const URL = '/mobile/schedule/update';
        const DATA = {
          status: statusSchedule,
          maintenance_status_date: DATE,
          maintenance_cost_id: itemSchedule.id
        };
  
        console.log(`${Config.URL_DOMAIN_IZUMI_MAINTENANCE}${URL}`);
        console.log(DATA);
  
        const RES = await postSchedule(Config.URL_DOMAIN_IZUMI_MAINTENANCE, URL, DATA);
  
        console.log(RES);
  
        dispatch(setLoading(false));
        dispatch(setInitDataScheduleMaintenance(true));
  
        // showToast({
        //   variant: 'success',
        //   title: '成功',
        //   content: '更新に成功',
        // });
      } catch (error) {
        // showToast({
        //   variant: 'warning',
        //   title: 'エラー',
        //   content: 'システムエラー',
        // });
  
        dispatch(setLoading(false));
  
        console.log(error);
      }
    }
  }

  const handleSetDefaultValue = (value:any) => {
    if (value === null) {
      return 0;
    } 

    if (value) {
      return value;
    }
  }

  const SORT_COL_OPTIONS = [
    { value: 'schedule_date', text: '予定日順' },
    { value: 'no_number_plate', text: '車両No順' },
    { value: 'mobile_status', text: 'ステータス順' },
  ];

  const SORT_MAINTENANCE_TYPE = [
    { value: 'priodic', text: '定期点検' },
    { value: 'accessory', text: '部品交換' },
  ];

  const OPTION_MOBILE_STATUS = [
    { value: null, text: '未定' },
    { value: 1, text: '未完了' },
    { value: 2, text: '完了' },
  ];

  // const LIBRARY = {
  //   1: '未完了',
  //   2: '完了 ',
  //   3: '確定'
  // }

  // return LIBRARY[status] || '未定';

  return (
    <KeyboardAvoidingView
      style={maintenanceScheduleStyleSheet.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Navbar />

      <View testID="zoneTruckMaintance" style={[{ opacity: wrapperOpacity }, maintenanceScheduleStyleSheet.wrapper]}>
        <View style={maintenanceScheduleStyleSheet.header}>
          <View style={maintenanceScheduleStyleSheet.headerIcon}>
            <Pressable
              testID="backButton"
              accessibilityLabel="backButton"
              onPress={() => {
                goBackTrackMaintenanceScreen();
              }}>
              <Icon
                testID="backButtonIcon"
                accessibilityLabel="backButtonIcon"
                style={maintenanceScheduleStyleSheet.iconBack}
                name="angle-double-left"
                size={30}
                color="#1534A1"
              />
            </Pressable>
          </View>

          <View style={maintenanceScheduleStyleSheet.headerText}>
            <Text style={maintenanceScheduleStyleSheet.titleScreen} testID="titleScreen">
              トラックメンテナンス
            </Text>
          </View>
        </View>

        <View style={maintenanceScheduleStyleSheet.listHeader}>
          <Text style={maintenanceScheduleStyleSheet.listHeaderText}>
            整備予定一覧
          </Text>

          <Pressable
            onPress={() => {
              setWrapperOpacity(0.2);
              setModalSortVisible(true);
            }}
            style={maintenanceScheduleStyleSheet.sortButton}>
            <MaterialCommunityIcons
              testID="sortButtonIcon"
              style={maintenanceScheduleStyleSheet.iconTune}
              name="tune"
              size={30}
              color="#FFFFFF"
            />
          </Pressable>

          <View style={maintenanceScheduleStyleSheet.modalSort} testID="modalSortSearch">
            <Modal
              animationType="slide"
              presentationStyle="overFullScreen"
              transparent={true}
              visible={modalSortVisible}
              onRequestClose={() => {
                setModalSortVisible(!modalSortVisible);
              }}>
                <View>
                  <View style={maintenanceScheduleStyleSheet.modalSortContent}>
                    <Text style={maintenanceScheduleStyleSheet.modalSortHeaderText}>
                      検索フィルタ
                    </Text>

                    <View
                      style={[
                        { marginTop: 30 },
                        maintenanceScheduleStyleSheet.modalSortField,
                      ]}>
                      <View
                        style={[
                          { flex: 1 },
                          maintenanceScheduleStyleSheet.modalSortColLeft,
                        ]}>
                        <Text>並び替え</Text>
                      </View>

                      <View
                        style={[
                          { flex: 2 },
                          maintenanceScheduleStyleSheet.modalSortColRight,
                        ]}>
                        <SelectDropdown
                          data={SORT_COL_OPTIONS}
                          onSelect={(selectedItem) => {
                            setSortCol(selectedItem.value);
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
                                name={isOpened ? 'chevron-up' : 'chevron-down'}
                                color="#444444"
                                size={18}
                              />
                            );
                          }}
                          dropdownIconPosition="right"
                          defaultButtonText={'選択してください'}
                          buttonStyle={maintenanceScheduleStyleSheet.dropdownButton}
                          buttonTextStyle={
                            maintenanceScheduleStyleSheet.dropdownButtonText
                          }
                          dropdownStyle={
                            maintenanceScheduleStyleSheet.dropdownContent
                          }
                          rowStyle={maintenanceScheduleStyleSheet.dropdownRow}
                          rowTextStyle={
                            maintenanceScheduleStyleSheet.dropdownRowText
                          }
                        />
                      </View>
                    </View>

                    <View
                      style={[
                        { marginTop: 10 },
                        maintenanceScheduleStyleSheet.modalSortField,
                      ]}>
                      <View
                        style={[
                          { flex: 1 },
                          maintenanceScheduleStyleSheet.modalSortColLeft,
                        ]}>
                        <Text>種別</Text>
                      </View>

                      <View
                        style={[
                          { flex: 2 },
                          maintenanceScheduleStyleSheet.modalSortColRight,
                        ]}>
                        <SelectDropdown
                          data={SORT_MAINTENANCE_TYPE}
                          onSelect={(selectedItem) => {
                            setSortMaintenaceType(selectedItem.value);
                            console.log(selectedItem);
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
                                name={isOpened ? 'chevron-up' : 'chevron-down'}
                                color="#444444"
                                size={18}
                              />
                            );
                          }}
                          dropdownIconPosition="right"
                          defaultButtonText={'選択してください'}
                          buttonStyle={maintenanceScheduleStyleSheet.dropdownButton}
                          buttonTextStyle={
                            maintenanceScheduleStyleSheet.dropdownButtonText
                          }
                          dropdownStyle={
                            maintenanceScheduleStyleSheet.dropdownContent
                          }
                          rowStyle={maintenanceScheduleStyleSheet.dropdownRow}
                          rowTextStyle={
                            maintenanceScheduleStyleSheet.dropdownRowText
                          }
                        />
                      </View>
                    </View>

                    <View
                      style={[
                        { marginTop: 10 },
                        maintenanceScheduleStyleSheet.modalSortField,
                      ]}>
                      <View
                        style={[
                          { flex: 1 },
                          maintenanceScheduleStyleSheet.modalSortColLeft,
                        ]}>
                        <Text>キーワード</Text>
                      </View>

                      <View
                        style={[
                          { flex: 2 },
                          maintenanceScheduleStyleSheet.modalSortColRight,
                        ]}>
                        <TextInput
                          accessibilityLabel={'_SortKeywordInput'}
                          keyboardType={'default'}
                          returnKeyType={'done'}
                          value={sortKeyword}
                          onChangeText={value => {
                            handleChangeText(value);
                          }}
                          autoFocus={false}
                          style={[maintenanceScheduleStyleSheet.keywordInputText]}
                          placeholder={'入力してください'}
                          placeholderTextColor={'#444444'}
                        />
                      </View>
                    </View>

                    <View
                      style={[
                        { marginTop: 10 },
                        maintenanceScheduleStyleSheet.modalSortFunctional,
                      ]}>
                      <View style={maintenanceScheduleStyleSheet.horizontalBar} />

                      <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Pressable
                            style={maintenanceScheduleStyleSheet.buttonCancel}
                            onPress={() => {
                              setWrapperOpacity(1);
                              setModalSortVisible(!modalSortVisible);
                            }}>
                            <Text
                              style={
                                maintenanceScheduleStyleSheet.buttonCancelText
                              }>
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
                            style={maintenanceScheduleStyleSheet.buttonApply}
                            onPress={async() => {
                              await onClickApplySort();
                              setWrapperOpacity(1);
                              setModalSortVisible(!modalSortVisible);
                            }}>
                            <Text
                              style={maintenanceScheduleStyleSheet.buttonApplyText}>
                              適用
                            </Text>
                          </Pressable>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
            </Modal>
          </View>
        </View>

        <View style={maintenanceScheduleStyleSheet.yearMonthPicker}>
          <Pressable
            onPress={() => {
              handleChangeMonth(0);
            }}>
            <Icon
              testID="previousYearMonthIcon"
              name={'caret-left'}
              style={maintenanceScheduleStyleSheet.previousYearMonthIcon}
            />
          </Pressable>

          <Text style={maintenanceScheduleStyleSheet.yearMonthPickerText} testID="showYearMonth">
            {`${year}/${month <= 9 ? '0' + month : month}`}
          </Text>

          <Pressable
            onPress={() => {
              handleChangeMonth(1);
            }}>
            <Icon
              testID="nextYearMonthIcon"
              name={'caret-right'}
              style={maintenanceScheduleStyleSheet.nextYearMonthIcon}
            />
          </Pressable>
        </View>

        <View style={maintenanceScheduleStyleSheet.contentTable}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View
              style={[
                maintenanceScheduleStyleSheet.contentTableTh,
                { flex: 1 },
              ]}>
              <Text style={maintenanceScheduleStyleSheet.contentTableThText}>
                予定日
              </Text>
            </View>

            <View
              style={[
                maintenanceScheduleStyleSheet.contentTableTh,
                maintenanceScheduleStyleSheet.leftBorderTh,
                { flex: 1 },
              ]}>
              <Text style={maintenanceScheduleStyleSheet.contentTableThText}>
                種別
              </Text>
            </View>

            <View
              style={[
                maintenanceScheduleStyleSheet.contentTableTh,
                maintenanceScheduleStyleSheet.leftBorderTh,
                { flex: 2 },
              ]}>
              <Text style={maintenanceScheduleStyleSheet.contentTableThText}>
                車両No
              </Text>
            </View>

            <View
              style={[
                maintenanceScheduleStyleSheet.contentTableTh,
                maintenanceScheduleStyleSheet.leftBorderTh,
                { flex: 1 },
              ]}>
              <Text style={maintenanceScheduleStyleSheet.contentTableThText}>
                ステータス
              </Text>
            </View>
          </View>
        </View>

        <View style={maintenanceScheduleStyleSheet.listContent} testID="listSchedule">
          <ScrollView>
            {listSchedule.map((item, itemIndex) => (
              <Pressable
                testID={`_Vehicle_Number_${itemIndex}`}
                accessibilityLabel={`_Vehicle_Number_${itemIndex}`}
                onPress={() => {
                  setVehicleNumber(item.vehicle_number);
                  handelOpenModal(item.type, item.mobile_status);

                  console.log('[maintenance_accessories] ==>', item.maintenance_accessories);
                  console.log('[mobile_status] ==> ', item.mobile_status);

                  setOldDate(getYMD(item.maintenance_status_date) ? new Date(getYMD(item.maintenance_status_date)) : new Date(item.scheduled_date));
                  setScheduledDateAccessory(getYMD(item.maintenance_status_date) ? new Date(getYMD(item.maintenance_status_date)) : new Date(item.scheduled_date));
                  setScheduledDatePeriodic(getYMD(item.maintenance_status_date) ? new Date(getYMD(item.maintenance_status_date)) : new Date(item.scheduled_date));
                  setListAccessory(item.maintenance_accessories);
                  setStatusSchedule(item.mobile_status);
                  setItemSchedule(item);
                }}
                key={itemIndex}>
                <View
                  style={[
                    maintenanceScheduleStyleSheet.listItem,
                    itemIndex % 2 === 0
                      ? maintenanceScheduleStyleSheet.evenRow
                      : maintenanceScheduleStyleSheet.oddRow,
                  ]}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={maintenanceScheduleStyleSheet.listItemText}>
                      {getDateJapanese(item.maintenance_status_date ? getYMD(item.maintenance_status_date) : item.scheduled_date)}
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={maintenanceScheduleStyleSheet.listItemText}>
                      {/* {item.type_text} */}
                      {convertType2Text(item.type)}
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={maintenanceScheduleStyleSheet.listItemText}>
                      {item.no_number_plate}
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={maintenanceScheduleStyleSheet.listItemText}>
                      {convertMobileStatus(item.mobile_status)}
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Modal Update Periodic Inspection Maintenance Status */}
        <View style={maintenanceScheduleStyleSheet.modalSort}>
          <Modal
            animationType="slide"
            presentationStyle="overFullScreen"
            transparent={true}
            visible={modalPeriodicInspectionVisible}
            onRequestClose={() => {
              setModalPeriodicInspectionVisible(
                !modalPeriodicInspectionVisible,
              );
            }}>
              <ScrollView>
                <View style={maintenanceScheduleStyleSheet.modalSortContentPeriodic}>
                  <Text style={maintenanceScheduleStyleSheet.modalSortHeaderText}>
                    定期点検
                  </Text>

                  <Text style={[ maintenanceScheduleStyleSheet.modalSortHeaderText, { marginTop: 10 }, ]}>
                    {vehicleNumber}
                  </Text>

                  <View style={[ { marginTop: 20 }, maintenanceScheduleStyleSheet.modalSortField, ]}>
                    <View style={[ { flex: 1 }, maintenanceScheduleStyleSheet.modalSortColLeft, ]}>
                      <Text>予定日</Text>
                    </View>

                    <Pressable onPress={() => 
                      setShowScheduledDatePeriodic(true)
                    }>
                      <View
                        style={[
                          {
                            height: 40,
                            width: 200,
                            borderColor: '#767676',
                            borderStyle: 'solid',
                            borderWidth: 1,
                            marginTop: 10,
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                          },
                        ]}>
                        
                        <Text style={[{ margin: 10 }]}>
                          {`${scheduledDatePeriodic.getFullYear()}-${(scheduledDatePeriodic.getMonth() + 1) < 10 ? `0${scheduledDatePeriodic.getMonth() + 1}` : `${scheduledDatePeriodic.getMonth() + 1}`}-${(scheduledDatePeriodic.getDate()) < 10 ? `0${scheduledDatePeriodic.getDate()}` : `${scheduledDatePeriodic.getDate()}`}`}
                        </Text>

                        <DatePicker
                          testID='_DatePicker'
                          accessibilityLabel='_DatePicker'
                          modal
                          title={'日付を選択してください'}
                          cancelText={'キャンセル'}
                          confirmText={'確定'}
                          mode={'date'}
                          locale={'ja'}
                          open={showScheduledDatePeriodic}
                          date={scheduledDatePeriodic}
                          onConfirm={(date) => {
                            console.log('DATE: ', date);
                            setScheduledDatePeriodic(date);
                            setScheduledDateAccessory(date);
                            setShowScheduledDatePeriodic(false);
                          }}
                          onCancel={() => {
                            setShowScheduledDatePeriodic(false);
                          }}
                        />
                      </View>
                    </Pressable>
                  </View>
                
                  <Text style={maintenanceScheduleStyleSheet.textValidate}>{ messageValidateDate }</Text>
                  

                  <View style={[ { marginTop: 10 }, maintenanceScheduleStyleSheet.modalSortField ]}>
                    <View style={[ { flex: 1 }, maintenanceScheduleStyleSheet.modalSortColLeft ]}>
                      <Text>ステータス</Text>
                    </View>

                    <View style={[ { flex: 2 }, maintenanceScheduleStyleSheet.modalSortColRight ]}>
                      <SelectDropdown
                        defaultValueByIndex={handleSetDefaultValue(statusSchedule)}
                        data={OPTION_MOBILE_STATUS}
                        onSelect={(selectedItem) => {
                          setStatusSchedule(selectedItem.value);
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
                              name={isOpened ? 'chevron-up' : 'chevron-down'}
                              color="#444444"
                              size={18}
                            />
                          );
                        }}
                        dropdownIconPosition="right"
                        defaultButtonText={'選択してください'}
                        buttonStyle={maintenanceScheduleStyleSheet.dropdownButton}
                        buttonTextStyle={
                          maintenanceScheduleStyleSheet.dropdownButtonText
                        }
                        dropdownStyle={
                          maintenanceScheduleStyleSheet.dropdownContent
                        }
                        rowStyle={maintenanceScheduleStyleSheet.dropdownRow}
                        rowTextStyle={maintenanceScheduleStyleSheet.dropdownRowText}
                        disabled={profile.role_name === 'crew'}
                      />
                    </View>
                  </View>

                  <View
                    style={[
                      { marginTop: 10 },
                      maintenanceScheduleStyleSheet.modalSortFunctional,
                    ]}>
                    <View style={maintenanceScheduleStyleSheet.horizontalBar} />

                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Pressable
                          // style={maintenanceScheduleStyleSheet.buttonCancel}
                          testID='_ButtonCancel'
                          accessibilityLabel='_ButtonCancel'
                          onPress={() => {
                            setWrapperOpacity(1);
                            setModalPeriodicInspectionVisible(
                              !modalPeriodicInspectionVisible,
                            );
                          }}>
                          <Text
                            style={maintenanceScheduleStyleSheet.buttonCancelText}>
                            キャンセル
                          </Text>
                        </Pressable>
                      </View>

                      {
                        profile.role_name !== 'crew' && (
                          <View
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Pressable
                              testID='_ButtonApply'
                              accessibilityLabel='_ButtonApply'
                              // style={maintenanceScheduleStyleSheet.buttonApply}
                              onPress={async () => {
                                if (!messageValidateDate) {
                                  await handleUpdateSchedule();
                                  setWrapperOpacity(1);
                                  setModalPeriodicInspectionVisible(
                                    !modalPeriodicInspectionVisible,
                                  );
                                }
                              }}>
                              <Text
                                style={maintenanceScheduleStyleSheet.buttonApplyText}>
                                保存
                              </Text>
                            </Pressable>
                          </View>
                        )
                      }
                    </View>
                  </View>
                </View>
              </ScrollView>
          </Modal>
        </View>

        {/* Modal Update Accessory Schedule Maintenance Status */}
        <View style={maintenanceScheduleStyleSheet.modalSort}>
          <Modal
            animationType="slide"
            presentationStyle="overFullScreen"
            transparent={true}
            visible={modalAccessoryVisible}
            onRequestClose={() => {
              setModalAccessoryVisible(!modalAccessoryVisible);
            }}>
              <ScrollView>
                <View
                  style={maintenanceScheduleStyleSheet.modalSortContentAccessory}>
                  <Text style={maintenanceScheduleStyleSheet.modalSortHeaderText}>
                    部品交換
                  </Text>

                  <Text
                    style={[
                      maintenanceScheduleStyleSheet.modalSortHeaderText,
                      { marginTop: 10 },
                    ]}>
                    {vehicleNumber}
                  </Text>

                  <View
                    style={[
                      { marginTop: 20 },
                      maintenanceScheduleStyleSheet.modalSortField,
                    ]}>
                    <View
                      style={[
                        { flex: 1 },
                        maintenanceScheduleStyleSheet.modalSortColLeft,
                      ]}>
                      <Text>予定日</Text>
                    </View>

                    <Pressable onPress={() => setShowScheduledDateAccessory(true)}>
                      <View
                        style={[
                          {
                            height: 40,
                            width: 200,
                            borderColor: '#767676',
                            borderStyle: 'solid',
                            borderWidth: 1,
                            marginTop: 20,
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                          },
                        ]}>
                        
                        <Text style={[{ margin: 10 }]}>
                          {`${scheduledDateAccessory.getFullYear()}-${(scheduledDateAccessory.getMonth() + 1) < 10 ? `0${scheduledDateAccessory.getMonth() + 1}` : `${scheduledDateAccessory.getMonth() + 1}`}-${(scheduledDateAccessory.getDate()) < 10 ? `0${scheduledDateAccessory.getDate()}` : `${scheduledDateAccessory.getDate()}`}`}
                        </Text>

                        <DatePicker
                          testID='_DatePicker'
                          accessibilityLabel='_DatePicker'
                          modal
                          title={'日付を選択してください'}
                          cancelText={'キャンセル'}
                          confirmText={'確定'}
                          mode={'date'}
                          locale={'ja'}
                          open={showScheduledDateAccessory}
                          date={scheduledDateAccessory}
                          onConfirm={(date) => {
                            setScheduledDateAccessory(date);
                            setScheduledDatePeriodic(date);
                            setShowScheduledDateAccessory(false);
                          }}
                          onCancel={() => {
                            setShowScheduledDateAccessory(false)
                          }}
                        />
                      </View>
                    </Pressable>
                  </View>
                
                  <Text style={maintenanceScheduleStyleSheet.textValidate}>{ messageValidateDate }</Text>

                  <View
                    style={[
                      { marginTop: 10 },
                      maintenanceScheduleStyleSheet.modalSortField,
                    ]}>
                    <View
                      style={[
                        { flex: 1 },
                        maintenanceScheduleStyleSheet.modalSortColLeft,
                      ]}>
                      <Text>ステータス</Text>
                    </View>

                    <View
                      style={[
                        { flex: 2 },
                        maintenanceScheduleStyleSheet.modalSortColRight,
                      ]}>
                      <SelectDropdown
                        defaultValueByIndex={handleSetDefaultValue(statusSchedule)}
                        data={OPTION_MOBILE_STATUS}
                        onSelect={(selectedItem) => {
                          setStatusSchedule(selectedItem.value);
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
                              name={isOpened ? 'chevron-up' : 'chevron-down'}
                              color="#444444"
                              size={18}
                            />
                          );
                        }}
                        dropdownIconPosition="right"
                        defaultButtonText={'選択してください'}
                        buttonStyle={maintenanceScheduleStyleSheet.dropdownButton}
                        buttonTextStyle={
                          maintenanceScheduleStyleSheet.dropdownButtonText
                        }
                        dropdownStyle={
                          maintenanceScheduleStyleSheet.dropdownContent
                        }
                        rowStyle={maintenanceScheduleStyleSheet.dropdownRow}
                        rowTextStyle={maintenanceScheduleStyleSheet.dropdownRowText}
                        disabled={profile.role_name === 'crew'}
                      />
                    </View>
                  </View>

                  <View
                    style={[
                      { marginVertical: 10 },
                      maintenanceScheduleStyleSheet.modalSortField,
                    ]}>
                    <View
                      style={[
                        { flex: 1 },
                        maintenanceScheduleStyleSheet.modalSortColLeft,
                      ]}>
                      <Text>交換部品リスト</Text>
                    </View>
                  </View>

                  <View style={{ flex: 3 }}>
                    <ScrollView style={{ height: 150 }}>
                      {listAccessory.map((accessory, accessoryIndex) => (
                        <View
                          style={maintenanceScheduleStyleSheet.listAccessory}
                          key={accessoryIndex}>
                          <NodeMaintanceAccessory type={accessory.color} />
                          <Text
                            style={maintenanceScheduleStyleSheet.listAccessoryText}>
                            {accessory.text}
                          </Text>
                        </View>
                      ))}
                    </ScrollView>
                  </View>

                  <View
                    style={[
                      maintenanceScheduleStyleSheet.modalSortFunctional,
                    ]}>
                    <View style={maintenanceScheduleStyleSheet.horizontalBar} />

                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Pressable
                          testID='_ButtonCancel'
                          accessibilityLabel='_ButtonCancel'
                          style={maintenanceScheduleStyleSheet.buttonCancel}
                          onPress={() => {
                            setWrapperOpacity(1);
                            setModalAccessoryVisible(!modalAccessoryVisible);
                          }}>
                          <Text
                            style={maintenanceScheduleStyleSheet.buttonCancelText}>
                            キャンセル
                          </Text>
                        </Pressable>
                      </View>

                      {
                        profile.role_name !== 'crew' && (
                          <Pressable
                            testID='_ButtonApply'
                            accessibilityLabel='_ButtonApply'
                            style={[maintenanceScheduleStyleSheet.buttonApply]}
                            onPress={async () => {
                              if (!messageValidateDate) {
                                await handleUpdateSchedule();
                                setWrapperOpacity(1);
                                setModalAccessoryVisible(!modalAccessoryVisible);
                              }
                            }}>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={maintenanceScheduleStyleSheet.buttonApplyText}>
                                  保存
                                </Text>
                              </View>
                          </Pressable>
                        )
                      }
                    </View>
                  </View>
                </View>
              </ScrollView>
          </Modal>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MaintenanceSchedule;
