import React, { useEffect, useState, useRef } from 'react';

import {
  View,
  Text,
  Image,
  Modal,
  Linking,
  Platform,
  Pressable,
  TextInput,
  ScrollView,
  BackHandler,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import { Config } from 'src/const';
import { useDispatch } from 'react-redux';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { object2Path } from 'src/utils/object2Path';
import { useIsFocused } from '@react-navigation/native';
import { getStoreInformation, updateStoreInformation, postUpdate } from 'src/api/modules/store';
import { setLoading, setInitDataStoreEdit, setInitDataStoreDetail } from 'src/actions/miscActions';

import Navbar from '../../Navbar';
import * as FileSystem from 'expo-file-system';
import useSelector from 'src/utils/useSelector';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import storeInformationEditStyleSheet from '../styles/storeInformationEditStyle';
export interface propsType {
  navigation: any;
  route: any;
}

const StoreInformationEdit = (props: propsType) => {
  const { base_id, store_name, store_id, pass_code, course_id, course_name } = props.route.params;

  const scrollViewRef = useRef<ScrollView>();

  const defaultImage = 'http://thaibinhtv.vn/thumb/640x400/assets/images/imgstd.jpg';

  const urlAPI = {
    apiGetDetailStore: '/mobile/store',
    apiUpdateStoreInformation: '/mobile/store',
  };

  const dispatch = useDispatch();

  const generalDropdownFields = [
    { value: null, text: '選択してください' },
    { value: 1, text: '無し' },
    { value: 2, text: '有り' },
  ];

  const daishaDropdownFields = [
    { value: null, text: '選択してください' },
    { value: 1, text: '指定無し' },
    { value: 2, text: '普通台車' },
    { value: 3, text: 'ゴム台車' },
    { value: 4, text: '指定台車' },
    { value: 5, text: '手持ち' },
  ];

  const [wrapperOpacity, setWrapperOpacity] = useState(1);

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

  const [vehicelRegulation, setVehicleRegulation] = useState(null);
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [parkingPlaceDesignation, setParkingPlaceDesignation] = useState(null);
  const [parkingPlaceDesignationRemark, setParkingPlaceDesignationRemark] = useState('');
  const [deliverySlip, setDeliverySlip] = useState(null);
  const [deliverySlipRemark, setDeliverySlipRemark] = useState('');
  const [daisha, setDaishsa] = useState(null);
  const [daishaRemark, setDaishaRemark] = useState('');
  const [storagePlace, setStoragePlace] = useState('');
  const [storageSpecialNote, setStorageSpecialNote] = useState('');
  const [emptyDelivery, setEmptyDelivery] = useState('');
  const [keyUse, setKeyUse] = useState(null);
  const [securityUse, setSecurityUse] = useState(null);
  const [cancellationMethod, setCancellationMethod] = useState('');
  const [graceTime, setGraceTime] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyTel, setCompanyTel] = useState('');
  const [keyUseRemark, setKeyUseRemark] = useState('');
  const [facilityRule, setFacilityRule] = useState(null);
  const [permitLicense, setPermitLicense] = useState('');
  const [receptionEntry, setReceptionEntry] = useState('');
  const [certificationRequire, setCertificationRequire] = useState(null);
  const [certificationRequireRemark, setCertificationRequireRemark] = useState('');
  const [elevatorUse, setElevatorUse] = useState(null);
  const [elevatorUseRemark, setElevatorUseRemark] = useState('');
  const [waitingPlace, setWaitingPlace] = useState(null);
  const [waitingPlaceRemark, setWaitingPlaceRemark] = useState('');

  const [deliveryManual, setDeliveryManual] = useState([]);
  const [subDeliveryManual, setSubDeliveryManual] = useState('');
  const [deliveryManualErrorMessage, setDeliveryManualErrorMessage] = useState('');

  const [deliveryRouteMapImage, setDeliveryRouteMapImage] = useState(defaultImage);
  const [deliveryRouteMapRemark, setDeliveryRouteMapRemark] = useState('');
  const [routeAMPPImage, setRouteAMPPImage] = useState(defaultImage);
  const [routeAMPPRemark, setRouteAMPPRemark] = useState('');
  const [parkingAMPPImage, setParkingAMPPImage] = useState(defaultImage);
  const [parkingAMPPRemark, setParkingAMPPRemark] = useState('');

  const [lastUpdateDate, setLastUpdateDate] = useState('');

  const initData = useSelector(state => state.misc.initDataStoreEdit);

  const [hasCameraUsagePermission, setHasCameraUsagePermission] = useState(false);
  const [hasPhotoLibraryUsagePermission, setHasPhotoLibraryUsagePermission] = useState(false);

  const [isShowModalPermission, setIsShowModalPermission] = useState(false);
  const [isShowModalValidate, setIsShowModalValidate] = useState(false);
  const [validateErrorMessages, setValidateErrorMessages] = useState('');

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

  const handleChangeDeliveryRouteMapRemark = value => {
    setDeliveryRouteMapRemark(value);
  };

  const handleChangeRouteAMPPRemark = value => {
    setRouteAMPPRemark(value);
  };

  const handleChangeParkingAMPPRemark = value => {
    setParkingAMPPRemark(value);
  };

  const handleChangeSpecifyDeliveryTimeFirstHour = value => {
    if (value.length > 2) {
      value = value.substring(0, 2); 
      setSpecifyDeliveryTimeFirstHour(value);
    } else {
      setSpecifyDeliveryTimeFirstHour(value);
    }
  };

  const handleChangeSpecifyDeliveryTimeFirstMinute = value => {
    if (value.length > 2) {
      value = value.substring(0, 2);
      setSpecifyDeliveryTimeFirstMinute(value);
    } else {
      setSpecifyDeliveryTimeFirstMinute(value);
    }
  };

  const handleChangeSpecifyDeliveryTimeFirstSubMinuteOne = value => {
    const parsedQty = Number.parseInt(value);

    if (Number.isNaN(parsedQty)) {
      setSpecifyDeliveryTimeFirstSubMinuteOne('');
    } else if (parsedQty > 60) {
      setSpecifyDeliveryTimeFirstSubMinuteOne('60')
    } else {
      setSpecifyDeliveryTimeFirstSubMinuteOne(parsedQty.toString());
    }
  };

  const handleChangeSpecifyDeliveryTimeFirstSubMinuteTwo = value => {
    const parsedQty = Number.parseInt(value);

    if (Number.isNaN(parsedQty)) {
      setSpecifyDeliveryTimeFirstSubMinuteTwo('');
    } else if (parsedQty > 60) {
      setSpecifyDeliveryTimeFirstSubMinuteTwo('60')
    } else {
      setSpecifyDeliveryTimeFirstSubMinuteTwo(parsedQty.toString());
    }
  };

  const handleChangeSpecifyDeliveryTimeSecondHour = value => {
    if (value.length > 2) {
      value = value.substring(0, 2);
      setSpecifyDeliveryTimeSecondHour(value);
    } else {
      setSpecifyDeliveryTimeSecondHour(value);
    }
  };

  const handleChangeSpecifyDeliveryTimeSecondMinute= value => {
    if (value.length > 2) {
      value = value.substring(0, 2);
      setSpecifyDeliveryTimeSecondMinute(value);
    } else {
      setSpecifyDeliveryTimeSecondMinute(value);
    }
  };

  const handleChangeSpecifyDeliveryTimeSecondSubMinuteOne = value => {
    const parsedQty = Number.parseInt(value);

    if (Number.isNaN(parsedQty)) {
      setSpecifyDeliveryTimeSecondSubMinuteOne('');
    } else if (parsedQty > 60) {
      setSpecifyDeliveryTimeSecondSubMinuteOne('60')
    } else {
      setSpecifyDeliveryTimeSecondSubMinuteOne(parsedQty.toString());
    }
  };

  const handleChangeSpecifyDeliveryTimeSecondSubMinuteTwo = value => {
    const parsedQty = Number.parseInt(value);

    if (Number.isNaN(parsedQty)) {
      setSpecifyDeliveryTimeSecondSubMinuteTwo('');
    } else if (parsedQty > 60) {
      setSpecifyDeliveryTimeSecondSubMinuteTwo('60')
    } else {
      setSpecifyDeliveryTimeSecondSubMinuteTwo(parsedQty.toString());
    }
  };

  const handleCorrectTimeInput = value => {
    let result = '';

    if (value) {
      if (Number.parseInt(value) < 10 && value.length === 1) {
        result = '0' + value.toString();
      } else {
        result = value.toString();
      }
    }
    
    console.log(result);

    return result;
  };

  const handleCorrectHeightWidth = value => {
    if (value === '/') {
      value = '';
    }

    return value;
  }

  const handleAddDeliveryPlaceInput = () => {
    if (subDeliveryManual.length === 0) {
      // do nothing
    } else if (subDeliveryManual.length > 50) {
      setDeliveryManualErrorMessage('納品手順は50文字以内で入力してください');
    } else {
      const TEMP_DELIVERY_PLACE_LIST = deliveryManual;
  
      if (TEMP_DELIVERY_PLACE_LIST.length === 0 || TEMP_DELIVERY_PLACE_LIST.length < 20) {
        TEMP_DELIVERY_PLACE_LIST.push(
          { store_id: store_id, content: subDeliveryManual },
        );

        setSubDeliveryManual('');

        setDeliveryManualErrorMessage('');

        console.log('Delivery place is added.');
      } else {
        setDeliveryManualErrorMessage('納品手順は最大20件を入力してください');

        console.log('Add delivery place is failed.');
      }
  
      setDeliveryManual(TEMP_DELIVERY_PLACE_LIST);
    }
  };

  const handleRemoveDeliveryPlaceInput = index => {
    const TEMP_DELIVERY_PLACE_LIST = deliveryManual;

    TEMP_DELIVERY_PLACE_LIST.splice(index, 1);

    const RESULT = [...TEMP_DELIVERY_PLACE_LIST];

    setDeliveryManual(RESULT);
  };

  const handleTranformDeliveryPlace = array => {
    let result = [];

    if (array) {
      for (let i = 0; i < array.length; i++) {
        result.push(array[i].content);
      };
    }

    return result;
  };

  const goBackStoreInformationScreen = () => {
    dispatch(setLoading(false));

    setWrapperOpacity(1);
    
    dispatch(setInitDataStoreDetail(true));

    props.navigation.navigate('StoreInformation', {
      base_id: base_id,
      store_name: store_name,
      course_id: course_id,
      pass_code: props.route.params.pass_code,
      store_id: store_id,
      course_name: course_name,
    });
  };

  useEffect(() => {
    const backAction = () => {
      dispatch(setLoading(false));

      setWrapperOpacity(1);
      
      dispatch(setInitDataStoreDetail(true));
  
      props.navigation.navigate('StoreInformation', {
        base_id: base_id,
        store_name: store_name,
        course_id: course_id,
        pass_code: props.route.params.pass_code,
        store_id: store_id,
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

  const askForCameraUsagePermission = async () => {
    const isCameraPermissionApproved = await ImagePicker.getCameraPermissionsAsync();

    console.log('isCameraPermissionApproved: ', isCameraPermissionApproved);

    if (isCameraPermissionApproved.granted === false) {
      const cameraUsagePermission = await ImagePicker.requestCameraPermissionsAsync();
  
      if (cameraUsagePermission.status !== 'granted') {
        setHasCameraUsagePermission(false);
      } else {
        setHasCameraUsagePermission(true);
      }
    } else {
      setHasCameraUsagePermission(true);
    }

    console.log('hasCameraUsagePermission: ', hasCameraUsagePermission);
  };

  const askForPhotoLibraryUsagePermission = async () => {
    const isPhotoLibraryPermissionApproved = await ImagePicker.getMediaLibraryPermissionsAsync();

    console.log('isPhotoLibraryPermissionApproved: ', isPhotoLibraryPermissionApproved);

    if (isPhotoLibraryPermissionApproved.granted === false) {
      const photoLibraryUsagePermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (photoLibraryUsagePermission.status !== 'granted') {
        setHasPhotoLibraryUsagePermission(false);
      } else {
        setHasPhotoLibraryUsagePermission(true);
      }
    } else {
      setHasPhotoLibraryUsagePermission(true);
    }

    console.log('hasPhotoLibraryUsagePermission: ', hasPhotoLibraryUsagePermission);
  };

  const pickImageDelivertRouteMap = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.cancelled === true) {
      if (deliveryRouteMapImage === '') {
        setDeliveryRouteMapImage(defaultImage);
      }
    } else {
      const fileInfor = await FileSystem.getInfoAsync(result.uri);

      let fileExtension = result.uri;

      fileExtension = fileExtension.substring(fileExtension.lastIndexOf('.') + 1);
      
      console.log('fileSize: ', fileInfor.size);

      console.log('fileExtension: ', fileExtension);

      if (fileInfor.size > 3141000) {
        setValidateErrorMessages('画像は3MB以内でアップロードしてください');
        setIsShowModalValidate(true);
        setWrapperOpacity(0.5);  
      } else if (fileExtension !== 'jpg' && fileExtension !== 'png') {
        setValidateErrorMessages('アップロードできる画像形式はjpg,pngのみです。画像形式を確認してください');
        setIsShowModalValidate(true);
        setWrapperOpacity(0.5);  
      } else {
        setDeliveryRouteMapImage(result.uri);
      }
    }
  };

  const pickImageRouteAMPP = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.cancelled === true) {
      if (routeAMPPImage === '') {
        setDeliveryRouteMapImage(defaultImage);
      }
    } else {
      const fileInfor = await FileSystem.getInfoAsync(result.uri);

      let fileExtension = result.uri;

      fileExtension = fileExtension.substring(fileExtension.lastIndexOf('.') + 1);
      
      console.log('fileSize: ', fileInfor.size);

      console.log('fileExtension: ', fileExtension);

      if (fileInfor.size > 3141000) {
        setValidateErrorMessages('画像は3MB以内でアップロードしてください');
        setIsShowModalValidate(true);
        setWrapperOpacity(0.5);  
      } else if (fileExtension !== 'jpg' && fileExtension !== 'png') {
        setValidateErrorMessages('アップロードできる画像形式はjpg,pngのみです。画像形式を確認してください');
        setIsShowModalValidate(true);
        setWrapperOpacity(0.5);  
      } else {
        setRouteAMPPImage(result.uri);
      }
    }
  };

  const pickImageParkingAMPP = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.cancelled === true) {
      if (parkingAMPPImage === '') {
        setDeliveryRouteMapImage(defaultImage);
      }
    } else {
      const fileInfor = await FileSystem.getInfoAsync(result.uri);

      let fileExtension = result.uri;

      fileExtension = fileExtension.substring(fileExtension.lastIndexOf('.') + 1);
      
      console.log('fileSize: ', fileInfor.size);

      console.log('fileExtension: ', fileExtension);

      if (fileInfor.size > 3141000) {
        setValidateErrorMessages('画像は3MB以内でアップロードしてください');
        setIsShowModalValidate(true);
        setWrapperOpacity(0.5);  
      } else if (fileExtension !== 'jpg' && fileExtension !== 'png') {
        setValidateErrorMessages('アップロードできる画像形式はjpg,pngのみです。画像形式を確認してください');
        setIsShowModalValidate(true);
        setWrapperOpacity(0.5);  
      } else {
        setParkingAMPPImage(result.uri);
      }
    }
  };

  const handleValidationUpdateInformation = () => {
    let isPassed = false;

    if (deliveryDestinationName.length > 100) {
      setValidateErrorMessages('納品先名(カナ)は100文字以内で入力してください');
      setWrapperOpacity(0.2);
      setIsShowModalValidate(true);
    } else if (deliveryDestinationName.length > 50) {
      setValidateErrorMessages('納品先名は50文字以内で入力してください');
      setWrapperOpacity(0.2);
      setIsShowModalValidate(true);
    } else if (postCode.length > 8) {
      setValidateErrorMessages('郵便番号は半角英数字8文字以内で入力してください');
      setWrapperOpacity(0.2);
      setIsShowModalValidate(true);
    } else if (addressOne.length > 20) {
      setValidateErrorMessages('大住所は20文字以内で入力してください');
      setWrapperOpacity(0.2);
      setIsShowModalValidate(true);
    } else if (addressTwo.length > 50) {
      setValidateErrorMessages('小住所は50文字以内で入力してください');
      setWrapperOpacity(0.2);
      setIsShowModalValidate(true);
    } else if (tel.length > 13) {
      setValidateErrorMessages('Telは半角英数字13文字以内で入力してください');
      setWrapperOpacity(0.2);
      setIsShowModalValidate(true);
    } else if (deliveryFrequency.length > 20) {
      setValidateErrorMessages('納品頻度は20文字以内で入力してください');
      setWrapperOpacity(0.2);
      setIsShowModalValidate(true);
    } else if (parseInt(quantityPerDelivery) > 1000) {
      setValidateErrorMessages('1回当り納品数量は半角英数字で最大1000を入力してください');
      setWrapperOpacity(0.2);
      setIsShowModalValidate(true);
    } else if (parseInt(scheduledTime) > 60) {
      setValidateErrorMessages('納品所要時間は半角英数字で最大60を入力してください');
      setWrapperOpacity(0.2);
      setIsShowModalValidate(true);
    } else if (parseInt(vehicelRegulation) > 999) {
      setValidateErrorMessages('高さ(m)/幅(m) は半角英数字で最大999を入力してください');
      setWrapperOpacity(0.2);
      setIsShowModalValidate(true);
    } else if (parkingPlaceDesignationRemark.length > 30) {
      setValidateErrorMessages('特記事項は30文字以内で入力してください');
      setWrapperOpacity(0.2);
      setIsShowModalValidate(true);
    } else if (deliverySlipRemark.length > 30) {
      setValidateErrorMessages('特記事項は30文字以内で入力してください');
      setWrapperOpacity(0.2);
      setIsShowModalValidate(true);
    } else if (daishaRemark.length > 50) {
      setValidateErrorMessages('特記事項は50文字以内で入力してください');
      setWrapperOpacity(0.2);
      setIsShowModalValidate(true);
    } else if (storagePlace.length > 50) {
      setValidateErrorMessages('置場は50文字以内で入力してください');
      setWrapperOpacity(0.2);
      setIsShowModalValidate(true);
    } else if (storageSpecialNote.length > 50) {
      setValidateErrorMessages('特記事項は50文字以内で入力してください');
      setWrapperOpacity(0.2);
      setIsShowModalValidate(true);
    } else if (emptyDelivery.length > 50) {
      setValidateErrorMessages('空回収は50文字以内で入力してください');
      setWrapperOpacity(0.2);
      setIsShowModalValidate(true);
    } else if (keyUseRemark.length > 50) {
      setValidateErrorMessages('特記事項は50文字以内で入力してください');
      setWrapperOpacity(0.2);
      setIsShowModalValidate(true);
    } else if (cancellationMethod.length > 50) {
      setValidateErrorMessages('解除方法は50文字以内で入力してください');
      setWrapperOpacity(0.2);
      setIsShowModalValidate(true);
    } else if (graceTime.length > 50) {
      setValidateErrorMessages('猶予時間は50文字以内で入力してください');
      setWrapperOpacity(0.2);
      setIsShowModalValidate(true);
    } else if (companyName.length > 50) {
      setValidateErrorMessages('会社名は50文字以内で入力してください');
      setWrapperOpacity(0.2);
      setIsShowModalValidate(true);
    } else if (companyTel.length > 13) {
      setValidateErrorMessages('Telは半角英数字13文字以内で入力してください');
      setWrapperOpacity(0.2);
      setIsShowModalValidate(true);
    } else if (permitLicense.length > 50) {
      setValidateErrorMessages('許可証は50文字以内で入力してください');
      setWrapperOpacity(0.2);
      setIsShowModalValidate(true);
    } else if (receptionEntry.length > 50) {
      setValidateErrorMessages('受付/ 記入は50文字以内で入力してください');
      setWrapperOpacity(0.2);
      setIsShowModalValidate(true);
    } else if (certificationRequireRemark.length > 50) {
      setValidateErrorMessages('照明必要性は50文字以内で入力してください');
      setWrapperOpacity(0.2);
      setIsShowModalValidate(true);
    } else if (elevatorUseRemark.length > 50) {
      setValidateErrorMessages('特記事項は50文字以内で入力してください');
      setWrapperOpacity(0.2);
      setIsShowModalValidate(true);
    } else if (waitingPlaceRemark.length > 50) {
      setValidateErrorMessages('特記事項は50文字以内で入力してください');
      setWrapperOpacity(0.2);
      setIsShowModalValidate(true);
    } else {
      isPassed = true;
      setValidateErrorMessages('');
    }

    console.log('isPassed', isPassed);

    return isPassed;
  };

  const handleUpdateStoreInformation = async () => {
    const SITE = Config.URL_DOMAIN_CLOUD;

    const PARAMS = {
      // _method: 'PUT',
    };

    // const URL = `${urlAPI.apiUpdateStoreInformation}/${store_id}?${object2Path(PARAMS)}`;

    const URL = `${urlAPI.apiUpdateStoreInformation}/${store_id}`;

    console.log(URL);

    let formData = new FormData();

    formData.append('delivery_frequency', deliveryFrequency);
    formData.append('quantity_delivery', quantityPerDelivery);
    formData.append('scheduled_time_first', scheduledTime);

    formData.append('first_sd_time', `${handleCorrectTimeInput(specifyDeliveryTimeFirstHour)}:${handleCorrectTimeInput(specifyDeliveryTimeFirstMinute)}`);
    formData.append('first_sd_sub_min_one', specifyDeliveryTimeFirstSubMinuteOne);
    formData.append('first_sd_sub_min_second', specifyDeliveryTimeFirstSubMinuteTwo);

    formData.append('second_sd_time', `${handleCorrectTimeInput(specifyDeliveryTimeSecondHour)}:${handleCorrectTimeInput(specifyDeliveryTimeSecondMinute)}`);
    formData.append('second_sub_min_one', specifyDeliveryTimeSecondSubMinuteOne);
    formData.append('second_sub_min_second', specifyDeliveryTimeSecondSubMinuteTwo);

    if (vehicelRegulation !== null) {
      formData.append('vehicle_height_width', vehicelRegulation - 1);
    }

    formData.append('height', Number.parseInt(height) || null);
    formData.append('width', Number.parseInt(width) || null);

    if (parkingPlaceDesignation !== null) {
      formData.append('parking_place', parkingPlaceDesignation - 1);
    }

    formData.append('note_1', parkingPlaceDesignationRemark);

    if (deliverySlip !== null) {
      formData.append('delivery_slip', deliverySlip - 1);
    }

    formData.append('note_2', deliverySlipRemark);

    if (daisha !== null) {
      formData.append('daisha', daisha);
    }

    formData.append('note_3', daishaRemark);
    formData.append('place', storagePlace);
    formData.append('note_4', storageSpecialNote);
    formData.append('empty_recovery', emptyDelivery);

    if (keyUse !== null) {
      formData.append('key', keyUse - 1);
    }

    formData.append('note_5', keyUseRemark);

    if (securityUse !== null) {
      formData.append('security', securityUse - 1);
    }

    formData.append('cancel_method', cancellationMethod);
    formData.append('grace_time', graceTime);
    formData.append('company_name', companyName);
    formData.append('tel_number_2', companyTel);

    if (facilityRule !== null) {
      formData.append('inside_rule', facilityRule - 1);
    }

    formData.append('license', permitLicense);
    formData.append('reception_or_entry', receptionEntry);

    if (certificationRequire !== null) {
      formData.append('cerft_required', certificationRequire - 1);
    }

    formData.append('note_6', certificationRequireRemark);

    if (elevatorUse !== null) {
      formData.append('elevator', elevatorUse - 1);
    }

    formData.append('note_7', elevatorUseRemark);

    if (waitingPlace !== null) {
      formData.append('waiting_place', waitingPlace - 1);
    }

    formData.append('note_8', waitingPlaceRemark);

    const TEMP_DELIVERY_MANUAL = [...handleTranformDeliveryPlace(deliveryManual)];

    if (TEMP_DELIVERY_MANUAL) {
      for (let i = 0; i < TEMP_DELIVERY_MANUAL.length; i++) {
        formData.append('delivery_manual[]', TEMP_DELIVERY_MANUAL[i]);
      };
    }

    if (deliveryRouteMapImage && deliveryRouteMapImage !== defaultImage) {
      formData.append('delivery_route_map_path', {
        uri: deliveryRouteMapImage,
        type: 'image/jpg',
        name: 'delivery_route_map_path',
      });
    }

    console.log(deliveryRouteMapImage === defaultImage);

    formData.append('delivery_route_map_other_remark', deliveryRouteMapRemark);

    if (routeAMPPImage && routeAMPPImage !== defaultImage) {
      formData.append('parking_position_1_file_path', {
        uri: routeAMPPImage,
        type: 'image/jpg',
        name: 'parking_position_1_file_path',
      });
    }

    formData.append('parking_position_1_other_remark', routeAMPPRemark);

    if (parkingAMPPImage && parkingAMPPImage !== defaultImage) {
      formData.append('parking_position_2_file_path', {
        uri: parkingAMPPImage,
        type: 'image/jpg',
        name: 'parking_position_2_file_path',
      });
    }

    formData.append('parking_position_2_other_remark', parkingAMPPRemark);

    formData.append('last_updated_at', new Date().toISOString());

    if (pass_code) {
      formData.append('pass_code', Number.parseInt(pass_code));
    }

    console.log('<<<<<======================>>>>>');
    console.log(JSON.stringify(formData));
    console.log('<<<<<======================>>>>>');

    if (handleValidationUpdateInformation()) {
      try {
        dispatch(setLoading(true));

        const response = await postUpdate(SITE, URL, formData, PARAMS);

        console.log('response', response);

        if (response.data) {
          dispatch(setInitDataStoreDetail(true));

          props.navigation.navigate('StoreInformation', {
            base_id: base_id,
            store_name: store_name,
            store_id: store_id,
            pass_code: pass_code,
            course_id: course_id,
            course_name: course_name,
          });
        }

        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));

        console.log(error.response.data);

        setValidateErrorMessages(error.response.data.message);

        setIsShowModalValidate(true);
      }
    } else {
      console.log('[Error] - Validation has failed');
    }
  };

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
        dispatch(setInitDataStoreEdit(false));

        const URL = `${urlAPI.apiGetDetailStore}/${props.route.params.store_id}`;

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

        console.log('RESPONSE_DATA', RESPONSE_DATA);

        if (response.data) { 
          setBusinessClassification(RESPONSE_DATA.bussiness_classification || '');
          setDeliveryDestinationCode(RESPONSE_DATA.delivery_destination_code || '');
          setDeliveryDestinationNameKana(RESPONSE_DATA.destination_name_kana || '');
          setDeliveryDestinationName(RESPONSE_DATA.destination_name || '');
          setPostCode(RESPONSE_DATA.post_code || '');
          setAddressOne(RESPONSE_DATA.address_1 || '');
          setAddressTwo(RESPONSE_DATA.address_2 || '');
          setTel(RESPONSE_DATA.tel_number || '');

          setDeliveryFrequency(RESPONSE_DATA.delivery_frequency || '');
          setQuantityPerDelivery(RESPONSE_DATA.quantity_delivery || '');
          
          setScheduledTime(RESPONSE_DATA.scheduled_time_first || '');

          setSpecifyDeliveryTimeFirstHour(RESPONSE_DATA.first_sd_time ? RESPONSE_DATA.first_sd_time.split(':')[0] : '');
          setSpecifyDeliveryTimeFirstMinute(RESPONSE_DATA.first_sd_time ? RESPONSE_DATA.first_sd_time.split(':')[1] : '');
          setSpecifyDeliveryTimeFirstSubMinuteOne(RESPONSE_DATA.first_sd_sub_min_one ? RESPONSE_DATA.first_sd_sub_min_one : '');
          setSpecifyDeliveryTimeFirstSubMinuteTwo(RESPONSE_DATA.first_sd_sub_min_second ? RESPONSE_DATA.first_sd_sub_min_second : '');

          setSpecifyDeliveryTimeSecondHour(RESPONSE_DATA.second_sd_time ? RESPONSE_DATA.second_sd_time.split(':')[0] : '');
          setSpecifyDeliveryTimeSecondMinute(RESPONSE_DATA.second_sd_time ? RESPONSE_DATA.second_sd_time.split(':')[1] : '');
          setSpecifyDeliveryTimeSecondSubMinuteOne(RESPONSE_DATA.second_sub_min_one ? RESPONSE_DATA.second_sub_min_one : '');
          setSpecifyDeliveryTimeSecondSubMinuteTwo(RESPONSE_DATA.second_sub_min_second ? RESPONSE_DATA.second_sub_min_second : '');

          setVehicleRegulation(RESPONSE_DATA.vehicle_height_width === null ? null : RESPONSE_DATA.vehicle_height_width + 1);
          setHeight(RESPONSE_DATA.height_width ? RESPONSE_DATA.height_width.split('/')[0] : '');
          setWidth(RESPONSE_DATA.height_width ? RESPONSE_DATA.height_width.split('/')[1] : '');
          setParkingPlaceDesignation(RESPONSE_DATA.parking_place === null ? null : RESPONSE_DATA.parking_place + 1);
          setParkingPlaceDesignationRemark(RESPONSE_DATA.note_1 || '');
          setDeliverySlip(RESPONSE_DATA.delivery_slip === null ? null : RESPONSE_DATA.delivery_slip + 1);
          setDeliverySlipRemark(RESPONSE_DATA.note_2 || '');
          setDaishsa(RESPONSE_DATA.daisha === null ? null : RESPONSE_DATA.daisha);
          setDaishaRemark(RESPONSE_DATA.note_3 || '');
          setStoragePlace(RESPONSE_DATA.place || '');
          setStorageSpecialNote(RESPONSE_DATA.note_4 || '');
          setEmptyDelivery(RESPONSE_DATA.empty_recovery || '');
          setKeyUse(RESPONSE_DATA.key === null ? null : RESPONSE_DATA.key + 1);
          setKeyUseRemark(RESPONSE_DATA.note_5 || '');
          setSecurityUse(RESPONSE_DATA.security === null ? null : RESPONSE_DATA.security + 1);
          setCancellationMethod(RESPONSE_DATA.cancel_method || '');
          setGraceTime(RESPONSE_DATA.grace_time || '');
          setCompanyName(RESPONSE_DATA.company_name || '');
          setCompanyTel(RESPONSE_DATA.tel_number_2 || '');
          setFacilityRule(RESPONSE_DATA.inside_rule === null ? null : parseInt(RESPONSE_DATA.inside_rule) + 1);
          setPermitLicense(RESPONSE_DATA.license || '');
          setReceptionEntry(RESPONSE_DATA.reception_or_entry || '');
          setCertificationRequire(RESPONSE_DATA.cerft_required === null ? null : RESPONSE_DATA.cerft_required + 1);
          setCertificationRequireRemark(RESPONSE_DATA.note_6 || '');
          setElevatorUse(RESPONSE_DATA.elevator === null ? null : RESPONSE_DATA.elevator + 1);
          setElevatorUseRemark(RESPONSE_DATA.note_7 || '');
          setWaitingPlace(RESPONSE_DATA.waiting_place === null ? null : RESPONSE_DATA.waiting_place + 1);
          setWaitingPlaceRemark(RESPONSE_DATA.note_8 || '');

          setLastUpdateDate(RESPONSE_DATA.last_updated_at ? RESPONSE_DATA.last_updated_at.split('T')[0] : '');

          setDeliveryManual(RESPONSE_DATA.delivery_manual || '');

          setDeliveryRouteMapImage(handleGetImageURL(RESPONSE_DATA.delivery_route_map_path));
          setDeliveryRouteMapRemark(RESPONSE_DATA.delivery_route_map_other_remark || '');
          setRouteAMPPImage(handleGetImageURL(RESPONSE_DATA.parking_position_1_file_path));
          setRouteAMPPRemark(RESPONSE_DATA.parking_position_1_other_remark || '');
          setParkingAMPPImage(handleGetImageURL(RESPONSE_DATA.parking_position_2_file_path));
          setParkingAMPPRemark(RESPONSE_DATA.parking_position_2_other_remark || '');
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
      }

      return URL;
    };

    askForCameraUsagePermission();

    askForPhotoLibraryUsagePermission(); 
    
    if (initData) {
      handleGetDetailStore();
    }
  });

  return (
    <KeyboardAvoidingView
      style={storeInformationEditStyleSheet.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Navbar />

      <View style={[{ opacity: wrapperOpacity }, storeInformationEditStyleSheet.wrapper]}>
        <View style={storeInformationEditStyleSheet.header}>
          <View style={storeInformationEditStyleSheet.headerIcon}>
            <Pressable
              testID="backButton"
              accessibilityLabel='_BackButton'
              onPress={() => {
                goBackStoreInformationScreen();
              }}>
              <Icon
                testID="backButtonIcon"
                accessibilityLabel='_BackButtonIcon'
                style={storeInformationEditStyleSheet.iconBack}
                name="angle-double-left"
                size={30}
                color="#1534A1"
              />
            </Pressable>
          </View>

          <View style={storeInformationEditStyleSheet.headerText}>
            <Text style={storeInformationEditStyleSheet.titleScreen}>
              店舗カルテ
            </Text>
          </View>
        </View>

        <View style={storeInformationEditStyleSheet.listHeader}>
          <Text style={storeInformationEditStyleSheet.listHeaderText}>
            {`${course_name}コース  -  ${store_name}店`}
          </Text>
        </View>

        <ScrollView ref={scrollViewRef}>
          <View style={storeInformationEditStyleSheet.basicInformation}>
            <Pressable
              testID='basicInformationDropdownButton'
              accessibilityLabel='_BasicInformationDropdownButton'
              onPress={() => {setShowBasicInformation(!showBasicInformation)}}
            >
              <View style={storeInformationEditStyleSheet.rowHeader}>
                <View style={{ flex: 1 }}>
                  <AntDesign
                    testID="caretDownButton1"
                    accessibilityLabel='_CaretDownButton1'
                    style={storeInformationEditStyleSheet.iconDown}
                    name={showBasicInformation === true ? 'caretdown' : 'caretright'}
                  />
                </View>

                <View style={{ flex: 10 }}>
                  <Text style={storeInformationEditStyleSheet.rowHeaderText}>基本情報</Text>
                </View>
              </View>
            </Pressable>

            {showBasicInformation === true && (
              <View style={storeInformationEditStyleSheet.basicInformationTable}>
                <View style={storeInformationEditStyleSheet.businessClassification}>
                  <View style={storeInformationEditStyleSheet.headerCol}>
                    <Text style={{ fontSize: 12, top: 12 }}>事業分類</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={false}
                      accessibilityLabel={'_BusinessClassificationFirstInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={businessClassification}
                      onChangeText={value => {
                        handleChangeBusinessClassification(value);
                      }}
                      autoFocus={false}
                      style={[
                        storeInformationEditStyleSheet.businessClassificationFirstInput,
                      ]}
                      placeholder={''}
                      placeholderTextColor={'#818181'}
                    />
                  </View>
                </View>

                <View style={storeInformationEditStyleSheet.deliveryDestinationCode}>
                  <View style={storeInformationEditStyleSheet.headerCol}>
                    <Text style={{ fontSize: 12, top: 12 }}>納品先コード</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={false}
                      accessibilityLabel={'_DeliveryDestinationCodeInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={deliveryDestinationCode !== null ? deliveryDestinationCode.toString() : ''}
                      onChangeText={value => {
                        handleChangeDeliveryDestinationCode(value);
                      }}
                      autoFocus={false}
                      style={[
                        storeInformationEditStyleSheet.deliveryDestinationCodeInput,
                      ]}
                      placeholder={''}
                      placeholderTextColor={'#818181'}
                    />
                  </View>
                </View>

                <View style={storeInformationEditStyleSheet.deliveryDestinationNameKana}>
                  <View style={storeInformationEditStyleSheet.headerCol}>
                    <Text style={{ fontSize: 12, top: 12 }}>納品先名 (カナ)</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={false}
                      accessibilityLabel={'_DeliveryDestinationNameKanaInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={deliveryDestinationNameKana}
                      onChangeText={value => {
                        handleChangeDeliveryDestinationNameKana(value);
                      }}
                      autoFocus={false}
                      style={[
                        storeInformationEditStyleSheet.deliveryDestinationNameKanaInput,
                      ]}
                      placeholder={''}
                      placeholderTextColor={'#818181'}
                    />
                  </View>
                </View>

                <View style={storeInformationEditStyleSheet.deliveryDestinationName}>
                  <View style={storeInformationEditStyleSheet.headerCol}>
                    <Text style={{ fontSize: 12, top: 12 }}>納品先名</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={false}
                      accessibilityLabel={'_DeliveryDestinationNameInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={deliveryDestinationName}
                      onChangeText={value => {
                        handleChangeDeliveryDestinationName(value);
                      }}
                      autoFocus={false}
                      style={[
                        storeInformationEditStyleSheet.deliveryDestinationNameInput,
                      ]}
                      placeholder={''}
                      placeholderTextColor={'#818181'}
                    />
                  </View>
                </View>

                <View style={storeInformationEditStyleSheet.postCode}>
                  <View style={storeInformationEditStyleSheet.headerCol}>
                    <Text style={{ fontSize: 12, top: 12 }}>郵便番号</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={false}
                      accessibilityLabel={'_PostCodeInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={postCode}
                      onChangeText={value => {
                        handleChangePostCode(value);
                      }}
                      autoFocus={false}
                      style={[storeInformationEditStyleSheet.postCodeInput]}
                      placeholder={''}
                      placeholderTextColor={'#818181'}
                    />
                  </View>
                </View>

                <View style={storeInformationEditStyleSheet.postCode}>
                  <View style={storeInformationEditStyleSheet.headerCol}>
                    <Text style={{ fontSize: 12, top: 12 }}>大住所</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={false}
                      accessibilityLabel={'_LargeAddressInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={addressOne}
                      onChangeText={value => {
                        handleChangeLargeAddress(value);
                      }}
                      autoFocus={false}
                      style={[
                        storeInformationEditStyleSheet.largeAddressInput,
                      ]}
                      placeholder={''}
                      placeholderTextColor={'#818181'}
                    />
                  </View>
                </View>

                <View style={storeInformationEditStyleSheet.smallAddress}>
                  <View style={storeInformationEditStyleSheet.headerCol}>
                    <Text style={{ fontSize: 12, top: 12 }}>小住所</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={false}
                      accessibilityLabel={'_SmallAddressInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={addressTwo}
                      onChangeText={value => {
                        handleChangeSmallAddress(value);
                      }}
                      autoFocus={false}
                      style={[
                        storeInformationEditStyleSheet.smallAddressInput,
                      ]}
                      placeholder={''}
                      placeholderTextColor={'#818181'}
                    />
                  </View>
                </View>

                <View style={storeInformationEditStyleSheet.tel}>
                  <View style={storeInformationEditStyleSheet.headerCol}>
                    <Text style={{ fontSize: 12, top: 12 }}>TEL</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={false}
                      accessibilityLabel={'_TelInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={tel}
                      onChangeText={value => {
                        handleChangeTelInput(value);
                      }}
                      autoFocus={false}
                      style={[storeInformationEditStyleSheet.telInput]}
                      placeholder={''}
                      placeholderTextColor={'#818181'}
                    />
                  </View>
                </View>
              </View>
            )}
          </View>

          <View style={storeInformationEditStyleSheet.deliveryInformation}>
            <Pressable
              testID='deliveryInformationDropDownButton'
              accessibilityLabel='_DeliveryInformationDropDownButton'
              onPress={() => {
                setShowDeliveryInformation(!showDeliveryInformation);
              }}
            >
              <View style={storeInformationEditStyleSheet.rowHeader}>
                <View style={{ flex: 1 }}>
                  <AntDesign
                    testID="caretDownButton2"
                    accessibilityLabel="_CaretDownButton2"
                    style={storeInformationEditStyleSheet.iconDown}
                    name={
                      showDeliveryInformation === true
                        ? 'caretdown'
                        : 'caretright'
                    }
                  />
                </View>

                <View style={{ flex: 10 }}>
                  <Text
                    style={storeInformationEditStyleSheet.rowHeaderText}>
                    納品情報
                  </Text>
                </View>
              </View>
            </Pressable>

            {showDeliveryInformation === true && (
              <View style={storeInformationEditStyleSheet.deliveryInformationTable}>
                <View style={storeInformationEditStyleSheet.deliveryFrequency}>
                  <View style={storeInformationEditStyleSheet.headerCol}>
                    <Text style={{ fontSize: 12, top: 12 }}>納品頻度</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={true}
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
                        storeInformationEditStyleSheet.deliveryFrequencyInput,
                      ]}
                      placeholder={''}
                      placeholderTextColor={'#818181'}
                    />
                  </View>
                </View>

                <View style={storeInformationEditStyleSheet.quantityPerDelivery}>
                  <View style={storeInformationEditStyleSheet.headerCol}>
                    <Text style={{ fontSize: 12, top: 12 }}>1回当り納品数量</Text>
                  </View>

                  <View style={{ flex: 3, flexDirection: 'row' }}>
                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', borderLeftWidth: 1, borderLeftColor: '#C4C4C4' }}>
                        <Text style={{ fontSize: 14 }}>約</Text>
                    </View>

                    <View style={{ flex: 10 }}>
                      <TextInput
                        accessibilityLabel={'_QuantityPerDeliveryInput'}
                        keyboardType={'numeric'}
                        returnKeyType={'done'}
                        value={quantityPerDelivery !== null ? quantityPerDelivery.toString() : ''}
                        onChangeText={value => {
                          handleChangeQuantityPerDelivery(value);
                        }}
                        autoFocus={false}
                        style={[storeInformationEditStyleSheet.quantityPerDeliveryInput]}
                        placeholder={''}
                        placeholderTextColor={'#818181'}
                      />
                    </View>

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 14 }}>枚</Text>
                    </View>
                  </View>
                </View>
                
                <View style={storeInformationEditStyleSheet.scheduledTime}>
                  <View style={storeInformationEditStyleSheet.headerCol}>
                  <Text style={{ fontSize: 12, top: 12 }}>納品所要時間</Text>
                  </View>

                  <View style={{ flex: 3, flexDirection: 'row' }}>
                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', borderLeftWidth: 1, borderLeftColor: '#C4C4C4' }}>
                        <Text style={{ fontSize: 14 }}>約</Text>
                    </View>

                    <View style={{ flex: 10 }}>
                      <TextInput
                        accessibilityLabel={'_ScheduledTimeInput'}
                        keyboardType={'numeric'}
                        returnKeyType={'done'}
                        value={scheduledTime !== null ? scheduledTime.toString() : ''}
                        onChangeText={value => {
                          handleChangeScheduledTime(value);
                        }}
                        autoFocus={false}
                        style={[storeInformationEditStyleSheet.scheduledTimeInput]}
                        placeholder={''}
                        placeholderTextColor={'#818181'}
                      />
                    </View>

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 14 }}>分</Text>
                    </View>
                  </View>
                </View>

                <View style={storeInformationEditStyleSheet.specifyDeliveryTime}>
                  <View style={[storeInformationEditStyleSheet.headerCol, storeInformationEditStyleSheet.mainHeader]}>
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
                            accessibilityLabel={'_SpecifyDeliveryTimeFirstHourInput'}
                            keyboardType={'numeric'}
                            returnKeyType={'done'}
                            value={specifyDeliveryTimeFirstHour !== null ? specifyDeliveryTimeFirstHour.toString() : ''}
                            onChangeText={value => {
                              handleChangeSpecifyDeliveryTimeFirstHour(value);
                            }}
                            autoFocus={false}
                            style={[
                              storeInformationEditStyleSheet.specifyDeliveryTimeFirstInput,
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
                            accessibilityLabel={'_SpecifyDeliveryTimeFirstMinuteInput'}
                            keyboardType={'numeric'}
                            returnKeyType={'done'}
                            value={specifyDeliveryTimeFirstMinute !== null ? specifyDeliveryTimeFirstMinute.toString() : ''}
                            onChangeText={value => {
                              handleChangeSpecifyDeliveryTimeFirstMinute(value);
                            }}
                            autoFocus={false}
                            style={[
                              storeInformationEditStyleSheet.specifyDeliveryTimeFirstInput,
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
                            accessibilityLabel={'_SpecifyDeliveryTimeFirstSubMinuteOne'}
                            keyboardType={'numeric'}
                            returnKeyType={'done'}
                            value={specifyDeliveryTimeFirstSubMinuteOne !== null ? specifyDeliveryTimeFirstSubMinuteOne.toString() : ''}
                            onChangeText={value => {
                              handleChangeSpecifyDeliveryTimeFirstSubMinuteOne(value);
                            }}
                            autoFocus={false}
                            style={[
                              storeInformationEditStyleSheet.casualInput,
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
                            accessibilityLabel={'_SpecifyDeliveryTimeThirdInput'}
                            keyboardType={'numeric'}
                            returnKeyType={'done'}
                            value={specifyDeliveryTimeFirstSubMinuteTwo !== null ? specifyDeliveryTimeFirstSubMinuteTwo.toString() : ''}
                            onChangeText={value => {
                              handleChangeSpecifyDeliveryTimeFirstSubMinuteTwo(value);
                            }}
                            autoFocus={false}
                            style={[
                              storeInformationEditStyleSheet.casualInput,
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
                            accessibilityLabel={'_SpecifyDeliveryTimeSecondHourInput'}
                            keyboardType={'numeric'}
                            returnKeyType={'done'}
                            value={specifyDeliveryTimeSecondHour !== null ? specifyDeliveryTimeSecondHour.toString() : ''}
                            onChangeText={value => {
                              handleChangeSpecifyDeliveryTimeSecondHour(value);
                            }}
                            autoFocus={false}
                            style={[
                              storeInformationEditStyleSheet.specifyDeliveryTimeFirstInput,
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
                            accessibilityLabel={'_SpecifyDeliveryTimeSecondMinuteInput'}
                            keyboardType={'numeric'}
                            returnKeyType={'done'}
                            value={specifyDeliveryTimeSecondMinute !== null ? specifyDeliveryTimeSecondMinute.toString() : ''}
                            onChangeText={value => {
                              handleChangeSpecifyDeliveryTimeSecondMinute(value);
                            }}
                            autoFocus={false}
                            style={[
                              storeInformationEditStyleSheet.specifyDeliveryTimeFirstInput,
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
                            accessibilityLabel={'_SpecifyDeliveryTimeSecondSubMinuteOne'}
                            keyboardType={'numeric'}
                            returnKeyType={'done'}
                            value={specifyDeliveryTimeSecondSubMinuteOne !== null ? specifyDeliveryTimeSecondSubMinuteOne.toString() : ''}
                            onChangeText={value => {
                              handleChangeSpecifyDeliveryTimeSecondSubMinuteOne(value);
                            }}
                            autoFocus={false}
                            style={[storeInformationEditStyleSheet.casualInput]}
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
                            accessibilityLabel={'_SpecifyDeliveryTimeSecondSubMinuteTwo'}
                            keyboardType={'numeric'}
                            returnKeyType={'done'}
                            value={specifyDeliveryTimeSecondSubMinuteTwo !== null ? specifyDeliveryTimeSecondSubMinuteTwo.toString() : ''}
                            onChangeText={value => {
                              handleChangeSpecifyDeliveryTimeSecondSubMinuteTwo(value);
                            }}
                            autoFocus={false}
                            style={[storeInformationEditStyleSheet.casualInput]}
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
                
                <View style={storeInformationEditStyleSheet.vehicleHeightWidth}>
                  <View style={[storeInformationEditStyleSheet.headerCol, storeInformationEditStyleSheet.mainHeader]}>
                    <Text style={{ fontSize: 10, top: 12 }}>車車両高・幅の規制</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <SelectDropdown
                      data={generalDropdownFields}
                      onSelect={(selectedItem, selectedItemIndex) => {
                        handleChangeVehicleRegulation(selectedItem.value);
                      }}
                      buttonTextAfterSelection={item => {
                        return item.text;
                      }}
                      rowTextForSelection={item => {
                        return item.text;
                      }}
                      renderDropdownIcon={isOpened => {
                        return (
                          <Entypo
                            testID="selectDropdownIcon"
                            name={isOpened ? 'select-arrows' : 'select-arrows'}
                            color="#444444"
                            size={18}
                          />
                        );
                      }}
                      renderCustomizedButtonChild={(selectedItem, index) => {
                        return (
                          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Text style={vehicelRegulation === null ? { opacity: 0.5 } : { opacity: 1 }}>
                              {selectedItem ? selectedItem.text : generalDropdownFields[0].text}
                            </Text>
                          </View>
                        );
                      }}
                      defaultValueByIndex={vehicelRegulation ? (generalDropdownFields[vehicelRegulation].value) : generalDropdownFields[0].value}
                      dropdownIconPosition="right"
                      defaultButtonText={'選んでください'}
                      buttonStyle={storeInformationEditStyleSheet.dropdownButtonSpecial}
                      buttonTextStyle={storeInformationEditStyleSheet.dropdownButtonText}
                      dropdownStyle={storeInformationEditStyleSheet.dropdownContent}
                      rowStyle={storeInformationEditStyleSheet.dropdownRow}
                      rowTextStyle={storeInformationEditStyleSheet.dropdownRowText}
                    />
                  </View>
                </View>
                
                <View style={storeInformationEditStyleSheet.heightWidth}>
                  <View style={[storeInformationEditStyleSheet.headerCol, storeInformationEditStyleSheet.mainHeader]}>
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
                            editable={true}
                            selectTextOnFocus={false}
                            accessibilityLabel={'_HeightInput'}
                            keyboardType={'numeric'}
                            returnKeyType={'done'}
                            value={height}
                            onChangeText={value => {
                              handleChangeHeight(value);
                            }}
                            autoFocus={false}
                            style={[storeInformationEditStyleSheet.heightInput]}
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
                            editable={true}
                            selectTextOnFocus={false}
                            accessibilityLabel={'_WidthInput'}
                            keyboardType={'numeric'}
                            returnKeyType={'done'}
                            value={width}
                            onChangeText={value => {
                              handleChangeWidth(value);
                            }}
                            autoFocus={false}
                            style={[storeInformationEditStyleSheet.widthInput]}
                          />
                        </View>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ fontSize: 14, paddingTop: 20 }}>m</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={storeInformationEditStyleSheet.parkingPlaceDesignation}>
                  <View style={[storeInformationEditStyleSheet.headerCol, storeInformationEditStyleSheet.mainHeader]}>
                    <Text style={{ fontSize: 12, top: 12 }}>駐車場所指定</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <SelectDropdown
                      data={generalDropdownFields}
                      onSelect={(selectedItem, selectedItemIndex) => {
                        handleChangeParkingPlaceDesignation(selectedItem.value);
                      }}
                      buttonTextAfterSelection={item => {
                        return item.text;
                      }}
                      rowTextForSelection={item => {
                        return item.text;
                      }}
                      renderDropdownIcon={isOpened => {
                        return (
                          <Entypo
                            testID="selectDropdownIcon"
                            name={isOpened ? 'select-arrows' : 'select-arrows'}
                            color="#444444"
                            size={18}
                          />
                        );
                      }}
                      renderCustomizedButtonChild={(selectedItem, index) => {
                        return (
                          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Text style={parkingPlaceDesignation === null ? { opacity: 0.5 } : { opacity: 1 }}>
                              {selectedItem ? selectedItem.text : generalDropdownFields[0].text}
                            </Text>
                          </View>
                        );
                      }}
                      defaultValueByIndex={parkingPlaceDesignation ? (generalDropdownFields[parkingPlaceDesignation].value) : generalDropdownFields[0].value}
                      dropdownIconPosition="right"
                      defaultButtonText={'選んでください'}
                      buttonStyle={storeInformationEditStyleSheet.dropdownButton}
                      buttonTextStyle={storeInformationEditStyleSheet.dropdownButtonText}
                      dropdownStyle={storeInformationEditStyleSheet.dropdownContent}
                      rowStyle={storeInformationEditStyleSheet.dropdownRow}
                      rowTextStyle={storeInformationEditStyleSheet.dropdownRowText}
                    />
                  </View>
                </View>

                <View style={storeInformationEditStyleSheet.parkingPlaceDesignation}>
                  <View style={[storeInformationEditStyleSheet.headerCol, storeInformationEditStyleSheet.mainHeader]}>
                    <Text style={{ fontSize: 12, top: 12 }}>特記事項</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={true}
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
                        storeInformationEditStyleSheet.parkingPlaceDesignationRemarkInput,
                      ]}
                    />
                  </View>
                </View>

                <View style={storeInformationEditStyleSheet.parkingPlaceDesignation}>
                  <View style={[storeInformationEditStyleSheet.headerCol, storeInformationEditStyleSheet.mainHeader]}>
                    <Text style={{ fontSize: 12, top: 12 }}>納品伝票</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <SelectDropdown
                      data={generalDropdownFields}
                      onSelect={(selectedItem, selectedItemIndex) => {
                        handleChangeDeliverySlip(selectedItem.value);
                      }}
                      buttonTextAfterSelection={item => {
                        return item.text;
                      }}
                      rowTextForSelection={item => {
                        return item.text;
                      }}
                      renderDropdownIcon={isOpened => {
                        return (
                          <Entypo
                            testID="selectDropdownIcon"
                            name={isOpened ? 'select-arrows' : 'select-arrows'}
                            color="#444444"
                            size={18}
                          />
                        );
                      }}
                      renderCustomizedButtonChild={(selectedItem, index) => {
                        return (
                          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Text style={deliverySlip === null ? { opacity: 0.5 } : { opacity: 1 }}>
                              {selectedItem ? selectedItem.text : generalDropdownFields[0].text}
                            </Text>
                          </View>
                        );
                      }}
                      defaultValueByIndex={deliverySlip ? (generalDropdownFields[deliverySlip].value) : generalDropdownFields[0].value}
                      dropdownIconPosition="right"
                      defaultButtonText={'選んでください'}
                      buttonStyle={storeInformationEditStyleSheet.dropdownButton}
                      buttonTextStyle={storeInformationEditStyleSheet.dropdownButtonText}
                      dropdownStyle={storeInformationEditStyleSheet.dropdownContent}
                      rowStyle={storeInformationEditStyleSheet.dropdownRow}
                      rowTextStyle={storeInformationEditStyleSheet.dropdownRowText}
                    />
                  </View>
                </View>

                <View style={storeInformationEditStyleSheet.parkingPlaceDesignation}>
                  <View style={[storeInformationEditStyleSheet.headerCol, storeInformationEditStyleSheet.mainHeader]}>
                    <Text style={{ fontSize: 12, top: 12 }}>特記事項</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={true}
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
                        storeInformationEditStyleSheet.deliverySlipRemarkInput,
                      ]}
                    />
                  </View>
                </View>

                <View style={storeInformationEditStyleSheet.trollyUse}>
                  <View style={[storeInformationEditStyleSheet.headerCol, storeInformationEditStyleSheet.mainHeader]}>
                    <Text style={{ fontSize: 12, top: 12 }}>台車使用</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <SelectDropdown
                      data={daishaDropdownFields}
                      onSelect={(selectedItem, selectedItemIndex) => {
                        handleChangeTrolleyUse(selectedItem.value);
                      }}
                      buttonTextAfterSelection={item => {
                        return item.text;
                      }}
                      rowTextForSelection={item => {
                        return item.text;
                      }}
                      renderDropdownIcon={isOpened => {
                        return (
                          <Entypo
                            testID="selectDropdownIcon"
                            name={isOpened ? 'select-arrows' : 'select-arrows'}
                            color="#444444"
                            size={18}
                          />
                        );
                      }}
                      renderCustomizedButtonChild={(selectedItem, index) => {
                        return (
                          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Text style={daisha === null ? { opacity: 0.5 } : { opacity: 1 }}>
                              {selectedItem ? selectedItem.text : daishaDropdownFields[0].text}
                            </Text>
                          </View>
                        );
                      }}
                      defaultValueByIndex={daisha ? (daishaDropdownFields[daisha].value) : daishaDropdownFields[0].value}
                      dropdownIconPosition="right"
                      defaultButtonText={'選んでください'}
                      buttonStyle={storeInformationEditStyleSheet.dropdownButton}
                      buttonTextStyle={storeInformationEditStyleSheet.dropdownButtonText}
                      dropdownStyle={storeInformationEditStyleSheet.dropdownContent}
                      rowStyle={storeInformationEditStyleSheet.dropdownRow}
                      rowTextStyle={storeInformationEditStyleSheet.dropdownRowText}
                    />
                  </View>
                </View>

                <View style={storeInformationEditStyleSheet.trollyUse}>
                  <View style={[storeInformationEditStyleSheet.headerCol, storeInformationEditStyleSheet.mainHeader]}>
                    <Text style={{ fontSize: 12, top: 12 }}>特記事項</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={true}
                      selectTextOnFocus={false}
                      accessibilityLabel={'_TrolleyUseRemarkInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={daishaRemark}
                      onChangeText={value => {
                        handleChangeTrolleyUseRemark(value);
                      }}
                      autoFocus={false}
                      style={[storeInformationEditStyleSheet.trolleyUseRemarkInput]}
                    />
                  </View>
                </View>

                <View style={storeInformationEditStyleSheet.storagePlace}>
                  <View style={[storeInformationEditStyleSheet.headerCol, storeInformationEditStyleSheet.mainHeader]}>
                    <Text style={{ fontSize: 12, top: 12 }}>置場</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={true}
                      selectTextOnFocus={false}
                      accessibilityLabel={'_StoragePlaceInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={storagePlace}
                      onChangeText={value => {
                        handleChangeStoragePlace(value);
                      }}
                      autoFocus={false}
                      style={[storeInformationEditStyleSheet.storagePlaceInput]}
                    />
                  </View>
                </View>

                <View style={storeInformationEditStyleSheet.storageSpecialNote}>
                  <View style={storeInformationEditStyleSheet.headerCol}>
                    <Text style={{ fontSize: 12, top: 12 }}>置場の特記事項</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={true}
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
                        storeInformationEditStyleSheet.storageSpecialNoteInput,
                      ]}
                    />
                  </View>
                </View>

                <View style={storeInformationEditStyleSheet.emptyDelivery}>
                  <View style={storeInformationEditStyleSheet.headerCol}>
                    <Text style={{ fontSize: 12, top: 12 }}>空回収</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={true}
                      selectTextOnFocus={false}
                      accessibilityLabel={'_EmptyDeliveryInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={emptyDelivery}
                      onChangeText={value => {
                        handleChangeEmptyDelivery(value);
                      }}
                      autoFocus={false}
                      style={[storeInformationEditStyleSheet.emptyDeliveryInput]}
                    />
                  </View>
                </View>

                <View style={storeInformationEditStyleSheet.keyUse}>
                  <View style={storeInformationEditStyleSheet.headerCol}>
                    <Text style={{ fontSize: 12, top: 12 }}>鍵の使用</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <SelectDropdown
                      data={generalDropdownFields}
                      onSelect={(selectedItem, selectedItemIndex) => {
                        handleChangeKeyUse(selectedItem.value);
                      }}
                      buttonTextAfterSelection={item => {
                        return item.text;
                      }}
                      rowTextForSelection={item => {
                        return item.text;
                      }}
                      renderDropdownIcon={isOpened => {
                        return (
                          <Entypo
                            testID="selectDropdownIcon"
                            name={isOpened ? 'select-arrows' : 'select-arrows'}
                            color="#444444"
                            size={18}
                          />
                        );
                      }}
                      renderCustomizedButtonChild={(selectedItem, index) => {
                        return (
                          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Text style={keyUse === null ? { opacity: 0.5 } : { opacity: 1 }}>
                              {selectedItem ? selectedItem.text : generalDropdownFields[0].text}
                            </Text>
                          </View>
                        );
                      }}
                      defaultValueByIndex={keyUse ? (generalDropdownFields[keyUse].value) : generalDropdownFields[0].value}
                      dropdownIconPosition="right"
                      defaultButtonText={'選んでください'}
                      buttonStyle={storeInformationEditStyleSheet.dropdownButton}
                      buttonTextStyle={storeInformationEditStyleSheet.dropdownButtonText}
                      dropdownStyle={storeInformationEditStyleSheet.dropdownContent}
                      rowStyle={storeInformationEditStyleSheet.dropdownRow}
                      rowTextStyle={storeInformationEditStyleSheet.dropdownRowText}
                    />
                  </View>
                </View>

                <View style={storeInformationEditStyleSheet.keyUse}>
                  <View style={storeInformationEditStyleSheet.headerCol}>
                    <Text style={{ fontSize: 12, top: 12 }}>特記事項</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      editable={true}
                      selectTextOnFocus={false}
                      accessibilityLabel={'_KeyUseRemarkInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={keyUseRemark}
                      onChangeText={value => {
                        handleChangeKeyUseRemark(value);
                      }}
                      autoFocus={false}
                      style={[storeInformationEditStyleSheet.keyUseRemarkInput]}
                    />
                  </View>
                </View>

                <View style={storeInformationEditStyleSheet.securityUse}>
                  <View style={storeInformationEditStyleSheet.headerCol}>
                    <Text style={{ fontSize: 12, top: 12 }}>セキュリティ使用</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <SelectDropdown
                      data={generalDropdownFields}
                      onSelect={(selectedItem, selectedItemIndex) => {
                        handleChangeSecurityUse(selectedItem.value);
                      }}
                      buttonTextAfterSelection={item => {
                        return item.text;
                      }}
                      rowTextForSelection={item => {
                        return item.text;
                      }}
                      renderDropdownIcon={isOpened => {
                        return (
                          <Entypo
                            testID="selectDropdownIcon"
                            name={isOpened ? 'select-arrows' : 'select-arrows'}
                            color="#444444"
                            size={18}
                          />
                        );
                      }}
                      renderCustomizedButtonChild={(selectedItem, index) => {
                        return (
                          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Text style={securityUse === null ? { opacity: 0.5 } : { opacity: 1 }}>
                              {selectedItem ? selectedItem.text : generalDropdownFields[0].text}
                            </Text>
                          </View>
                        );
                      }}
                      defaultValueByIndex={securityUse ? (generalDropdownFields[securityUse].value) : generalDropdownFields[0].value}
                      dropdownIconPosition="right"
                      defaultButtonText={'選んでください'}
                      buttonStyle={storeInformationEditStyleSheet.dropdownButton}
                      buttonTextStyle={storeInformationEditStyleSheet.dropdownButtonText}
                      dropdownStyle={storeInformationEditStyleSheet.dropdownContent}
                      rowStyle={storeInformationEditStyleSheet.dropdownRow}
                      rowTextStyle={storeInformationEditStyleSheet.dropdownRowText}
                    />
                  </View>
                </View>

                <View style={storeInformationEditStyleSheet.securityUse}>
                  <View style={{ flex: 2, height: 160 }}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                      <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={[storeInformationEditStyleSheet.headerCol, storeInformationEditStyleSheet.mainHeader]}>
                          <Text style={{ fontSize: 12, top: 12 }}>解除方法</Text>
                        </View>

                        <View style={{ flex: 3 }}>
                          <TextInput
                            accessibilityLabel={'_CancellationMethodInput'}
                            keyboardType={'default'}
                            returnKeyType={'done'}
                            value={cancellationMethod}
                            onChangeText={value => {
                              handleChangeCancellationMethod(value);
                            }}
                            autoFocus={false}
                            style={[
                              storeInformationEditStyleSheet.cancellationMethodInput,
                            ]}
                          />
                        </View>
                      </View>

                      <View style={storeInformationEditStyleSheet.dashedBorderSubHeader}>
                        <View style={[storeInformationEditStyleSheet.headerCol, storeInformationEditStyleSheet.mainHeader]}>
                          <Text style={{ fontSize: 12, top: 12 }}>猶予時間</Text>
                        </View>

                        <View style={{ flex: 3 }}>
                          <TextInput
                            accessibilityLabel={'_GraceTimeInput'}
                            keyboardType={'default'}
                            returnKeyType={'done'}
                            value={graceTime}
                            onChangeText={value => {
                              handleChangeGraceTime(value);
                            }}
                            autoFocus={false}
                            style={[
                              storeInformationEditStyleSheet.graceTimeInput,
                            ]}
                          />
                        </View>
                      </View>

                      <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={[storeInformationEditStyleSheet.headerCol, storeInformationEditStyleSheet.mainHeader]}>
                          <Text style={{ fontSize: 12, top: 12 }}>会社名</Text>
                        </View>

                        <View style={{ flex: 3 }}>
                          <TextInput
                            accessibilityLabel={'_CompanyNameInput'}
                            keyboardType={'default'}
                            returnKeyType={'done'}
                            value={companyName}
                            onChangeText={value => {
                              handleChangeCompanyName(value);
                            }}
                            autoFocus={false}
                            style={[
                              storeInformationEditStyleSheet.companyNameInput,
                            ]}
                          />
                        </View>
                      </View>

                      <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={[storeInformationEditStyleSheet.headerCol]}>
                          <Text style={{ fontSize: 12, top: 12 }}>TEL</Text>
                        </View>

                        <View style={{ flex: 3 }}>
                          <TextInput
                            accessibilityLabel={'_CompanyTelInput'}
                            keyboardType={'numeric'}
                            returnKeyType={'done'}
                            value={companyTel}
                            onChangeText={value => {
                              handleChangeCompanyTel(value);
                            }}
                            autoFocus={false}
                            style={[
                              storeInformationEditStyleSheet.companyTelInput,
                            ]}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={storeInformationEditStyleSheet.facilityRule}>
                  <View style={[storeInformationEditStyleSheet.headerCol]}>
                    <Text style={{ fontSize: 12, top: 12 }}>施設内ルール</Text>
                  </View>

                  <View style={{ flex: 3, height: 40 }}>
                    <SelectDropdown
                      data={generalDropdownFields}
                      onSelect={(selectedItem, selectedItemIndex) => {
                        handleChangeFacilityRule(selectedItem.value);
                      }}
                      buttonTextAfterSelection={item => {
                        return item.text;
                      }}
                      rowTextForSelection={item => {
                        return item.text;
                      }}
                      renderDropdownIcon={isOpened => {
                        return (
                          <Entypo
                            testID="selectDropdownIcon"
                            name={isOpened ? 'select-arrows' : 'select-arrows'}
                            color="#444444"
                            size={18}
                          />
                        );
                      }}
                      renderCustomizedButtonChild={(selectedItem, index) => {
                        return (
                          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Text style={facilityRule === null ? { opacity: 0.5 } : { opacity: 1 }}>
                              {selectedItem ? selectedItem.text : generalDropdownFields[0].text}
                            </Text>
                          </View>
                        );
                      }}
                      defaultValueByIndex={facilityRule ? (generalDropdownFields[facilityRule].value) : generalDropdownFields[0].value}
                      dropdownIconPosition="right"
                      defaultButtonText={'選んでください'}
                      buttonStyle={storeInformationEditStyleSheet.dropdownButton}
                      buttonTextStyle={storeInformationEditStyleSheet.dropdownButtonText}
                      dropdownStyle={storeInformationEditStyleSheet.dropdownContent}
                      rowStyle={storeInformationEditStyleSheet.dropdownRow}
                      rowTextStyle={storeInformationEditStyleSheet.dropdownRowText}
                    />
                  </View>
                </View>

                <View style={storeInformationEditStyleSheet.facilityRule}>
                  <View style={[storeInformationEditStyleSheet.headerCol, storeInformationEditStyleSheet.mainHeader]}>
                    <Text style={{ fontSize: 12, top: 12 }}>許可証</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      accessibilityLabel={'_PermitLicenseInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={permitLicense}
                      onChangeText={value => {
                        handleChangePermitLicense(value);
                      }}
                      autoFocus={false}
                      style={[
                        storeInformationEditStyleSheet.permitLicenseInput,
                      ]}
                    />
                  </View>
                </View>

                <View style={storeInformationEditStyleSheet.dashedBorderSubHeader}>
                  <View style={[storeInformationEditStyleSheet.headerCol, storeInformationEditStyleSheet.mainHeader]}>
                    <Text style={{ fontSize: 12, top: 12 }}>受付/記入</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      accessibilityLabel={'_ReceptionEntryInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={receptionEntry}
                      onChangeText={value => {
                        handleChangeReceptionEntry(value);
                      }}
                      autoFocus={false}
                      style={[
                        storeInformationEditStyleSheet.receptionEntryInput,
                      ]}
                    />
                  </View>
                </View>

                <View style={storeInformationEditStyleSheet.certificationRequire}>
                  <View style={[storeInformationEditStyleSheet.headerCol, storeInformationEditStyleSheet.mainHeader]}>
                    <Text style={{ fontSize: 12, top: 12 }}>照明必要性</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <SelectDropdown
                      data={generalDropdownFields}
                      onSelect={(selectedItem, selectedItemIndex) => {
                        handleChangeCertificationRequire(selectedItem.value);
                      }}
                      buttonTextAfterSelection={item => {
                        return item.text;
                      }}
                      rowTextForSelection={item => {
                        return item.text;
                      }}
                      renderDropdownIcon={isOpened => {
                        return (
                          <Entypo
                            testID="selectDropdownIcon"
                            name={isOpened ? 'select-arrows' : 'select-arrows'}
                            color="#444444"
                            size={18}
                          />
                        );
                      }}
                      renderCustomizedButtonChild={(selectedItem, index) => {
                        return (
                          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Text style={certificationRequire === null ? { opacity: 0.5 } : { opacity: 1 }}>
                              {selectedItem ? selectedItem.text : generalDropdownFields[0].text}
                            </Text>
                          </View>
                        );
                      }}
                      defaultValueByIndex={certificationRequire ? (generalDropdownFields[certificationRequire].value) : generalDropdownFields[0].value}
                      dropdownIconPosition="right"
                      defaultButtonText={'選んでください'}
                      buttonStyle={storeInformationEditStyleSheet.dropdownButtonSpecial}
                      buttonTextStyle={storeInformationEditStyleSheet.dropdownButtonText}
                      dropdownStyle={storeInformationEditStyleSheet.dropdownContent}
                      rowStyle={storeInformationEditStyleSheet.dropdownRow}
                      rowTextStyle={storeInformationEditStyleSheet.dropdownRowText}
                    />
                  </View>
                </View>

                <View style={storeInformationEditStyleSheet.certificationRequire}>
                  <View style={[storeInformationEditStyleSheet.headerCol]}>
                    <Text style={{ fontSize: 12, top: 12 }}>特記事項</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      accessibilityLabel={'_CertificationRequireRemarkInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={certificationRequireRemark}
                      onChangeText={value => {
                        handleChangeCertificationRequireRemark(value);
                      }}
                      autoFocus={false}
                      style={[
                        storeInformationEditStyleSheet.keyUseRemarkInput,
                      ]}
                    />
                  </View>
                </View>

                <View style={storeInformationEditStyleSheet.elevatorRemark}>
                  <View style={storeInformationEditStyleSheet.headerCol}>
                    <Text style={{ fontSize: 12, top: 12 }}>エレベーター使用</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <SelectDropdown
                      data={generalDropdownFields}
                      onSelect={(selectedItem, selectedItemIndex) => {
                        handleChangeElevatorUse(selectedItem.value);
                      }}
                      buttonTextAfterSelection={item => {
                        return item.text;
                      }}
                      rowTextForSelection={item => {
                        return item.text;
                      }}
                      renderDropdownIcon={isOpened => {
                        return (
                          <Entypo
                            testID="selectDropdownIcon"
                            name={isOpened ? 'select-arrows' : 'select-arrows'}
                            color="#444444"
                            size={18}
                          />
                        );
                      }}
                      renderCustomizedButtonChild={(selectedItem, index) => {
                        return (
                          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Text style={elevatorUse === null ? { opacity: 0.5 } : { opacity: 1 }}>
                              {selectedItem ? selectedItem.text : generalDropdownFields[0].text}
                            </Text>
                          </View>
                        );
                      }}
                      defaultValueByIndex={elevatorUse ? (generalDropdownFields[elevatorUse].value) : generalDropdownFields[0].value}
                      dropdownIconPosition="right"
                      defaultButtonText={'選んでください'}
                      buttonStyle={storeInformationEditStyleSheet.dropdownButton}
                      buttonTextStyle={storeInformationEditStyleSheet.dropdownButtonText}
                      dropdownStyle={storeInformationEditStyleSheet.dropdownContent}
                      rowStyle={storeInformationEditStyleSheet.dropdownRow}
                      rowTextStyle={storeInformationEditStyleSheet.dropdownRowText}
                    />
                  </View>
                </View>

                <View style={storeInformationEditStyleSheet.elevatorRemark}>
                  <View style={[storeInformationEditStyleSheet.headerCol]}>
                    <Text style={{ fontSize: 12, top: 12 }}>特記事項</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      accessibilityLabel={'_ElevatorUseRemarkInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={elevatorUseRemark}
                      onChangeText={value => {
                        handleChangeElevatorUseRemark(value);
                      }}
                      autoFocus={false}
                      style={[
                        storeInformationEditStyleSheet.keyUseRemarkInput,
                      ]}
                    />
                  </View>
                </View>

                <View style={storeInformationEditStyleSheet.waitingPlace}>
                  <View style={storeInformationEditStyleSheet.headerCol}>
                    <Text style={{ fontSize: 12, top: 12 }}>待機場所</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <SelectDropdown
                      data={generalDropdownFields}
                      onSelect={(selectedItem, selectedItemIndex) => {
                        handleChangeWaitingPlace(selectedItem.value);
                      }}
                      buttonTextAfterSelection={item => {
                        return item.text;
                      }}
                      rowTextForSelection={item => {
                        return item.text;
                      }}
                      renderDropdownIcon={isOpened => {
                        return (
                          <Entypo
                            testID="selectDropdownIcon"
                            name={isOpened ? 'select-arrows' : 'select-arrows'}
                            color="#444444"
                            size={18}
                          />
                        );
                      }}
                      renderCustomizedButtonChild={(selectedItem, index) => {
                        return (
                          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Text style={waitingPlace === null ? { opacity: 0.5 } : { opacity: 1 }}>
                              {selectedItem ? selectedItem.text : generalDropdownFields[0].text}
                            </Text>
                          </View>
                        );
                      }}
                      defaultValueByIndex={waitingPlace ? (generalDropdownFields[waitingPlace].value) : generalDropdownFields[0].value}
                      dropdownIconPosition="right"
                      defaultButtonText={'選んでください'}
                      buttonStyle={storeInformationEditStyleSheet.dropdownButton}
                      buttonTextStyle={storeInformationEditStyleSheet.dropdownButtonText}
                      dropdownStyle={storeInformationEditStyleSheet.dropdownContent}
                      rowStyle={storeInformationEditStyleSheet.dropdownRow}
                      rowTextStyle={storeInformationEditStyleSheet.dropdownRowText}
                    />
                  </View>
                </View>

                <View style={storeInformationEditStyleSheet.waitingPlace}>
                  <View style={[storeInformationEditStyleSheet.headerCol]}>
                    <Text style={{ fontSize: 12, top: 12 }}>特記事項</Text>
                  </View>

                  <View style={{ flex: 3 }}>
                    <TextInput
                      accessibilityLabel={'_WaitingPlaceRemarkInput'}
                      keyboardType={'default'}
                      returnKeyType={'done'}
                      value={waitingPlaceRemark}
                      onChangeText={value => {
                        handleChangeWaitingPlaceRemark(value);
                      }}
                      autoFocus={false}
                      style={[
                        storeInformationEditStyleSheet.keyUseRemarkInput,
                      ]}
                    />
                  </View>
                </View>
              </View>
            )}
          </View>

          <View style={storeInformationEditStyleSheet.deliveryProcedure}>
            <Pressable
              testID='deliveryProcedureDropdownButton'
              accessibilityLabel='_DeliveryProcedureDropdownButton'
              onPress={() => {
                setShowDeliveryProcedure(!showDeliveryProcedure);
              }}>
              <View style={storeInformationEditStyleSheet.rowHeader}>
                <View style={{ flex: 1 }}>
                  <AntDesign
                    testID="caretDownButton3"
                    accessibilityLabel='_CaretDownButton3'
                    style={storeInformationEditStyleSheet.iconDown}
                    name={
                      showDeliveryProcedure === true
                        ? 'caretdown'
                        : 'caretright'
                    }
                  />
                </View>

                <View style={{ flex: 10 }}>
                  <Text style={storeInformationEditStyleSheet.rowHeaderText}>納品手順</Text>
                </View>
              </View>
            </Pressable>

            {showDeliveryProcedure === true && (
              <View style={{ flex: 1 }}>
                <View style={storeInformationEditStyleSheet.deliveryProcedureTable}>
                  <View style={storeInformationEditStyleSheet.deliveryPlace}>
                    <View style={[storeInformationEditStyleSheet.headerCol, { borderRightWidth: 1, borderColor: '#C4C4C4' }]}>
                      <Text style={{ fontSize: 12, top: 12 }}>納品手順</Text>
                    </View>

                    <View style={{ flex: 3, height: 340 }}>
                      <View style={storeInformationEditStyleSheet.deliveryManualBox}>
                        <View style={storeInformationEditStyleSheet.deliveryManualBar}>
                          <TextInput
                            accessibilityLabel={'_DeliveryManualInput'}
                            keyboardType={'default'}
                            returnKeyType={'done'}
                            autoCapitalize={'none'}
                            value={subDeliveryManual}
                            onChangeText={value => {
                              setSubDeliveryManual(value);
                            }}
                            autoFocus={false}
                            style={[
                              storeInformationEditStyleSheet.deliveryManualTextInput,
                            ]}
                            placeholder={'入力してください'}
                            placeholderTextColor={'#818181'}
                          />
                          
                          <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginLeft: 15, flex: 1 }}>
                            <Text style={{ fontStyle: 'italic', color: 'red', fontSize: 12 }}>{deliveryManualErrorMessage}</Text>
                          </View>
                        </View>

                        <View style={{ flex: 1 }}>
                          <Pressable
                            testID='addDeliveryManualButton'
                            accessibilityLabel='_AddDeliveryManualButton'
                            onPress={() => {
                              handleAddDeliveryPlaceInput();
                            }}
                          >
                            <AntDesign
                              testID="addDeliveryManualButtonIcon"
                              accessibilityLabel='_AddDeliveryManualButtonIcon'
                              style={storeInformationEditStyleSheet.plusCircleIcon}
                              name={'pluscircle'}
                            />
                          </Pressable>
                        </View>
                      </View>

                      <View style={{ flex: 8, marginTop: 40 }}>
                        <ScrollView>
                          <View style={{ flex: 1, padding: 5 }}>
                            {
                              deliveryManual.map((delivery, deliveryIndex) => (
                                <View key={deliveryIndex} style={{ flex: 1, flexDirection: 'row', marginTop: 5 }}>
                                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ marginTop: 5, fontSize: 12 }}>{(deliveryIndex + 1)}. </Text>
                                  </View>

                                  <View style={{ flex: 8, justifyContent: 'center', alignItems: 'flex-start' }}>
                                    <Text style={{ marginTop: 5 }}>{delivery.content}</Text>
                                  </View>
                                  
                                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Pressable
                                      testID='deleteDeliveryManualButton'
                                      accessibilityLabel='_DeleteDeliveryManualButton'
                                      onPress={() => {
                                        handleRemoveDeliveryPlaceInput(deliveryIndex);
                                      }}
                                    >
                                      <AntDesign
                                        testID="deleteDeliveryManualButtonIcon"
                                        accessibilityLabel='_DeleteDeliveryManualButtonIcon'
                                        style={storeInformationEditStyleSheet.minusCircleIcon}
                                        name={'minuscircle'}
                                      />
                                    </Pressable>
                                  </View>
                                </View>
                              ))
                            }
                          </View>
                        </ScrollView>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={storeInformationEditStyleSheet.mapSection}>
                  <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <View style={storeInformationEditStyleSheet.mapTitle}>
                        <Text style={storeInformationEditStyleSheet.mapTitleText}>納品経路図</Text>
                      </View>

                      <View style={{ flex: 3 }}></View>
                    </View>

                    <View style={storeInformationEditStyleSheet.map}>
                      <View style={{ flex: 1, margin: 5 }}>
                        <Image
                          resizeMode="contain"
                          style={storeInformationEditStyleSheet.mapImage}
                          source={{uri: deliveryRouteMapImage}}
                        />
                      </View>
                    </View>

                    <View style={{ flex: 1 }}>
                      <TouchableOpacity
                        testID='deliveryRouteMapImageUploadButton'
                        accessibilityLabel='_DeliveryRouteMapImageUploadButton'
                        onPress={() => {
                          askForCameraUsagePermission();

                          askForPhotoLibraryUsagePermission();

                          if (hasCameraUsagePermission && hasPhotoLibraryUsagePermission) {
                            pickImageDelivertRouteMap();
                          } else {
                            setIsShowModalPermission(true);
                            setWrapperOpacity(0.5);
                          }
                        }}
                        style={storeInformationEditStyleSheet.animatedButton}
                      >
                        <View style={storeInformationEditStyleSheet.routeMapUploadField}>
                          <Text style={storeInformationEditStyleSheet.routeMapUploadButtonText}>画像をアップロード</Text>

                          <MaterialIcons
                            size={26}
                            color="#000000"
                            name="drive-folder-upload"
                            testID="driveFolderUploadIcon"
                            accessibilityLabel='_DriveFolderUploadIcon'
                            style={storeInformationEditStyleSheet.iconDriveFolderUpload}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={storeInformationEditStyleSheet.deliveryRouteMapOtherPrecaution}>
                      <View style={[storeInformationEditStyleSheet.headerCol, { borderTopWidth:1, borderColor: '#C4C4C4', justifyContent: 'center' }]}>
                        <Text style={{ fontSize: 10 }}>その他・注意事項</Text>
                      </View>

                      <View style={{ flex: 3 }}>
                        <TextInput
                          accessibilityLabel={'_DeliveryRouteMapRemarkTextInput'}
                          keyboardType={'default'}
                          returnKeyType={'done'}
                          value={deliveryRouteMapRemark}
                          multiline={true}
                          numberOfLines={6}
                          onChangeText={value => {
                            handleChangeDeliveryRouteMapRemark(value);
                          }}
                          autoCapitalize={'none'}
                          autoFocus={false}
                          style={[storeInformationEditStyleSheet.deliveryDirectionMapOtherPrecautionInput]}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            )}
          </View>

          <View style={storeInformationEditStyleSheet.routeInformation}>
            <Pressable
              testID='routeInformationDropDownButton'
              accessibilityLabel='_RouteInformationDropDownButton'
              onPress={() => {
                setShowRouteInformation(!showRouteInformation);
              }}>
              <View style={storeInformationEditStyleSheet.rowHeader}>
                <View style={{ flex: 1 }}>
                  <AntDesign
                    testID="caretDownButton4"
                    accessibilityLabel='_CaretDownButton4'
                    style={storeInformationEditStyleSheet.iconDown}
                    name={
                      showRouteInformation === true ? 'caretdown' : 'caretright'
                    }
                  />
                </View>

                <View style={{ flex: 10 }}>
                  <Text style={storeInformationEditStyleSheet.rowHeaderText}>ルート周辺情報</Text>
                </View>
              </View>
            </Pressable>

            {showRouteInformation === true && (
              <View style={storeInformationEditStyleSheet.mapSection}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={storeInformationEditStyleSheet.mapTitle}>
                      <Text style={storeInformationEditStyleSheet.mapTitleText}>納品経路図</Text>
                    </View>

                    <View style={{ flex: 3 }}></View>
                  </View>

                  <View style={storeInformationEditStyleSheet.map}>
                    <View style={{ flex: 1, margin: 5 }}>
                      <Image
                        resizeMode="contain"
                        style={storeInformationEditStyleSheet.mapImage}
                        source={{uri: routeAMPPImage}}
                      />
                    </View>
                  </View>

                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                      testID='routeAMPPImageUploadButton'
                      accessibilityLabel='_RouteAMPPImageUploadButton'
                      onPress={() => {
                        askForCameraUsagePermission();

                        askForPhotoLibraryUsagePermission();

                        if (hasCameraUsagePermission && hasPhotoLibraryUsagePermission) {
                          pickImageRouteAMPP();
                        } else {
                          setIsShowModalPermission(true);
                          setWrapperOpacity(0.5);
                        }
                      }}
                      style={storeInformationEditStyleSheet.animatedButton}
                    >
                      <View style={storeInformationEditStyleSheet.routeMapUploadField}>
                        <Text style={storeInformationEditStyleSheet.routeMapUploadButtonText}>画像をアップロード</Text>

                        <MaterialIcons
                          size={30}
                          color="#000000"
                          name="drive-folder-upload"
                          testID="driveFolderUploadIcon"
                          accessibilityLabel='_DriveFolderUploadIcon'
                          style={storeInformationEditStyleSheet.iconDriveFolderUpload}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View style={storeInformationEditStyleSheet.deliveryRouteMapOtherPrecaution}>
                    <View style={[storeInformationEditStyleSheet.headerCol, { borderTopWidth:1, borderColor: '#C4C4C4', justifyContent: 'center' }]}>
                      <Text style={{ fontSize: 10}}>その他・注意事項</Text>
                    </View>

                    <View style={{ flex: 3 }}>
                      <TextInput
                        accessibilityLabel={'_RouteAMPPRemarkTextInput'}
                        keyboardType={'default'}
                        returnKeyType={'done'}
                        value={routeAMPPRemark}
                        multiline={true}
                        numberOfLines={6}
                        onChangeText={value => {
                          handleChangeRouteAMPPRemark(value);
                        }}
                        autoCapitalize={'none'}
                        autoFocus={false}
                        style={[
                          storeInformationEditStyleSheet.deliveryDirectionMapOtherPrecautionInput,
                        ]}
                      />
                    </View>
                  </View>
                </View>
              </View>
            )}
          </View>

          <View style={storeInformationEditStyleSheet.parkingInformation}>
            <Pressable
              testID='parkingInformationDropDownButton'
              accessibilityLabel='_ParkingInformationDropDownButton'
              onPress={() => {
                setShowParkingInformation(!showParkingInformation);
              }}>
              <View style={storeInformationEditStyleSheet.rowHeader}>
                <View style={{ flex: 1 }}>
                  <AntDesign
                    testID="caretDownButton5"
                    accessibilityLabel='_CaretDownButton5'
                    style={storeInformationEditStyleSheet.iconDown}
                    name={
                      showParkingInformation === true
                        ? 'caretdown'
                        : 'caretright'
                    }
                  />
                </View>

                <View style={{ flex: 10 }}>
                  <Text style={storeInformationEditStyleSheet.rowHeaderText}>駐車場情報</Text>
                </View>
              </View>
            </Pressable>

            {showParkingInformation === true && (
              <View style={storeInformationEditStyleSheet.mapSection}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={storeInformationEditStyleSheet.mapTitle}>
                      <Text style={storeInformationEditStyleSheet.mapTitleText}>納品経路図</Text>
                    </View>

                    <View style={{ flex: 3 }}></View>
                  </View>

                  <View style={storeInformationEditStyleSheet.map}>
                    <View style={{ flex: 1, margin: 5 }}>
                      <Image
                        resizeMode="contain"
                        style={storeInformationEditStyleSheet.mapImage}
                        source={{ uri: parkingAMPPImage }}
                      />
                    </View>
                  </View>

                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                      testID='parkingAMPPUploadButton'
                      accessibilityLabel='_ParkingAMPPUploadButton'
                      onPress={() => {
                        askForCameraUsagePermission();

                        askForPhotoLibraryUsagePermission();

                        if (hasCameraUsagePermission && hasPhotoLibraryUsagePermission) {
                          pickImageParkingAMPP();
                        } else {
                          setIsShowModalPermission(true);
                          setWrapperOpacity(0.5);
                        }
                      }}  
                      style={storeInformationEditStyleSheet.animatedButton}
                    >
                      <View style={storeInformationEditStyleSheet.routeMapUploadField}>
                        <Text style={storeInformationEditStyleSheet.routeMapUploadButtonText}>画像をアップロード</Text>

                        <MaterialIcons
                          size={30}
                          color="#000000"
                          name="drive-folder-upload"
                          testID="driveFolderUploadIcon"
                          accessibilityLabel='_DriveFolderUploadIcon'
                          style={storeInformationEditStyleSheet.iconDriveFolderUpload}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View style={storeInformationEditStyleSheet.deliveryRouteMapOtherPrecaution}>
                    <View style={[storeInformationEditStyleSheet.headerCol, { borderTopWidth:1, borderColor: '#C4C4C4', justifyContent: 'center' }]}>
                      <Text style={{ fontSize: 10 }}>その他・注意事項</Text>
                    </View>

                    <View style={{ flex: 3 }}>
                      <TextInput
                        accessibilityLabel={'_ParkingAMPPRemarkTextInput'}
                        keyboardType={'default'}
                        returnKeyType={'done'}
                        value={parkingAMPPRemark}
                        multiline={true}
                        numberOfLines={6}
                        onChangeText={value => {
                          handleChangeParkingAMPPRemark(value);
                        }}
                        autoCapitalize={'none'}
                        autoFocus={false}
                        style={[
                          storeInformationEditStyleSheet.deliveryDirectionMapOtherPrecautionInput,
                        ]}
                      />
                    </View>
                  </View>
                </View>
              </View>
            )}
          </View>

          <View style={{ flex: 1 }}>
            <TouchableOpacity
              testID='updateButton'
              accessibilityLabel='_UpdateButton'
              onPress={() => {
                handleUpdateStoreInformation();
              }}
              style={storeInformationEditStyleSheet.updateInformation}
            >
              <Text style={storeInformationEditStyleSheet.updateInformationText}>保存</Text>
            </TouchableOpacity>
          </View>

          <View style={storeInformationEditStyleSheet.updateInformationBar}>
            <Text style={storeInformationEditStyleSheet.updateInformationText}>{`最新更新日：${lastUpdateDate}`}</Text>
          </View>
        </ScrollView>
      </View>

      <Modal
        animationType="slide"
        presentationStyle="overFullScreen"
        transparent={true}
        visible={isShowModalValidate}
        onRequestClose={() => {
          setIsShowModalValidate(!isShowModalValidate);
        }}>
          <View style={storeInformationEditStyleSheet.modalValidateContent}>
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column' }}>
              <AntDesign
                testID="warningIcon"
                name={'warning'}
                style={{ fontSize: 20, color: '#FFDE00', marginRight: 10, marginTop: 20 }}
              />

              <Text style={{ marginTop: 20 }}>{validateErrorMessages}</Text>
            </View>

            <Pressable
              onPress={() => {
                setIsShowModalValidate(false);
                setWrapperOpacity(1);
              }}
              style={storeInformationEditStyleSheet.confirmButton}
            >
              <Text style={{ color: '#FFFFFF' }}>確認</Text>
            </Pressable>
          </View>
      </Modal>

      <Modal
        animationType="slide"
        presentationStyle="overFullScreen"
        transparent={true}
        visible={isShowModalPermission}
        onRequestClose={() => {
          setIsShowModalPermission(!isShowModalPermission);
        }}>
          <View style={storeInformationEditStyleSheet.modalPermissionContent}>
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column' }}>
              <AntDesign
                testID="exclamationcircleIcom"
                name={'exclamationcircle'}
                style={{ fontSize: 20, color: 'red', marginRight: 10, marginTop: 20 }}
              />

              <Text style={{ marginTop: 20, textAlign: 'center' }}>
                Izumiアプリ"がカメラ・写真へのアクセスを求めています
              </Text>

              <Text style={{ marginTop: 10 }}>
                以前にアクセスが拒否されています。設定からアクセスを許可してください
              </Text>
            </View>

            <Pressable
              onPress={() => {
                Linking.openURL('app-settings:');
                setIsShowModalValidate(false);
                setWrapperOpacity(1);
              }}
              style={storeInformationEditStyleSheet.confirmButton}
            >
              <Text style={{ color: '#FFFFFF' }}>設定を開く</Text>
            </Pressable>
          </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default StoreInformationEdit;
