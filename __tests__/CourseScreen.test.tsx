import { store } from 'src/store';
import { Keyboard } from 'react-native';
import { Provider } from 'react-redux';
import { Config, Validate } from 'src/const';
import { object2Path } from 'src/utils/object2Path';
import { cleanObject } from 'src/utils/handleObject';
import { getListCourse } from 'src/api/modules/store';
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
import CourseScreen from 'src/components/Store/views/course';

describe('<CourseScreen />', () => {
  const urlAPI = {
    apiGetListCourse: '/department/list-all',
  };

  const props = {
    navigation: {
      navigate: jest.fn(),
    },
    route: {
      params: {
        department: 1,
        course_code: 1,
        order_by: 'id',
        order_type: 'asc',
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

  it('Test if when click on the back button, navigate to the department screen',async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <CourseScreen {...props} />
      </Provider>,
    );

    const goBackBaseScreen = jest.fn();

    goBackBaseScreen.mockImplementation(() => {
      props.navigation.navigate('Base');
    });

    const backButton = getByTestId('backButton');
    expect(backButton).toBeTruthy();

    await waitFor(() => {
      fireEvent.press(backButton);

      expect(goBackBaseScreen).toHaveBeenCalled();
    });

    afterEach(cleanup);
  });

  it('Test if call api getListCourse when initialization the course screen', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <CourseScreen {...props} />
      </Provider>,
    );

    let noDataText = 'データなし';

    let isShowNoDataText = false;

    const dispatch = useDispatch();

    let listCourse = [];

    const handleGetListCourse = jest.fn();

    handleGetListCourse.mockImplementation(async () => {
      dispatch(setLoading(true));

      Keyboard.dismiss();

      const URL = urlAPI.apiGetListCourse;

      try {
        const response = await getListCourse(
          Config.URL_DOMAIN_CLOUD,
          URL,
          null,
        );

        if (response.data.code === 200) {
          listCourse = response.data.data;
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

    handleGetListCourse();
    expect(handleGetListCourse).toHaveBeenCalled();

    expect(listCourse).not.toBeNull();

    expect(showToast).not.toHaveBeenCalled();

    expect(noDataText).not.toBeNull();

    expect(noDataText).toBe('データなし');

    expect(isShowNoDataText).toBeFalsy();

    afterEach(cleanup);
  });

  it('Test when click on the sort icon button, open the sort modal', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <CourseScreen {...props} />
      </Provider>,
    );

    let modalSortVisible = false;

    const handleOpenModalSort = jest.fn();

    handleOpenModalSort.mockImplementation(() => {
      modalSortVisible = !modalSortVisible;
    });

    const sortButtonIcon = getByTestId('sortButtonIcon');
    expect(sortButtonIcon).toBeTruthy();

    await waitFor(() => {
      fireEvent.press(sortButtonIcon);

      handleOpenModalSort();

      expect(handleOpenModalSort).toHaveBeenCalled();

      expect(modalSortVisible).toBeTruthy();
    });

    afterEach(cleanup);
  });

  it(`Test when close sort modal, reset the value of the 'Sort By' field and 'Key Word' field`, async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <CourseScreen {...props} />
      </Provider>,
    );

    let sortKeyword = '';

    // 0 => 'ID順
    // 1 => 'A~Z順'

    let sortBy = 0;

    let modalSortVisible = false;

    const handleOpenModalSort = jest.fn();

    handleOpenModalSort.mockImplementation(() => {
      modalSortVisible = !modalSortVisible;
    });

    const sortButtonIcon = getByTestId('sortButtonIcon');
    expect(sortButtonIcon).toBeTruthy();

    await waitFor(() => {
      fireEvent.press(sortButtonIcon);

      handleOpenModalSort();

      expect(handleOpenModalSort).toHaveBeenCalled();

      expect(modalSortVisible).toBeTruthy();

      sortKeyword = '東京';

      sortBy = 1;
    });

    const handleCloseModalSort = jest.fn();

    handleCloseModalSort.mockImplementation(() => {
      modalSortVisible = false;
    });

    const closeButtonModalSort = getByTestId('closeModalSortButton');
    expect(closeButtonModalSort).toBeTruthy();

    await waitFor(() => {
      fireEvent.press(closeButtonModalSort);

      handleCloseModalSort();

      expect(handleCloseModalSort).toHaveBeenCalled();

      expect(modalSortVisible).toBeFalsy();

      sortKeyword = '';

      sortBy = 0;

      expect(sortKeyword).toBe('');

      expect(sortBy).toBe(0);
    });

    afterEach(cleanup);
  });

  it('Test when click apply button, call function handleSortAction', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <CourseScreen {...props} />
      </Provider>,
    );

    let listCourse = [];

    const dispatch = useDispatch();

    const handleSortAction = jest.fn();

    handleSortAction.mockImplementation(async () => {
      try {
        dispatch(setLoading(true));

        let PARAMS = {
          department: props.route.params.department,
          course_code: props.route.params.course_code,
          order_by: props.route.params.order_by,
          order_type: props.route.params.order_type,
        };

        PARAMS = cleanObject(PARAMS);

        const URL = `${urlAPI.apiGetListCourse}?${object2Path(PARAMS)}`;

        const LIST_COURSE = await getListCourse(
          Config.URL_DOMAIN_CLOUD,
          URL,
          PARAMS,
        );

        const { code, data } = LIST_COURSE.data;

        if (code === 200) {
          listCourse = data;
        } else {
          showToast({
            variant: 'error',
            title: 'エラー',
            content: LIST_COURSE.data.message,
          });
        }

        dispatch(setLoading(false));
      } catch(error) {
        showToast({
          variant: 'error',
          title: 'エラー',
          content: error.response.data.message,
        });

        dispatch(setLoading(false));
      }
    });

    handleSortAction();

    expect(handleSortAction).toHaveBeenCalled();

    expect(listCourse).not.toBeNull();

    expect(showToast).not.toHaveBeenCalled();

    afterEach(cleanup);
  });

  it('Test when click on course name, move to store screen', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <CourseScreen {...props} />
      </Provider>,
    );

    const handleMoveToStoreScreen = jest.fn();

    handleMoveToStoreScreen.mockImplementation(() => {
      props.navigation.navigate('StoreScreen');
    });

    const courseName = getByTestId('courseName');
    expect(courseName).toBeTruthy();

    await waitFor(() => {
      fireEvent.press(courseName);

      handleMoveToStoreScreen();

      expect(handleMoveToStoreScreen).toHaveBeenCalled();

      expect(props.navigation.navigate).toHaveBeenCalledWith('StoreScreen');
    });

    afterEach(cleanup);
  });
});