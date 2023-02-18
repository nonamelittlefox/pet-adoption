// import {View, Text} from 'react-native';
import React from 'react';
// import Navbar from '../Navbar';
// import { Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import useSelector from 'src/utils/useSelector';
import { Config } from 'src/const';

const ElectronicLearning = () => {
  const token = useSelector((state) => state.misc.token);
  const linkELearning = `${Config.E_LEARNING}/auth-mobile?token=`;

  const link = `${linkELearning}${token}`;

  return (
    <WebView
      source={{ uri: link }}
    />
  );
};

export default ElectronicLearning;
