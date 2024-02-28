import {View, Text, Image} from 'react-native';
import React from 'react';
import {useButtonAnimation} from '../../../../../hooks';
import {GlobalStyle} from '../../../../../Constants/GlobalStyle';
import style from '../style';
import {Heading} from '../../../../../components';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

const AllCheckCards = ({data, i}) => {
  const navigation = useNavigation();
  const {AniPress, handlePressIn, handlePressOut, scaleValue} =
    useButtonAnimation();

  const {job_status, shift, user, created_at} = data;
  const {title} = shift;
  const {first_name, last_name, country} = user;
  console.log(data);
  return (
    <AniPress
      onPress={() => navigation.navigate('checkDetails', {data})}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        GlobalStyle.Space_Between,
        style.ShiftContainer,
        GlobalStyle.Padding,
        {
          transform: [{scale: scaleValue}],
          overflow: 'hidden',
          marginTop: i == 0 ? 10 : 0,
        },
      ]}>
      <View style={[GlobalStyle.Row, style.CardContainer]}>
        <Image
          style={[style.Image, {marginRight: 8, marginBottom: 0}]}
          source={
            job_status == null
              ? require('../../../../../assets/image/DashboardIcons/late.png')
              : job_status == 'CheckOut'
              ? require('../../../../../assets/image/DashboardIcons/checkout.png')
              : require('../../../../../assets/image/DashboardIcons/checkin.png')
          }
        />
        <View style={{width: '90%'}}>
          <Heading
            numberOfLines={1}
            style={[style.title, {width: '90%'}]}
            text={first_name + ' ' + last_name}
          />
          <Heading
            numberOfLines={1}
            style={[style.date, {width: '90%'}]}
            text={country}
          />
        </View>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Heading
          style={[style.title, {fontSize: 14}]}
          text={moment(created_at).format('DD-MM-YYYY')}
        />
      </View>
    </AniPress>
  );
};

export default AllCheckCards;
