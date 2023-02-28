import { setLoading } from 'src/actions/miscActions';
import {
  View,
  Text,
  Image,
  Keyboard,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import React, { memo, useState, useEffect } from 'react';

import Layout from 'src/layout/index';
import Navbar from 'src/components/Navbar/index';
import FooterNav from 'src/components/FooterNav/index';

interface props {
  navigation: any;
};

const HomeScreen = (props: props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Navbar />

      <Layout navigation={props.navigation} />

      <View style={{ position: 'absolute', bottom: 0 }}>
        <FooterNav navigation={props.navigation}  />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },
});

export default memo(HomeScreen);