import {View, Text, Image} from 'react-native';
import React from 'react';
import style from './style';
import {GlobalStyle} from '../../../Constants/GlobalStyle';

const Index = ({hName, location, source}) => {
  return (
    <View>
      <View style={style.ImageBox}>
        <Image resizeMode="contain" style={GlobalStyle.Image} source={source} />
      </View>
      <Text style={style.hName}>{hName}</Text>
      <View style={[GlobalStyle.Row, {alignSelf: 'center'}]}>
        <Image
          resizeMode="contain"
          style={style.Location}
          source={require('../../../assets/image/Logos/location.png')}
        />
        <Text style={style.location}>{location}</Text>
      </View>
    </View>
  );
};

export default Index;
