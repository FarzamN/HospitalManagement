import React from 'react';
import moment from 'moment';
import style from './style';
import {View, Image } from 'react-native';
import {useButtonAnimation} from '../../../../hooks';
import {Heading, SubHead} from '../../../../components';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';

const ShiftCards = ({data, onPress}) => {
  const {AniPress, scaleValue, handlePressIn, handlePressOut} =
    useButtonAnimation();

  const {shift, facility} = data;
  const {title , opening_date , created_at} = shift;
  const {profile_image} = facility;

  return (
    <AniPress
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        GlobalStyle.Space_Between,
        style.ShiftContainer,
        {transform: [{scale: scaleValue}]}
      ]}>
     <View style={[GlobalStyle.Row,style.CardContainer]}>
        <Image
          style={[style.Image, {marginRight: 8, marginBottom: 0}]}
          source={{uri: profile_image}}
        />
        <View style={{width:"90%"}}>
          <Heading numberOfLines={1}  style={[style.title,{width:"90%"}]} text={title} />
          <SubHead style={style.date} text={opening_date} />
        </View>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Heading style={[style.title]} text={moment(created_at).format('LT')} />
      </View>
    </AniPress>
  );
};

export default ShiftCards;
