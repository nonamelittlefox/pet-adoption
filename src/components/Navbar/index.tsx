import React, { memo, useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { setLoading, setToken } from 'src/actions/miscActions';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const Navbar = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [notifications, setNotifications] = useState(241);

  const onToggle = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const onLogout = async () => {};

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onToggle}
        testID='buttonMenu'
        style={[styles.iconHolderArea, styles.menuIconHolder]}
        accessibilityLabel={'_ToggleMenuButton'}
      >
        <FontAwesome
          size={30}
          name='bars'
          color='#535353'
          style={{ lineHeight: 30 }}
        />
      </TouchableOpacity>

      <View style={{ flex: 4 }} />
        
      <TouchableOpacity
        onPress={onLogout}
        testID='buttonLogout'
        style={[styles.iconHolderArea, styles.notificationIconHolder]}
        accessibilityLabel={'_LogoutButton'}
      >
        <View style={styles.notificationBar}>
          <View style={styles.notificationBubble}>
            <FontAwesome
              size={18}
              name='paper-plane-o'
              color='#FFFFFF'
              style={{ lineHeight: 18 }}
            />
          </View>

          <Text style={styles.notificationIconHolderText}>{notifications ? notifications : ''}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },

  iconHolderArea: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },

  menuIconHolder: {
    marginTop: 10,
  },

  notificationIconHolder: {
    flex: 1,
    marginBottom: 20,
  },

  notificationBar: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'column',
  },

  notificationBubble: {
    width: 40,
    height: 40,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#289FE1',
  },

  notificationIconHolderText: {
    fontSize: 12,
    marginTop: 3,
    lineHeight: 16,
    marginLeft: 10,
    color: '#535353',
  },
});

export default Navbar;
