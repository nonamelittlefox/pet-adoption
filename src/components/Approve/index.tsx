import { View } from 'react-native';
import { Linking } from 'react-native';
import React, { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
export interface propsType {
  navigation: any;
}

const Approve = (props: propsType) => {
  const approveLink = 'https://streamline-wf-hi.appspot.com/login?top=1&r=logout';

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      Linking.openURL(approveLink);
      props.navigation.push('DashboardScreen');
    }

  }, [isFocused]);

  return (
    <View />
  );
};

export default Approve;
