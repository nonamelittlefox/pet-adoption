import { createAction } from 'typesafe-actions';
import {
  Profile,
  NumberNoticeAndMessage,
  Tab,
  ConfirmedNotification,
  SeenMessage,
} from 'src/types';

export const setLoading = createAction(
  'LOADING_SET',
  (isLoading: boolean) => isLoading,
)();

export const setProfile = createAction(
  'SET_PROFILE',
  (profile: Profile) => profile,
)();

export const setToken = createAction('SET_TOKEN', (token: string) => token)();

export const setNumberNoticeAndMessage = createAction(
  'SET_NUMBER_NOTICE_AND_MESSAGE',
  (numberNoticeAndMessage: NumberNoticeAndMessage) => numberNoticeAndMessage,
)();

export const setListMessageState = createAction(
  'SET_LIST_MESSAGE',
  (listMessage: any) => listMessage,
)();

export const setTypeAddMessage = createAction(
  'SET_TYPE_ADD_MESSAGE',
  (typeAddMessage: any) => typeAddMessage,
)();

export const setTabMessage = createAction('SET_TAB', (tab: Tab) => tab)();

export const setConfirmedNotification = createAction(
  'SET_CONFIRMED_NOTIFICATION',
  (confirmedNotification: ConfirmedNotification) => confirmedNotification,
)();

export const setStateTokenFCM = createAction(
  'SET_TOKEN_FCM',
  (token: string) => token,
)();

export const setStateSeenMessage = createAction(
  'SET_STATE_SEEN_MESSAGE',
  (listSeen: SeenMessage[]) => listSeen,
)();

export const setRenderMenu = createAction(
  'SET_RENDER_MENU',
  (render: number) => render,
)();

export const setListNotiIzumi = createAction(
  'SET_LIST_NOTI_IZUMI',
  (listNotiIzumi: any) => listNotiIzumi,
)();

export const setHasNewNotiIzumi = createAction(
  'SET_HAS_NOTI_IZUMI',
  (hasNotiIzumi: number) => hasNotiIzumi,
)();

export const disconnectPusher = createAction(
  'SET_DISCONNECT_PUSHER',
  (disconnect: boolean) => disconnect,
)();

export const isConnectPusher = createAction(
  'SET_IS_CONNECT_PUSHER',
  (isConnect: boolean) => isConnect,
)();

export const setGroupChatId = createAction(
  'SET_GROUP_CHAT_ID',
  (groupChatId: number) => groupChatId,
)();

export const setInitDataDepartment = createAction(
  'SET_INIT_DATA_DEPARTMENT',
  (status: boolean) => status
)();

export const setInitDataCourse = createAction(
  'SET_INIT_DATA_COURSE',
  (status: boolean) => status
)();

export const setInitDataStore = createAction(
  'SET_INIT_DATA_STORE',
  (status: boolean) => status
)();

export const setInitDataStoreDetail = createAction(
  'SET_INIT_DATA_STORE_DETAIL',
  (status: boolean) => status
)();

export const setInitDataStoreEdit = createAction(
  'SET_INIT_DATA_STORE_EDIT',
  (status: boolean) => status
)();

export const setInitDataScheduleMaintenance = createAction(
  'SET_INIT_DATA_SCHEDULE_MAINTENANCE',
  (status: boolean) => status,
)();

export const setListAuthorizedStore = createAction(
  'SET_LIST_AUTHORIZED_STORE',
  (list: any) => list,
)();