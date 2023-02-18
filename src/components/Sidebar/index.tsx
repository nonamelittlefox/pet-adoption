/* eslint-disable prettier/prettier */
import { View, Text, Pressable } from 'react-native';

// import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import React from 'react';
import useSelector from 'src/utils/useSelector';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import { DrawerActions, useNavigation } from '@react-navigation/native';

import PL from '../PL/index';
import Home from '../Home/index';
import Note from '../Note/index';
import Approve from '../Approve';
import Base from '../Store/views/index';
import Store from '../Store/views/store';
import Course from '../Store/views/course';
import PayCheck from '../PayCheck/index';
import Transport from '../Transport/index';
import Maintenance from '../Maintenance/index ';
import TransferTable from '../TransferTable/index';
import StoreInformation from '../Store/views/storeInformation';
import TrackMaintenance from '../TrackMaintenance/views/index';
import MaintenanceSchedule from '../TrackMaintenance/views/maintenanceSchedule';
import InternalNewsLetter from '../InternalNewsLetter/index';
import ElectronicLearning from '../ElectronicLearning/index';
import StoreInformationEdit from '../Store/views/storeInformationEdit';

import PreLoginBiometricAuthScreen from '../Payslip/preLoginBiometricAuth';

// Config permission
import DirectPermissionMaintenance from '../TrackMaintenance/views/direct';
import RoleBaseNavigation from '../Store/views/roleBaseNavigation';

const Drawer = createDrawerNavigator();

const ButtonBack = () => {
  const nav = useNavigation();

  return (
    <Pressable onPress={() => {
      nav.dispatch(DrawerActions.jumpTo('Home'));
    }}>
      <Ionicons
        style={{
          lineHeight: 30,
          marginLeft: 10,
          fontWeight: '900',
        }}
        name="chevron-back"
        size={30}
        color="#1534A1"
      />
    </Pressable>
  );
};

const ListSidebar = props => (
  <DrawerContentScrollView {...props}>
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View
        style={{
          flex: 1,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 10,
          marginRight: 10,
        }}>
        <Text
          style={{
            fontSize: 35,
            fontWeight: 'bold',
            color: '#1534A1',
            textTransform: 'uppercase',
          }}>
          IZUMI
        </Text>
      </View>
    </View>

    <DrawerItemList {...props} />
  </DrawerContentScrollView>
);

const Sidebar = () => {
  const role = useSelector((state) => state.misc.profile.role_name);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#FFFFFF',
        drawerActiveBackgroundColor: '#1534A1',
        drawerLabelStyle: {
          fontWeight: 'bold',
          flex: 1,
          textAlign: 'center',
          paddingLeft: 32,
        },
        drawerContentStyle: {
          flex: 1,
        },
        headerTintColor: '#1534A1',
        // swipeEnabled: false
      }}
      initialRouteName="Home"
      drawerContent={props => <ListSidebar {...props} />}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerLabel: 'ダッシュボード',
        }}
      />
      <Drawer.Screen
        name="Note"
        component={Note}
        options={{
          drawerLabel: 'お知らせ',
        }}
      />
      <Drawer.Screen
        name="InternalNewsLetter"
        component={InternalNewsLetter}
        options={{
          drawerLabel: '社内報',
          title: 'IZUMI',
          headerTitleAlign: 'center',
          headerShown: true,
          headerStatusBarHeight: 0,
          headerTitleStyle: {
            fontSize: 30,
            fontWeight: '900',
          },
          headerLeft: () => (
            <ButtonBack />
          ),
        }}
      />
      <Drawer.Screen
        name="ElectronicLearning"
        component={ElectronicLearning}
        options={{
          drawerLabel: 'E-ラーニング',
          title: 'IZUMI',
          headerTitleAlign: 'center',
          headerShown: true,
          headerStatusBarHeight: 0,
          headerTitleStyle: {
            fontSize: 30,
            fontWeight: '900',
          },
          headerLeft: () => (
            <ButtonBack />
          ),
        }}
      />
      <Drawer.Screen
        name="TransferTable"
        component={TransferTable}
        options={{
          drawerLabel: 'シフト表',
          title: 'IZUMI',
          headerTitleAlign: 'center',
          headerShown: true,
          headerStatusBarHeight: 0,
          headerTitleStyle: {
            fontSize: 30,
            fontWeight: '900',
          },
          headerLeft: () => (
            <ButtonBack />
          ),
        }}
      />
      <Drawer.Screen
        name="PreLoginBiometricAuthScreen"
        component={PreLoginBiometricAuthScreen}
        options={{
          drawerLabel: '給与明細',
          title: 'IZUMI',
          headerTitleAlign: 'center',
          headerShown: true,
          headerStatusBarHeight: 0,
          headerTitleStyle: {
            fontSize: 30,
            fontWeight: '900',
          },
          headerLeft: () => (
            <ButtonBack />
          ),
        }}
      />
      <Drawer.Screen
        name="RoleBaseNavigation"
        component={RoleBaseNavigation}
        options={{
          drawerLabel: '店舗カルテ',
          headerLeft: () => (
            <ButtonBack />
          ),
        }}
      />
      <Drawer.Screen
        name="DirectPermissionMaintenance"
        component={DirectPermissionMaintenance}
        options={{
          drawerLabel: 'トラックメンテナンス',
          headerLeft: () => (
            <ButtonBack />
          ),
        }}
      />
      {
        !(['crew', 'clerks', 'tl'].includes(role)) && (
          <Drawer.Screen
            name="Approve"
            component={Approve}
            options={{
              drawerLabel: '稟議',
              title: 'IZUMI',
              headerTitleAlign: 'center',
              headerShown: true,
              headerStatusBarHeight: 0,
              headerTitleStyle: {
                fontSize: 30,
                fontWeight: '900',
              },
              headerLeft: () => (
                <ButtonBack />
              ),
            }}
          />
        )
      }
      <Drawer.Screen
        name="Maintenance"
        component={Maintenance}
        options={{
          drawerLabel: 'トラック･メンテナンス',
          title: 'IZUMI',
          headerTitleAlign: 'center',
          headerShown: true,
          headerStatusBarHeight: 0,
          headerTitleStyle: {
            fontSize: 30,
            fontWeight: '900',
          },
          drawerItemStyle: { height: 0 },
          headerLeft: () => (
            <ButtonBack />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="PL"
        component={PL}
        options={{
          drawerLabel: 'P/L',
          title: 'IZUMI',
          headerTitleAlign: 'center',
          headerShown: true,
          headerStatusBarHeight: 0,
          headerTitleStyle: {
            fontSize: 30,
            fontWeight: '900',
          },
          headerLeft: () => (
            <ButtonBack />
          ),
        }}
      />
      <Drawer.Screen
        name="Transport"
        component={Transport}
        options={{
          drawerLabel: '運行データ',
          title: 'IZUMI',
          headerTitleAlign: 'center',
          headerShown: true,
          headerStatusBarHeight: 0,
          headerTitleStyle: {
            fontSize: 30,
            fontWeight: '900',
          },
          headerLeft: () => (
            <ButtonBack />
          ),
        }}
      /> */}
      {/* <Drawer.Screen
        name="Store"
        component={Store}
        options={{
          drawerLabel: '店舗カルテ',
          title: 'IZUMI',
          headerTitleAlign: 'center',
          headerShown: true,
          headerStatusBarHeight: 0,
          headerTitleStyle: {
            fontSize: 30,
            fontWeight: '900',
          },
          headerLeft: () => (
            <ButtonBack />
          ),
        }}
      /> */}
      <Drawer.Screen
        name="TrackMaintenance"
        component={TrackMaintenance}
        options={{
          drawerLabel: 'トラックメンテナンス',
          drawerItemStyle: { height: 0 },
        }}
      />
      <Drawer.Screen
        name="Base"
        component={Base}
        options={{
          drawerLabel: '店舗カルテ',
          drawerItemStyle: { height: 0 },
        }}
      />
      <Drawer.Screen
        name="Course"
        component={Course}
        options={{
          drawerLabel: '店舗カルテ',
          drawerItemStyle: { height: 0 },
        }}
      />
      <Drawer.Screen
        name="Store"
        component={Store}
        options={{
          drawerLabel: '店舗カルテ',
          drawerItemStyle: { height: 0 },
        }}
      />
      <Drawer.Screen
        name="StoreInformation"
        component={StoreInformation}
        options={{
          drawerLabel: '店舗カルテ',
          drawerItemStyle: { height: 0 },
        }}
      />
      <Drawer.Screen
        name="StoreInformationEdit"
        component={StoreInformationEdit}
        options={{
          drawerLabel: '店舗カルテ',
          drawerItemStyle: { height: 0 },
        }}
      />
      <Drawer.Screen
        name="MaintenanceSchedule"
        component={MaintenanceSchedule}
        options={{
          drawerLabel: 'トラックメンテナンス',
          drawerItemStyle: { height: 0 },
        }}
      />
      <Drawer.Screen
        name="PayCheck"
        component={PayCheck}
        options={{
          drawerLabel: '給与明細',
          drawerItemStyle: { height: 0 },
          title: 'IZUMI',
          headerTitleAlign: 'center',
          headerShown: true,
          headerStatusBarHeight: 0,
          headerTitleStyle: {
            fontSize: 30,
            fontWeight: '900',
          },
          headerLeft: () => (
            <ButtonBack />
          ),
        }}
      />
      
    </Drawer.Navigator>
  );
};

export default Sidebar;
