import { store } from 'src/store';
import { Provider } from 'react-redux';
import { Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';
import { Config, Validate } from 'src/const';
import { object2Path } from 'src/utils/object2Path';
import { cleanObject } from 'src/utils/handleObject';
import { NavigationContainer } from '@react-navigation/native';
import { getListStore, getStoreInformation } from 'src/api/modules/store';
import { setLoading, setInitDataStoreDetail, setInitDataStoreEdit } from 'src/actions/miscActions';

import {
  render,
  cleanup,
  waitFor,
  fireEvent,
} from '@testing-library/react-native';

import React from 'react';
import renderer from 'react-test-renderer';
import Toast from 'react-native-toast-message';
import StoreInformationDetail from 'src/components/Store/views/storeInformation';
import AsyncStorageMock from '__mocks__/@react-native-async-storage/async-storage';

describe('<StoreInformationDetail />', () => {
  const urlAPI = {
    apiGetDetailStore: '/mobile/store'
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
        <StoreInformationDetail {...props} />
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

    afterAll(() => {
      cleanup();
    });
  });

  it('Test when click on 基本情報 again, close the dropdown content', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreInformationDetail {...props} />
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

    afterAll(() => {
      cleanup();
    });
  });

  it('Test when click on 納品情報 open the dropdown content', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreInformationDetail {...props} />
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

    afterAll(() => {
      cleanup();
    });
  });

  it('Test when click on 納品情報 again, close the dropdown content', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreInformationDetail {...props} />
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

    afterAll(() => {
      cleanup();
    });
  });

  it('Test when click on 納品手順, open the dropdown content', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreInformationDetail {...props} />
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

    afterAll(() => {
      cleanup();
    });
  });

  it('Test when click on 納品手順 again, close the dropdown content', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreInformationDetail {...props} />
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

    afterAll(() => {
      cleanup();
    });
  });

  it('Test when click on ルート周辺情報, open the dropdown content', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreInformationDetail {...props} />
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

    afterAll(() => {
      cleanup();
    });
  });

  it('Test when click on ルート周辺情報 again, close the dropdown content', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreInformationDetail {...props} />
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

    afterAll(() => {
      cleanup();
    });
  });

  it('Test when click on 駐車場情報, open the dropdown content', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreInformationDetail {...props} />
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

    afterAll(() => {
      cleanup();
    });
  });

  it('Test when click on 駐車場情報 again, close the dropdown content', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreInformationDetail {...props} />
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

    afterAll(() => {
      cleanup();
    });
  });

  it('Test when click on the back button, navigate back to the store screen', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreInformationDetail {...props} />
      </Provider>,
    );

    const goBackStoreScreen = jest.fn();

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

    afterAll(() => {
      cleanup();
    });
  });

  it('Test when click on the edit button, navigate to the store information edit screen', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreInformationDetail {...props} />
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

    afterAll(() => {
      cleanup();
    });
  });

  it('Test call api getDetailStoreInformation', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreInformationDetail {...props} />
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

    afterAll(() => {
      cleanup();
    });
  });
});