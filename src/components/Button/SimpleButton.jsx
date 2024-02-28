import React from 'react';
import {Pressable} from 'react-native';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {SubHead} from '../Texts';
import {styles} from './style';
import {Colors} from '../../utils/Colors';

const SimpleButton = ({onPress, title, style, white, mv, textStyle}) => {
  return (
    <Pressable
      android_ripple={GlobalStyle.Ripple}
      style={[styles.Press, GlobalStyle.justify, style, {marginVertical: mv}]}
      onPress={onPress}>
      <SubHead
        center
        text={title}
        style={[{color: white ? Colors.White : Colors.Black}, textStyle]}
      />
    </Pressable>
  );
};

export default SimpleButton;
