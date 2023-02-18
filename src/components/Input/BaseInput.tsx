import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-easy-icon';

export interface propsType {
  accessibilityLabel?: string;
  testID?: string;
  type?: string;
  multiline?: boolean;
  numberOfLines?: number;
  inputStyle?: any;
  textInputStyle?: any;
  inputHeight?: any;
  label?: any;
  autoFocus?: boolean;
  placeholder?: any;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  value?: any;
  iconSearch?: boolean;
  secureTextEntry?: boolean;
  iconClear?: boolean;
  onChangeValue?: any;
  onClearValue?: any;
  onSubmitEditing?: any;
  onFocus?: any;
  autoCorrect?: boolean;
  onBlur?: any;
}
function BaseInput(props: propsType) {
  const [value, setValue] = useState<string>('');

  // eslint-disable-next-line no-shadow
  const onChangeText = (value: string) => {
    props.onChangeValue(value);
  };

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <View style={[styles.wrapperInput, props.inputStyle]}>
      {props.label ? <Text style={styles.label}>{props.label}</Text> : <></>}
      <View style={styles.wrapperInputText}>
        {props.iconSearch && (
          <Icon
            style={styles.iconSearch}
            name="search"
            type="material"
            size={20}
          />
        )}
        <TextInput
          accessibilityLabel={props.accessibilityLabel}
          testID={props.testID}
          multiline={props.multiline}
          numberOfLines={props.numberOfLines}
          keyboardType={props.keyboardType}
          secureTextEntry={props.secureTextEntry}
          style={[
            props.iconSearch ? styles.inputSearch : styles.input,
            props.inputHeight,
            props.textInputStyle,
          ]}
          onChangeText={onChangeText}
          value={value}
          autoFocus={props.autoFocus}
          placeholder={props.placeholder}
          onSubmitEditing={props.onSubmitEditing}
          onFocus={props.onFocus}
          autoCorrect={props.autoCorrect}
          onBlur={props.onBlur}
        />
        {props.iconClear && value.length > 0 && (
          <TouchableWithoutFeedback onPress={props.onClearValue}>
            <Icon
              testID="close"
              style={styles.icon}
              name="close"
              type="antdesign"
              size={20}
            />
          </TouchableWithoutFeedback>
        )}
      </View>
    </View>
  );
}

export default BaseInput;

const styles = StyleSheet.create({
  wrapperInput: {
    width: '100%',
  },

  wrapperInputText: {
    position: 'relative',
  },

  label: {
    fontSize: 22,
    marginBottom: 5,
  },

  input: {
    width: '100%',
    height: 60,

    paddingLeft: 15,
    paddingRight: 15,

    fontSize: 18,

    backgroundColor: '#FFFFFF',

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },

  inputSearch: {
    width: '100%',
    height: 50,
    paddingLeft: 35,
    paddingRight: 15,
    borderWidth: 1,
    fontSize: 22,
    borderRadius: 3,
    borderColor: 'rgba(0, 0, 0, 0.25)',
  },

  iconSearch: {
    position: 'absolute',
    left: 10,
    top: 20,
  },

  icon: {
    position: 'absolute',
    right: 10,
    top: 20,
  },
});
