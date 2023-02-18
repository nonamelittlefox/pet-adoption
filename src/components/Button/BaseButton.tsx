import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-easy-icon';

export interface propsType {
  accessibilityLabel?: string;
  buttonStyles?: any;
  textStyles?: any;
  title?: any;
  type?: string;
  onPressButton?: any;
  disabled?: boolean;
  icon?: string;
  iconStyle?: any;
  testID?: string;
}
function BaseButton(props: propsType) {
  return (
    <Pressable
      accessibilityLabel={props.accessibilityLabel}
      disabled={props.disabled || false}
      onPress={props.onPressButton}
      testID={props.testID}
      style={({ pressed }) => [
        pressed
          ? [styles.wrapperButton, props.buttonStyles, styles.hoverButton]
          : [styles.wrapperButton, props.buttonStyles],
      ]}>
      {props.icon && (
        <Icon
          style={[styles.icon, props.iconStyle]}
          name={props.icon}
          type="material-community"
          size={20}
        />
      )}
      <Text style={[styles.text, props.textStyles]}>{props.title}</Text>
    </Pressable>
  );
}
export default BaseButton;

const styles = StyleSheet.create({
  wrapperButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,

    height: 60,

    backgroundColor: '#FFFFFF',

    borderRadius: 15,
    borderWidth: 0.1,
    borderColor: '#D1C4C4',

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  },

  text: {
    color: '#1534A1',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 60,
  },

  icon: {
    marginRight: 5,
  },

  hoverButton: {
    opacity: 0.5,
  },
});
