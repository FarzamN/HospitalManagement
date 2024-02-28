import {View, Image, Pressable, ActivityIndicator} from 'react-native';
import React from 'react';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import {SubHead} from '../../../../components';
import {Colors} from '../../../../utils/Colors';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import style from './style';
import { useState } from 'react';
import ImageIndicator from '../../../../components/Items/ImageIndicator';

const ManageCard = ({data, onPress, index, name}) => {
  const {country, status, profile_image, account_status, role_id} = data;

  const checkStats = role_id == 3 ? account_status : status;
  const [load,setLoad] = useState(true)
  return (
    <Pressable
      android_ripple={GlobalStyle.Ripple}
      onPress={onPress}
      style={[
        GlobalStyle.Space_Between,
        style.container,
        {marginTop: index === 0 ? 15 : 0},
      ]}>
      <View style={[GlobalStyle.Row, {width: '80%'}]}>
        <View style={[GlobalStyle.ProfileImage, {marginRight: 7}]}>
        <ImageIndicator visible={load} />
          <Image
          onLoadEnd={() => setLoad(false)}
            source={
              !profile_image || profile_image == ""
                ? require('../../../../assets/image/noImage.png')
                : {uri: profile_image}
            }
            style={GlobalStyle.Image}
          />
        </View>
        <View style={{width: '77%'}}>
          <SubHead numberOfLines={1} bold text={name} />
          <View style={[GlobalStyle.Row, {marginRight: 3}]}>
            <Icon
              name="location-pin"
              size={20}
              color={Colors.LightGrey}
              type={IconType.Entypo}
            />
            <SubHead
              text={country}
              style={{color: Colors.Grey, fontSize: 13}}
            />
          </View>
        </View>
      </View>
      <SubHead
        style={style.active}
        text={checkStats == 'Inactive' ? 'inActive' : 'Active'}
      />
    </Pressable>
  );
};

export default ManageCard;
