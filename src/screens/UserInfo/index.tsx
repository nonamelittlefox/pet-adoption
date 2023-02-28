import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { setLoading } from 'src/actions/miscActions';

import {
  View,
  Text,
  Image,
  Keyboard,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import React, { memo, useState, useEffect } from 'react';

import Layout from 'src/layout/index';
import Navbar from 'src/components/Navbar/index';
import FooterNav from 'src/components/FooterNav/index';

function UserInformation(props) {
  return (
    <SafeAreaView style={styles.container}>
      <Navbar />

      <Layout navigation={props.navigation} />

      <View style={{ position: 'absolute', bottom: 0 }}>
        <FooterNav navigation={props.navigation}  />
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default memo(UserInformation);