// import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
// import { Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import useSelector from 'src/utils/useSelector';
import { Config } from 'src/const';
// import Navbar from '../Navbar';

const PayCheck = () => {
  const token = useSelector((state) => state.misc.token);
  const linkPayslip = `${Config.PAYSLIP}/auth-mobile?token=`;

  const link = `${linkPayslip}${token}`;

  return (
    <WebView
      source={{ uri: link }}
    />
  );
};

export default PayCheck;
