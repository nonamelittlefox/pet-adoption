import React, { memo, useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { FontAwesome, AntDesign, Entypo, FontAwesome5 } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { setLoading, setToken } from 'src/actions/miscActions';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import LinearGradient from 'react-native-linear-gradient';
interface props {
  navigation: any;
};

const FooterNav = (props: props) => {
  const dispatch = useDispatch();

  const [notifications, setNotifications] = useState(241);
  const [isCurrentRoute, setIsCurrentRoute] = useState('HomeScreen');

  const handleNavigateToUserInfoScreen = () => {
    props.navigation.navigate('UserInformationScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        <View style={{ flex: 1, flexDirection: 'row', }}>
          <TouchableOpacity style={[styles.baseBlock, styles.firstBlock]}>
            <FontAwesome
              size={35}
              name='home'
              style={styles.icon}
              color={isCurrentRoute === 'HomeScreen' ? '#289FE1' : '#CCCCCC'}
            />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.baseBlock, styles.secondBlock]}>
            <AntDesign 
              name='gift'
              size={35}
              style={styles.icon}
              color={isCurrentRoute === 'PresentScreen' ? '#289FE1' : '#CCCCCC'}
            />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.baseBlock, styles.thirdBlock, styles.icon]}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#289FE1', '#5CD1D1']} style={styles.linearGradient}>
              <FontAwesome
                size={22}
                color='#FFFFFF'
                name='paper-plane-o'
                style={{ lineHeight: 22 }}
              />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.baseBlock, styles.fourthBlock]}>
            <Text style={{ fontSize: 80, position: 'absolute', color: 'red', bottom: 25, right: 25 }}>.</Text>
            <Entypo 
              size={35}
              name='bell'
              style={styles.icon}
              color={isCurrentRoute === 'NotificationScreen' ? '#289FE1' : '#CCCCCC'}
            />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.baseBlock, styles.fifthBlock]} onPress={() => {handleNavigateToUserInfoScreen()}}>
            <FontAwesome5 
              size={35}
              name='user-circle'
              style={styles.icon}
              color={isCurrentRoute === 'UserInformationScreen' ? '#289FE1' : '#CCCCCC'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },

  baseBlock: {
    flex: 1,
    width: 40,
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  firstBlock: {},

  secondBlock: {},

  thirdBlock: {},

  linearGradient: {
    height: 40,
    width: '80%',
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },

  fourthBlock: {},

  fifthBlock: {},

  footer: {
    height: 80,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },

  icon: {
    elevation: 1,
    shadowRadius: 1.00,
    shadowColor: '#000',
    shadowOpacity: 0.18,

    shadowOffset: {
      width: 0,
      height: 1,
    },
  }
});

export default FooterNav;
