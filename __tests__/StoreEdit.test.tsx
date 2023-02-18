import { store } from 'src/store';
import { Provider } from 'react-redux';
import { Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';
import { Config, Validate } from 'src/const';
import { object2Path } from 'src/utils/object2Path';
import { cleanObject } from 'src/utils/handleObject';
import { NavigationContainer } from '@react-navigation/native';
import { getListStore, getStoreInformation, updateStoreInformation } from 'src/api/modules/store';
import { setLoading, setInitDataStoreDetail, setInitDataStoreEdit } from 'src/actions/miscActions';

import {
  render,
  cleanup,
  waitFor,
  fireEvent,
} from '@testing-library/react-native';

import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

import React from 'react';
import renderer from 'react-test-renderer';
import Toast from 'react-native-toast-message';
import StoreInformationEdit from 'src/components/Store/views/storeInformation';
import AsyncStorageMock from '__mocks__/@react-native-async-storage/async-storage';

describe('<StoreInformationEdit />', () => {
  const urlAPI = {
    apiGetDetailStore: '/mobile/store',
    apiUpdateStoreInformation: '/mobile/store',
  };

  const props = {
    navigation: {
      navigate: jest.fn(),
    },
    route: {
      params: {
        base_id: 1,
        store_name: 'Luminous',
        store_id: 1,
        pass_code: 9203,
        course_id: 11,
        course_name: '1401JZA'
      },
    },
  };

  const dispatch = useDispatch();

  const showToast = jest.fn();

  showToast.mockImplementation(params => {
    Toast.show({
      text1: params.title,
      text2: params.content,
      type: params.variant,
      position: 'top',
    });
  });

  it('Test when click on 基本情報 open the dropdown content', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreInformationEdit {...props} />
      </Provider>,
    );

    let isBaseInfoOpen = false;

    const baseInfo = getByTestId('baseInfo');
    fireEvent.press(baseInfo);
    expect(baseInfo).toBeTruthy();

    isBaseInfoOpen = !isBaseInfoOpen;

    const baseInfoContent = getByTestId('baseInfoContent');
    expect(baseInfoContent).toBeTruthy();

    if (isBaseInfoOpen) {
      expect(baseInfoContent).toBeTruthy();
    }

    if (!isBaseInfoOpen) {
      expect(baseInfoContent).toBeFalsy();
    }

    await afterAll(() => {
      cleanup();
    });
  });

  it('Test when click on 基本情報 again, close the dropdown content', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreInformationEdit {...props} />
      </Provider>,
    );

    let isBaseInfoOpen = true;

    const baseInfo = getByTestId('baseInfo');
    fireEvent.press(baseInfo);
    expect(baseInfo).toBeTruthy();

    isBaseInfoOpen = !isBaseInfoOpen;

    const baseInfoContent = getByTestId('baseInfoContent');
    expect(baseInfoContent).toBeTruthy();

    if (isBaseInfoOpen) {
      expect(baseInfoContent).toBeTruthy();
    }

    if (!isBaseInfoOpen) {
      expect(baseInfoContent).toBeFalsy();
    }

    await afterAll(() => {
      cleanup();
    });
  });

  it('Test when click on 納品情報 open the dropdown content', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreInformationEdit {...props} />
      </Provider>,
    );

    let isDeliveryInfoOpen = false;

    const deliveryInfo = getByTestId('deliveryInfo');
    fireEvent.press(deliveryInfo);
    expect(deliveryInfo).toBeTruthy();

    isDeliveryInfoOpen = !isDeliveryInfoOpen;

    const deliveryInfoContent = getByTestId('deliveryInfoContent');
    expect(deliveryInfoContent).toBeTruthy();

    if (isDeliveryInfoOpen) {
      expect(deliveryInfoContent).toBeTruthy();
    }

    if (!isDeliveryInfoOpen) {
      expect(deliveryInfoContent).toBeFalsy();
    }

    await afterAll(() => {
      cleanup();
    });
  });

  it('Test when click on 納品情報 again, close the dropdown content', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreInformationEdit {...props} />
      </Provider>,
    );

    let isDeliveryInfoOpen = true;

    const deliveryInfo = getByTestId('deliveryInfo');
    fireEvent.press(deliveryInfo);
    expect(deliveryInfo).toBeTruthy();

    isDeliveryInfoOpen = !isDeliveryInfoOpen;

    const deliveryInfoContent = getByTestId('deliveryInfoContent');
    expect(deliveryInfoContent).toBeTruthy();

    if (isDeliveryInfoOpen) {
      expect(deliveryInfoContent).toBeTruthy();
    }

    if (!isDeliveryInfoOpen) {
      expect(deliveryInfoContent).toBeFalsy();
    }

    await afterAll(() => {
      cleanup();
    });
  });

  it('Test when click on 納品手順, open the dropdown content', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreInformationEdit {...props} />
      </Provider>,
    );

    let isDeliveryProcedureOpen = false;

    const deliveryProcedure = getByTestId('deliveryProcedure');
    fireEvent.press(deliveryProcedure);
    expect(deliveryProcedure).toBeTruthy();

    isDeliveryProcedureOpen = !isDeliveryProcedureOpen;

    const deliveryProcedureContent = getByTestId('deliveryProcedureContent');
    expect(deliveryProcedureContent).toBeTruthy();

    if (isDeliveryProcedureOpen) {
      expect(deliveryProcedureContent).toBeTruthy();
    }

    if (!isDeliveryProcedureOpen) {
      expect(deliveryProcedureContent).toBeFalsy();
    }

    await afterAll(() => {
      cleanup();
    });
  });

  it('Test when click on 納品手順 again, close the dropdown content', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreInformationEdit {...props} />
      </Provider>,
    );

    let isDeliveryProcedureOpen = true;

    const deliveryProcedure = getByTestId('deliveryProcedure');
    fireEvent.press(deliveryProcedure);
    expect(deliveryProcedure).toBeTruthy();

    isDeliveryProcedureOpen = !isDeliveryProcedureOpen;

    const deliveryProcedureContent = getByTestId('deliveryProcedureContent');
    expect(deliveryProcedureContent).toBeTruthy();

    if (isDeliveryProcedureOpen) {
      expect(deliveryProcedureContent).toBeTruthy();
    }

    if (!isDeliveryProcedureOpen) {
      expect(deliveryProcedureContent).toBeFalsy();
    }

    await afterAll(() => {
      cleanup();
    });
  });

  it('Test when click on ルート周辺情報, open the dropdown content', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreInformationEdit {...props} />
      </Provider>,
    );

    let isRouteInfoOpen = false;

    const routeInfo = getByTestId('routeInfo');
    fireEvent.press(routeInfo);
    expect(routeInfo).toBeTruthy();

    isRouteInfoOpen = !isRouteInfoOpen;

    const routeInfoContent = getByTestId('routeInfoContent');
    expect(routeInfoContent).toBeTruthy();

    if (isRouteInfoOpen) {
      expect(routeInfoContent).toBeTruthy();
    }

    if (!isRouteInfoOpen) {
      expect(routeInfoContent).toBeFalsy();
    }

    await afterAll(() => {
      cleanup();
    });
  });

  it('Test when click on ルート周辺情報 again, close the dropdown content', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreInformationEdit {...props} />
      </Provider>,
    );

    let isRouteInfoOpen = true;

    const routeInfo = getByTestId('routeInfo');
    fireEvent.press(routeInfo);
    expect(routeInfo).toBeTruthy();

    isRouteInfoOpen = !isRouteInfoOpen;

    const routeInfoContent = getByTestId('routeInfoContent');
    expect(routeInfoContent).toBeTruthy();

    if (isRouteInfoOpen) {
      expect(routeInfoContent).toBeTruthy();
    }

    if (!isRouteInfoOpen) {
      expect(routeInfoContent).toBeFalsy();
    }

    await afterAll(() => {
      cleanup();
    });
  });

  it('Test when click on 駐車場情報, open the dropdown content', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreInformationEdit {...props} />
      </Provider>,
    );

    let isParkingInfoOpen = false;

    const parkingInfo = getByTestId('parkingInfo');
    fireEvent.press(parkingInfo);
    expect(parkingInfo).toBeTruthy();

    isParkingInfoOpen = !isParkingInfoOpen;

    const parkingInfoContent = getByTestId('parkingInfoContent');
    expect(parkingInfoContent).toBeTruthy();

    if (isParkingInfoOpen) {
      expect(parkingInfoContent).toBeTruthy();
    }

    if (!isParkingInfoOpen) {
      expect(parkingInfoContent).toBeFalsy();
    }

    await afterAll(() => {
      cleanup();
    });
  });

  it('Test when click on 駐車場情報 again, close the dropdown content', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreInformationEdit {...props} />
      </Provider>,
    );

    let isParkingInfoOpen = true;

    const parkingInfo = getByTestId('parkingInfo');
    fireEvent.press(parkingInfo);
    expect(parkingInfo).toBeTruthy();

    isParkingInfoOpen = !isParkingInfoOpen;

    const parkingInfoContent = getByTestId('parkingInfoContent');
    expect(parkingInfoContent).toBeTruthy();

    if (isParkingInfoOpen) {
      expect(parkingInfoContent).toBeTruthy();
    }

    if (!isParkingInfoOpen) {
      expect(parkingInfoContent).toBeFalsy();
    }

    await afterAll(() => {
      cleanup();
    });
  });

  it('Test when click on the back button, navigate back to the store detail screen', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreInformationEdit {...props} />
      </Provider>,
    );

    const goBackStoreScreen = jest.fn();

    dispatch(setInitDataStoreDetail(true));
    dispatch(setInitDataStoreEdit(true));

    goBackStoreScreen.mockImplementation(() => {
      props.navigation.navigate('Store', {
        base_id: props.route.params.base_id,
        course_id: props.route.params.course_id,
        course_name: props.route.params.course_name,
      });
    });

    const backButton = getByTestId('backButton');
    fireEvent.press(backButton);
    expect(backButton).toBeTruthy();

    expect(goBackStoreScreen).toHaveBeenCalled();

    await afterAll(() => {
      cleanup();
    });
  });

  it('Test when click on the edit button, navigate to the store information edit screen', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreInformationEdit {...props} />
      </Provider>,
    );

    const goToStoreInformationEditScreen = jest.fn();

    goToStoreInformationEditScreen.mockImplementation(() => {
      props.navigation.navigate('StoreInformationEdit', {
        base_id: props.route.params.base_id,
        store_name: props.route.params.store_name,
        store_id: props.route.params.store_id,
        pass_code: props.route.params.pass_code,
        course_id: props.route.params.course_id,
        course_name: props.route.params.course_name,
      });
    });

    const editButton = getByTestId('editButton');
    fireEvent.press(editButton);
    expect(editButton).toBeTruthy();

    expect(goToStoreInformationEditScreen).toHaveBeenCalled();

    await afterAll(() => {
      cleanup();
    });
  });

  it('Test call api getDetailStoreInformation', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreInformationEdit {...props} />
      </Provider>,
    );

    const dispatch = useDispatch();

    const handleGetDetailStore = jest.fn();

    let RESPONSE_DATA;

    handleGetDetailStore.mockImplementation(async () => {
      try {
        dispatch(setLoading(true));
        dispatch(setInitDataStoreDetail(false));
  
        const URL = `${urlAPI.apiGetDetailStore}/${props.route.params.store_id}`;
  
        const DATA = {
          pass_code: props.route.params.pass_code,
        };
  
        const response = await getStoreInformation(
          Config.URL_DOMAIN_CLOUD,
          URL,
          DATA
        );
  
        RESPONSE_DATA = response.data.data;

        handleGetImageURL(RESPONSE_DATA.delivery_route_map_path);
        handleGetImageURL(RESPONSE_DATA.parking_position_1_file_path);
        handleGetImageURL(RESPONSE_DATA.parking_position_2_file_path);

        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
        console.log(error);
      }
    });

    const handleGetImageURL = jest.fn();

    handleGetImageURL.mockImplementation(async (imagePath) => {
      const URL = `https://izumi-cloud.vw-dev.com/${imagePath}`
      return URL;
    });

    const storeInfo = getByTestId('storeInfo');
    fireEvent.press(storeInfo);
    expect(storeInfo).toBeTruthy();

    expect(handleGetDetailStore).toHaveBeenCalled();

    expect(RESPONSE_DATA).not.toBeNull();

    expect(handleGetImageURL).toHaveBeenCalled();

    await afterAll(() => {
      cleanup();
    });
  });

  it('Test when click on the save button, call funtion handleValidationUpdateInformation', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreInformationEdit {...props} />
      </Provider>,
    );

    const STORE_DATA = {
      businessClassification: '',
      deliveryDestinationCode: '',
      deliveryDestinationNameKana: '',
      
      deliveryDestinationName: '',
      postCode: '',
      addressOne: '',
      addressTwo: '',
      tel: '',
  
      deliveryFrequency: '',
      quantityPerDelivery: '',
      specifyDeliveryTime: '',
      scheduledTimeFirst: '',
      scheduledTimeSecond: '',
      vehicelRegulation: '',
      heightPerWidth: '',
      parkingPlaceDesignation: '',
      parkingPlaceDesignationRemark: '',
      deliverySlip: '',
      deliverySlipRemark: '',
      daisha: '',
      daishaRemark: '',
      storagePlace: '',
      storageSpecialNote: '',
      emptyDelivery: '',
      keyUse: '',
      keyUseRemark: '',
      securityUse: '',
      cancellationMethod: '',
      graceTime: '',
      companyName: '',
      companyTel: '',
      facilityRule: '',
      permitLicense: '',
      receptionEntry: '',
      certificationRequire: '',
      certificationRequireRemark: '',
      elevatorUse: '',
      elevatorUseRemark: '',
      waitingPlace: '',
      waitingPlaceRemark: '',
      deliveryManual: '',
      deliveryRouteMapImage: '',
      deliveryRouteMapRemark: '',
      routeAMPPImage: '',
      routeAMPPRemark: '',
      parkingAMPPImage: '',
      parkingAMPPRemark: '',
    }

    const handleValidationUpdateInformation = jest.fn();

    handleValidationUpdateInformation.mockImplementation(() => {
      let isPassed = false;
      let errorMessage = '';
  
      if (STORE_DATA.businessClassification.length > 30) {
        errorMessage = 'Business classification must be <= 30 characters length.';
      } else if (STORE_DATA.deliveryDestinationName.length > 100) {
        errorMessage = 'Delivery destination name must be <= 100 characters length.';
      } else if (STORE_DATA.deliveryDestinationName.length > 50) {
        errorMessage = 'Delivery destination name must be <= 50 charaters length.';
      } else if (STORE_DATA.postCode.length > 8) {
        errorMessage = 'Post code must be <= 8 characters length.';
      } else if (STORE_DATA.addressOne.length > 20) {
        errorMessage = 'Address one must be <= 20 characters length.';
      } else if (STORE_DATA.addressTwo.length > 20) {
        errorMessage = 'Address two must be <= 20 characters length.';
      } else if (STORE_DATA.tel.length > 13) {
        errorMessage = 'Tel number must be <= 13 characters length.';
      } else if (STORE_DATA.deliveryFrequency.length > 20) {
        errorMessage = 'Delivery frequency must be <= 20 chracters length.';
      } else if (parseInt(STORE_DATA.quantityPerDelivery) > 1000) {
        errorMessage = 'Quantity per delivery must be <= 1000.';
      } else if (parseInt(STORE_DATA.specifyDeliveryTime) > 60) {
        errorMessage = 'Specify delivery time must be <= 60.';
      } else if (parseInt(STORE_DATA.scheduledTimeFirst) > 60) {
        errorMessage = 'Scheduled time first must be <= 60.';
      } else if (parseInt(STORE_DATA.scheduledTimeSecond) > 60) {
        errorMessage = 'Scheduled time second must be <= 60.';
      } else if (parseInt(STORE_DATA.vehicelRegulation) > 999) {
        errorMessage = 'Vehicle regulation must be <= 999.';
      } else if (STORE_DATA.parkingPlaceDesignationRemark.length > 30) {
        errorMessage = 'Note 1 must be <= 30 characters length.';
      } else if (STORE_DATA.deliverySlipRemark.length > 30) {
        errorMessage = 'Note 2 must be <= 30 characters length.';
      } else if (STORE_DATA.daishaRemark.length > 50) {
        errorMessage = 'Note 3 must be <= 50 characters length.';
      } else if (STORE_DATA.storagePlace.length > 50) {
        errorMessage = 'Storage place must be <= 50 characters length.';
      } else if (STORE_DATA.storageSpecialNote.length > 50) {
        errorMessage = 'Storage special note must be <= 50 characters length.';
      } else if (STORE_DATA.emptyDelivery.length > 50) {
        errorMessage = 'Empty delivery must be <= 50 characters length.';
      } else if (STORE_DATA.keyUseRemark.length > 50) {
        errorMessage = 'Key use remark must be <= 50 characters length.';
      } else if (STORE_DATA.cancellationMethod.length > 50) {
        errorMessage = 'Cancellation method must be <= 50 characters length.';
      } else if (STORE_DATA.graceTime.length > 50) {
        errorMessage = 'Grace time must be <= 50 characters length.';
      } else if (STORE_DATA.companyName.length > 50) {
        errorMessage = 'Company name must be <= 50 characters length.';
      } else if (STORE_DATA.companyTel.length > 13) {
        errorMessage = 'Company tel number must be <= 13 characters length.';
      } else if (STORE_DATA.permitLicense.length > 50) {
        errorMessage = 'Permit license must be <= 50 characters length.';
      } else if (STORE_DATA.receptionEntry.length > 50) {
        errorMessage = 'Reception entry must be <= 50 characters length.';
      } else if (STORE_DATA.certificationRequireRemark.length > 50) {
        errorMessage = 'Certification require remark must be <= 50 characters length.';
      } else if (STORE_DATA.elevatorUseRemark.length > 50) {
        errorMessage = 'Elevator use remark must be <= 50 characters length.';
      } else if (STORE_DATA.waitingPlaceRemark.length > 50) {
        errorMessage = 'Waiting place remark must be <= 50 characters length.';
      } else {
        isPassed = true;
        errorMessage = '';
      }
  
      console.log('isPassed', isPassed);
  
      return isPassed;
    });

    const saveButton = getByTestId('saveButton');

    fireEvent.press(saveButton);

    expect(saveButton).toBeTruthy();

    expect(handleValidationUpdateInformation).toHaveBeenCalled();

    await afterAll(() => {
      cleanup();
    });
  });

  it('Test when click on the save button and validation is NOT PASS ==> CAN NOT UPDATE', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreInformationEdit {...props} />
      </Provider>,
    );

    const STORE_DATA = {
      businessClassification: '90 northstream II',
      deliveryDestinationCode: '20',
      deliveryDestinationNameKana: 'Destination name kana update',
      deliveryDestinationName: 'Destination name update',
      postCode: '12345678',
      addressOne: '266 Doi Can',
      addressTwo: '165 Luong The Loi',
      tel: '1242424242424242424242424242424',
  
      deliveryFrequency: '',
      quantityPerDelivery: '',
      specifyDeliveryTime: '',
      scheduledTimeFirst: '',
      scheduledTimeSecond: '',
      vehicelRegulation: '',
      heightPerWidth: '',
      parkingPlaceDesignation: '',
      parkingPlaceDesignationRemark: '',
      deliverySlip: '',
      deliverySlipRemark: '',
      daisha: '',
      daishaRemark: '',
      storagePlace: '',
      storageSpecialNote: '',
      emptyDelivery: '',
      keyUse: '',
      keyUseRemark: '',
      securityUse: '',
      cancellationMethod: '',
      graceTime: '',
      companyName: '',
      companyTel: '',
      facilityRule: '',
      permitLicense: '',
      receptionEntry: '',
      certificationRequire: '',
      certificationRequireRemark: '',
      elevatorUse: '',
      elevatorUseRemark: '',
      waitingPlace: '',
      waitingPlaceRemark: '',
      deliveryManual: '',
      deliveryRouteMapImage: '',
      deliveryRouteMapRemark: '',
      routeAMPPImage: '',
      routeAMPPRemark: '',
      parkingAMPPImage: '',
      parkingAMPPRemark: '',
    }

    const handleUpdateStoreInformation = jest.fn();

    handleUpdateStoreInformation.mockImplementation( async () => {
      const SITE = Config.URL_DOMAIN_CLOUD;
    
      const HEADERS = {
        'Content-Type': 'multipart/form-data',
      };
  
      const PARAMS = {
        _method: 'PUT',
      };
  
      const URL = `${urlAPI.apiUpdateStoreInformation}/${props.route.params.store_id}?${object2Path(PARAMS)}`;
  
      console.log('URL', URL);
  
      const DATA = new FormData();
  
      DATA.append('bussiness_classification', STORE_DATA.businessClassification);
      DATA.append('delivery_destination_code', STORE_DATA.deliveryDestinationCode);
      DATA.append('destination_name_kana', STORE_DATA.deliveryDestinationNameKana);
      DATA.append('destination_name', STORE_DATA.deliveryDestinationName);
      DATA.append('post_code',STORE_DATA. postCode);
      DATA.append('address_1',STORE_DATA. addressOne);
      DATA.append('address_2', STORE_DATA.addressTwo);
      DATA.append('tel_number', STORE_DATA.tel);
  
      DATA.append('delivery_frequency', STORE_DATA.deliveryFrequency);
      DATA.append('quantity_delivery', STORE_DATA.quantityPerDelivery);
      DATA.append('specify_delivery_time', STORE_DATA.specifyDeliveryTime);
      DATA.append('scheduled_time_first', STORE_DATA.scheduledTimeFirst);
      DATA.append('scheduled_time_second', STORE_DATA.scheduledTimeSecond);
      DATA.append('vehicle_height_width', STORE_DATA.vehicelRegulation);
      DATA.append('height_width', STORE_DATA.heightPerWidth);
      DATA.append('parking_place', STORE_DATA.parkingPlaceDesignation);
      DATA.append('note_1', STORE_DATA.parkingPlaceDesignationRemark);
      DATA.append('delivery_slip', STORE_DATA.deliverySlip);
      DATA.append('note_2', STORE_DATA.deliverySlipRemark);
      DATA.append('daisha', STORE_DATA.daisha);
      DATA.append('note_3', STORE_DATA.daishaRemark);
      DATA.append('place', STORE_DATA.storagePlace);
      DATA.append('note_4', STORE_DATA.storageSpecialNote);
      DATA.append('empty_recovery', STORE_DATA.emptyDelivery);
      DATA.append('key', STORE_DATA.keyUse);
      DATA.append('note_5', STORE_DATA.keyUseRemark);
      DATA.append('security', STORE_DATA.securityUse);
      DATA.append('cancel_method', STORE_DATA.cancellationMethod);
      DATA.append('grace_time', STORE_DATA.graceTime);
      DATA.append('company_name', STORE_DATA.companyName);
      DATA.append('tel_number_2', STORE_DATA.companyTel);
      DATA.append('inside_rule', STORE_DATA.facilityRule);
      DATA.append('license', STORE_DATA.permitLicense);
      DATA.append('reception_or_entry', STORE_DATA.receptionEntry);
      DATA.append('cerft_required', STORE_DATA.certificationRequire);
      DATA.append('note_6', STORE_DATA.certificationRequireRemark);
      DATA.append('elevator', STORE_DATA.elevatorUse);
      DATA.append('note_7', STORE_DATA.elevatorUseRemark);
      DATA.append('waiting_place', STORE_DATA.waitingPlace);
      DATA.append('note_8', STORE_DATA.waitingPlaceRemark);
  
      DATA.append('delivery_manual', STORE_DATA.deliveryManual);
  
      DATA.append('delivery_route_map_path', {
        uri: STORE_DATA.deliveryRouteMapImage,
        type: 'image',
        name: 'delivery_route_map_path',
      });
  
      DATA.append('delivery_route_map_other_remark', STORE_DATA.deliveryRouteMapRemark);
  
      DATA.append('parking_position_1_file_path', {
        uri: STORE_DATA.routeAMPPImage,
        type: 'image',
        name: 'parking_position_1_file_path',
      });
  
      DATA.append('parking_position_1_other_remark', STORE_DATA.routeAMPPRemark);
  
      DATA.append('parking_position_2_file_path', {
        uri: STORE_DATA.parkingAMPPImage,
        type: 'image',
        name: 'parking_position_2_file_path',
      });
  
      DATA.append('parking_position_2_other_remark', STORE_DATA.parkingAMPPRemark);
  
      DATA.append('last_updated_at', new Date().toISOString());
  
      DATA.append('pass_code', props.route.params.pass_code);
  
      console.log('<<<<<======================>>>>>');
      console.log(JSON.stringify(DATA));
      console.log('<<<<<======================>>>>>');
  
      if (handleValidationUpdateInformation() === true) {
        try {
          dispatch(setLoading(true));
    
          const response = await updateStoreInformation(SITE, HEADERS, URL, DATA, PARAMS);
  
          if (response.data) {
            dispatch(setInitDataStoreDetail(true));
            dispatch(setInitDataStoreEdit(true));
  
            props.navigation.navigate('StoreInformation', {
              base_id: props.route.params.base_id,
              store_name: props.route.params.store_name,
              store_id: props.route.params.store_id,
              pass_code: props.route.params.pass_code,
              course_id: props.route.params.course_id,
              course_name: props.route.params.course_name,
            });
          } else {
            errorMessage = 'Update store information failed.';
          }
    
          dispatch(setLoading(false));
        } catch (error) {
          console.log(error);
          dispatch(setLoading(false));
        }
      }
    });

    const handleValidationUpdateInformation = jest.fn();

    let isPassed = false;
    let errorMessage = '';

    handleValidationUpdateInformation.mockImplementation(() => {
      if (STORE_DATA.businessClassification.length > 30) {
        errorMessage = 'Business classification must be <= 30 characters length.';
      } else if (STORE_DATA.deliveryDestinationName.length > 100) {
        errorMessage = 'Delivery destination name must be <= 100 characters length.';
      } else if (STORE_DATA.deliveryDestinationName.length > 50) {
        errorMessage = 'Delivery destination name must be <= 50 charaters length.';
      } else if (STORE_DATA.postCode.length > 8) {
        errorMessage = 'Post code must be <= 8 characters length.';
      } else if (STORE_DATA.addressOne.length > 20) {
        errorMessage = 'Address one must be <= 20 characters length.';
      } else if (STORE_DATA.addressTwo.length > 20) {
        errorMessage = 'Address two must be <= 20 characters length.';
      } else if (STORE_DATA.tel.length > 13) {
        errorMessage = 'Tel number must be <= 13 characters length.';
      } else if (STORE_DATA.deliveryFrequency.length > 20) {
        errorMessage = 'Delivery frequency must be <= 20 chracters length.';
      } else if (parseInt(STORE_DATA.quantityPerDelivery) > 1000) {
        errorMessage = 'Quantity per delivery must be <= 1000.';
      } else if (parseInt(STORE_DATA.specifyDeliveryTime) > 60) {
        errorMessage = 'Specify delivery time must be <= 60.';
      } else if (parseInt(STORE_DATA.scheduledTimeFirst) > 60) {
        errorMessage = 'Scheduled time first must be <= 60.';
      } else if (parseInt(STORE_DATA.scheduledTimeSecond) > 60) {
        errorMessage = 'Scheduled time second must be <= 60.';
      } else if (parseInt(STORE_DATA.vehicelRegulation) > 999) {
        errorMessage = 'Vehicle regulation must be <= 999.';
      } else if (STORE_DATA.parkingPlaceDesignationRemark.length > 30) {
        errorMessage = 'Note 1 must be <= 30 characters length.';
      } else if (STORE_DATA.deliverySlipRemark.length > 30) {
        errorMessage = 'Note 2 must be <= 30 characters length.';
      } else if (STORE_DATA.daishaRemark.length > 50) {
        errorMessage = 'Note 3 must be <= 50 characters length.';
      } else if (STORE_DATA.storagePlace.length > 50) {
        errorMessage = 'Storage place must be <= 50 characters length.';
      } else if (STORE_DATA.storageSpecialNote.length > 50) {
        errorMessage = 'Storage special note must be <= 50 characters length.';
      } else if (STORE_DATA.emptyDelivery.length > 50) {
        errorMessage = 'Empty delivery must be <= 50 characters length.';
      } else if (STORE_DATA.keyUseRemark.length > 50) {
        errorMessage = 'Key use remark must be <= 50 characters length.';
      } else if (STORE_DATA.cancellationMethod.length > 50) {
        errorMessage = 'Cancellation method must be <= 50 characters length.';
      } else if (STORE_DATA.graceTime.length > 50) {
        errorMessage = 'Grace time must be <= 50 characters length.';
      } else if (STORE_DATA.companyName.length > 50) {
        errorMessage = 'Company name must be <= 50 characters length.';
      } else if (STORE_DATA.companyTel.length > 13) {
        errorMessage = 'Company tel number must be <= 13 characters length.';
      } else if (STORE_DATA.permitLicense.length > 50) {
        errorMessage = 'Permit license must be <= 50 characters length.';
      } else if (STORE_DATA.receptionEntry.length > 50) {
        errorMessage = 'Reception entry must be <= 50 characters length.';
      } else if (STORE_DATA.certificationRequireRemark.length > 50) {
        errorMessage = 'Certification require remark must be <= 50 characters length.';
      } else if (STORE_DATA.elevatorUseRemark.length > 50) {
        errorMessage = 'Elevator use remark must be <= 50 characters length.';
      } else if (STORE_DATA.waitingPlaceRemark.length > 50) {
        errorMessage = 'Waiting place remark must be <= 50 characters length.';
      } else {
        isPassed = true;
        errorMessage = '';
      }
  
      console.log('isPassed', isPassed);
  
      return isPassed;
    });

    const saveButton = getByTestId('saveButton');

    fireEvent.press(saveButton);

    expect(saveButton).toBeTruthy();

    expect(handleValidationUpdateInformation).toHaveBeenCalled();

    expect(isPassed).toBeFalsy();

    expect(errorMessage).toBe('Tel number must be <= 13 characters length.');

    expect(handleUpdateStoreInformation).not.toHaveBeenCalled();

    await afterAll(() => {
      cleanup();
    });
  });

  it('Test when click on the save button and validation is PASS ==> CAN UPDATE', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreInformationEdit {...props} />
      </Provider>,
    );

    let isPassed = false;
    let errorMessage = '';

    const STORE_DATA = {
      businessClassification: '90 northstream II',
      deliveryDestinationCode: '20',
      deliveryDestinationNameKana: 'Destination name kana update',
      deliveryDestinationName: 'Destination name update',
      postCode: '12345678',
      addressOne: '266 Doi Can',
      addressTwo: '165 Luong The Loi',
      tel: '0342883925',
  
      deliveryFrequency: '',
      quantityPerDelivery: '',
      specifyDeliveryTime: '',
      scheduledTimeFirst: '',
      scheduledTimeSecond: '',
      vehicelRegulation: '',
      heightPerWidth: '',
      parkingPlaceDesignation: '',
      parkingPlaceDesignationRemark: '',
      deliverySlip: '',
      deliverySlipRemark: '',
      daisha: '',
      daishaRemark: '',
      storagePlace: '',
      storageSpecialNote: '',
      emptyDelivery: '',
      keyUse: '',
      keyUseRemark: '',
      securityUse: '',
      cancellationMethod: '',
      graceTime: '',
      companyName: '',
      companyTel: '',
      facilityRule: '',
      permitLicense: '',
      receptionEntry: '',
      certificationRequire: '',
      certificationRequireRemark: '',
      elevatorUse: '',
      elevatorUseRemark: '',
      waitingPlace: '',
      waitingPlaceRemark: '',
      deliveryManual: '',
      deliveryRouteMapImage: '',
      deliveryRouteMapRemark: '',
      routeAMPPImage: '',
      routeAMPPRemark: '',
      parkingAMPPImage: '',
      parkingAMPPRemark: '',
    }

    const handleUpdateStoreInformation = jest.fn();
    
    handleUpdateStoreInformation.mockImplementation( async () => {
      const SITE = Config.URL_DOMAIN_CLOUD;
    
      const HEADERS = {
        'Content-Type': 'multipart/form-data',
      };
  
      const PARAMS = {
        _method: 'PUT',
      };
  
      const URL = `${urlAPI.apiUpdateStoreInformation}/${props.route.params.store_id}?${object2Path(PARAMS)}`;
  
      console.log('URL', URL);
  
      const DATA = new FormData();
  
      DATA.append('bussiness_classification', STORE_DATA.businessClassification);
      DATA.append('delivery_destination_code', STORE_DATA.deliveryDestinationCode);
      DATA.append('destination_name_kana', STORE_DATA.deliveryDestinationNameKana);
      DATA.append('destination_name', STORE_DATA.deliveryDestinationName);
      DATA.append('post_code',STORE_DATA. postCode);
      DATA.append('address_1',STORE_DATA. addressOne);
      DATA.append('address_2', STORE_DATA.addressTwo);
      DATA.append('tel_number', STORE_DATA.tel);
  
      DATA.append('delivery_frequency', STORE_DATA.deliveryFrequency);
      DATA.append('quantity_delivery', STORE_DATA.quantityPerDelivery);
      DATA.append('specify_delivery_time', STORE_DATA.specifyDeliveryTime);
      DATA.append('scheduled_time_first', STORE_DATA.scheduledTimeFirst);
      DATA.append('scheduled_time_second', STORE_DATA.scheduledTimeSecond);
      DATA.append('vehicle_height_width', STORE_DATA.vehicelRegulation);
      DATA.append('height_width', STORE_DATA.heightPerWidth);
      DATA.append('parking_place', STORE_DATA.parkingPlaceDesignation);
      DATA.append('note_1', STORE_DATA.parkingPlaceDesignationRemark);
      DATA.append('delivery_slip', STORE_DATA.deliverySlip);
      DATA.append('note_2', STORE_DATA.deliverySlipRemark);
      DATA.append('daisha', STORE_DATA.daisha);
      DATA.append('note_3', STORE_DATA.daishaRemark);
      DATA.append('place', STORE_DATA.storagePlace);
      DATA.append('note_4', STORE_DATA.storageSpecialNote);
      DATA.append('empty_recovery', STORE_DATA.emptyDelivery);
      DATA.append('key', STORE_DATA.keyUse);
      DATA.append('note_5', STORE_DATA.keyUseRemark);
      DATA.append('security', STORE_DATA.securityUse);
      DATA.append('cancel_method', STORE_DATA.cancellationMethod);
      DATA.append('grace_time', STORE_DATA.graceTime);
      DATA.append('company_name', STORE_DATA.companyName);
      DATA.append('tel_number_2', STORE_DATA.companyTel);
      DATA.append('inside_rule', STORE_DATA.facilityRule);
      DATA.append('license', STORE_DATA.permitLicense);
      DATA.append('reception_or_entry', STORE_DATA.receptionEntry);
      DATA.append('cerft_required', STORE_DATA.certificationRequire);
      DATA.append('note_6', STORE_DATA.certificationRequireRemark);
      DATA.append('elevator', STORE_DATA.elevatorUse);
      DATA.append('note_7', STORE_DATA.elevatorUseRemark);
      DATA.append('waiting_place', STORE_DATA.waitingPlace);
      DATA.append('note_8', STORE_DATA.waitingPlaceRemark);
  
      DATA.append('delivery_manual', STORE_DATA.deliveryManual);
  
      DATA.append('delivery_route_map_path', {
        uri: STORE_DATA.deliveryRouteMapImage,
        type: 'image',
        name: 'delivery_route_map_path',
      });
  
      DATA.append('delivery_route_map_other_remark', STORE_DATA.deliveryRouteMapRemark);
  
      DATA.append('parking_position_1_file_path', {
        uri: STORE_DATA.routeAMPPImage,
        type: 'image',
        name: 'parking_position_1_file_path',
      });
  
      DATA.append('parking_position_1_other_remark', STORE_DATA.routeAMPPRemark);
  
      DATA.append('parking_position_2_file_path', {
        uri: STORE_DATA.parkingAMPPImage,
        type: 'image',
        name: 'parking_position_2_file_path',
      });
  
      DATA.append('parking_position_2_other_remark', STORE_DATA.parkingAMPPRemark);
  
      DATA.append('last_updated_at', new Date().toISOString());
  
      DATA.append('pass_code', props.route.params.pass_code);
  
      console.log('<<<<<======================>>>>>');
      console.log(JSON.stringify(DATA));
      console.log('<<<<<======================>>>>>');
  
      if (handleValidationUpdateInformation() === true) {
        try {
          dispatch(setLoading(true));
    
          const response = await updateStoreInformation(SITE, HEADERS, URL, DATA, PARAMS);
  
          if (response.data) {
            dispatch(setInitDataStoreDetail(true));
            dispatch(setInitDataStoreEdit(true));
  
            props.navigation.navigate('StoreInformation', {
              base_id: props.route.params.base_id,
              store_name: props.route.params.store_name,
              store_id: props.route.params.store_id,
              pass_code: props.route.params.pass_code,
              course_id: props.route.params.course_id,
              course_name: props.route.params.course_name,
            });
          } else {
            errorMessage = 'Update store information failed.';
          }
    
          dispatch(setLoading(false));
        } catch (error) {
          console.log(error);
          dispatch(setLoading(false));
        }
      }
    });

    const handleValidationUpdateInformation = jest.fn();

    handleValidationUpdateInformation.mockImplementation(() => {
      if (STORE_DATA.businessClassification.length > 30) {
        errorMessage = 'Business classification must be <= 30 characters length.';
      } else if (STORE_DATA.deliveryDestinationName.length > 100) {
        errorMessage = 'Delivery destination name must be <= 100 characters length.';
      } else if (STORE_DATA.deliveryDestinationName.length > 50) {
        errorMessage = 'Delivery destination name must be <= 50 charaters length.';
      } else if (STORE_DATA.postCode.length > 8) {
        errorMessage = 'Post code must be <= 8 characters length.';
      } else if (STORE_DATA.addressOne.length > 20) {
        errorMessage = 'Address one must be <= 20 characters length.';
      } else if (STORE_DATA.addressTwo.length > 20) {
        errorMessage = 'Address two must be <= 20 characters length.';
      } else if (STORE_DATA.tel.length > 13) {
        errorMessage = 'Tel number must be <= 13 characters length.';
      } else if (STORE_DATA.deliveryFrequency.length > 20) {
        errorMessage = 'Delivery frequency must be <= 20 chracters length.';
      } else if (parseInt(STORE_DATA.quantityPerDelivery) > 1000) {
        errorMessage = 'Quantity per delivery must be <= 1000.';
      } else if (parseInt(STORE_DATA.specifyDeliveryTime) > 60) {
        errorMessage = 'Specify delivery time must be <= 60.';
      } else if (parseInt(STORE_DATA.scheduledTimeFirst) > 60) {
        errorMessage = 'Scheduled time first must be <= 60.';
      } else if (parseInt(STORE_DATA.scheduledTimeSecond) > 60) {
        errorMessage = 'Scheduled time second must be <= 60.';
      } else if (parseInt(STORE_DATA.vehicelRegulation) > 999) {
        errorMessage = 'Vehicle regulation must be <= 999.';
      } else if (STORE_DATA.parkingPlaceDesignationRemark.length > 30) {
        errorMessage = 'Note 1 must be <= 30 characters length.';
      } else if (STORE_DATA.deliverySlipRemark.length > 30) {
        errorMessage = 'Note 2 must be <= 30 characters length.';
      } else if (STORE_DATA.daishaRemark.length > 50) {
        errorMessage = 'Note 3 must be <= 50 characters length.';
      } else if (STORE_DATA.storagePlace.length > 50) {
        errorMessage = 'Storage place must be <= 50 characters length.';
      } else if (STORE_DATA.storageSpecialNote.length > 50) {
        errorMessage = 'Storage special note must be <= 50 characters length.';
      } else if (STORE_DATA.emptyDelivery.length > 50) {
        errorMessage = 'Empty delivery must be <= 50 characters length.';
      } else if (STORE_DATA.keyUseRemark.length > 50) {
        errorMessage = 'Key use remark must be <= 50 characters length.';
      } else if (STORE_DATA.cancellationMethod.length > 50) {
        errorMessage = 'Cancellation method must be <= 50 characters length.';
      } else if (STORE_DATA.graceTime.length > 50) {
        errorMessage = 'Grace time must be <= 50 characters length.';
      } else if (STORE_DATA.companyName.length > 50) {
        errorMessage = 'Company name must be <= 50 characters length.';
      } else if (STORE_DATA.companyTel.length > 13) {
        errorMessage = 'Company tel number must be <= 13 characters length.';
      } else if (STORE_DATA.permitLicense.length > 50) {
        errorMessage = 'Permit license must be <= 50 characters length.';
      } else if (STORE_DATA.receptionEntry.length > 50) {
        errorMessage = 'Reception entry must be <= 50 characters length.';
      } else if (STORE_DATA.certificationRequireRemark.length > 50) {
        errorMessage = 'Certification require remark must be <= 50 characters length.';
      } else if (STORE_DATA.elevatorUseRemark.length > 50) {
        errorMessage = 'Elevator use remark must be <= 50 characters length.';
      } else if (STORE_DATA.waitingPlaceRemark.length > 50) {
        errorMessage = 'Waiting place remark must be <= 50 characters length.';
      } else {
        isPassed = true;
        errorMessage = '';
      }
  
      console.log('isPassed', isPassed);
  
      return isPassed;
    });

    const saveButton = getByTestId('saveButton');

    fireEvent.press(saveButton);

    expect(saveButton).toBeTruthy();

    expect(handleValidationUpdateInformation).toHaveBeenCalled();

    expect(isPassed).toBeFalsy();

    expect(errorMessage).toBe('Tel number must be <= 13 characters length.');

    expect(handleUpdateStoreInformation).not.toHaveBeenCalled();

    await afterAll(() => {
      cleanup();
    });
  });

  it('Test when click on the add new delivery manual button, handle validation then add to the delivery manual list', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreInformationEdit {...props} />
      </Provider>,
    )

    let DELIVERY_MANUAL_LIST = [];

    let errorMessage = '';

    let subDeliveryManual = '';

    const handleAddDeliveryPlaceInput = jest.fn();

    handleAddDeliveryPlaceInput.mockImplementation(() => {
      if (subDeliveryManual.length === 0) {
        errorMessage = 'Please input delivery.';
      } else if (subDeliveryManual.length > 50) {
        errorMessage = 'Maximum length is 50 characters.';
      } else {
        const TEMP_DELIVERY_PLACE_LIST = DELIVERY_MANUAL_LIST;
    
        if (TEMP_DELIVERY_PLACE_LIST.length === 0 || TEMP_DELIVERY_PLACE_LIST.length < 20) {
          TEMP_DELIVERY_PLACE_LIST.push(
            { store_id: props.route.params.store_id, content: subDeliveryManual },
          );

          subDeliveryManual = '';

          errorMessage = '';
        } else {
          errorMessage = 'Maximum delivery is 20 lines.';
        }
    
        DELIVERY_MANUAL_LIST = TEMP_DELIVERY_PLACE_LIST;
      }
    });

    const addDeliveryManualButton = getByTestId('addDeliveryManualButton');

    fireEvent.press(addDeliveryManualButton);

    expect(addDeliveryManualButton).toBeTruthy();

    expect(handleAddDeliveryPlaceInput).toHaveBeenCalled();

    expect(errorMessage).toBe('Please input delivery.');

    expect(DELIVERY_MANUAL_LIST).toEqual([]);

    await afterAll(() => {
      cleanup();
    });
  });

  it('Test when click on the minus delivery button, handle remove delivery manual item form the delivery manual list', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreInformationEdit {...props} />
      </Provider>,
    );

    let DELIVERY_MANUAL_LIST = [
      {  store_id: 1, content: 'カモが2枚の翼を広げた。' },
      {  store_id: 2, content: 'ガチョウが2枚の羽を広げました。' },
      {  store_id: 3, content: 'バッファローが翼を2枚広げた。' },
      {  store_id: 4, content: '両翼を広げた犬。' },
      {  store_id: 5, content: 'アリが2枚の羽を広げた。' },
    ];
    
    const handleRemoveDeliveryPlaceInput = jest.fn();

    handleRemoveDeliveryPlaceInput.mockImplementation((index) => {
      const TEMP_DELIVERY_PLACE_LIST = DELIVERY_MANUAL_LIST;
      TEMP_DELIVERY_PLACE_LIST.splice(index, 1);
      DELIVERY_MANUAL_LIST = TEMP_DELIVERY_PLACE_LIST;
    });

    const minusDeliveryManualButton = getByTestId('minusDeliveryManualButton');

    fireEvent.press(minusDeliveryManualButton);

    expect(minusDeliveryManualButton).toBeTruthy();

    let index = 0;

    handleRemoveDeliveryPlaceInput(index);

    expect(handleRemoveDeliveryPlaceInput).toHaveBeenCalled();

    expect(DELIVERY_MANUAL_LIST).toEqual([
      {  store_id: 2, content: 'ガチョウが2枚の羽を広げました。' },
      {  store_id: 3, content: 'バッファローが翼を2枚広げた。' },
      {  store_id: 4, content: '両翼を広げた犬。' },
      {  store_id: 5, content: 'アリが2枚の羽を広げた。' },
    ]);

    await afterAll(() => {
      cleanup();
    });
  });

  it('Test when open the store edit screen for the first time, call function askForCameraUsagePermission', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreInformationEdit {...props} />
      </Provider>,
    );

    let hasCameraUsagePermission = false;

    const askForCameraUsagePermission = jest.fn();

    askForCameraUsagePermission.mockImplementation(async () => {
      const isCameraPermissionApproved = await ImagePicker.getCameraPermissionsAsync();

      console.log('isCameraPermissionApproved: ', isCameraPermissionApproved);

      if (isCameraPermissionApproved.granted === false) {
        const cameraUsagePermission = await ImagePicker.requestCameraPermissionsAsync();
    
        if (cameraUsagePermission.status !== 'granted') {
          hasCameraUsagePermission = false;
        } else {
          hasCameraUsagePermission = true;
        }
      } else {
        hasCameraUsagePermission = true;
      }

      console.log('hasCameraUsagePermission: ', hasCameraUsagePermission);
    });

    const cameraButton = getByTestId('cameraButton');

    fireEvent.press(cameraButton);

    expect(cameraButton).toBeTruthy();

    askForCameraUsagePermission();

    expect(askForCameraUsagePermission).toHaveBeenCalled();

    expect(hasCameraUsagePermission).toBeTruthy();

    await afterAll(() => {
      cleanup();
    });
  });

  it('Test when open the store edit screen for the first time, call function askForPhotoLibraryUsagePermission', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreInformationEdit {...props} />
      </Provider>,
    );

    let hasPhotoLibraryUsagePermission = false;

    const askForPhotoLibraryUsagePermission = jest.fn();

    askForPhotoLibraryUsagePermission.mockImplementation(async () => {
      const isPhotoLibraryPermissionApproved = await ImagePicker.getMediaLibraryPermissionsAsync();

      console.log('isPhotoLibraryPermissionApproved: ', isPhotoLibraryPermissionApproved);

      if (isPhotoLibraryPermissionApproved.granted === false) {
        const photoLibraryUsagePermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (photoLibraryUsagePermission.status !== 'granted') {
          hasPhotoLibraryUsagePermission = false;
        } else {
          hasPhotoLibraryUsagePermission = true;
        }
      } else {
        hasPhotoLibraryUsagePermission = true;
      }

      console.log('hasPhotoLibraryUsagePermission: ', hasPhotoLibraryUsagePermission);
    });

    const cameraButton = getByTestId('cameraButton');

    fireEvent.press(cameraButton);

    expect(cameraButton).toBeTruthy();

    askForPhotoLibraryUsagePermission();

    expect(askForPhotoLibraryUsagePermission).toHaveBeenCalled();

    expect(hasPhotoLibraryUsagePermission).toBeTruthy();

    await afterAll(() => {
      cleanup();
    });
  });

  it('Test when click on the upload delivery route image button, call function pickImageDelivertRouteMap', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreInformationEdit {...props} />
      </Provider>,
    );

    let errorMessage = '';

    let deliveryRouteMapImage = '';

    let defaultImage = 'http://thaibinhtv.vn/thumb/640x400/assets/images/imgstd.jpg';

    const pickImageDelivertRouteMap = jest.fn();

    pickImageDelivertRouteMap.mockImplementation(async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (result.cancelled === true) {
        if (deliveryRouteMapImage === '') {
          deliveryRouteMapImage = defaultImage;
        }
      } else {
        const fileInfor = await FileSystem.getInfoAsync(result.uri);
  
        let fileExtension = result.uri;
  
        fileExtension = fileExtension.substring(fileExtension.lastIndexOf('.') + 1);
        
        console.log('fileSize: ', fileInfor.size);
  
        console.log('fileExtension: ', fileExtension);
  
        if (fileInfor.size > 3141000) {
          errorMessage = '画像は3MB以内でアップロードしてください';
        } else if (fileExtension !== 'jpg' && fileExtension !== 'png') {
          errorMessage = 'アップロードできる画像形式はjpg,pngのみです。画像形式を確認してください';
        } else {
          deliveryRouteMapImage = result.uri;
        }
      }
    });

    const cameraButton = getByTestId('cameraButton');

    fireEvent.press(cameraButton);

    expect(cameraButton).toBeTruthy();

    pickImageDelivertRouteMap();

    expect(pickImageDelivertRouteMap).toHaveBeenCalled();

    expect(deliveryRouteMapImage).toEqual(defaultImage);

    await afterAll(() => {
      cleanup();
    });
  });

  it('Test when click on the upload delivery route image button, call function pickImageRouteAMPP', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreInformationEdit {...props} />
      </Provider>,
    );

    let errorMessage = '';

    let routeAMPPImage = '';

    let defaultImage = 'http://thaibinhtv.vn/thumb/640x400/assets/images/imgstd.jpg';

    const pickImageRouteAMPP = jest.fn();

    pickImageRouteAMPP.mockImplementation(async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (result.cancelled === true) {
        if (routeAMPPImage === '') {
          routeAMPPImage = defaultImage;
        }
      } else {
        const fileInfor = await FileSystem.getInfoAsync(result.uri);
  
        let fileExtension = result.uri;
  
        fileExtension = fileExtension.substring(fileExtension.lastIndexOf('.') + 1);
        
        console.log('fileSize: ', fileInfor.size);
  
        console.log('fileExtension: ', fileExtension);
  
        if (fileInfor.size > 3141000) {
          errorMessage = '画像は3MB以内でアップロードしてください';
        } else if (fileExtension !== 'jpg' && fileExtension !== 'png') {
          errorMessage = 'アップロードできる画像形式はjpg,pngのみです。画像形式を確認してください';
        } else {
          routeAMPPImage = result.uri;
        }
      }
    });

    const cameraButton = getByTestId('cameraButton');

    fireEvent.press(cameraButton);

    expect(cameraButton).toBeTruthy();

    pickImageRouteAMPP();

    expect(pickImageRouteAMPP).toHaveBeenCalled();

    expect(routeAMPPImage).toEqual(defaultImage);

    await afterAll(() => {
      cleanup();
    });
  });

  it('Test when click on the upload delivery route image button, call function pickImageParkingAMPP', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreInformationEdit {...props} />
      </Provider>,
    );

    let errorMessage = '';

    let parkingAMPPImage = '';

    let defaultImage = 'http://thaibinhtv.vn/thumb/640x400/assets/images/imgstd.jpg';

    const pickImageParkingAMPP = jest.fn();

    pickImageParkingAMPP.mockImplementation(async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (result.cancelled === true) {
        if (parkingAMPPImage === '') {
          parkingAMPPImage = defaultImage;
        }
      } else {
        const fileInfor = await FileSystem.getInfoAsync(result.uri);
  
        let fileExtension = result.uri;
  
        fileExtension = fileExtension.substring(fileExtension.lastIndexOf('.') + 1);
        
        console.log('fileSize: ', fileInfor.size);
  
        console.log('fileExtension: ', fileExtension);
  
        if (fileInfor.size > 3141000) {
          errorMessage = '画像は3MB以内でアップロードしてください';
        } else if (fileExtension !== 'jpg' && fileExtension !== 'png') {
          errorMessage = 'アップロードできる画像形式はjpg,pngのみです。画像形式を確認してください';
        } else {
          parkingAMPPImage = result.uri;
        }
      }
    });

    const cameraButton = getByTestId('cameraButton');

    fireEvent.press(cameraButton);

    expect(cameraButton).toBeTruthy();

    pickImageParkingAMPP();

    expect(pickImageParkingAMPP).toHaveBeenCalled();

    expect(parkingAMPPImage).toEqual(defaultImage);

    await afterAll(() => {
      cleanup();
    });
  });
});