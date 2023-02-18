// import {View, Text} from 'react-native';
import React from 'react';
// import Navbar from '../Navbar';
// import { Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import useSelector from 'src/utils/useSelector';
import { Config } from 'src/const';

const TransferTable = () => {
  const token = useSelector((state) => state.misc.token);
  const linkWorkShift = `${Config.TIME_SHEET}/auth-mobile?token=`;

  const link = `${linkWorkShift}${token}`;

  return (
    <WebView
      source={{ uri: link }}
    // onShouldStartLoadWithRequest={request => {
    //   if (request.url !== link) {
    //     Linking.openURL(request.url);
    //     return false;
    //   }

    //   return true;
    // }}
    />
  );
};

export default TransferTable;
