/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import SideView from '../SideView';
import Swiper from 'react-native-swiper/src';
import useSelector from 'src/utils/useSelector';
import { postNumberNoticeAndMessage } from 'src/api/modules/message';
import { Config } from 'src/const';
import { useDispatch } from 'react-redux';
import { setNumberNoticeAndMessage } from 'src/actions/miscActions';
import { renderSlider } from 'src/utils/handleRenderSlider';
import { RoleNameList } from 'src/const/RoleNameList';

const Home = ({ navigation }) => {
  const dispatch = useDispatch();

  const profile = useSelector(state => state.misc.profile);
  const role = useSelector((state) => state.misc.profile.role_name);

  const numberNoticeAndMessage = useSelector(
    state => state.misc.numberNoticeAndMessage,
  );

  const renderMenu = useSelector(state => state.misc.renderMenu);

  const [slider, setSlider] = useState([]);

  const handleConvertRoleName = role_id => {
    for (let i = 0; i < RoleNameList.length; i++) {
      if (RoleNameList[i].id === role_id) {
        return RoleNameList[i].name;
      }
    }
  };

  useEffect(() => {
    setSlider(renderSlider(numberNoticeAndMessage));
  }, [numberNoticeAndMessage]);

  useEffect(() => {
    const handleGetNumberNoticeAndMessage = async () => {
      try {
        const URL = '/mobile/view-notice-and-message';

        const response = await postNumberNoticeAndMessage(
          Config.URL_DOMAIN_IZUMI_WEB_APP,
          URL,
        );

        const DATA = response.data;

        if (DATA.code === 200) {
          console.log('NOTIFICATION ============> ', DATA.data);
          dispatch(setNumberNoticeAndMessage(DATA.data));
        }
      } catch (error) {
        console.log(error.response);
      }
    };

    handleGetNumberNoticeAndMessage();
    console.log('GET NOTIFICATION NUMBER ======================> DONE');
  }, []);

  useEffect(() => {
    const handleGetNumberNoticeAndMessage = async () => {
      try {
        const URL = '/mobile/view-notice-and-message';

        const response = await postNumberNoticeAndMessage(
          Config.URL_DOMAIN_IZUMI_WEB_APP,
          URL,
        );

        const DATA = response.data;

        if (DATA.code === 200) {
          console.log('NOTIFICATION ============> ', DATA.data);
          dispatch(setNumberNoticeAndMessage(DATA.data));
        }
      } catch (error) {
        console.log(error.response);
      }
    };

    handleGetNumberNoticeAndMessage();
    console.log('GET NOTIFICATION NUMBER ======================> DONE');
  }, [renderMenu]);

  return (
    <View style={styleHome.container}>
      <Navbar />

      <View style={styleHome.zoneView}>
        <View style={styleHome.zoneUser}>
          <Text style={styleHome.displayUsername}>{profile.name}</Text>
          <Text style={styleHome.displayUserInfo}>
            {`${profile.department_name} / ${handleConvertRoleName(
              profile.role,
            )}`}
          </Text>
        </View>
      </View>

      <View style={styleHome.zoneSwiper}>
        <Swiper
          style={styleHome.wrapper}
          dot={
            <View
              style={{
                backgroundColor: 'rgba(255,255,255,.3)',
                width: 13,
                height: 13,
                borderRadius: 7,
                marginLeft: 7,
                marginRight: 7,
                borderWidth: 1,
                borderColor: '#E5E5E5',
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: '#1534A1',
                width: 13,
                height: 13,
                borderRadius: 7,
                marginLeft: 7,
                marginRight: 7,
                borderWidth: 1,
                borderColor: '#E5E5E5',
              }}
            />
          }
          paginationStyle={{
            bottom: -20,
          }}
          loop={false}>
          <View style={styleHome.slide}>
            <SideView data={slider} navigation={navigation} />
          </View>

          {/* {
            !(['crew', 'clerks', 'tl'].includes(role)) ? (
              <View style={styleHome.slide}>
              <SideView
                data={[
                  [
                    {
                      library_icon: 'FontAwesome5',
                      icon: 'clipboard-list',
                      text: '稟議',
                      message: null,
                      link: 'Approve',
                      id: '_Approve',
                    },
                  ],
                ]}
                navigation={navigation}
              />
            </View>
            ) : (
              <View style={styleHome.slide}>
                <SideView data={[]} navigation={navigation} />
              </View>
            )
          } */}

          {/* <View style={styleHome.slide}>
            <SideView data={[]} navigation={navigation} />
          </View> */}
        </Swiper>
      </View>

      <View style={{ flex: 1 }} />
    </View>
  );
};

const styleHome = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  zoneView: {
    flex: 1,
    padding: 10,
  },

  zoneUser: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  displayUsername: {
    fontSize: 28,
    fontWeight: '900',
    color: '#00A968',
  },

  displayUserInfo: {
    fontSize: 22,
    color: '#00A968',
    fontWeight: '600',
  },

  zoneSwiper: {
    flex: 6,
    marginTop: 30,
  },

  wrapper: {},

  slide: {
    flex: 1,
    backgroundColor: 'transparent',
    marginHorizontal: 10,
  },
});

export default Home;
