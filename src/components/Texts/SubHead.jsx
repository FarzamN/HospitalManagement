import React from 'react';
import {styles} from './styles';
import {Text} from 'react-native';
import {Font} from '../../utils/font';
import {Colors} from '../../utils/Colors';

const SubHead = ({
  text,
  style,
  center,
  bold,
  white,
  underline,
  numberOfLines,
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        styles.subHead,
        {
          textAlign: center ? 'center' : 'left',
          fontFamily: bold ? Font.font500 : Font.font400,
          color: white ? Colors.White : Colors.Black,
          textDecorationLine: underline ? 'underline' : 'none',
        },
        style,
      ]}>
      {text}
    </Text>
  );
};

export default SubHead;
