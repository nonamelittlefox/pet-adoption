('use strict');

import { MiscAction } from 'src/actions/actionTypes';
import { action, createReducer } from 'typesafe-actions';
import { setLoading, setToken, } from 'src/actions/miscActions';
export interface MiscState {
  isLoading: boolean;
  token: string;
}

const initialState: MiscState = {
  isLoading: false,
  token: '',
};

const miscReducer = createReducer<MiscState, MiscAction>(initialState)
  .handleAction(setLoading, (state, action) => ({
    ...state,
    isLoading: action.payload,
  }))
  .handleAction(setToken, (state, action) => ({
    ...state,
    token: action.payload,
  }));

export default miscReducer;
