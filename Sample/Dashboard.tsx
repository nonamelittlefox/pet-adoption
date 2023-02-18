/* eslint-disable react-hooks/exhaustive-deps */
import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import Navbar from 'src/components/Navbar';
import SideView from 'src/components/SideView';
import Swiper from 'react-native-swiper/src';
import useSelector from 'src/utils/useSelector';
import { postNumberNoticeAndMessage } from 'src/api/modules/message';
import Toast from 'react-native-toast-message';
import { Config } from 'src/const';
import { useDispatch } from 'react-redux';
import { setLoading, setNumberNoticeAndMessage } from 'src/actions/miscActions';
import { renderSlider } from 'src/utils/handleRenderSlider';

const Home = ({ navigation }) => {
  const showToast = props => {
    Toast.show({
      text1: props.title,
      text2: props.content,
      type: props.variant,
      position: 'top',
    });
  };

  const dispatch = useDispatch();

  const profile = useSelector(state => state.misc.profile);
  const numberNoticeAndMessage = useSelector(
    state => state.misc.numberNoticeAndMessage,
  );
  const [slider, setSlider] = useState([]);

  useEffect(() => {
    setSlider(renderSlider(numberNoticeAndMessage));
  }, [numberNoticeAndMessage]);

  useEffect(() => {
    const handleGetNumberNoticeAndMessage = async () => {
      try {
        dispatch(setLoading(true));

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

        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));

        showToast({
          variant: 'error',
          title: 'エラー',
          content: 'システムエラーが発生しました',
        });
      }
    };

    handleGetNumberNoticeAndMessage();
  }, []);

  return (
    <View style={styleHome.container}>
      <Navbar />

      <View style={styleHome.zoneView}>
        <View style={styleHome.zoneUser}>
          <Text style={styleHome.displayUsername}>{profile.name}</Text>
          <Text
            style={
              styleHome.displayUserInfo
            }>{`${profile.department_code} / ${profile.role}`}</Text>
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

          <View style={styleHome.slide}>
            <SideView data={[]} navigation={navigation} />
          </View>

          <View style={styleHome.slide}>
            <SideView data={[]} navigation={navigation} />
          </View>
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
    fontSize: 38,
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
