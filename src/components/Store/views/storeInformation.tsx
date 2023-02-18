import React, { useEffect, useState, useRef } from 'react';

import {
  View,
  Text,
  Image,
  Platform,
  Pressable,
  TextInput,
  ScrollView,
  BackHandler,
  KeyboardAvoidingView,
} from 'react-native';

import { Config } from 'src/const';
import { useDispatch } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { getStoreInformation } from 'src/api/modules/store';
import { setLoading, setInitDataStoreDetail, setInitDataStore, setInitDataStoreEdit } from 'src/actions/miscActions';

import Navbar from '../../Navbar';
import useSelector from 'src/utils/useSelector';
import Icon from 'react-native-vector-icons/FontAwesome';
import storeInformationStyleSheet from '../styles/storeInformationStyle';
export interface propsType {
  navigation: any;
  route: any;
}

const StoreInformation = (props: propsType) => {
  const { base_id, store_name, store_id, pass_code, course_id, course_name } = props.route.params;

  const scrollViewRef = useRef<ScrollView>();

  const defaultImage = 'http://thaibinhtv.vn/thumb/640x400/assets/images/imgstd.jpg';

  const [showBasicInformation, setShowBasicInformation] = useState(true);
  const [showDeliveryInformation, setShowDeliveryInformation] = useState(true);
  const [showDeliveryProcedure, setShowDeliveryProcedure] = useState(true);
  const [showRouteInformation, setShowRouteInformation] = useState(true);
  const [showParkingInformation, setShowParkingInformation] = useState(true);

  const [businessClassification, setBusinessClassification] = useState('');
  const [deliveryDestinationCode, setDeliveryDestinationCode] = useState('');
  const [deliveryDestinationNameKana, setDeliveryDestinationNameKana] = useState('');
  const [deliveryDestinationName, setDeliveryDestinationName] = useState('');
  const [postCode, setPostCode] = useState('');
  const [addressOne, setAddressOne] = useState('');
  const [addressTwo, setAddressTwo] = useState('');
  const [tel, setTel] = useState('');
  
  const [deliveryFrequency, setDeliveryFrequency] = useState('');
  const [quantityPerDelivery, setQuantityPerDelivery] = useState('');

  const [specifyDeliveryTimeFirstHour, setSpecifyDeliveryTimeFirstHour] = useState('');
  const [specifyDeliveryTimeFirstMinute, setSpecifyDeliveryTimeFirstMinute] = useState('');
  const [specifyDeliveryTimeFirstSubMinuteOne, setSpecifyDeliveryTimeFirstSubMinuteOne] = useState('');
  const [specifyDeliveryTimeFirstSubMinuteTwo, setSpecifyDeliveryTimeFirstSubMinuteTwo] = useState('');

  const [specifyDeliveryTimeSecondHour, setSpecifyDeliveryTimeSecondHour] = useState('');
  const [specifyDeliveryTimeSecondMinute, setSpecifyDeliveryTimeSecondMinute] = useState('');
  const [specifyDeliveryTimeSecondSubMinuteOne, setSpecifyDeliveryTimeSecondSubMinuteOne] = useState('');
  const [specifyDeliveryTimeSecondSubMinuteTwo, setSpecifyDeliveryTimeSecondSubMinuteTwo] = useState('');

  const [scheduledTime, setScheduledTime] = useState('');

  const [vehicelRegulation, setVehicleRegulation] = useState('');
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [parkingPlaceDesignation, setParkingPlaceDesignation] = useState('');
  const [parkingPlaceDesignationRemark, setParkingPlaceDesignationRemark] = useState('');
  const [deliverySlip, setDeliverySlip] = useState('');
  const [deliverySlipRemark, setDeliverySlipRemark] = useState('');
  const [daisha, setDaishsa] = useState('');
  const [daishaRemark, setDaishaRemark] = useState('');
  const [storagePlace, setStoragePlace] = useState('');
  const [storageSpecialNote, setStorageSpecialNote] = useState('');
  const [emptyDelivery, setEmptyDelivery] = useState('');
  const [keyUse, setKeyUse] = useState('');
  const [securityUse, setSecurityUse] = useState('');
  const [cancellationMethod, setCancellationMethod] = useState('');
  const [graceTime, setGraceTime] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyTel, setCompanyTel] = useState('');
  const [keyUseRemark, setKeyUseRemark] = useState('');
  const [facilityRule, setFacilityRule] = useState('');
  const [permitLicense, setPermitLicense] = useState('');
  const [receptionEntry, setReceptionEntry] = useState('');
  const [certificationRequire, setCertificationRequire] = useState('');
  const [certificationRequireRemark, setCertificationRequireRemark] = useState('');
  const [elevatorUse, setElevatorUse] = useState('');
  const [elevatorUseRemark, setElevatorUseRemark] = useState('');
  const [waitingPlace, setWaitingPlace] = useState('');
  const [waitingPlaceRemark, setWaitingPlaceRemark] = useState('');

  const [deliveryManual, setDeliveryManual] = useState([]);

  const [deliveryRouteMapImage, setDeliveryRouteMapImage] = useState(defaultImage);
  const [deliveryRouteMapRemark, setDeliveryRouteMapRemark] = useState('');
  const [routeAMPPImage, setRouteAMPPImage] = useState(defaultImage);
  const [routeAMPPRemark, setRouteAMPPRemark] = useState('');
  const [parkingAMPPImage, setParkingAMPPImage] = useState(defaultImage);
  const [parkingAMPPRemark, setParkingAMPPRemark] = useState('');

  const [lastUpdateDate, setLastUpdateDate] = useState('');

  const initData = useSelector(state => state.misc.initDataStoreDetail);

  const handleChangeBusinessClassification = value => {
    setBusinessClassification(value);
  };

  const handleChangeDeliveryDestinationCode = value => {
    setDeliveryDestinationCode(value);
  };

  const handleChangeDeliveryDestinationNameKana = value => {
    setDeliveryDestinationNameKana(value);
  };

  const handleChangeDeliveryDestinationName = value => {
    setDeliveryDestinationName(value);
  };

  const handleChangePostCode = value => {
    setPostCode(value);
  };

  const handleChangeLargeAddress = value => {
    setAddressOne(value);
  };

  const handleChangeSmallAddress = value => {
    setAddressTwo(value);
  };

  const handleChangeTelInput = value => {
    setTel(value);
  };

  const handleChangeDeliveryFrequency = value => {
    setDeliveryFrequency(value);
  };

  const handleChangeQuantityPerDelivery = value => {
    setQuantityPerDelivery(value);
  };

  const handleChangeScheduledTime = value => {
    setScheduledTime(value);
  };

  const handleChangeVehicleRegulation = value => {
    setVehicleRegulation(value);
  };

  const handleChangeHeight = value => {
    setHeight(value);
  };

  const handleChangeWidth = value => {
    setWidth(value);
  };

  const handleChangeParkingPlaceDesignation = value => {
    setParkingPlaceDesignation(value);
  };

  const handleChangeParkingPlaceDesignationRemark = value => {
    setParkingPlaceDesignationRemark(value);
  };

  const handleChangeDeliverySlip = value => {
    setDeliverySlip(value);
  };

  const handleChangeDeliverySlipRemark = value => {
    setDeliverySlipRemark(value);
  };

  const handleChangeTrolleyUse = value => {
    setDaishsa(value);
  };

  const handleChangeTrolleyUseRemark = value => {
    setDaishaRemark(value);
  };

  const handleChangeStoragePlace = value => {
    setStoragePlace(value);
  };

  const handleChangeStorageSpecialNote = value => {
    setStorageSpecialNote(value);
  };

  const handleChangeEmptyDelivery = value => {
    setEmptyDelivery(value);
  };

  const handleChangeKeyUse = value => {
    setKeyUse(value);
  };

  const handleChangeKeyUseRemark = value => {
    setKeyUseRemark(value);
  };

  const handleChangeSecurityUse = value => {
    setSecurityUse(value);
  };

  const handleChangeCancellationMethod = value => {
    setCancellationMethod(value);
  };

  const handleChangeGraceTime = value => {
    setGraceTime(value);
  };

  const handleChangeCompanyName = value => {
    setCompanyName(value);
  };

  const handleChangeCompanyTel = value => {
    setCompanyTel(value);
  };

  const handleChangeFacilityRule = value => {
    setFacilityRule(value);
  };

  const handleChangePermitLicense = value => {
    setPermitLicense(value);
  };

  const handleChangeReceptionEntry = value => {
    setReceptionEntry(value);
  };

  const handleChangeCertificationRequire = value => {
    setCertificationRequire(value);
  };

  const handleChangeCertificationRequireRemark = value => {
    setCertificationRequireRemark(value);
  };

  const handleChangeElevatorUse = value => {
    setElevatorUse(value);
  };

  const handleChangeElevatorUseRemark = value => {
    setElevatorUseRemark(value);
  };

  const handleChangeWaitingPlace = value => {
    setWaitingPlace(value);
  };

  const handleChangeWaitingPlaceRemark = value => {
    setWaitingPlaceRemark(value);
  };

  const goBackStoreScreen = () => {
    dispatch(setInitDataStore(true));

    props.navigation.navigate('Store', {
      base_id: base_id,
      course_id: course_id,
      course_name: course_name,
    });
  };

  const handleTransformGeneralFields = _item => {
    let result = '';

    if (_item === null) {
      result = null;
    } else {
      switch(_item) {
        case '0':
          result = '無し';
          break;
        case '1':
          result = '有り';
          break;
        default:
          result = '';
          break;
      }
    }

    return result;
  };

  const handleTransformDaisha = _daisha => {
    let result = '';

    if (_daisha === null) {
      result = null;
    } else {
      switch(_daisha) {
        case '1':
          result = '指定無し';
          break;
        case '2':
          result = '普通台車';
          break;
        case '3':
          result = 'ゴム台車';
          break;
        case '4':
          result = '指定台車';
          break;
        case '5':
          result = '手持ち';
          break;
        default:
          result = '';
          break;
      }
    }

    return result;
  };

  const urlAPI = {
    apiGetDetailStore: '/mobile/store',
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const backAction = () => {
      dispatch(setLoading(false));
      
      dispatch(setInitDataStore(true));
  
      props.navigation.navigate('Store', {
        base_id: base_id,
        course_id: course_id,
        course_name: course_name,
      });

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      scrollViewRef.current?.scrollTo({x : 0, y : 0, animated: true});
    }
  }, [isFocused]);

  useEffect(() => {
    const handleGetDetailStore = async () => {
      console.log('------------------------------------------------------------');
      console.log('pass_code', props.route.params);
      console.log('------------------------------------------------------------');

      try {
        dispatch(setLoading(true));
        dispatch(setInitDataStoreDetail(false));

        console.log(store_id);

        const URL = `${urlAPI.apiGetDetailStore}/${store_id}`;

        let DATA = {};

        if (pass_code) {
          DATA = {
            pass_code: parseInt(pass_code),
          };
        }

        const response = await getStoreInformation(
          Config.URL_DOMAIN_CLOUD,
          URL,
          DATA
        );

        const RESPONSE_DATA = response.data.data;

        if (response.data) { 
          setBusinessClassification(RESPONSE_DATA.bussiness_classification);
          setDeliveryDestinationCode(RESPONSE_DATA.delivery_destination_code);
          setDeliveryDestinationNameKana(RESPONSE_DATA.destination_name_kana);
          setDeliveryDestinationName(RESPONSE_DATA.destination_name);
          setPostCode(RESPONSE_DATA.post_code);
          setAddressOne(RESPONSE_DATA.address_1);
          setAddressTwo(RESPONSE_DATA.address_2);
          setTel(RESPONSE_DATA.tel_number);

          setDeliveryFrequency(RESPONSE_DATA.delivery_frequency);
          setQuantityPerDelivery(RESPONSE_DATA.quantity_delivery);
          
          setScheduledTime(RESPONSE_DATA.scheduled_time_first || '');

          setSpecifyDeliveryTimeFirstHour(RESPONSE_DATA.first_sd_time ? RESPONSE_DATA.first_sd_time.split(':')[0] : '');
          setSpecifyDeliveryTimeFirstMinute(RESPONSE_DATA.first_sd_time ? RESPONSE_DATA.first_sd_time.split(':')[1] : '');
          setSpecifyDeliveryTimeFirstSubMinuteOne(RESPONSE_DATA.first_sd_sub_min_one ? RESPONSE_DATA.first_sd_sub_min_one : '');
          setSpecifyDeliveryTimeFirstSubMinuteTwo(RESPONSE_DATA.first_sd_sub_min_second ? RESPONSE_DATA.first_sd_sub_min_second : '');

          setSpecifyDeliveryTimeSecondHour(RESPONSE_DATA.second_sd_time ? RESPONSE_DATA.second_sd_time.split(':')[0] : '');
          setSpecifyDeliveryTimeSecondMinute(RESPONSE_DATA.second_sd_time ? RESPONSE_DATA.second_sd_time.split(':')[1] : '');
          setSpecifyDeliveryTimeSecondSubMinuteOne(RESPONSE_DATA.second_sub_min_one ? RESPONSE_DATA.second_sub_min_one : '');
          setSpecifyDeliveryTimeSecondSubMinuteTwo(RESPONSE_DATA.second_sub_min_second ? RESPONSE_DATA.second_sub_min_second : '');

          setVehicleRegulation(RESPONSE_DATA.vehicle_height_width);
          setHeight(RESPONSE_DATA.height_width ? RESPONSE_DATA.height_width.split('/')[0] : '');
          setWidth(RESPONSE_DATA.height_width ? RESPONSE_DATA.height_width.split('/')[1] : '');
          setParkingPlaceDesignation(RESPONSE_DATA.parking_place);
          setParkingPlaceDesignationRemark(RESPONSE_DATA.note_1);
          setDeliverySlip(RESPONSE_DATA.delivery_slip);
          setDeliverySlipRemark(RESPONSE_DATA.note_2);
          setDaishsa(RESPONSE_DATA.daisha);
          setDaishaRemark(RESPONSE_DATA.note_3);
          setStoragePlace(RESPONSE_DATA.place);
          setStorageSpecialNote(RESPONSE_DATA.note_4);
          setEmptyDelivery(RESPONSE_DATA.empty_recovery);
          setKeyUse(RESPONSE_DATA.key);
          setKeyUseRemark(RESPONSE_DATA.note_5);
          setSecurityUse(RESPONSE_DATA.security);
          setCancellationMethod(RESPONSE_DATA.cancel_method);
          setGraceTime(RESPONSE_DATA.grace_time);
          setCompanyName(RESPONSE_DATA.company_name);
          setCompanyTel(RESPONSE_DATA.tel_number_2);
          setFacilityRule(RESPONSE_DATA.inside_rule);
          setPermitLicense(RESPONSE_DATA.license);
          setReceptionEntry(RESPONSE_DATA.reception_or_entry);
          setCertificationRequire(RESPONSE_DATA.cerft_required);
          setCertificationRequireRemark(RESPONSE_DATA.note_6);
          setElevatorUse(RESPONSE_DATA.elevator);
          setElevatorUseRemark(RESPONSE_DATA.note_7);
          setWaitingPlace(RESPONSE_DATA.waiting_place);
          setWaitingPlaceRemark(RESPONSE_DATA.note_8);

          setLastUpdateDate(RESPONSE_DATA.last_updated_at ? RESPONSE_DATA.last_updated_at.split('T')[0] : '');

          setDeliveryManual(RESPONSE_DATA.delivery_manual);

          setDeliveryRouteMapImage(handleGetImageURL(RESPONSE_DATA.delivery_route_map_path));
          setDeliveryRouteMapRemark(RESPONSE_DATA.delivery_route_map_other_remark);
          setRouteAMPPImage(handleGetImageURL(RESPONSE_DATA.parking_position_1_file_path));
          setRouteAMPPRemark(RESPONSE_DATA.parking_position_1_other_remark);
          setParkingAMPPImage(handleGetImageURL(RESPONSE_DATA.parking_position_2_file_path));
          setParkingAMPPRemark(RESPONSE_DATA.parking_position_2_other_remark);
        }

        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
        console.log(error);
      }
    };

    const handleGetImageURL = imagePath => {
      let URL = defaultImage;

      if (imagePath) {
        URL = `${Config.URL_IMAGE}${imagePath}`;
      };

      console.log(URL);

      return URL;
    };

    if (initData) {
      handleGetDetailStore();
    } else {
      // console.log('initData', initData);
    }
  });

  return (
    <KeyboardAvoidingView
      style={storeInformationStyleSheet.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Navbar />

      <View style={storeInformationStyleSheet.wrapper}>
        <View style={storeInformationStyleSheet.header}>
          <View style={storeInformationStyleSheet.headerIcon}>
            <Pressable
              testID="backButton"
              accessibilityLabel='_BackButton'
              onPress={() => {
                goBackStoreScreen();
              }}>
              <Icon
                testID="backButtonIcon"
                accessibilityLabel='_BackButtonIcon'
                style={storeInformationStyleSheet.iconBack}
                name="angle-double-left"
                size={30}
                color="#1534A1"
              />
            </Pressable>
          </View>

          <View style={storeInformationStyleSheet.headerText}>
            <Text style={storeInformationStyleSheet.titleScreen}>
              店舗カルテ
            </Text>
          </View>
        </View>

        <View style={storeInformationStyleSheet.listHeader}>
          <Text style={storeInformationStyleSheet.listHeaderText}>
            {`${course_name}コース  -  ${store_name}店`}
          </Text>

          <Pressable
            testID="editButton"
            accessibilityLabel='_EditButton'
            onPress={async () => {
              dispatch(setInitDataStoreEdit(true));

              props.navigation.navigate('StoreInformationEdit', {
                base_id: base_id,
                store_name: store_name,
                store_id: store_id,
                pass_code: pass_code,
                course_id: course_id,
                course_name: course_name,
              });
            }}
            style={storeInformationStyleSheet.editButton}>
            <FontAwesome5
              testID="editButtonIcon"
              accessibilityLabel='_EditButtonIcon'
              style={storeInformationStyleSheet.iconPen}
              name="pen"
              size={20}
              color="#FFFFFF"
            />
          </Pressable>
        </View>

        <ScrollView ref={scrollViewRef}>
          <View style={storeInformationStyleSheet.basicInformation}>
            <Pressable
              testID='basicInformationDropdownButton'
              accessibilityLabel='_BasicInformationDropdownButton'
              onPress={() => {setShowBasicInformation(!showBasicInformation)}}
            >
              <View style={storeInformationStyleSheet.rowHeader}>
                <View style={{ flex: 1 }}>
                  <AntDesign
                    testID="caretDownButton1"
                    accessibilityLabel='_CaretDownButton1'
                    style={storeInformationStyleSheet.iconDown}
                    name={showBasicInformation === true ? 'caretdown' : 'caretright'}
                  />
                </View>

                <View style={{ flex: 10 }}>
                  <Text style={storeInformationStyleSheet.rowHeaderText}>基本情報</Text>
                </View>
              </View>
            </Pressable>

            {showBasicInformation === true && (
              <View style={storeInformationStyleSheet.basicInformationTable}>
                <View style={storeInformationStyleSheet.businessClassification}>
                  <View style={storeInformationStyleSheet.headerCol}>
                    <Text style={{ fontSize: 12, top: 12 }}>事業分類</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={false}
                      selectTextOnFocus={false}
                      accessibilityLabel={'_BusinessClassificationInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={businessClassification}
                      onChangeText={value => {
                        handleChangeBusinessClassification(value);
                      }}
                      autoFocus={false}
                      style={[
                        storeInformationStyleSheet.businessClassificationInput,
                      ]}
                    />
                  </View>
                </View>

                <View style={storeInformationStyleSheet.deliveryDestinationCode}>
                  <View style={storeInformationStyleSheet.headerCol}>
                    <Text style={{ fontSize: 12, top: 12 }}>納品先コード</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={false}
                      selectTextOnFocus={false}
                      accessibilityLabel={'_DeliveryDestinationCodeInput'}
                      keyboardType={'numeric'}
                      returnKeyType={'done'}
                      value={deliveryDestinationCode !== null ? deliveryDestinationCode.toString() : ''}
                      onChangeText={value => {
                        handleChangeDeliveryDestinationCode(value);
                      }}
                      autoFocus={false}
                      style={[
                        storeInformationStyleSheet.deliveryDestinationCodeInput,
                      ]}
                    />
                  </View>
                </View>

                <View style={storeInformationStyleSheet.deliveryDestinationNameKana}>
                  <View style={storeInformationStyleSheet.headerCol}>
                    <Text style={{ fontSize: 12, top: 12 }}>納品先名 (カナ)</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={false}
                      selectTextOnFocus={false}
                      accessibilityLabel={'_DeliveryDestinationNameKanaInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={deliveryDestinationNameKana}
                      onChangeText={value => {
                        handleChangeDeliveryDestinationNameKana(value);
                      }}
                      autoFocus={false}
                      style={[
                        storeInformationStyleSheet.deliveryDestinationNameKanaInput,
                      ]}
                    />
                  </View>
                </View>

                <View style={storeInformationStyleSheet.deliveryDestinationName}>
                  <View style={storeInformationStyleSheet.headerCol}>
                    <Text style={{ fontSize: 12, top: 12 }}>納品先名</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={false}
                      selectTextOnFocus={false}
                      accessibilityLabel={'_DeliveryDestinationNameInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={deliveryDestinationName}
                      onChangeText={value => {
                        handleChangeDeliveryDestinationName(value);
                      }}
                      autoFocus={false}
                      style={[
                        storeInformationStyleSheet.deliveryDestinationNameInput,
                      ]}
                    />
                  </View>
                </View>

                <View style={storeInformationStyleSheet.postCode}>
                  <View style={storeInformationStyleSheet.headerCol}>
                    <Text style={{ fontSize: 12, top: 12 }}>郵便番号</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={false}
                      selectTextOnFocus={false}
                      accessibilityLabel={'_PostCodeInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={postCode}
                      onChangeText={value => {
                        handleChangePostCode(value);
                      }}
                      autoFocus={false}
                      style={[storeInformationStyleSheet.postCodeInput]}
                    />
                  </View>
                </View>

                <View style={storeInformationStyleSheet.postCode}>
                  <View style={storeInformationStyleSheet.headerCol}>
                    <Text style={{ fontSize: 12, top: 12 }}>大住所</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={false}
                      selectTextOnFocus={false}
                      accessibilityLabel={'_LargeAddressInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={addressOne}
                      onChangeText={value => {
                        handleChangeLargeAddress(value);
                      }}
                      autoFocus={false}
                      style={[storeInformationStyleSheet.largeAddressInput]}
                    />
                  </View>
                </View>

                <View style={storeInformationStyleSheet.smallAddress}>
                  <View style={storeInformationStyleSheet.headerCol}>
                    <Text style={{ fontSize: 12, top: 12 }}>小住所</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={false}
                      selectTextOnFocus={false}
                      accessibilityLabel={'_SmallAddressInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={addressTwo}
                      onChangeText={value => {
                        handleChangeSmallAddress(value);
                      }}
                      autoFocus={false}
                      style={[storeInformationStyleSheet.smallAddressInput]}
                    />
                  </View>
                </View>

                <View style={storeInformationStyleSheet.tel}>
                  <View style={storeInformationStyleSheet.headerCol}>
                    <Text style={{ fontSize: 12, top: 12 }}>TEL</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={false}
                      selectTextOnFocus={false}
                      accessibilityLabel={'_TelInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={tel}
                      onChangeText={value => {
                        handleChangeTelInput(value);
                      }}
                      autoFocus={false}
                      style={[storeInformationStyleSheet.telInput]}
                    />
                  </View>
                </View>
              </View>
            )}
          </View>

          <View style={storeInformationStyleSheet.deliveryInformation}>
            <Pressable
              testID='deliveryInformationDropdownButton'
              accessibilityLabel='_DeliveryInformationDropdownButton'
              onPress={() => {
                setShowDeliveryInformation(!showDeliveryInformation);
              }}
            >
              <View style={storeInformationStyleSheet.rowHeader}>
                <View style={{ flex: 1 }}>
                  <AntDesign
                    testID="caretDownButton2"
                    accessibilityLabel="_CaretDownButton2"
                    style={storeInformationStyleSheet.iconDown}
                    name={
                      showDeliveryInformation === true
                        ? 'caretdown'
                        : 'caretright'
                    }
                  />
                </View>

                <View style={{ flex: 10 }}>
                  <Text style={storeInformationStyleSheet.rowHeaderText}>
                    納品情報
                  </Text>
                </View>
              </View>
            </Pressable>

            {showDeliveryInformation === true && (
              <View style={storeInformationStyleSheet.deliveryInformationTable}>
                <View style={storeInformationStyleSheet.deliveryFrequency}>
                  <View style={storeInformationStyleSheet.headerCol}>
                    <Text style={{ fontSize: 12, top: 12 }}>納品頻度</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={false}
                      selectTextOnFocus={false}
                      accessibilityLabel={'_DeliveryFrequencyInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={deliveryFrequency}
                      onChangeText={value => {
                        handleChangeDeliveryFrequency(value);
                      }}
                      autoFocus={false}
                      style={[
                        storeInformationStyleSheet.deliveryFrequencyInput,
                      ]}
                    />
                  </View>
                </View>

                <View style={storeInformationStyleSheet.quantityPerDelivery}>
                  <View style={storeInformationStyleSheet.headerCol}>
                    <Text style={{ fontSize: 12, top: 12 }}>1回当り納品数量</Text>
                  </View>

                  <View style={{ flex: 3, flexDirection: 'row' }}>
                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', borderLeftWidth: 1, borderLeftColor: '#C4C4C4' }}>
                        <Text style={{ fontSize: 14 }}>約</Text>
                    </View>

                    <View style={{ flex: 10 }}>
                      <TextInput
                        editable={false}
                        selectTextOnFocus={false}
                        accessibilityLabel={'_QuantityPerDeliveryInput'}
                        keyboardType={'numeric'}
                        returnKeyType={'done'}
                        value={quantityPerDelivery !== null ? quantityPerDelivery.toString() : ''}
                        onChangeText={value => {
                          handleChangeQuantityPerDelivery(value);
                        }}
                        autoFocus={false}
                        style={[storeInformationStyleSheet.quantityPerDeliveryInput]}
                      />
                    </View>

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 14 }}>枚</Text>
                    </View>
                  </View>
                </View>

                <View style={storeInformationStyleSheet.scheduledTime}>
                  <View style={storeInformationStyleSheet.headerCol}>
                    <Text style={{ fontSize: 12, top: 12 }}>納品時間指定</Text>
                  </View>

                  <View style={{ flex: 3, flexDirection: 'row' }}>
                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', borderLeftWidth: 1, borderLeftColor: '#C4C4C4' }}>
                        <Text style={{ fontSize: 14 }}>約</Text>
                    </View>

                    <View style={{ flex: 10 }}>
                      <TextInput
                        editable={false}
                        selectTextOnFocus={false}
                        accessibilityLabel={'_ScheduledTimeInput'}
                        keyboardType={'default'}
                        returnKeyType={'done'}
                        value={scheduledTime !== null ? scheduledTime.toString() : ''}
                        onChangeText={value => {
                          handleChangeScheduledTime(value);
                        }}
                        autoFocus={false}
                        style={[storeInformationStyleSheet.scheduledTimeInput]}
                      />
                    </View>

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 14 }}>分</Text>
                    </View>
                  </View>
                </View>

                <View style={storeInformationStyleSheet.specifyDeliveryTime}>
                  <View style={[storeInformationStyleSheet.specialHeaderCol, storeInformationStyleSheet.mainHeader]}>
                    <Text style={{ fontSize: 12, top: 30 }}>納品時間指定</Text>
                  </View>

                  <View style={{ flex: 3, height: 80 }}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                      {/* First Half */}
                      <View style={{ flex: 1, flexDirection: 'row', borderLeftWidth: 1, borderBottomWidth: 1, borderColor: '#C4C4C4' }}>
                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ fontSize: 14, color: 'red', fontWeight: 'bold' }}>1便</Text>
                        </View>

                        <View style={{ flex: 2 }}>
                          <TextInput
                            editable={false}
                            accessibilityLabel={'_SpecifyDeliveryTimeFirstHourInput'}
                            keyboardType={'numeric'}
                            returnKeyType={'done'}
                            value={specifyDeliveryTimeFirstHour !== null ? specifyDeliveryTimeFirstHour.toString() : ''}
                            autoFocus={false}
                            style={[
                              storeInformationStyleSheet.specifyDeliveryTimeFirstInput,
                            ]}
                            placeholder={''}
                            placeholderTextColor={'#818181'}
                          />
                        </View>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ fontSize: 14}}>:</Text>
                        </View>

                        <View style={{ flex: 2 }}>
                          <TextInput
                            editable={false}
                            accessibilityLabel={'_SpecifyDeliveryTimeFirstMinuteInput'}
                            keyboardType={'numeric'}
                            returnKeyType={'done'}
                            value={specifyDeliveryTimeFirstMinute !== null ? specifyDeliveryTimeFirstMinute.toString() : ''}
                            autoFocus={false}
                            style={[
                              storeInformationStyleSheet.specifyDeliveryTimeFirstInput,
                            ]}
                            placeholder={''}
                            placeholderTextColor={'#818181'}
                          />
                        </View>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ fontSize: 14 }}>前</Text>
                        </View>

                        <View style={{ flex: 2 }}>
                          <TextInput
                            editable={false}
                            accessibilityLabel={'_SpecifyDeliveryTimeFirstSubMinuteOne'}
                            keyboardType={'numeric'}
                            returnKeyType={'done'}
                            value={specifyDeliveryTimeFirstSubMinuteOne !== null ? specifyDeliveryTimeFirstSubMinuteOne.toString() : ''}
                            autoFocus={false}
                            style={[
                              storeInformationStyleSheet.casualInput,
                            ]}
                            placeholder={''}
                            placeholderTextColor={'#818181'}
                          />
                        </View>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ fontSize: 14 }}>分</Text>
                        </View>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ fontSize: 14 }}>後</Text>
                        </View>

                        <View style={{ flex: 2 }}>
                          <TextInput
                            editable={false}
                            accessibilityLabel={'_SpecifyDeliveryTimeThirdInput'}
                            keyboardType={'numeric'}
                            returnKeyType={'done'}
                            value={specifyDeliveryTimeFirstSubMinuteTwo !== null ? specifyDeliveryTimeFirstSubMinuteTwo.toString() : ''}
                            autoFocus={false}
                            style={[
                              storeInformationStyleSheet.casualInput,
                            ]}
                            placeholder={''}
                            placeholderTextColor={'#818181'}
                          />
                        </View>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ fontSize: 14 }}>分</Text>
                        </View>
                      </View>
                      
                      {/* Second Half */}
                      <View style={{ flex: 1, flexDirection: 'row', borderLeftWidth: 1, borderBottomWidth: 1, borderColor: '#C4C4C4' }}>
                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ fontSize: 14, color: 'red', fontWeight: 'bold' }}>2便</Text>
                        </View>

                        <View style={{ flex: 2 }}>
                          <TextInput
                            editable={false}
                            accessibilityLabel={'_SpecifyDeliveryTimeSecondHourInput'}
                            keyboardType={'numeric'}
                            returnKeyType={'done'}
                            value={specifyDeliveryTimeSecondHour !== null ? specifyDeliveryTimeSecondHour.toString() : ''}
                            autoFocus={false}
                            style={[
                              storeInformationStyleSheet.specifyDeliveryTimeFirstInput,
                            ]}
                            placeholder={''}
                            placeholderTextColor={'#818181'}
                          />
                        </View>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ fontSize: 14 }}>:</Text>
                        </View>

                        <View style={{ flex: 2 }}>
                          <TextInput
                            editable={false}
                            accessibilityLabel={'_SpecifyDeliveryTimeSecondMinuteInput'}
                            keyboardType={'numeric'}
                            returnKeyType={'done'}
                            value={specifyDeliveryTimeSecondMinute !== null ? specifyDeliveryTimeSecondMinute.toString() : ''}
                            autoFocus={false}
                            style={[
                              storeInformationStyleSheet.specifyDeliveryTimeFirstInput,
                            ]}
                            placeholder={''}
                            placeholderTextColor={'#818181'}
                          />
                        </View>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ fontSize: 14 }}>前</Text>
                        </View>

                        <View style={{ flex: 2 }}>
                          <TextInput
                            editable={false}
                            accessibilityLabel={'_SpecifyDeliveryTimeSecondSubMinuteOne'}
                            keyboardType={'numeric'}
                            returnKeyType={'done'}
                            value={specifyDeliveryTimeSecondSubMinuteOne !== null ? specifyDeliveryTimeSecondSubMinuteOne.toString() : ''}
                            autoFocus={false}
                            style={[storeInformationStyleSheet.casualInput]}
                            placeholder={''}
                            placeholderTextColor={'#818181'}
                          />
                        </View>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ fontSize: 14 }}>分</Text>
                        </View>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ fontSize: 14 }}>後</Text>
                        </View>

                        <View style={{ flex: 2 }}>
                          <TextInput
                            editable={false}
                            accessibilityLabel={'_SpecifyDeliveryTimeSecondSubMinuteTwo'}
                            keyboardType={'numeric'}
                            returnKeyType={'done'}
                            value={specifyDeliveryTimeSecondSubMinuteTwo !== null ? specifyDeliveryTimeSecondSubMinuteTwo.toString() : ''}
                            autoFocus={false}
                            style={[storeInformationStyleSheet.casualInput]}
                            placeholder={''}
                            placeholderTextColor={'#818181'}
                          />
                        </View>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ fontSize: 14 }}>分</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={storeInformationStyleSheet.vehicleHeightWidth}>
                  <View style={[storeInformationStyleSheet.headerCol, storeInformationStyleSheet.mainHeader]}>
                    <Text style={{ fontSize: 10, top: 12 }}>車車両高・幅の規制</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={false}
                      selectTextOnFocus={false}
                      accessibilityLabel={'_VehicleRegulationInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={vehicelRegulation !== null ? handleTransformGeneralFields(vehicelRegulation.toString()) : ''}
                      onChangeText={value => {
                        handleChangeVehicleRegulation(value);
                      }}
                      autoFocus={false}
                      style={[
                        storeInformationStyleSheet.vehicleRegulationInput,
                      ]}
                    />
                  </View>
                </View>

                <View style={storeInformationStyleSheet.heightWidth}>
                  <View style={[storeInformationStyleSheet.headerCol, storeInformationStyleSheet.mainHeader]}>
                    <Text style={{ fontSize: 12, top: 30 }}>高さ(m)/幅(m)</Text>
                  </View>

                  <View style={{ flex: 3, height: 80 }}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                      <View style={{ flex: 1, flexDirection: 'row', borderLeftWidth: 1, borderBottomWidth: 1, borderColor: '#C4C4C4' }}>
                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ fontSize: 14 }}>高さ</Text>
                        </View>

                        <View style={{ flex: 10 }}>
                          <TextInput
                            editable={false}
                            selectTextOnFocus={false}
                            accessibilityLabel={'_HeightInput'}
                            keyboardType={'numeric'}
                            returnKeyType={'done'}
                            value={height}
                            onChangeText={value => {
                              handleChangeHeight(value);
                            }}
                            autoFocus={false}
                            style={[
                              storeInformationStyleSheet.heightInput,
                            ]}
                          />
                        </View>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ fontSize: 14, paddingTop: 20 }}>m</Text>
                        </View>
                      </View>

                      <View style={{ flex: 1, flexDirection: 'row', borderLeftWidth: 1, borderBottomWidth: 1, borderColor: '#C4C4C4' }}>
                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ fontSize: 14 }}>幅</Text>
                        </View>

                        <View style={{ flex: 10 }}>
                          <TextInput
                            editable={false}
                            selectTextOnFocus={false}
                            accessibilityLabel={'_WidthInput'}
                            keyboardType={'numeric'}
                            returnKeyType={'done'}
                            value={width}
                            onChangeText={value => {
                              handleChangeWidth(value);
                            }}
                            autoFocus={false}
                            style={[
                              storeInformationStyleSheet.widthInput,
                            ]}
                          />
                        </View>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ fontSize: 14, paddingTop: 20 }}>m</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={storeInformationStyleSheet.parkingPlaceDesignation}>
                  <View style={[storeInformationStyleSheet.headerCol, storeInformationStyleSheet.mainHeader]}>
                    <Text style={{ fontSize: 12, top: 12 }}>駐車場所指定</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={false}
                      selectTextOnFocus={false}
                      accessibilityLabel={'_ParkingPlaceDesinationInput'}
                      keyboardType={'numeric'}
                      returnKeyType={'done'}
                      value={parkingPlaceDesignation !== null ? handleTransformGeneralFields(parkingPlaceDesignation.toString()) : ''}
                      onChangeText={value => {
                        handleChangeParkingPlaceDesignation(value);
                      }}
                      autoFocus={false}
                      style={[
                        storeInformationStyleSheet.parkingPlaceDesinationInput,
                      ]}
                    />
                  </View>
                </View>

                <View style={storeInformationStyleSheet.parkingPlaceDesignation}>
                  <View style={[storeInformationStyleSheet.headerCol, storeInformationStyleSheet.mainHeader]}>
                    <Text style={{ fontSize: 12, top: 12 }}>特記事項</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={false}
                      selectTextOnFocus={false}
                      accessibilityLabel={'_ParkingPlaceDesignationRemarkInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={parkingPlaceDesignationRemark}
                      onChangeText={value => {
                        handleChangeParkingPlaceDesignationRemark(value);
                      }}
                      autoFocus={false}
                      style={[
                        storeInformationStyleSheet.parkingPlaceDesignationRemarkInput,
                      ]}
                    />
                  </View>
                </View>

                <View style={storeInformationStyleSheet.parkingPlaceDesignation}>
                  <View style={[storeInformationStyleSheet.headerCol, storeInformationStyleSheet.mainHeader]}>
                    <Text style={{ fontSize: 12, top: 12 }}>納品伝票</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={false}
                      selectTextOnFocus={false}
                      accessibilityLabel={'_DeliverySlipInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={deliverySlip !== null ? handleTransformGeneralFields(deliverySlip.toString()) : ''}
                      onChangeText={value => {
                        handleChangeDeliverySlip(value);
                      }}
                      autoFocus={false}
                      style={[storeInformationStyleSheet.deliverySlipInput]}
                    />
                  </View>
                </View>

                <View style={storeInformationStyleSheet.parkingPlaceDesignation}>
                  <View style={[storeInformationStyleSheet.headerCol, storeInformationStyleSheet.mainHeader]}>
                    <Text style={{ fontSize: 12, top: 12 }}>特記事項</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={false}
                      selectTextOnFocus={false}
                      accessibilityLabel={'_DeliverySlipRemarkInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={deliverySlipRemark}
                      onChangeText={value => {
                        handleChangeDeliverySlipRemark(value);
                      }}
                      autoFocus={false}
                      style={[
                        storeInformationStyleSheet.deliverySlipRemarkInput,
                      ]}
                    />
                  </View>
                </View>

                <View style={storeInformationStyleSheet.trollyUse}>
                  <View style={[storeInformationStyleSheet.headerCol, storeInformationStyleSheet.mainHeader]}>
                    <Text style={{ fontSize: 12, top: 12 }}>台車使用</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={false}
                      selectTextOnFocus={false}
                      accessibilityLabel={'_TrolleyUseInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={daisha !== null ? handleTransformDaisha(daisha.toString()) : ''}
                      onChangeText={value => {
                        handleChangeTrolleyUse(value);
                      }}
                      autoFocus={false}
                      style={[storeInformationStyleSheet.trolleyUseInput]}
                    />
                  </View>
                </View>

                <View style={storeInformationStyleSheet.trollyUse}>
                  <View style={[storeInformationStyleSheet.headerCol, storeInformationStyleSheet.mainHeader]}>
                    <Text style={{ fontSize: 12, top: 12 }}>特記事項</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={false}
                      selectTextOnFocus={false}
                      accessibilityLabel={'_TrolleyUseRemarkInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={daishaRemark}
                      onChangeText={value => {
                        handleChangeTrolleyUseRemark(value);
                      }}
                      autoFocus={false}
                      style={[storeInformationStyleSheet.trolleyUseRemarkInput]}
                    />
                  </View>
                </View>

                <View style={storeInformationStyleSheet.storagePlace}>
                  <View style={[storeInformationStyleSheet.headerCol, storeInformationStyleSheet.mainHeader]}>
                    <Text style={{ fontSize: 12, top: 12 }}>置場</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={false}
                      selectTextOnFocus={false}
                      accessibilityLabel={'_StoragePlaceInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={storagePlace}
                      onChangeText={value => {
                        handleChangeStoragePlace(value);
                      }}
                      autoFocus={false}
                      style={[storeInformationStyleSheet.storagePlaceInput]}
                    />
                  </View>
                </View>

                <View style={storeInformationStyleSheet.storageSpecialNote}>
                  <View style={storeInformationStyleSheet.headerCol}>
                    <Text style={{ fontSize: 12, top: 12 }}>置場の特記事項</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={false}
                      selectTextOnFocus={false}
                      accessibilityLabel={'_StorageSpecialNoteInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={storageSpecialNote}
                      onChangeText={value => {
                        handleChangeStorageSpecialNote(value);
                      }}
                      autoFocus={false}
                      style={[
                        storeInformationStyleSheet.storageSpecialNoteInput,
                      ]}
                    />
                  </View>
                </View>

                <View style={storeInformationStyleSheet.emptyDelivery}>
                  <View style={storeInformationStyleSheet.headerCol}>
                    <Text style={{ fontSize: 12, top: 12 }}>空回収</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={false}
                      selectTextOnFocus={false}
                      accessibilityLabel={'_EmptyDeliveryInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={emptyDelivery}
                      onChangeText={value => {
                        handleChangeEmptyDelivery(value);
                      }}
                      autoFocus={false}
                      style={[storeInformationStyleSheet.emptyDeliveryInput]}
                    />
                  </View>
                </View>

                <View style={storeInformationStyleSheet.keyUse}>
                  <View style={storeInformationStyleSheet.headerCol}>
                    <Text style={{ fontSize: 12, top: 12 }}>鍵の使用</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={false}
                      selectTextOnFocus={false}
                      accessibilityLabel={'_KeyUseInput'}
                      keyboardType={'numeric'}
                      returnKeyType={'done'}
                      value={keyUse  !== null ? handleTransformGeneralFields(keyUse.toString()) : ''}
                      onChangeText={value => {
                        handleChangeKeyUse(value);
                      }}
                      autoFocus={false}
                      style={[storeInformationStyleSheet.keyUseInput]}
                    />
                  </View>
                </View>

                <View style={storeInformationStyleSheet.keyUse}>
                  <View style={storeInformationStyleSheet.headerCol}>
                    <Text style={{ fontSize: 12, top: 12 }}>特記事項</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={false}
                      selectTextOnFocus={false}
                      accessibilityLabel={'_KeyUseRemarkInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={keyUseRemark}
                      onChangeText={value => {
                        handleChangeKeyUseRemark(value);
                      }}
                      autoFocus={false}
                      style={[storeInformationStyleSheet.keyUseRemarkInput]}
                    />
                  </View>
                </View>

                <View style={storeInformationStyleSheet.securityUse}>
                  <View style={storeInformationStyleSheet.specialHeaderCol}>
                    <Text style={{ fontSize: 12, top: 12 }}>セキュリティ使用</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={false}
                      selectTextOnFocus={false}
                      accessibilityLabel={'_SecurityUseInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={securityUse !== null ? handleTransformGeneralFields(securityUse.toString()) : ''}
                      onChangeText={value => {
                        handleChangeSecurityUse(value);
                      }}
                      autoFocus={false}
                      style={[storeInformationStyleSheet.securityUseInput]}
                    />
                  </View>
                </View>

                <View style={storeInformationStyleSheet.securityUse}>
                  <View style={{ flex: 2, height: 160 }}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                      <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={[storeInformationStyleSheet.headerCol, storeInformationStyleSheet.mainHeader]}>
                          <Text style={{ fontSize: 12, top: 12 }}>解除方法</Text>
                        </View>

                        <View style={{ flex: 3 }}>
                          <TextInput
                            editable={false}
                            selectTextOnFocus={false}
                            accessibilityLabel={'_CancellationMethodInput'}
                            keyboardType={'default'}
                            returnKeyType={'done'}
                            value={cancellationMethod}
                            onChangeText={value => {
                              handleChangeCancellationMethod(value);
                            }}
                            autoFocus={false}
                            style={[
                              storeInformationStyleSheet.cancellationMethodInput,
                            ]}
                          />
                        </View>
                      </View>

                      <View style={storeInformationStyleSheet.dashedBorderSubHeader}>
                        <View style={[storeInformationStyleSheet.headerCol, storeInformationStyleSheet.mainHeader]}>
                          <Text style={{ fontSize: 12, top: 12 }}>猶予時間</Text>
                        </View>

                        <View style={{ flex: 3 }}>
                          <TextInput
                            editable={false}
                            selectTextOnFocus={false}
                            accessibilityLabel={'_GraceTimeInput'}
                            keyboardType={'default'}
                            returnKeyType={'done'}
                            value={graceTime}
                            onChangeText={value => {
                              handleChangeGraceTime(value);
                            }}
                            autoFocus={false}
                            style={[storeInformationStyleSheet.graceTimeInput]}
                          />
                        </View>
                      </View>

                      <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={[storeInformationStyleSheet.headerCol, storeInformationStyleSheet.mainHeader]}>
                          <Text style={{ fontSize: 12, top: 12 }}>会社名</Text>
                        </View>

                        <View style={{ flex: 3 }}>
                          <TextInput
                            editable={false}
                            selectTextOnFocus={false}
                            accessibilityLabel={'_CompanyNameInput'}
                            keyboardType={'default'}
                            returnKeyType={'done'}
                            value={companyName}
                            onChangeText={value => {
                              handleChangeCompanyName(value);
                            }}
                            autoFocus={false}
                            style={[
                              storeInformationStyleSheet.companyNameInput,
                            ]}
                          />
                        </View>
                      </View>

                      <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={[storeInformationStyleSheet.headerCol]}>
                          <Text style={{ fontSize: 12, top: 12 }}>TEL</Text>
                        </View>

                        <View style={{ flex: 3 }}>
                          <TextInput
                            editable={false}
                            selectTextOnFocus={false}
                            accessibilityLabel={'_CompanyTelInput'}
                            keyboardType={'default'}
                            returnKeyType={'done'}
                            value={companyTel}
                            onChangeText={value => {
                              handleChangeCompanyTel(value);
                            }}
                            autoFocus={false}
                            style={[storeInformationStyleSheet.companyTelInput]}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={storeInformationStyleSheet.facilityRule}>
                  <View style={[storeInformationStyleSheet.specialHeaderCol]}>
                    <Text style={{ fontSize: 12, top: 12 }}>施設内ルール</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={false}
                      selectTextOnFocus={false}
                      accessibilityLabel={'_FacilityRuleInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={facilityRule !== null ? handleTransformGeneralFields(facilityRule.toString()) : ''}
                      onChangeText={value => {
                        handleChangeFacilityRule(value);
                      }}
                      autoFocus={false}
                      style={[storeInformationStyleSheet.facilityRuleInput]}
                    />
                  </View>
                </View>

                <View style={storeInformationStyleSheet.facilityRule}>
                  <View style={{ flex: 2, height: 80 }}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                      <View style={storeInformationStyleSheet.dashedBorderSubHeader}>
                        <View style={[storeInformationStyleSheet.headerCol, storeInformationStyleSheet.mainHeader]}>
                          <Text style={{ fontSize: 12, top: 12 }}>許可証</Text>
                        </View>

                        <View style={{ flex: 3 }}>
                          <TextInput
                            editable={false}
                            selectTextOnFocus={false}
                            accessibilityLabel={'_PermitLicenseInput'}
                            keyboardType={'default'}
                            returnKeyType={'done'}
                            value={permitLicense}
                            onChangeText={value => {
                              handleChangePermitLicense(value);
                            }}
                            autoFocus={false}
                            style={[
                              storeInformationStyleSheet.permitLicenseInput,
                            ]}
                          />
                        </View>
                      </View>

                      <View style={storeInformationStyleSheet.dashedBorderSubHeader}>
                        <View style={[storeInformationStyleSheet.headerCol, storeInformationStyleSheet.mainHeader]}>
                          <Text style={{ fontSize: 12, top: 12 }}>受付/記入</Text>
                        </View>

                        <View style={{ flex: 3 }}>
                          <TextInput
                            editable={false}
                            selectTextOnFocus={false}
                            accessibilityLabel={'_ReceptionEntryInput'}
                            keyboardType={'default'}
                            returnKeyType={'done'}
                            value={receptionEntry}
                            onChangeText={value => {
                              handleChangeReceptionEntry(value);
                            }}
                            autoFocus={false}
                            style={[
                              storeInformationStyleSheet.receptionEntryInput,
                            ]}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={storeInformationStyleSheet.certificationRequire}>
                  <View style={[storeInformationStyleSheet.headerCol]}>
                    <Text style={{ fontSize: 12, top: 12 }}>照明必要性</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={false}
                      selectTextOnFocus={false}
                      accessibilityLabel={'_CertificationRequireInput'}
                      keyboardType={'numeric'}
                      returnKeyType={'done'}
                      value={certificationRequire !== null ? handleTransformGeneralFields(certificationRequire.toString()) : ''}
                      onChangeText={value => {
                        handleChangeCertificationRequire(value);
                      }}
                      autoFocus={false}
                      style={[storeInformationStyleSheet.keyUseInput]}
                    />
                  </View>
                </View>

                <View style={storeInformationStyleSheet.certificationRequire}>
                  <View style={[storeInformationStyleSheet.headerCol, { borderTopColor: '#C4C4C4', borderTopWidth: 1 }]}>
                    <Text style={{ fontSize: 12, top: 12 }}>特記事項</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={false}
                      selectTextOnFocus={false}
                      accessibilityLabel={'_CertificationRequireRemarkInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={certificationRequireRemark}
                      onChangeText={value => {
                        handleChangeCertificationRequireRemark(value);
                      }}
                      autoFocus={false}
                      style={[
                        storeInformationStyleSheet.keyUseRemarkInput,
                        { borderTopWidth: 1, borderTopColor: '#C4C4C4' },
                      ]}
                    />
                  </View>
                </View>

                <View style={storeInformationStyleSheet.elevatorRemark}>
                  <View style={storeInformationStyleSheet.headerCol}>
                    <Text style={{ fontSize: 12, top: 12 }}>エレベーター使用</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={false}
                      selectTextOnFocus={false}
                      accessibilityLabel={'_ElevatorUseInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={elevatorUse !== null ? handleTransformGeneralFields(elevatorUse.toString()) : ''}
                      onChangeText={value => {
                        handleChangeElevatorUse(value);
                      }}
                      autoFocus={false}
                      style={[storeInformationStyleSheet.keyUseInput]}
                    />
                  </View>
                </View>

                <View style={storeInformationStyleSheet.elevatorRemark}>
                  <View style={storeInformationStyleSheet.headerCol}>
                    <Text style={{ fontSize: 12, top: 12 }}>特記事項</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={false}
                      selectTextOnFocus={false}
                      accessibilityLabel={'_ElevatorUseRemarkInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={elevatorUseRemark}
                      onChangeText={value => {
                        handleChangeElevatorUseRemark(value);
                      }}
                      autoFocus={false}
                      style={[storeInformationStyleSheet.keyUseRemarkInput]}
                    />
                  </View>
                </View>

                <View style={storeInformationStyleSheet.waitingPlace}>
                  <View style={storeInformationStyleSheet.headerCol}>
                    <Text style={{ fontSize: 12, top: 12 }}>待機場所</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={false}
                      selectTextOnFocus={false}
                      accessibilityLabel={'_WaitingPlaceInput'}
                      keyboardType={'numeric'}
                      returnKeyType={'done'}
                      value={waitingPlace !== null ? handleTransformGeneralFields(waitingPlace.toString()) : ''}
                      onChangeText={value => {
                        handleChangeWaitingPlace(value);
                      }}
                      autoFocus={false}
                      style={[storeInformationStyleSheet.keyUseInput]}
                    />
                  </View>
                </View>

                <View style={storeInformationStyleSheet.waitingPlace}>
                  <View style={[storeInformationStyleSheet.headerCol, storeInformationStyleSheet.borderLeft]}>
                    <Text style={{ fontSize: 12, top: 12 }}>特記事項</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={false}
                      selectTextOnFocus={false}
                      accessibilityLabel={'_WaitingPlaceRemarkInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={waitingPlaceRemark}
                      onChangeText={value => {
                        handleChangeWaitingPlaceRemark(value);
                      }}
                      autoFocus={false}
                      style={[storeInformationStyleSheet.keyUseRemarkInput]}
                    />
                  </View>
                </View>
              </View>
            )}
          </View>

          <View style={storeInformationStyleSheet.deliveryProcedure}>
            <Pressable
              testID='deliveryProcedureDropdownButton'
              accessibilityLabel='_DeliveryProcedureDropdownButton'
              onPress={() => {setShowDeliveryProcedure(!showDeliveryProcedure)}}
            >
              <View style={storeInformationStyleSheet.rowHeader}>
                <View style={{ flex: 1 }}>
                  <AntDesign
                    testID="caretDownButton3"
                    accessibilityLabel="_CaretDownButton3"
                    style={storeInformationStyleSheet.iconDown}
                    name={showDeliveryProcedure === true ? 'caretdown' : 'caretright'}
                  />
                </View>

                <View style={{ flex: 10 }}>
                  <Text style={storeInformationStyleSheet.rowHeaderText}>納品手順</Text>
                </View>
              </View>
            </Pressable>

            {showDeliveryProcedure === true && (
              <View style={{ flex: 1 }}>
                <View style={storeInformationStyleSheet.deliveryProcedureTable}>
                  <View style={storeInformationStyleSheet.deliveryPlace}>
                    <View style={[storeInformationStyleSheet.headerCol, { borderRightWidth: 1, borderColor: '#C4C4C4' }]}>
                      <Text style={{ fontSize: 12, top: 12 }}>納品手順</Text>
                    </View>

                    <View style={{ flex: 3, height: 200 }}>
                      <ScrollView>
                        <View style={{ flex: 1, padding: 5 }}>
                          {
                            deliveryManual.map((delivery, deliveryIndex) => (
                              <View key={deliveryIndex} style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                  <Text style={{ marginTop: 5, fontSize: 12 }}>{(deliveryIndex + 1)}. </Text>
                                </View>

                                <View style={{ flex: 8, justifyContent: 'center', alignItems: 'flex-start' }}>
                                  <Text style={{ marginTop: 5 }}>{delivery.content}</Text>
                                </View>
                              </View>
                            ))
                          }
                        </View>
                      </ScrollView>
                    </View>
                  </View>
                </View>

                <View style={storeInformationStyleSheet.mapSection}>
                  <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <View style={storeInformationStyleSheet.mapTitle}>
                        <Text style={storeInformationStyleSheet.mapTitleText}>納品経路図</Text>
                      </View>

                      <View style={{ flex: 3 }}></View>
                    </View>

                    <View style={storeInformationStyleSheet.map}>
                      <View style={{ flex: 1, margin: 5 }}>
                        <Image
                          resizeMode="contain"
                          style={storeInformationStyleSheet.mapImage}
                          source={{uri: deliveryRouteMapImage}}
                        />
                      </View>
                    </View>

                    <View style={storeInformationStyleSheet.deliveryRouteMapOtherPrecaution}>
                      <View style={[storeInformationStyleSheet.headerCol, { borderTopWidth:1, borderColor: '#C4C4C4', justifyContent: 'center' }]}>
                        <Text style={{ fontSize: 10 }}>その他・注意事項</Text>
                      </View>

                      <View style={{ flex: 3 }}>
                        <TextInput
                          editable={false}
                          accessibilityLabel={'_DeliveryRouteMapRemarkTextInput'}
                          keyboardType={'default'}
                          returnKeyType={'done'}
                          value={deliveryRouteMapRemark}
                          multiline={true}
                          numberOfLines={6}
                          autoCapitalize={'none'}
                          autoFocus={false}
                          style={[storeInformationStyleSheet.deliveryDirectionMapOtherPrecautionInput]}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            )}
          </View>

          <View style={storeInformationStyleSheet.routeInformation}>
            <Pressable
              testID='routeInformationDropdownButton'
              accessibilityLabel='_RouteInformationDropdownButton'
              onPress={() => {setShowRouteInformation(!showRouteInformation)}}
            >
              <View style={storeInformationStyleSheet.rowHeader}>
                <View style={{ flex: 1 }}>
                  <AntDesign
                    testID="caretDownButton4"
                    accessibilityLabel="_CaretDownButton4"
                    style={storeInformationStyleSheet.iconDown}
                    name={showRouteInformation === true ? 'caretdown' : 'caretright'}
                  />
                </View>

                <View style={{ flex: 10 }}>
                  <Text style={storeInformationStyleSheet.rowHeaderText}>ルート周辺情報</Text>
                </View>
              </View>
            </Pressable>

            {showRouteInformation === true && (
              <View style={storeInformationStyleSheet.mapSection}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={storeInformationStyleSheet.mapTitle}>
                      <Text style={storeInformationStyleSheet.mapTitleText}>納品経路図</Text>
                    </View>

                    <View style={{ flex: 3 }}></View>
                  </View>

                  <View style={storeInformationStyleSheet.map}>
                    <View style={{ flex: 1, margin: 5 }}>
                      <Image
                        resizeMode="contain"
                        style={storeInformationStyleSheet.mapImage}
                        source={{uri: routeAMPPImage}}
                      />
                    </View>
                  </View>

                  <View style={storeInformationStyleSheet.deliveryRouteMapOtherPrecaution}>
                    <View style={[storeInformationStyleSheet.headerCol, { borderTopWidth:1, borderColor: '#C4C4C4', justifyContent: 'center' }]}>
                      <Text style={{ fontSize: 10}}>その他・注意事項</Text>
                    </View>

                    <View style={{ flex: 3 }}>
                      <TextInput
                        editable={false}
                        accessibilityLabel={'_RouteAMPPRemarkTextInput'}
                        keyboardType={'default'}
                        returnKeyType={'done'}
                        value={routeAMPPRemark}
                        multiline={true}
                        numberOfLines={6}
                        autoCapitalize={'none'}
                        autoFocus={false}
                        style={[
                          storeInformationStyleSheet.deliveryDirectionMapOtherPrecautionInput,
                        ]}
                      />
                    </View>
                  </View>
                </View>
              </View>
            )}
          </View>

          <View style={storeInformationStyleSheet.parkingInformation}>
            <Pressable
              testID='parkingInformationDropdownButton'
              accessibilityLabel='_ParkingInformationDropdownButton'
              onPress={() => {setShowParkingInformation(!showParkingInformation)}}
            >
              <View style={storeInformationStyleSheet.rowHeader}>
                <View style={{ flex: 1 }}>
                  <AntDesign
                    testID="caretDownButton5"
                    accessibilityLabel="_CaretDownButton5"
                    style={storeInformationStyleSheet.iconDown}
                    name={showParkingInformation === true ? 'caretdown' : 'caretright'}
                  />
                </View>

                <View style={{ flex: 10 }}>
                  <Text style={storeInformationStyleSheet.rowHeaderText}>駐車場情報</Text>
                </View>
              </View>
            </Pressable>

            {showParkingInformation === true && (
              <View style={storeInformationStyleSheet.mapSection}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={storeInformationStyleSheet.mapTitle}>
                      <Text style={storeInformationStyleSheet.mapTitleText}>納品経路図</Text>
                    </View>

                    <View style={{ flex: 3 }}></View>
                  </View>

                  <View style={storeInformationStyleSheet.map}>
                    <View style={{ flex: 1, margin: 5 }}>
                      <Image
                        resizeMode="contain"
                        style={storeInformationStyleSheet.mapImage}
                        source={{uri: parkingAMPPImage}}
                      />
                    </View>
                  </View>

                  <View style={storeInformationStyleSheet.deliveryRouteMapOtherPrecaution}>
                    <View style={[storeInformationStyleSheet.headerCol, { borderTopWidth:1, borderBottomWidth: 1, borderColor: '#C4C4C4', justifyContent: 'center' }]}>
                      <Text style={{ fontSize: 10 }}>その他・注意事項</Text>
                    </View>

                    <View style={{ flex: 3 }}>
                      <TextInput
                        editable={false}
                        accessibilityLabel={'_ParkingAMPPRemarkTextInput'}
                        keyboardType={'default'}
                        returnKeyType={'done'}
                        value={parkingAMPPRemark}
                        multiline={true}
                        numberOfLines={6}
                        autoCapitalize={'none'}
                        autoFocus={false}
                        style={[
                          storeInformationStyleSheet.deliveryDirectionMapOtherPrecautionInput,
                        ]}
                      />
                    </View>
                  </View>
                </View>
              </View>
            )}
          </View>

          <View style={storeInformationStyleSheet.updateInformation}>
            <Text style={storeInformationStyleSheet.updateInformationText}>{`最新更新日：${lastUpdateDate}`}</Text>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default StoreInformation;
