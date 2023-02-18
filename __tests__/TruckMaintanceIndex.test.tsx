/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import renderer from 'react-test-renderer';
import Toast from 'react-native-toast-message';
import { Keyboard } from 'react-native';
import { Provider } from 'react-redux';
import { store } from 'src/store';
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import TruckMaintanceIndex from 'src/components/TrackMaintenance/views/maintenanceSchedule';

describe('<Truck Maintance Index />', () => {
  const props = {
    navigation: {},
    route: {
      params: {
        base_id: 1
      }
    },
  };

  it('Test render screen', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <NavigationContainer>
        <Provider store={store}>
          <TruckMaintanceIndex {...props} />
        </Provider>
      </NavigationContainer>
    );

    const SCREEN = getByTestId('zoneTruckMaintance');
    expect(SCREEN).toBeTruthy();
  });

  it('Test button back', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <NavigationContainer>
        <Provider store={store}>
          <TruckMaintanceIndex {...props} />
        </Provider>
      </NavigationContainer>
    );

    const BUTTON_BACK = getByTestId('backButton');
    expect(BUTTON_BACK).toBeTruthy();
  });

  it('Test title screen', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <NavigationContainer>
        <Provider store={store}>
          <TruckMaintanceIndex {...props} />
        </Provider>
      </NavigationContainer>
    );

    const BUTTON_BACK = getByTestId('titleScreen');
    expect(BUTTON_BACK).toBeTruthy();
  });

  it('Test modal sort and search', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <NavigationContainer>
        <Provider store={store}>
          <TruckMaintanceIndex {...props} />
        </Provider>
      </NavigationContainer>
    );

    const BUTTON_SORT = getByTestId('sortButtonIcon');
    expect(BUTTON_SORT).toBeTruthy();

    const MODAL_SORT = getByTestId('modalSortSearch');
    expect(MODAL_SORT).toBeTruthy();
  });

  it('Test calendar year month', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <NavigationContainer>
        <Provider store={store}>
          <TruckMaintanceIndex {...props} />
        </Provider>
      </NavigationContainer>
    );

    const BUTTON_PREVIOUS = getByTestId('previousYearMonthIcon');
    expect(BUTTON_PREVIOUS).toBeTruthy();

    const BUTTON_NEXT = getByTestId('nextYearMonthIcon');
    expect(BUTTON_NEXT).toBeTruthy();

    const YEAR_MONTH = getByTestId('showYearMonth');
    expect(YEAR_MONTH).toBeTruthy();
  });

  it('Test render list schedule', () => {
    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <NavigationContainer>
        <Provider store={store}>
          <TruckMaintanceIndex {...props} />
        </Provider>
      </NavigationContainer>
    );

    const LIST_SCHEDULE = getByTestId('listSchedule');
    expect(LIST_SCHEDULE).toBeTruthy();
  });
});