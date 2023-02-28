import React, { memo } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Colors } from 'src/const';

function Loading() {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color={Colors.orange} />
    </View>
  );
}

export default memo(Loading);

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    flex: 1,
    zIndex: 999,
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
