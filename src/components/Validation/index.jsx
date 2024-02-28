import React from 'react';
import {Text} from 'react-native';
import {styles} from './styles';

const Validation = ({title, white, visible,style}) => {
  return (
    visible && (
      <Text style={[styles.error, {color: white ? 'white' : 'red'},style]}>
        {title}
      </Text>
    )
  );
};

export default Validation;
