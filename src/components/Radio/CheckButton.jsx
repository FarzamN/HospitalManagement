import React from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {Colors} from '../../utils/Colors';
import {Font} from '../../utils/font';

const CheckButton = ({onPress, name, focus, flag}) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={GlobalStyle.Ripple}
      style={[
        styles.row,
        GlobalStyle.Space_Between,
        GlobalStyle.Padding,
        {
          backgroundColor: focus ? 'rgba(167, 95, 211, 0.2)' : Colors.White,
        },
      ]}>
      {flag && <Text style={[styles.Heading, {fontSize: 20}]}>{flag}</Text>}
      <Text style={styles.Heading}>{name}</Text>
      <Icon
        size={20}
        type={IconType.Fontisto}
        name={focus ? 'radio-btn-active' : 'radio-btn-passive'}
        color={focus ? Colors.Purple : Colors.Grey}
      />
    </Pressable>
  );
};
const styles = StyleSheet.create({
  Heading: {
    fontSize: 15,
    color: Colors.Black,
    fontFamily: Font.font500,
    textTransform: 'capitalize',
  },
  row: {
    overflow: 'hidden',
    height: 50,
    marginTop: 5,
  },
});

export default CheckButton;
