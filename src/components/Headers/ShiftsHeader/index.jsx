import React from 'react';
import {styles} from './style';
import {useSelector} from 'react-redux';
import {View, Text, Image} from 'react-native';
import {GlobalStyle} from '../../../Constants/GlobalStyle';

const ShiftsHeader = ({title}) => {
  const userDetail = useSelector(state => state.userDetails);

  return (
    <View
      style={[
        GlobalStyle.Space_Between,
        GlobalStyle.Padding,
        styles.Container,
      ]}>
      <Text style={styles.Title}>{title}</Text>
      <View style={GlobalStyle.ProfileImage}>
        <Image
          style={GlobalStyle.Image}
          resizeMode="cover"
          source={
            userDetail?.profile_image
              ? {uri: userDetail.profile_image}
              : require('../../../assets/image/selectimage.png')
          }
        />
      </View>
    </View>
  );
};

export default ShiftsHeader;
