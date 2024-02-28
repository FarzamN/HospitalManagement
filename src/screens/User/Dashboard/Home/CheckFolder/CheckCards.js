import {View, Image} from 'react-native';
import React from 'react';
import {useButtonAnimation} from '../../../../../hooks';
import {GlobalStyle} from '../../../../../Constants/GlobalStyle';
import style from '../style';
import moment from 'moment';
import {Heading, SubHead} from '../../../../../components';

const CheckCards = ({data, onPress}) => {
  const {AniPress, handlePressIn, handlePressOut, scaleValue} =
    useButtonAnimation();

  const { created_at, facility} = data;
  const {profile_image,facility_name,country} = facility;
  return (
    <AniPress
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        GlobalStyle.Space_Between,
        style.ShiftContainer,
        {transform: [{scale: scaleValue}]},
      ]}>
      <View style={[GlobalStyle.Row, style.CardContainer]}>
        <Image
          style={[style.Image, {marginRight: 8, marginBottom: 0}]}
          source={{uri: profile_image}}
        />
        <View style={{width: '90%'}}> 
          <Heading
            numberOfLines={1}
            style={[style.title, {width: '90%'}]}
            text={facility_name}
          />
          <SubHead style={style.date} text={country} />
        </View>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Heading style={[style.title]} text={moment(created_at).format('LT')} />
      </View>
    </AniPress>
  );
};

export default CheckCards;
