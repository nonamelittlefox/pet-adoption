import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { setLoading } from 'src/actions/miscActions';

import {
  View,
  Text,
  Image,
  Modal,
  Keyboard,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import React, { memo, useState, useEffect } from 'react';

function TimelineAll(props) {
  const [isShowSearchBar, setIsShowSearchBar] = useState(false);
  const [timelineData, setTimelineData] = useState([]);
  const [wrapperOpacity, setWrapperOpacity] = useState(1);
  const [modalReactionVisible, setModalReactionVisible] = useState(false);
  const [modalFilterVisible, setModalFilterVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [modalEditData, setModalEditData] = useState({});
  const [modalFilterData, setModalFilterData] = useState({});

  const inactiveVector = 'https://raw.githubusercontent.com/nonamelittlefox/dpos-assets/main/inactive-vector.png';
  const activeVector = 'https://raw.githubusercontent.com/nonamelittlefox/dpos-assets/main/sky-vector.png';

  const handleEmitData = (item) => {
    props.onPressTimelineALl(item);
  };

  const handleOpenModalReaction = (post_id) => {
    setWrapperOpacity(0.5);
    setModalReactionVisible(true);
  };

  const handleCloseModalReaction = () => {
    setWrapperOpacity(1);
    setModalReactionVisible(false);
  };

  const handleOpenModalEdit = (post_id) => {
    setWrapperOpacity(0.5);
    setModalEditVisible(true);
  };

  const handleCloseModalEdit = () => {
    setWrapperOpacity(1);
    setModalEditVisible(false);
  };

  const handleSaveEdit = async () => {};

  const handleOpenModalFilter = () => {
    setWrapperOpacity(0.5);
    setModalFilterVisible(true);
  };

  const handleCloseModalFilter = () => {
    setWrapperOpacity(1);
    setModalFilterVisible(false);
  };

  useEffect(() => {
    setTimelineData(props.data);
  });

  return (
    <View style={[styles.timeLineAll, { opacity: wrapperOpacity }]}>
      <View style={styles.filterSearch}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => {handleOpenModalFilter()}}>
            <Ionicons
              size={30}
              color='#289FE1'
              name='filter-outline'
              style={{ marginLeft: 10, lineHeight: 30 }}
            />
          </TouchableOpacity>

          <Text style={styles.filterSearchText}>部署フィルタ 3/10</Text>
        </View>

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
        timelineData.length > 0 ? (
          <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
            {
              timelineData.map((item, itemIndex) => (
                <View style={styles.timeLineAllContent} key={itemIndex}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={styles.userBadgeHolder}>
                      {
                        item.user_badge ? (
                          <Image
                            source={{ uri: item.user_badge }}
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

                      <Text style={{ lineHeight: 35, marginLeft: 10 }}>{item.user_name}</Text>
                    </View>

                    <View style={styles.subUserInforBadgeHolderRight}>
                      {
                        item.has_reaction ? (
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
                  
                  <TouchableOpacity style={styles.contentBlock} onPress={() => {handleEmitData(item)}}>
                    <View style={styles.subUserInfoHolder}>
                      <Image 
                        source={{ uri: item.isActive ? activeVector : inactiveVector }}
                        style={styles.vectorImage}
                      />

                      <View style={styles.subUserInforBadgeHolder}>
                        <View style={styles.subUserInforBadgeHolderLeft}>
                          <View style={styles.subUserBadgeOne}>
                            <Image 
                              source={{ uri: item.user_sub_badge_1 }}
                              style={styles.userSubBadgeFirstImage}
                            />
                            <Text style={styles.subUserNameOneText}>{item.sub_user_name_1}</Text>
                            <Text style={styles.subUserStatusOneText}>{item.sub_user_status_1}</Text>
                          </View>

                          {
                            item.user_sub_badge_2 ? (
                              <View style={styles.subUserBadgeTwo}>
                                <Image 
                                  source={{ uri: item.user_sub_badge_2 }}
                                  style={styles.userSubBadgeSecondImage}
                                />
                                <Text style={styles.subUserNameTwoText}>{item.sub_user_name_2}</Text>
                                <Text style={styles.subUserStatusTwoText}>{item.sub_user_status_2}</Text>
                            </View>
                            ) : (
                              <View />
                            )
                          }
                        </View>

                        <TouchableOpacity style={styles.subUserInforBadgeHolderRight} onPress={() => {handleOpenModalEdit(item.id)}}>
                          <FontAwesome
                              size={25}
                              color='#CCCCCC'
                              name='pencil'
                              style={{ lineHeight: 25 }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={styles.postContentHolder}>
                      <Text style={styles.postContentHolderText}>{item.post_content}</Text>
                    </View>

                    <View style={styles.postHashtagHolder}>
                      <Text style={styles.postHashtagHolderText}>{item.post_hashtag}</Text>
                    </View>

                    <View style={styles.postContentFooterHolder}>
                      <View style={styles.postContentFooter}>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.postTimeText}>{item.post_time}</Text>
                        </View>
                        
                        <View style={styles.postContentFooterReaction}>
                          <View style={styles.reactionCountPill}>
                            <Text style={styles.reactionCountPillText}>{item.react_count}</Text>
                          </View>

                          <TouchableOpacity onPress={() => {handleOpenModalReaction(item.id)}}>
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
              ))
            }
          </ScrollView>
        ) : (
          <View />
        )
      }

      <Modal
        animationType="slide"
        presentationStyle="overFullScreen"
        transparent={true}
        visible={modalReactionVisible}
        onRequestClose={() => {
          setWrapperOpacity(1);
          setModalReactionVisible(!modalReactionVisible);
        }}
      >
        <View style={styles.modalReactionContent}>
          <View style={styles.modalReactionContentHeader}> 
            <Text>ポイントが不足しているため拍手できません。</Text>
          </View>

          <TouchableOpacity style={styles.modalReactionContentFooter} onPress={() => {handleCloseModalReaction()}}>
            <Text style={styles.modalReactionContentFooterText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        presentationStyle="overFullScreen"
        transparent={true}
        visible={modalEditVisible}
        onRequestClose={() => {
          setWrapperOpacity(1);
          setModalEditVisible(!modalEditVisible);
        }}
      >
        <View style={styles.modalEditContent}>
          <View style={styles.modalEditContentHeader}> 
            <TouchableOpacity style={styles.cancelButton} onPress={() => {handleCloseModalEdit()}}>
              <Text style={styles.cancelButtonText}>キャンセル</Text>
            </TouchableOpacity>

            <View style={styles.editButton}>
              <TouchableOpacity style={styles.editButtonHolder} onPress={() => {
                handleSaveEdit()
              }}>
                <Text style={styles.editButtonText}>保存</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.modalEditUserInfor}>
            <Image 
              source={{ uri: inactiveVector }}
              style={styles.vectorImageEdit}
            />

            <Image 
              source={{ uri: 'https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-Viet-Nam.jpg' }}
              style={styles.userSubBadgeFirstImage}
            />

            <Text style={styles.subUserNameOneText}>路具 辺保</Text>

            <Text style={styles.subUserStatusOneText}>さんへ</Text>
          </View>

          <View style={styles.modalEditPostContent}>
            <Text style={styles.modalEditContentText}>社内歓迎会の幹事として、何から何まで準備していただきありがとうございました！</Text>
            <Text style={styles.postHashtagHolderText}>#ダイセー行事</Text>
          </View>

          <View style={styles.modalEditFooter}>
            <View style={{ flex: 1 }} />

            <View style={styles.modalEditFooterButton}>
                <Text style={styles.modalEditFooterHashtag}>#</Text>

                <TouchableOpacity style={styles.modalEditFooterPlusButton}>
                  <Image 
                    source={{ uri: 'https://raw.githubusercontent.com/nonamelittlefox/dpos-assets/main/P.png' }}
                    style={styles.modalEditFooterPlusButtonImage}
                  />

                  <Text style={styles.modalEditFooterPlusButtonText}>+39</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        presentationStyle="overFullScreen"
        transparent={true}
        visible={modalFilterVisible}
        onRequestClose={() => {
          setWrapperOpacity(1);
          setModalFilterVisible(!modalFilterVisible);
        }}
      >
        <View style={styles.modalFilterContent}>
          <View style={styles.modalFilterContentHeader}> 
            <TouchableOpacity style={styles.cancelButton} onPress={() => {handleCloseModalFilter()}}>
              <AntDesign
                size={30}
                color='#CCCCCC'
                name='close'
                style={{ lineHeight: 30, marginLeft: 15 }}
              />
            </TouchableOpacity>

            <View style={styles.filterAllRealeaseButton}>
              <Text style={styles.filterAllRealeaseButtonText}>全解除</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', borderColor: '#CBCBCB', borderWidth: 1, width: '100%', height: 50, marginTop: 10 }}>
            <Ionicons
              size={30}
              color='#289FE1'
              name='filter-outline'
              style={{ marginHorizontal: 10, lineHeight: 30, marginTop: 10 }}
            />

            <Text style={{ marginTop: 18, color: '#9E9E9E' }}>部署フィルタ 3/10</Text>
          </View>

          <View style={{ flexDirection: 'row', borderBottomColor: '#CBCBCB', borderBottomWidth: 1, width: '100%', height: 50 }}>
            <Ionicons
              size={30}
              color='#B7B7B7'
              name='search'
              style={{ marginHorizontal: 10, lineHeight: 30, marginTop: 10 }}
            />

            <Text style={{ marginTop: 18, color: '#9E9E9E' }}>部署を検索</Text>
          </View>

          <View style={{ width: '100%' }}>
            <View style={{ height: 50, width: '100%', backgroundColor: '#F5F5F5', justifyContent: 'center' }}>
              <Text style={{ marginLeft: 10, color: '#797979' }}>所属部署</Text>
            </View>

            <View style={{ height: 50, width: '100%' }}>
              <TouchableOpacity style={{ flex: 1,  flexDirection: 'row', alignItems: 'center' }}>
                <AntDesign
                  size={25}
                  color='#289FE1'
                  name='check'
                  style={{ marginHorizontal: 10, lineHeight: 25 }}
                />

                <Text style={{ color: '#289FE1' }}>DX研究所</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ height: 50, width: '100%' }}>
            <View style={{ height: 50, width: '100%', backgroundColor: '#F5F5F5', justifyContent: 'center' }}>
              <Text style={{ marginLeft: 10, color: '#797979' }}>部署一覧</Text>
            </View>

            <TouchableOpacity style={{ height: 50, flexDirection: 'row', alignItems: 'center' }}>
              <AntDesign
                size={25}
                color='#B7B7B7'
                name='right'
                style={{ marginHorizontal: 10, lineHeight: 25 }}
              />

              <Text style={{ color: '#9B9A9A' }}>ダイセーホールディングス</Text>
            </TouchableOpacity>

            <View style={{ height: 50 }}>
              <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <AntDesign
                  size={25}
                  color='#289FE1'
                  name='check'
                  style={{ marginHorizontal: 10, lineHeight: 25 }}
                />

                <Text style={{ color: '#289FE1' }}>DX研究所</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={{ height: 50, flexDirection: 'row', alignItems: 'center' }}>
              <AntDesign
                size={25}
                color='#B7B7B7'
                name='right'
                style={{ marginHorizontal: 10, lineHeight: 25 }}
              />

              <Text style={{ fontWeight: 'bold', color: '#9B9A9A' }}>グローバルエアカーゴ</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ height: 50 }}>
              <Text style={{ marginLeft: 60, color: '#9B9A9A'}}>グローバルエアカーゴ</Text>
            </TouchableOpacity>

            <View style={{ height: 50 }}>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AntDesign
                  size={25}
                  color='#289FE1'
                  name='check'
                  style={{ marginLeft: 45, marginRight: 10, lineHeight: 25 }}
                />

                <Text style={{ marginLeft: 0, color: '#289FE1' }}>経営管理本部</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={{ height: 50 }}>
              <Text style={{ marginLeft: 80, color: '#9B9A9A' }}>秘書課</Text>
            </TouchableOpacity>

            <View style={{ height: 50 }}>
              <TouchableOpacity style={{ flexDirection: 'row' }}>
                <AntDesign
                  size={25}
                  color='#289FE1'
                  name='check'
                  style={{ marginHorizontal: 10, lineHeight: 25 }}
                />

                <Text style={{ color: '#289FE1' }}>イズミ物流</Text>
              </TouchableOpacity>
            </View>

            <View style={{ height: 50 }}>
              <TouchableOpacity style={{ flexDirection: 'row' }}>
                <AntDesign
                  size={25}
                  color='#289FE1'
                  name='check'
                  style={{ marginHorizontal: 10, lineHeight: 25 }}
                />

                <Text style={{ color: '#289FE1' }}>メジャーサービスジャパン</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.modalEditFooter}>
            <View style={{ flex: 1 }} />

            <View style={styles.modalEditFooterButton}>
                <Text style={styles.modalEditFooterHashtag}>#</Text>

                <TouchableOpacity style={styles.modalEditFooterPlusButton}>
                  <Image 
                    source={{ uri: 'https://raw.githubusercontent.com/nonamelittlefox/dpos-assets/main/P.png' }}
                    style={styles.modalEditFooterPlusButtonImage}
                  />

                  <Text style={styles.modalEditFooterPlusButtonText}>+39</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  timeLineAll: {
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
    borderWidth: 0.5,
    borderRadius: 5,
    marginHorizontal: 10,
    borderColor: '#979797',
    flexDirection: 'column',
    marginTop: 10,
  },

  vectorImage: {
    width: 20,
    height: 20,
    marginTop: 30,
    marginLeft: 10,
  },

  vectorImageEdit: {
    width: 30,
    height: 30,
    marginTop: 25,
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
    marginLeft: 20,
    borderWidth: 1,
    borderRadius: 45 / 2,
    borderColor: '#CCCCCC',
  },

  timeLineAllContent: {
    flex: 1,
    flexDirection: 'column',
  },

  userBadgeHolder: {
    flex: 6,
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
    marginLeft: 20
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

  postContentHolder: {
    flex: 3,
    marginTop: 10,
    marginHorizontal: 10,
  },

  postContentHolderText: {
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

  modalReactionContent: {
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

  modalEditContent: {
    flex: 1,
    elevation: 5,
    shadowRadius: 4,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',

    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  modalFilterContent: {
    flex: 1,
    elevation: 5,
    shadowRadius: 4,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',

    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  modalReactionContentHeader: {
    flex: 5,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#CCCCCC',
  },

  modalReactionContentFooter: {
    flex: 1,
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalReactionContentFooterText: {
    fontSize: 18,
    color: '#289FE1',
    fontWeight: 'bold',
  },

  modalEditContentHeader: {
    marginTop: 60,
    flexDirection: 'row',
  },

  cancelButton: { 
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  cancelButtonText: { 
    fontSize: 16,
    marginLeft: 20,
    color: '#989898',
    fontWeight: 'bold',
  },

  editButton: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  editButtonHolder: { 
    width: 100,
    height: 40,
    marginRight: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#289FE1',
  },

  editButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  modalEditUserInfor: {
    borderTopWidth: 1,
    paddingBottom: 20,
    marginVertical: 20,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderTopColor: '#CBCBCB',
    borderBottomColor: '#CBCBCB',
  },

  modalEditPostContent: {
    marginHorizontal: 10,
    flexDirection: 'column',
  },

  modalEditContentText: {
    marginBottom: 10,
    color: '#5C5C5C',
  },

  modalEditFooter: {
    bottom: 0,
    height: 100,
    width: '100%',
    borderTopWidth: 1,
    flexDirection: 'row',
    position: 'absolute',
    borderTopColor: '#CBCBCB',
  },

  modalEditFooterButton: {
    flex: 2,
    paddingLeft: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  modalEditFooterHashtag: {
    fontSize: 40,
    lineHeight: 40,
    marginRight: 40,
    color: '#616161',
    marginBottom: 10,
  },

  modalEditFooterPlusButton: {
    width: 150,
    height: 60,
    borderRadius: 15,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },

  modalEditFooterPlusButtonImage: {
    width: 30,
    height: 30
  },

  modalEditFooterPlusButtonText: {
    fontSize: 22,
    marginLeft: 5,
    lineHeight: 22,
    color: '#616161',
    fontWeight: 'bold',
  },

  modalFilterContentHeader: {
    marginTop: 60,
    flexDirection: 'row',
  },

  filterAllRealeaseButton: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  filterAllRealeaseButtonText: {
    fontSize: 20,
    lineHeight: 20,
    marginRight: 20,
    color: '#289FE1',
  },

  filterHeader: {
    height: 50,
    width: '100%',
    borderTopWidth: 1,
    marginVertical: 20,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderTopColor: '#CBCBCB',
    borderBottomColor: '#CBCBCB',
  },
});

export default memo(TimelineAll);