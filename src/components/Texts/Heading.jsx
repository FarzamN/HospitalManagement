import React from 'react';
import {styles} from './styles';
import {Text} from 'react-native';
import {Colors} from '../../utils/Colors';

const Heading = ({text, style, center, white,numberOfLines}) => {
  return (
    <Text
    numberOfLines={numberOfLines}
      style={[
        styles.Heading,
        {
          textAlign: center ? 'center' : 'left',
          color: white ? Colors.White : '#232732',
        },
        style,
      ]}>
      {text}
    </Text>
  );
};

export default Heading;
