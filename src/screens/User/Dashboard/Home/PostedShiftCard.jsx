import React from 'react';
import moment from 'moment';
import style from './style';
import {View, Image} from 'react-native';
import {useButtonAnimation} from '../../../../hooks';
import {Heading, SubHead} from '../../../../components';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import {Colors} from '../../../../utils/Colors';

const PostedShiftCard = ({data, onPress}) => {
  const {opening_date, title, profile_image, facility, created_at, bit_status} =
    data;

  const {AniPress, scaleValue, handlePressIn, handlePressOut} =
    useButtonAnimation();
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
        <View
          style={[
            GlobalStyle.dot,
            {backgroundColor: bit_status ? 'red' : Colors.Non},
          ]}
        />
        <Image
          style={[style.Image, {marginRight: 8, marginBottom: 0}]}
          source={
            profile_image
              ? {uri: profile_image}
              : facility?.profile_image
              ? {uri: facility?.profile_image}
              : require('../../../../assets/image/noImage.png')
          }
        />
        <View style={{width: '90%'}}>
          <Heading
            numberOfLines={1}
            style={[style.title, {width: '90%'}]}
            text={title}
          />
          <SubHead style={style.date} text={opening_date} />
        </View>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Heading style={[style.title]} text={moment(created_at).format('LT')} />
      </View>
    </AniPress>
  );
};

export default PostedShiftCard;
