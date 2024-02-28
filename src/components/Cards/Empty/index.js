import {Text, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {styles} from './style';

const Empty = ({textRestyle, title, mt}) => {
  return (
    <View style={[styles.container, {marginTop: mt ? mt : '30%'}]}>
      <View style={styles.ImageBox}>
        <FastImage
          style={styles.Image}
          source={require('../../../assets/image/empty.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <Text style={[styles.text, textRestyle]}>
        {title ? title : 'No Data found'}
      </Text>
    </View>
  );
};

export default Empty;
