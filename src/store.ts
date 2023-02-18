import AsyncStorage from '@react-native-async-storage/async-storage';
import appReducer, { AppReducerState } from 'src/reducers/appReducers';
import miscRecuder from 'src/reducers/miscReducers';
import sagas from 'src/sagas/';
import {
  applyMiddleware,
  combineReducers,
  compose,
  Dispatch,
  MiddlewareAPI,
} from 'redux';
import { legacy_createStore as createStore } from 'redux';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { RootAction } from 'src/actions/actionTypes';

const appPersistConfig: PersistConfig<AppReducerState, unknown> = {
  storage: AsyncStorage,
  key: 'app',
};

export const reducers = {
  app: persistReducer(appPersistConfig, appReducer),
  misc: miscRecuder,
};

export const rootReducer = combineReducers(reducers);
export type RootState = ReturnType<typeof rootReducer>;

const appMiddleware =
  (_store: MiddlewareAPI) => (next: Dispatch) => (action: RootAction) => {
    next(action);
  };

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, appMiddleware];
const enhancers = [applyMiddleware(...middlewares)];

export const store = createStore(rootReducer, compose(...enhancers));

sagaMiddleware.run(sagas);

export const persistor = persistStore(store);
