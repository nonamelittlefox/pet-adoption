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

function TimelineRecived(props) {
  const [isShowSearchBar, setIsShowSearchBar] = useState(false);
  const [timelineData, setTimelineData] = useState(props.data);

  const inactiveVector = 'https://raw.githubusercontent.com/nonamelittlefox/dpos-assets/main/inactive-vector.png';
  const activeVector = 'https://raw.githubusercontent.com/nonamelittlefox/dpos-assets/main/sky-vector.png';

  const handleEmitData = (data) => {
    props.onPressTimelineRecived(data);
  };

  const handlePressReaction = (post_id) => {};

  useEffect(() => {
    props.data.special_badge = 'https://tapchilamdep.com/wp-content/uploads/2019/10/Rose.jpg';
    setTimelineData(props.data);
  });

  return (
    <View style={styles.timeLineRecived}>
      <View style={styles.filterSearch}>
        <View style={{ flex: 1, flexDirection: 'row' }} />

        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={() => { setIsShowSearchBar(!isShowSearchBar) }}>
            <Ionicons
              size={30}
              color='#B7B7B7'
              name='search'
              style={{ marginRight: 10, lineHeight: 30 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {
        isShowSearchBar ? (
          <View style={styles.searchBarHolder}>
            <View style={styles.searchBar}>
              <Ionicons
                size={25}
                color='#B7B7B7'
                name='search'
                style={{ marginHorizontal: 5, lineHeight: 25 }}
              />
    
              <TextInput 
                multiline={false}
                placeholder='検索する'
                testID='_SearchInput'
                autoCapitalize='none'
                onChangeText={() => { }}
                accessibilityLabel='_SearchInput'
              />
            </View>
    
            <TouchableOpacity style={styles.searchButton}>
              <Text style={styles.searchButtonText}>検索</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View />
        )
      }

      {
        timelineData ? (
          <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
            <View style={styles.timelineRecivedContent}>
              <View style={styles.userBadgeHolder}>
                {
                  timelineData.user_badge ? (
                    <Image
                      source={{ uri: timelineData.user_badge }}
                      style={styles.userBadgeImage}
                    />
                  ) : (
                    <FontAwesome
                        size={35}
                        color='#CCCCCC'
                        name='user-circle'
                        style={{ lineHeight: 35 }}
                    />
                  )
                }

                <Text style={{ lineHeight: 35, marginLeft: 10 }}>{timelineData.user_name}</Text>
              </View>
              
              <TouchableOpacity style={styles.contentBlock} onPress={() => {handleEmitData(timelineData)}}>
                <View style={styles.subUserInfoHolder}>
                  <Image 
                    source={{ uri: timelineData.isActive ? activeVector : inactiveVector }}
                    style={styles.vectorImage}
                  />

                  <View style={styles.subUserInforBadgeHolder}>
                    <View style={styles.subUserInforBadgeHolderLeft}>
                      <View style={styles.subUserBadgeOne}>
                        <Image 
                          source={{ uri: timelineData.user_sub_badge_1 }}
                          style={styles.userSubBadgeFirstImage}
                        />
                        <Text style={styles.subUserNameOneText}>{timelineData.sub_user_name_1}</Text>
                        <Text style={styles.subUserStatusOneText}>{timelineData.sub_user_status_1}</Text>
                      </View>
                      
                      {
                        timelineData.user_sub_badge_2 ? (
                          <View style={styles.subUserBadgeTwo}>
                            <Image 
                              source={{ uri: timelineData.user_sub_badge_2 }}
                              style={styles.userSubBadgeSecondImage}
                            />
                            <Text style={styles.subUserNameTwoText}>{timelineData.sub_user_name_2}</Text>
                            <Text style={styles.subUserStatusTwoText}>{timelineData.sub_user_status_2}</Text>
                        </View>
                        ) : (
                          <View />
                        )
                      }
                      
                      {
                        timelineData.special_badge ? (
                          <View style={styles.subUserBadgeSpecial}>
                            <Image 
                              source={{ uri: timelineData.special_badge }}
                              style={styles.userSubBadgeSpecialImage}
                            />
                        </View>
                        ) : (
                          <View />
                        )
                      }
                    </View>

                    <View style={styles.subUserInforBadgeHolderRight}>
                      {
                        timelineData.has_reaction ? (
                          <Image 
                            source={{ uri: 'https://raw.githubusercontent.com/nonamelittlefox/dpos-assets/main/reaction.png' }}
                            style={styles.subUserInforBadgeHolderRightImage}
                          />
                        ) : (
                          <View />
                        )
                      }
                    </View>
                  </View>
                </View>

                <View style={styles.postContentHolder}>
                  <Text style={styles.postContentHolderText}>{timelineData.post_content}</Text>
                </View>

                <View style={styles.postHashtagHolder}>
                  <Text style={styles.postHashtagHolderText}>{timelineData.post_hashtag}</Text>
                </View>

                <View style={styles.postContentFooterHolder}>
                  <View style={styles.postContentFooter}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.postTimeText}>{timelineData.post_time}</Text>
                    </View>
                    
                    <View style={styles.postContentFooterReaction}>
                      <View style={styles.reactionCountPill}>
                        <Text style={styles.reactionCountPillText}>{timelineData.react_count}</Text>
                      </View>

                      <TouchableOpacity onPress={() => {handlePressReaction(timelineData.id)}}>
                        <Image 
                          source={{ uri: 'https://raw.githubusercontent.com/nonamelittlefox/dpos-assets/main/handclap.png' }}
                          style={styles.postContentFooterReactionImage}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          <View />
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  timeLineRecived: {
    flex: 1,
  },

  filterSearch: {
    marginVertical: 10,
    flexDirection: 'row',
  },

  filterSearchText: {
    fontSize: 12,
    marginLeft: 5,
    lineHeight: 30,
    color: '#9E9E9E',
  },

  searchBarHolder: {
    height: 60,
    flexDirection: 'row',
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#289FE1',
  },

  searchBar: {
    flex: 4,
    height: 40,
    borderWidth: 2,
    borderRadius: 15,
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
    borderColor: '#289FE1',
    justifyContent: 'flex-start',
    borderBottomColor: '#289FE1',
  },

  searchButton: {
    height: 40,
    flex: 1,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#289FE1',
  },

  searchButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '900',
  },

  userBadgeImage: {
    width: 35,
    height: 35,
    borderWidth: 1,
    borderRadius: 45 / 2,
    borderColor: '#CCCCCC',
  },

  contentBlock: {
    height: 200,
    marginTop: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    marginHorizontal: 10,
    borderColor: '#979797',
    flexDirection: 'column',
  },

  vectorImage: {
    width: 20,
    height: 20,
    marginTop: 30,
    marginLeft: 10,
  },

  userSubBadgeFirstImage: {
    width: 40,
    height: 40,
    marginTop: 20,
    marginLeft: 5,
    borderWidth: 1,
    borderRadius: 45 / 2,
    borderColor: '#CCCCCC',
  },

  userSubBadgeSecondImage: {
    width: 35,
    height: 35,
    marginTop: 5,
    marginLeft: 30,
    borderWidth: 1,
    borderRadius: 45 / 2,
    borderColor: '#CCCCCC',
  },

  userSubBadgeSpecialImage: {
    width: 35,
    height: 35,
    marginTop: 35,
    marginLeft: 30,
    borderWidth: 1,
    borderRadius: 45 / 2,
    borderColor: '#CCCCCC',
  },

  timelineRecivedContent: {
    flex: 1,
    flexDirection: 'column',
  },

  userBadgeHolder: {
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
    flexDirection: 'row',
  },

  subUserInfoHolder: {
    flexDirection: 'row',
  },

  subUserInforBadgeHolder: {
    flex: 1,
    flexDirection: 'row',
  },

  subUserInforBadgeHolderLeft: {
    flex: 8, 
    flexDirection: 'row',
  },

  subUserBadgeOne: {
    zIndex: 999, 
    flexDirection: 'row'
  },

  subUserNameOneText: {
    marginTop: 30,
    marginLeft: 30,
  },

  subUserStatusOneText: {
    marginTop: 30, 
    marginLeft: 5, 
    color: '#9E9E9E'
  },

  subUserNameTwoText: {
    marginTop: 8,
    marginLeft: 10,
  },

  subUserStatusTwoText: {
    marginLeft: 5,
    marginTop: 8,
    color: '#9E9E9E'
  },

  subUserBadgeTwo: {
    flexDirection: 'row', 
    position: 'absolute'
  },

  subUserInforBadgeHolderRight: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center', 
  },

  subUserInforBadgeHolderRightImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 45 / 2,
  },

  subUserBadgeSpecial: {
    zIndex: 1000,
    flexDirection: 'row', 
    position: 'absolute'
  },

  postContentHolder: {
    flex: 3,
    marginTop: 15,
    marginHorizontal: 10,
  },

  postContentHolderText: {
    fontSize: 16,
    color: '#5C5C5C',
  },

  postHashtagHolder: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 10,
  },

  postHashtagHolderText: {
    color: '#289FE1',
    fontWeight: '800'
  },

  postTimeText: {
    fontSize: 12,
    lineHeight: 12,
    color: '#9E9E9E',
  },

  postContentFooterHolder: {
    flex: 2,
    marginVertical: 10,
    marginHorizontal: 10, 
  },

  postContentFooter: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row', 
  },

  postContentFooterReaction: {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'flex-end'
  },

  postContentFooterReactionImage: {
    width: 35,
    height: 35,
  },

  reactionCountPill: {
    width: 40,
    height: 25,
    marginTop: 10,
    marginRight: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9F9F9',
  },

  reactionCountPillText: {
    color: '#42BBFE',
    fontWeight: '900',
  },
});

export default memo(TimelineRecived);