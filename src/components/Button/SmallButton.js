import React from 'react';
import {styles} from './style';
import {SubHead} from '../Texts';
import {TouchableOpacity} from 'react-native';
import {GlobalStyle} from '../../Constants/GlobalStyle';

const SmallButton = ({title,bold, onPress,fontSize}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[ GlobalStyle.justify, styles.Button]}>
      <SubHead style={{fontSize: fontSize || 15}} text={title} white bold={bold}/>
    </TouchableOpacity>
  );
};

export default SmallButton;
