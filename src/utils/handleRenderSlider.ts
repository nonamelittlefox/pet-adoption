import { NumberNoticeAndMessage } from 'src/types';

export function renderSlider(data: NumberNoticeAndMessage) {
  let Slider = [
    [
      {
        library_icon: 'FontAwesome',
        icon: 'comments-o',
        text: 'お知らせ',
        message: calNumberNoticeMessage(data),
        link: 'Note',
        id: '_NoteScreen',
      },
      {
        library_icon: 'FontAwesome',
        icon: 'newspaper-o',
        text: '社内報',
        message: null,
        link: 'InternalNewsLetter',
        id: '_InternalNewsLetterScreen',
      },
      {
        library_icon: 'FontAwesome',
        icon: 'mortar-board',
        text: 'E-ラーニング',
        message: null,
        link: 'ElectronicLearning',
        id: '_ElectronicLearningScreen',
      },
    ],
    [
      {
        library_icon: 'FontAwesome',
        icon: 'calendar',
        text: 'シフト表',
        message: null,
        link: 'TransferTable',
        id: '_TransferTableScreen',
      },
      // {
      //   library_icon: 'FontAwesome',
      //   icon: 'bar-chart',
      //   text: 'P/L',
      //   message: null,
      //   link: 'PL',
      //   id: '_PLScreen',
      // },
      // {
      //   library_icon: 'FontAwesome',
      //   icon: 'automobile',
      //   text: '運行データ',
      //   message: null,
      //   link: 'Transport',
      //   id: '_TransportScreen',
      // },
      {
        library_icon: 'FontAwesome5',
        icon: 'money-check',
        text: '給与明細',
        message: null,
        link: 'PreLoginBiometricAuthScreen',
        id: '_PreLoginBiometricAuthScreen',
      },
      {
        library_icon: 'FontAwesome5',
        icon: 'store',
        text: '店舗カルテ',
        message: null,
        link: 'RoleBaseNavigation',
        id: '_BaseScreen',
      },
    ],
    [
      // {
      //   library_icon: 'FontAwesome5',
      //   icon: 'money-check',
      //   text: '給与明細',
      //   message: null,
      //   link: 'PayCheck',
      //   id: '_PayCheckScreen',
      // },
      // {
      //   library_icon: 'FontAwesome5',
      //   icon: 'store',
      //   text: '店舗カルテ',
      //   message: null,
      //   link: 'RoleBaseNavigation',
      //   id: '_BaseScreen',
      // },
      {
        library_icon: 'FontAwesome',
        icon: 'wrench',
        text: 'トラック･\nメンテナンス',
        message: null,
        link: 'DirectPermissionMaintenance',
        id: '_MaintenanceScreen',
      },
      {
        library_icon: 'FontAwesome5',
        icon: 'clipboard-list',
        text: '稟議',
        message: null,
        link: 'Approve',
        id: '_Approve',
      },
    ],
  ];

  return Slider;
}

function calNumberNoticeMessage(data: NumberNoticeAndMessage) {
  const message_left = data.unread_messages ? data.unread_messages : 0;
  const notice_left = data.unread_notices ? data.unread_notices : 0;

  const result = message_left + notice_left;

  return result > 0 ? result : null;
}
