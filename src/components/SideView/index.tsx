import React from 'react';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { setInitDataDepartment } from 'src/actions/miscActions';
import { useDispatch } from 'react-redux';

const SideView = ({ navigation, data }) => {
  const dispatch = useDispatch();
  return (
    <View style={SideViewStyle.container}>
      {data.map((row, indexRow) => {
        return (
          <View style={SideViewStyle.row} key={`row-${indexRow}`}>
            {row.map((item, indexItem) => {
              return (
                <View
                  style={SideViewStyle.item}
                  key={`item-${indexRow}-${indexItem}`}>
                  <Pressable
                    onPress={() => {
                      dispatch(setInitDataDepartment(true));
                      navigation.jumpTo(item.link);
                    }}
                    accessibilityLabel={item.id}
                    style={({ pressed }) => [
                      pressed
                        ? [SideViewStyle.icon, SideViewStyle.hoverButton]
                        : [SideViewStyle.icon],
                    ]}>
                    {item.library_icon === 'FontAwesome' && (
                      <FontAwesome
                        style={SideViewStyle.dotIcon}
                        name={item.icon}
                        size={40}
                        color="#1534A1"
                      />
                    )}

                    {item.library_icon === 'FontAwesome5' && (
                      <FontAwesome5
                        style={SideViewStyle.dotIcon}
                        name={item.icon}
                        size={40}
                        color="#1534A1"
                        solid
                      />
                    )}

                    {item.message !== null ? (
                      <View style={SideViewStyle.badge}>
                        <Text
                          accessibilityLabel={'_NoticeNumber'}
                          testID="noticeNumber"
                          style={{ color: '#FFF', fontWeight: 'bold' }}>
                          {item.message}
                        </Text>
                      </View>
                    ) : (
                      <View />
                    )}
                  </Pressable>
                  <View>
                    <Text style={SideViewStyle.text}>{item.text}</Text>
                  </View>
                </View>
              );
            })}

            {row.length === 1 && (
              <>
                <View style={{ flex: 1 }} />
                <View style={{ flex: 1 }} />
              </>
            )}

            {row.length === 2 && <View style={{ flex: 1 }} />}
          </View>
        );
      })}
    </View>
  );
};

const SideViewStyle = StyleSheet.create({
  container: {
    flex: 1,
  },

  row: {
    flex: 1,
    flexDirection: 'row',
  },

  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    // justifyContent: 'center',
  },

  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    borderRadius: 70,
    backgroundColor: '#FFF',
    marginBottom: 15,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.22,
    shadowRadius: 10.24,
    elevation: 13,
  },

  badge: {
    position: 'absolute',
    top: 0,
    right: -5,
    backgroundColor: 'red',
    minWidth: 25,
    minHeight: 25,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontWeight: 'bold',
    color: '#1534A1',
    textAlign: 'center',
  },

  dotIcon: {
    lineHeight: 45,
  },

  hoverButton: {
    opacity: 0.5,
  },
});

export default SideView;
