import {View, Pressable} from 'react-native';
import React from 'react';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import {Heading, SubHead} from '../../Texts';
import style from './style';
import { Font } from '../../../utils/font';

const ShowMore = ({more, onPress, text, fontSize,mb,hide}) => {
  return (
    <View
      style={[
        GlobalStyle.Space_Between,
        {
          marginBottom: mb,
        },
      ]}>
      <Heading style={{fontSize: fontSize || 21, fontFamily:Font.font600Italic}} text={text} />
      {hide && <Pressable
        style={style.Press}
        onPress={onPress}
        android_ripple={GlobalStyle.Ripple}>
        <SubHead style={{color: '#697082',fontFamily:Font.font400Italic}} text={more} />
      </Pressable>}
      
    </View>
  );
};

export default ShowMore;
