import { store } from 'src/store';
import { Keyboard } from 'react-native';
import { Provider } from 'react-redux';
import { Config, Validate } from 'src/const';
import { object2Path } from 'src/utils/object2Path';
import { cleanObject } from 'src/utils/handleObject';
import { getListDepartment } from 'src/api/modules/store';
import { NavigationContainer } from '@react-navigation/native';
import { setLoading, setInitDataDepartment, setInitDataCourse } from 'src/actions/miscActions';
import { useDispatch } from 'react-redux';

import {
  render,
  cleanup,
  waitFor,
  fireEvent,
} from '@testing-library/react-native';

import React from 'react';
import renderer from 'react-test-renderer';
import Toast from 'react-native-toast-message';
import DepartmentScreen from 'src/components/Store/views/index';

describe('<DepartmentScreen />', () => {
  const urlAPI = {
    apiGetListDepartment: '/department/list-all',
  };

  const props = {
    navigation: {
      navigate: jest.fn(),
    },
    route: {},
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

  it('Test if when click on the back button, navigate to the dashboard screen',async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <DepartmentScreen {...props} />
      </Provider>,
    );

    const goBackDashboard = jest.fn();

    goBackDashboard.mockImplementation(() => {
      props.navigation.navigate('Dashboard');
    });

    const backButton = getByTestId('backButton');
    expect(backButton).toBeTruthy();

    await waitFor(() => {
      fireEvent.press(backButton);

      expect(goBackDashboard).toHaveBeenCalled();
    });

    afterEach(cleanup);
  });

  it('Test if call api getListDepartment when initialization the department screen', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <DepartmentScreen {...props} />
      </Provider>,
    );

    let noDataText = 'データなし';

    let isShowNoDataText = false;

    const dispatch = useDispatch();

    let listDepartment = [];

    const handleGetListDepartment = jest.fn();

    handleGetListDepartment.mockImplementation(async () => {
      dispatch(setLoading(true));

      Keyboard.dismiss();

      const URL = urlAPI.apiGetListDepartment;

      try {
        const response = await getListDepartment(
          Config.URL_DOMAIN_CLOUD,
          URL,
          null,
        );

        if (response.data.code === 200) {
          listDepartment = response.data.data;
        } else {
          showToast({
            variant: 'error',
            title: 'エラー',
            content: response.data.message,
          });

          isShowNoDataText = true;
        }

        dispatch(setLoading(false));
      } catch (error) {
        showToast({
          variant: 'error',
          title: 'エラー',
          content: error.response.data.message,
        });

        isShowNoDataText = true;

        dispatch(setLoading(false));
      }
    });

    handleGetListDepartment();
    expect(handleGetListDepartment).toHaveBeenCalled();

    expect(listDepartment).not.toBeNull();

    expect(showToast).not.toHaveBeenCalled();

    expect(noDataText).not.toBeNull();

    expect(noDataText).toBe('データなし');

    expect(isShowNoDataText).toBeFalsy();

    afterEach(cleanup);
  });
});