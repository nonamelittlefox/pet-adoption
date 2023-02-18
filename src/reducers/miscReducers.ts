('use strict');
import {
  setLoading,
  setProfile,
  setToken,
  setNumberNoticeAndMessage,
  setListMessageState,
  setTypeAddMessage,
  setTabMessage,
  setConfirmedNotification,
  setStateTokenFCM,
  setStateSeenMessage,
  setRenderMenu,
  setListNotiIzumi,
  disconnectPusher,
  isConnectPusher,
  setGroupChatId,
  setInitDataDepartment,
  setInitDataCourse,
  setInitDataStore,
  setInitDataStoreDetail,
  setInitDataStoreEdit,
  setInitDataScheduleMaintenance,
  setListAuthorizedStore,
} from 'src/actions/miscActions';
import { action, createReducer } from 'typesafe-actions';
import { MiscAction } from 'src/actions/actionTypes';
import {
  Profile,
  NumberNoticeAndMessage,
  Tab,
  SeenMessage,
  ConfirmedNotification,
} from 'src/types';

export interface MiscState {
  isLoading: boolean;
  profile: Profile;
  token: string;
  numberNoticeAndMessage: NumberNoticeAndMessage;
  tab: Tab;
  listMessage: any;
  typeAddMessage: any;
  confirmedNotification: ConfirmedNotification;
  tokenFCM: string;
  listSeen: SeenMessage[];
  renderMenu: number;
  listNotiIzumi: any;
  hasNewNotiIzumi: number;
  disconnectPusher: boolean;
  isConnectPusher: boolean;
  groupChatId: number;
  initDataDepartment: boolean;
  initDataCourse: boolean;
  initDataStore: boolean;
  initDataStoreDetail: boolean;
  initDataStoreEdit: boolean;
  initDataScheduleMaintenance: boolean;
  listAuthorizedStore: Array<any>;
}

const initialState: MiscState = {
  isLoading: false,
  profile: {
    id: null,
    uuid: null,
    name: '',
    email: '',
    role: '',
    department_code: '',
    supervisor_email: '',
    role_name: '',
    department_name: '',
  },
  token: '',
  numberNoticeAndMessage: {
    unread_notices: 0,
    unread_messages: 0,
  },
  tab: {
    current_tab: '',
  },
  listMessage: [],
  typeAddMessage: '',
  confirmedNotification: {
    notification_id: null,
  },
  tokenFCM: '',
  listSeen: [],
  renderMenu: 0,
  listNotiIzumi: [],
  hasNewNotiIzumi: 0,
  disconnectPusher: false,
  isConnectPusher: false,
  groupChatId: null,
  initDataDepartment: true,
  initDataCourse: true,
  initDataStore: true,
  initDataStoreDetail: true,
  initDataStoreEdit: true,
  initDataScheduleMaintenance: true,
  listAuthorizedStore: [],
};

const miscReducer = createReducer<MiscState, MiscAction>(initialState)
  .handleAction(setLoading, (state, action) => ({
    ...state,
    isLoading: action.payload,
  }))
  .handleAction(setProfile, (state, action) => ({
    ...state,
    profile: action.payload,
  }))
  .handleAction(setToken, (state, action) => ({
    ...state,
    token: action.payload,
  }))
  .handleAction(setNumberNoticeAndMessage, (state, action) => ({
    ...state,
    numberNoticeAndMessage: action.payload,
  }))
  .handleAction(setListMessageState, (state, action) => ({
    ...state,
    listMessage: action.payload,
  }))
  .handleAction(setTypeAddMessage, (state, action) => ({
    ...state,
    typeAddMessage: action.payload,
  }))
  .handleAction(setTabMessage, (state, action) => ({
    ...state,
    tab: action.payload,
  }))
  .handleAction(setConfirmedNotification, (state, action) => ({
    ...state,
    confirmedNotification: action.payload,
  }))
  .handleAction(setStateTokenFCM, (state, action) => ({
    ...state,
    tokenFCM: action.payload,
  }))
  .handleAction(setStateSeenMessage, (state, action) => ({
    ...state,
    listSeen: action.payload,
  }))
  .handleAction(setRenderMenu, (state, action) => ({
    ...state,
    renderMenu: action.payload,
  }))
  .handleAction(setListNotiIzumi, (state, action) => ({
    ...state,
    listNotiIzumi: action.payload,
  }))
  .handleAction(disconnectPusher, (state, action) => ({
    ...state,
    disconnectPusher: action.payload,
  }))
  .handleAction(isConnectPusher, (state, action) => ({
    ...state,
    isConnectPusher: action.payload,
  }))
  .handleAction(setGroupChatId, (state, action) => ({
    ...state,
    groupChatId: action.payload,
  }))
  .handleAction(setInitDataDepartment, (state, action) => ({
    ...state,
    initDataDepartment: action.payload,
  }))
  .handleAction(setInitDataCourse, (state, action) => ({
    ...state,
    initDataCourse: action.payload,
  }))
  .handleAction(setInitDataStore, (state, action) => ({
    ...state,
    initDataStore: action.payload
  }))
  .handleAction(setInitDataStoreDetail, (state, action) => ({
    ...state,
    initDataStoreDetail: action.payload
  }))
  .handleAction(setInitDataStoreEdit, (state, action) => ({
    ...state,
    initDataStoreEdit: action.payload
  }))
  .handleAction(setInitDataScheduleMaintenance, (state, action) => ({
    ...state,
    initDataScheduleMaintenance: action.payload
  }))
  .handleAction(setListAuthorizedStore, (state, action) => ({
    ...state,
    listAuthorizedStore: action.payload
  }));

export default miscReducer;
