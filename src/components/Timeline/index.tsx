import { Ionicons, FontAwesome } from '@expo/vector-icons';
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

import { ScrollView } from 'react-native-gesture-handler';

import TimelineAll from './all';
import TimelineRecived from './recived';
import TimelineSent from './sent';
import TimelineHandclap from './handclap';
interface props {
  navigation: any;
  data: any;
}

function Timeline(props: props) {
  const [currentTab, setCurrentTab] = useState('ALL');
  const [timelineData, setTimelineData] = useState([]);
  const [recivedData, setRecivedData] = useState([]);
  const [sentData, setSentData] = useState([]);
  const [handclapData, setHandclapData] = useState([]);

  const handleTransferToRecivedTab = (item) => {
    setRecivedData(item);
    setCurrentTab('RECIVED');
  };

  const handleTransferToSentTab = (item) => {
    setSentData(item);
    setCurrentTab('SENT');
  };

  const handleTransferToHandclapTab = (item) => {
    setHandclapData(item);
    setCurrentTab('HANDCLAP');
  };

  useEffect(() => {
    const SAMPLE_DATA = [
      {
        id: 1,
        user_badge: 'https://picsum.photos/200/300',
        user_sub_badge_1: 'https://picsum.photos/200/300',
        user_sub_badge_2: '',
        user_name: '大盛 太郎',
        sub_user_name_1: '路具 辺保',
        sub_user_name_2: '',
        sub_user_status_1: 'さんへ',
        sub_user_status_2: '',
        isActive: false,
        has_reaction: true,
        react_count: 412,
        post_time: '11/22 11:27',
        post_content: '社内歓迎会の幹事として、何から何まで準備していただきありがとうございました！',
        post_hashtag: '#ダイセー行事',
        special_badge: 'https://tapchilamdep.com/wp-content/uploads/2019/10/Rose.jpg',
      },
      {
        id: 2,
        user_badge: 'https://raw.githubusercontent.com/nonamelittlefox/dpos-assets/main/icon%201.png',
        user_sub_badge_1: 'https://i.pinimg.com/236x/92/2a/06/922a06dc11ab49a1836cf0456c526bac.jpg',
        user_sub_badge_2: '',
        user_name: '大盛 太郎',
        sub_user_name_1: '路具 辺保',
        sub_user_name_2: '',
        sub_user_status_1: 'さんへ',
        sub_user_status_2: '',
        isActive: false,
        has_reaction: true,
        react_count: 52,
        post_time: '11/22 11:27',
        post_content: 'ワクチン接種の予約対応をありがとうございました。いつも助かってます！',
        post_hashtag: '#部署を超えて',
        special_badge: 'https://tapchilamdep.com/wp-content/uploads/2019/10/Rose.jpg',
      },
      {
        id: 3,
        user_badge: 'https://i.pinimg.com/originals/4f/62/6f/4f626f222f86785bfac71ad6f890032c.jpg',
        user_sub_badge_1: 'https://thuthuatnhanh.com/wp-content/uploads/2019/07/anh-girl-xinh-facebook-tuyet-dep-387x580.jpg',
        user_sub_badge_2: '',
        user_name: '田中 一郎',
        sub_user_name_1: '路具 辺保',
        sub_user_name_2: '',
        sub_user_status_1: 'さんへ',
        sub_user_status_2: '',
        isActive: false,
        has_reaction: false,
        react_count: 126,
        post_time: '11/22 11:27',
        post_content: 'おいしいドリンクの差し入れをありがとうございました。気遣いに感謝いたします👍',
        post_hashtag: '',
        special_badge: 'https://tapchilamdep.com/wp-content/uploads/2019/10/Rose.jpg',
      },
      {
        id: 4,
        user_badge: 'https://i.pinimg.com/originals/a2/2d/1d/a22d1d8a789a904187dba0f5240a5907.png',
        user_sub_badge_1: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1144982182.jpg?crop=0.669xw:1.00xh;0.166xw,0&resize=1200:*',
        user_sub_badge_2: '',
        user_name: '田中 一郎',
        sub_user_name_1: '路具 辺保',
        sub_user_name_2: '',
        sub_user_status_1: 'さんへ',
        sub_user_status_2: '',
        isActive: false,
        has_reaction: false,
        react_count: 823,
        post_time: '11/22 11:27',
        post_content: 'ワクチン接種の予約対応をありがとうございました。いつも助かってます！',
        post_hashtag: '#部署を超えて',
        special_badge: 'https://tapchilamdep.com/wp-content/uploads/2019/10/Rose.jpg',
      },
      {
        id: 5,
        user_badge: 'https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-Viet-Nam.jpg',
        user_sub_badge_1: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL1PYg1G6kJpVcCtPLwILnm4p_cvzWW4JuQQ&usqp=CAU',
        user_sub_badge_2: 'https://scr.vn/wp-content/uploads/2020/08/%E1%BA%A2nh-hot-girl-l%C3%A0m-avt.jpg',
        user_name: '田中 一郎',
        sub_user_name_1: '路具 辺保',
        sub_user_name_2: '他1人',
        sub_user_status_1: 'さんへ',
        sub_user_status_2: '他1人',
        isActive: true,
        has_reaction: true,
        react_count: 31,
        post_time: '11/22 11:27',
        post_content: '社内歓迎会の幹事として、何から何まで準備していただきありがとうございました！',
        post_hashtag: '#ダイセー行事',
        special_badge: 'https://tapchilamdep.com/wp-content/uploads/2019/10/Rose.jpg',
      },
      {
        id: 6,
        user_badge: 'https://i.pinimg.com/736x/53/fa/94/53fa941122c8d54ec88af31eedd2f884.jpg',
        user_sub_badge_1: 'https://scr.vn/wp-content/uploads/2020/08/%E1%BA%A2nh-hot-girl-l%C3%A0m-avt.jpg',
        user_sub_badge_2: '',
        user_name: '田中 一郎',
        sub_user_name_1: '路具 辺保',
        sub_user_name_2: '',
        sub_user_status_1: 'さんへ',
        sub_user_status_2: '',
        isActive: false,
        has_reaction: false,
        react_count: 12,
        post_time: '11/22 11:27',
        post_content: 'おいしいドリンクの差し入れをありがとうございました。気遣いに感謝いたします👍',
        post_hashtag: '',
        special_badge: 'https://tapchilamdep.com/wp-content/uploads/2019/10/Rose.jpg',
      },
    ];

    setTimelineData(SAMPLE_DATA);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabNavigation}>
        <TouchableOpacity
          onPress={() => setCurrentTab('ALL')}
          style={[styles.tabBlock, currentTab === 'ALL' ? { borderBottomColor: '#289FE1' } : { borderBottomColor: '#CBCBCB' }]}
        >
          <Text style={{ fontSize: 16, fontWeight: '400', color: '#535353' }}>すべて</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => setCurrentTab('RECIVED')}
          style={[styles.tabBlock, currentTab === 'RECIVED' ? { borderBottomColor: '#289FE1' } : { borderBottomColor: '#CBCBCB' }]}
        >
          <Text style={{ fontSize: 16, fontWeight: '400', color: '#535353' }}>もらった</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => setCurrentTab('SENT')}
          style={[styles.tabBlock, currentTab === 'SENT' ? { borderBottomColor: '#289FE1' } : { borderBottomColor: '#CBCBCB' }]}
        >
          <Text style={{ fontSize: 16, fontWeight: '400', color: '#535353' }}>おくった</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => setCurrentTab('HANDCLAP')}
          style={[styles.tabBlock, currentTab === 'HANDCLAP' ? { borderBottomColor: '#289FE1' } : { borderBottomColor: '#CBCBCB' }]}
        >
          <Text style={{ fontSize: 16, fontWeight: '400', color: '#535353' }}>拍手した</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabContent}>
        {
          currentTab === 'ALL' ? (
            <View style={{ flex: 1 }}>
              <TimelineAll onPressTimelineALl={handleTransferToRecivedTab} data={timelineData} navigation={props.navigation} />
            </View>
          ) : (
            <View />
          )
        }

        {
          currentTab === 'RECIVED' ? (
            <View style={{ flex: 1 }}>
              <TimelineRecived onPressTimelineRecived={handleTransferToSentTab} data={recivedData} navigation={props.navigation} />
            </View>
          ) : (
            <View />
          )
        }

        {
          currentTab === 'SENT' ? (
            <View style={{ flex: 1 }}>
              <TimelineSent onPressTimelineSent={handleTransferToSentTab} data={sentData} navigation={props.navigation} />
            </View>
          ) : (
            <View />
          )
        }

        {
          currentTab === 'HANDCLAP' ? (
            <View style={{ flex: 1 }}>
              <TimelineHandclap onPressTimelineHandclap={handleTransferToHandclapTab} data={handclapData} navigation={props.navigation} />
            </View>
          ) : (
            <View />
          )
        }
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

  tabNavigation: {
    height: 50,
    marginTop: 50,
    flexDirection: 'row',
  },

  tabBlock: {
    flex: 1,
    borderBottomWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabContent: {
    flex: 1,
  }
});

export default memo(Timeline);