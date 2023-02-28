import { Ionicons, FontAwesome, EvilIcons, MaterialIcons } from '@expo/vector-icons';
import { View, Text, Pressable, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

import React, { memo, useState, useEffect } from 'react';

import Timeline from 'src/components/Timeline/index';
import UserInfo from 'src/screens/UserInfo/index';

const Drawer = createDrawerNavigator();

function ListSidebar(props) {
  const [userName, setUserName] = useState('大盛 太郎');
  const [userTagName, setUserTagName] = useState('@TaroOmori');
  const [wrapperOpacity, setWrapperOpacity] = useState(1);
  const [modalLogoutVisible, setModalLogoutVisible] = useState(false);
  const [userBadge, setUserBadge] = useState('https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187.jpg?w=636&h=424');

  const onClickLogoutButton = async () => {
    props.navigation.navigate('LoginScreen');
  };

  const handleOpenModalLogout = () => {
    setWrapperOpacity(0.5);
    setModalLogoutVisible(true);
  };

  const handleCloseModalLogout = () => {
    setWrapperOpacity(1);
    setModalLogoutVisible(false);
  };

  const handleClickHelpButton = () => {
    props.navigation.navigate('HelpScreen');
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, flexDirection: 'column', opacity: wrapperOpacity }}>
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={styles.brandHolder}>
          <Image
            style={styles.drawerLogo}
            source={{ uri: 'https://raw.githubusercontent.com/nonamelittlefox/dpos-assets/main/sidebar-logo.png' }}
          />

          <View style={styles.drawerContent}>
            <Text style={styles.drawerContentText}>Daisei Group</Text>
          </View>
        </View>

        <View style={styles.userInfoHolder}>
          <View style={{ flex: 1, marginTop: 20 }}>
            {
              userBadge ? (
                <Image
                  source={{ uri: userBadge }}
                  style={styles.userBadgeImage}
                />
              ) : (
                <FontAwesome
                  size={45}
                  color='#CCCCCC'
                  name='user-circle'
                />
              )
            }
          </View>

          <View style={{ flex: 4, marginTop: 20 }}>
            <Text style={styles.userNameText}>{userName}</Text>
            <Text style={styles.userTagNameText}>{userTagName}</Text>
          </View>
        </View>

        <View style={styles.userInfoDescription}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={[styles.userInfoDescriptionTitle, { marginRight: 30 }]}>今週おくれる</Text>
            
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 20 }}>
              <Image
                style={styles.userInfoDescriptionIcon}
                source={{ uri: 'https://raw.githubusercontent.com/nonamelittlefox/dpos-assets/main/1.png' }}
              />

              <Text style={styles.userInfoDescriptionContent}>241</Text>
            </View>
          </View>

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.userInfoDescriptionTitle}>今までもらった</Text>
            
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Image
                style={styles.userInfoDescriptionIcon}
                source={{ uri: 'https://raw.githubusercontent.com/nonamelittlefox/dpos-assets/main/2.png' }}
              />

              <Text style={styles.userInfoDescriptionContent}>103</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{ flex: 2, flexDirection: 'column' }}>
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 80 }}>
          <TouchableOpacity style={styles.logoutButton} onPress={() => handleOpenModalLogout()}>
            <View style={{ flexDirection: 'row' }}>
              <MaterialIcons 
                size={30}
                name='logout'
                color='#707070'
                style={{ marginLeft: 10, lineHeight: 30 }}
              />
              <Text style={{ color: '#707070', lineHeight: 30 }}>ログアウト</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.helpButton} onPress={() => handleClickHelpButton()}>
            <View style={{ flexDirection: 'row' }}>
              <EvilIcons 
                size={35}
                name='question'
                color='#000000'
                style={{ marginLeft: 5, lineHeight: 30 }}
              />
              <Text style={{ color: '#707070', lineHeight: 30 }}>よくあるお問い合せ／ヘルプ</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        presentationStyle="overFullScreen"
        transparent={true}
        visible={modalLogoutVisible}
        onRequestClose={() => {
          setWrapperOpacity(1);
          setModalLogoutVisible(!modalLogoutVisible);
        }}
      >
        <View style={styles.modalLogoutContent}>
          <View style={styles.modalLogoutContentHeader}> 
            <Text style={{ fontSize: 20 }}>Dposからログアウトしますか？</Text>
          </View>

          <TouchableOpacity style={styles.modalLogoutContentFooter} onPress={() => {onClickLogoutButton()}}>
            <TouchableOpacity
              onPress={() => {handleCloseModalLogout()}}
              style={{ justifyContent: 'center', alignItems: 'center', flex: 1, borderRightColor: '#CBCBCB', borderRightWidth: 1 }}
            >
              <Text style={styles.modalLogoutContentFooterText}>キャンセル</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {onClickLogoutButton()}}
              style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
            >
              <Text style={styles.modalLogoutContentFooterText}>ログアウト</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </Modal>
    </DrawerContentScrollView>
  )
};

const Sidebar = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <ListSidebar {...props} />}
      screenOptions={{
        headerShown: false,
        headerTintColor: '#1534A1',
        drawerActiveTintColor: '#FFFFFF',
        drawerActiveBackgroundColor: '#1534A1',
        drawerLabelStyle: {
          flex: 1,
          paddingLeft: 32,
          fontWeight: 'bold',
          textAlign: 'center',
        },
        drawerContentStyle: {
          flex: 1,
        },
      }}
    >
      <Drawer.Screen
        name='Timeline'
        component={Timeline}
        options={{
          headerShown: false,
          drawerLabel: 'Timeline',
        }}
      />
      <Drawer.Screen
        name='UserInfo'
        component={UserInfo}
        options={{
          headerShown: false,
          drawerLabel: 'UserInfo',
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerLogo: {
    width: 55,
    height: 40,
    marginLeft: 10,
  },

  drawerContent: {
    height: 40,
    marginLeft: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  drawerContentText: {
    fontSize: 22,
    color: '#000000',
  },

  brandHolder: {
    flex: 1,
    flexDirection: 'column',
  },

  userInfoHolder: {
    flex: 1,
    marginTop: 10,
    borderTopWidth: 1,
    marginHorizontal: 20,
    flexDirection: 'row',
    borderTopColor: '#CBCBCB', 
  },

  userBadgeImage: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
  },

  userNameText: {
    fontSize: 20,
  },

  userTagNameText: {
    fontSize: 16,
    color: '#787878'
  },

  userInfoDescription: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginHorizontal: 20,
    justifyContent: 'center',
    borderBottomColor: '#CBCBCB', 
  },

  userInfoDescriptionTitle: {
    fontSize: 14,
    color: '#787878',
  },

  userInfoDescriptionIcon: {
    width: 30,
    height: 30,
    marginTop: 10,
  },

  userInfoDescriptionContent: {
    marginTop: 10,
    marginLeft: 5,
    color: '#595959',
  },

  logoutButton: {
    height: 50,
    width: '100%',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderTopColor: '#CBCBCB',
    backgroundColor: '#FFFFFF',
    borderLeftColor: '#CBCBCB',
    borderRightColor: '#CBCBCB',
  },

  helpButton: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#CBCBCB',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  modalLogoutContent: {
    top: '40%',
    height: 200,
    padding: 35,
    elevation: 5,
    shadowRadius: 4,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    marginHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',

    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  modalLogoutContentHeader: {
    flex: 5,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#CCCCCC',
  },

  modalLogoutContentFooter: {
    flex: 1,
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalLogoutContentFooterText: {
    fontSize: 18,
    color: '#289FE1',
    fontWeight: 'bold',
  },
});

export default Sidebar;
