import { store } from 'src/store';
import { Keyboard } from 'react-native';
import { Provider } from 'react-redux';
import { Config, Validate } from 'src/const';
import { object2Path } from 'src/utils/object2Path';
import { cleanObject } from 'src/utils/handleObject';
import { getListStore, getStoreInformation } from 'src/api/modules/store';
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
import StoreScreen from 'src/components/Store/views/course';

describe('<StoreScreen />', () => {
  const urlAPI = {
    apiGetListStore: '/department/list-all',
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

  it('Test if click on button apply modal authorize when the password is NULL', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreScreen {...props} />
      </Provider>,
    );

    const passwordTextInut = getByTestId('passwordTextInut');

    fireEvent.changeText(passwordTextInut, '');

    const buttonApply = getByTestId('buttonApply');
    fireEvent.press(buttonApply);

    await waitFor(() => {
      expect(showToast).toBeCalledWith({
        title: '警告',
        content: 'パスワードが必要です。',
        variant: 'danger',
      });
    });

    afterEach(() => {
      cleanup();
      jest.clearAllMocks();
    });
  });

  it(`Test if click on button apply modal authorize when the password's length is < 4`, async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreScreen {...props} />
      </Provider>,
    );

    const passwordTextInut = getByTestId('passwordTextInut');

    fireEvent.changeText(passwordTextInut, '123');

    const buttonApply = getByTestId('buttonApply');
    fireEvent.press(buttonApply);

    await waitFor(() => {
      expect(showToast).toBeCalledWith({
        title: '警告',
        content: 'パスワードの長さは 4 文字以上にする必要があります。',
        variant: 'danger',
      });
    });

    afterEach(() => {
      cleanup();
      jest.clearAllMocks();
    });
  });

  it('Test if click on button apply modal authorize when the password is INCORRECT', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoreScreen {...props} />
      </Provider>,
    );

    const passwordTextInut = getByTestId('passwordTextInut');

    fireEvent.changeText(passwordTextInut, '1234');

    const buttonApply = getByTestId('buttonApply');
    fireEvent.press(buttonApply);

    await waitFor(() => {
      expect(showToast).toBeCalledWith({
        title: '警告',
        content: 'パスワードが正しくありません。',
        variant: 'danger',
      });
    });

    afterEach(() => {
      cleanup();
      jest.clearAllMocks();
    });
  });

  it('Test if when click on the back button, navigate to the course screen',async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <StoreScreen {...props} />
      </Provider>,
    );

    const goBackCourseScreen = jest.fn();

    goBackCourseScreen.mockImplementation(() => {
      props.navigation.navigate('Base');
    });

    const backButton = getByTestId('backButton');
    expect(backButton).toBeTruthy();

    await waitFor(() => {
      fireEvent.press(backButton);

      expect(goBackCourseScreen).toHaveBeenCalled();
    });

    afterEach(cleanup);
  });

  it('Test if call api getListStore when initialization the store screen', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <StoreScreen {...props} />
      </Provider>,
    );

    let noDataText = 'データなし';

    let isShowNoDataText = false;

    const dispatch = useDispatch();

    let listStore = [];

    const handleGetListStore = jest.fn();

    handleGetListStore.mockImplementation(async () => {
      dispatch(setLoading(true));

      Keyboard.dismiss();

      const URL = urlAPI.apiGetListStore;

      try {
        const response = await getListStore(
          Config.URL_DOMAIN_CLOUD,
          URL,
          null,
        );

        if (response.data.code === 200) {
          listStore = response.data.data;
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

    handleGetListStore();
    expect(handleGetListStore).toHaveBeenCalled();

    expect(listStore).not.toBeNull();

    expect(showToast).not.toHaveBeenCalled();

    expect(noDataText).not.toBeNull();

    expect(noDataText).toBe('データなし');

    expect(isShowNoDataText).toBeFalsy();

    afterEach(cleanup);
  });

  it('Test when click on the sort icon button, open the sort modal', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <StoreScreen {...props} />
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
        <StoreScreen {...props} />
      </Provider>,
    );

    let sortKeyword = '';

    // 0 => 'ID順

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
        <StoreScreen {...props} />
      </Provider>,
    );

    let listStore = [];

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

        const URL = `${urlAPI.apiGetListStore}?${object2Path(PARAMS)}`;

        const LIST_COURSE = await getListStore(
          Config.URL_DOMAIN_CLOUD,
          URL,
          PARAMS,
        );

        const { code, data } = LIST_COURSE.data;

        if (code === 200) {
          listStore = data;
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

    expect(listStore).not.toBeNull();

    expect(showToast).not.toHaveBeenCalled();

    afterEach(cleanup);
  });

  it('Test when click on the store name, open the authorize modal', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <StoreScreen {...props} />
      </Provider>,
    );

    let modalAuthorizeVisible = false;

    const handleOpenModalAuthorize = jest.fn();

    handleOpenModalAuthorize.mockImplementation(() => {
      modalAuthorizeVisible = !modalAuthorizeVisible;
    });

    const storeName = getByTestId('storeName-1');
    expect(storeName).toBeTruthy();

    await waitFor(() => {
      fireEvent.press(storeName);

      handleOpenModalAuthorize();

      expect(handleOpenModalAuthorize).toHaveBeenCalled();

      expect(modalAuthorizeVisible).toBeTruthy();
    });

    afterEach(cleanup);
  });

  it(`Test when close the authorize modal, reset value of 'Password' field.`, async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <StoreScreen {...props} />
      </Provider>,
    );

    let passowrd = '1234';

    let modalAuthorizeVisible = false;

    const handleOpenModalAuthorize = jest.fn();

    handleOpenModalAuthorize.mockImplementation(() => {
      modalAuthorizeVisible = !modalAuthorizeVisible;
    });

    const storeName = getByTestId('storeName-1');
    expect(storeName).toBeTruthy();

    await waitFor(() => {
      fireEvent.press(storeName);

      handleOpenModalAuthorize();

      expect(handleOpenModalAuthorize).toHaveBeenCalled();

      expect(modalAuthorizeVisible).toBeTruthy();
    });

    const cancelButtonModalAuthorize = getByTestId('buttonCancelModalAuthorize');

    expect(cancelButtonModalAuthorize).toBeTruthy();

    const handleCloseModalAuthorize = jest.fn();

    handleCloseModalAuthorize.mockImplementation(() => {
      modalAuthorizeVisible = false;
      passowrd = '';

    });

    await waitFor(() => {
      fireEvent.press(cancelButtonModalAuthorize);

      handleCloseModalAuthorize();

      expect(handleCloseModalAuthorize).toHaveBeenCalled();

      expect(modalAuthorizeVisible).toBeFalsy();

      expect(passowrd).toBe('');

    });

    afterEach(cleanup);
  });

  it('Test when enter the correct password, navigate to store detail screen', async () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <Provider store={store}>
        <StoreScreen {...props} />
      </Provider>,
    );

    let passowrd = '1234';

    let modalAuthorizeVisible = false;

    const handleOpenModalAuthorize = jest.fn();

    handleOpenModalAuthorize.mockImplementation(() => {
      modalAuthorizeVisible = !modalAuthorizeVisible;
    });

    const storeName = getByTestId('storeName-1');
    expect(storeName).toBeTruthy();

    await waitFor(() => {
      fireEvent.press(storeName);

      handleOpenModalAuthorize();

      expect(handleOpenModalAuthorize).toHaveBeenCalled();

      expect(modalAuthorizeVisible).toBeTruthy();
    });

    const passwordInput = getByTestId('passwordInput');
    expect(passwordInput).toBeTruthy();

    await waitFor(() => {
      fireEvent.changeText(passwordInput, passowrd);

      expect(passwordInput.props.value).toBe(passowrd);
    });

    const applyButtonModalAuthorize = getByTestId('buttonApplyModalAuthorize');

    expect(applyButtonModalAuthorize).toBeTruthy();

    const handleAuthorizeAction = jest.fn();

    handleAuthorizeAction.mockImplementation(() => {
      if (passowrd === '1234') {
        props.navigation.navigate('StoreDetailScreen', {
          store_id: 1,
          store_name: '東京店',
        });
      } else {
        showToast({
          variant: 'error',
          title: 'エラー',
          content: 'パスワードが違います。',
        });
      }
    });

    await waitFor(() => {
      fireEvent.press(applyButtonModalAuthorize);

      handleAuthorizeAction();

      expect(handleAuthorizeAction).toHaveBeenCalled();

      expect(props.navigation.navigate).toHaveBeenCalledWith('StoreDetailScreen', {
        store_id: 1,
        store_name: '東京店',
      });
    });

    afterEach(cleanup);
  });
});