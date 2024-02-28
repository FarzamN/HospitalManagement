import {View, Text} from 'react-native';
import React from 'react';
import style from './style';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import {CustomButton} from '../../../../components';

const InvoiceBanner = ({onPress}) => {
  return (
    <View style={[GlobalStyle.Space_Between, style.BannerContainer]}>
      <Text numberOfLines={2} style={style.bannerText}>Create New Invoice</Text>
      <CustomButton style={style.Btn} onPress={onPress} title="Start Now" round />
    </View>
  );
};

export default InvoiceBanner;
