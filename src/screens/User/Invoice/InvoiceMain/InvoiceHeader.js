import {Image} from 'react-native';
import React from 'react';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import {SubHead} from '../../../../components';
import style from './style';
import {Colors} from '../../../../utils/Colors';
import {useButtonAnimation} from '../../../../hooks';

const InvoiceHeader = ({data, onPress, focus}) => {
  const {AniPress, handlePressIn, handlePressOut, scaleValue} =
    useButtonAnimation();
  const color = focus ? Colors.White : Colors.Grey;
  return (
    <AniPress
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        GlobalStyle.justify,
        style.HeaderContainer, 
        {
          transform: [{scale: scaleValue}],
          backgroundColor: focus ? Colors.Main : Colors.Non,
        },
      ]}>
      <Image tintColor={color} style={style.image} source={data?.image} />
      <SubHead text={data?.title} style={[style.text, {color}]} />
    </AniPress>
  );
};

export default InvoiceHeader;
