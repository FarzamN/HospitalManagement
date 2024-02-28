import {View, Text} from 'react-native';
import React from 'react';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {Colors} from '../../utils/Colors';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SendBitSkeleton = () => {
  return (
    <SkeletonPlaceholder
      speed={1350}
      highlightColor={Colors.Purple}
      backgroundColor={Colors.OTPContainer}>
      <View style={GlobalStyle.Space_Between}>
        {[1, 1].map((_, i) => (
          <View key={i.toString()} style={{width: '49%'}}>
            <SkeletonPlaceholder.Item
              width={80}
              height={12}
              borderRadius={7}
              marginTop={12}
            />

            <SkeletonPlaceholder.Item
              borderRadius={5}
              height={50}
              marginTop={10}
            />
          </View>
        ))}
      </View>
      {[0, 0, 0, 0].map((_, i) => (
        <View key={i.toString()}>
          <SkeletonPlaceholder.Item
            width={80}
            height={12}
            borderRadius={7}
            marginTop={12}
          />
          <SkeletonPlaceholder.Item
            width={'99%'}
            borderRadius={7}
            height={55}
            marginTop={4}
          />
        </View>
      ))}
    </SkeletonPlaceholder>
  );
};

export default SendBitSkeleton;
