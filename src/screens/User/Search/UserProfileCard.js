import {View, Image} from 'react-native';
import React, {useState} from 'react';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import SmallButton from '../../../components/Button/SmallButton';
import {Heading, SubHead} from '../../../components';
import style from './style';
import ImageIndicator from '../../../components/Items/ImageIndicator';

const UserProfileCard = ({data, index, onPress}) => {
  const {profile_image, first_name, last_name, country} = data;
  const [load, setLoad] = useState(true);

  return (
    <View
      style={[GlobalStyle.Space_Between, {marginTop: index == 0 ? 15 : 10}]}>
      <View style={[GlobalStyle.Row, {width: '70%'}]}>
        <View style={[GlobalStyle.ProfileImage, {marginRight: 10}]}>
          <ImageIndicator visible={load} />
          <Image
            resizeMode="contain"
            style={GlobalStyle.Image}
            onLoadEnd={() => setLoad(false)}
            source={profile_image ?{uri: profile_image} : require("../../../assets/image/noImage.png")}
          />
        </View>
        <View style={{width: '100%'}}>
          <Heading
            numberOfLines={1}
            style={style.name}
            text={first_name + ' ' + last_name}
          />
          <SubHead text={country} style={style.userName} />
        </View>
      </View>
      <View style={GlobalStyle.Row}>
        <SmallButton onPress={onPress} title="View profile" />
      </View>
    </View>
  );
};

export default UserProfileCard;
