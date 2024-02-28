import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Colors} from '../../utils/Colors';
import {View} from 'react-native';
import {GlobalStyle} from '../../Constants/GlobalStyle';

const DetailSkeleton = () => {
  return (
    <SkeletonPlaceholder
      speed={1350}
      highlightColor={Colors.Purple}
      backgroundColor={Colors.OTPContainer}>
      <SkeletonPlaceholder.Item borderRadius={5}>
        <SkeletonPlaceholder.Item width={'40%'} height={30} marginTop={10} />
        <SkeletonPlaceholder.Item width={'80%'} height={20} marginTop={5} />
        <SkeletonPlaceholder.Item width={'80%'} height={20} marginTop={5} />
        <SkeletonPlaceholder.Item width={'30%'} height={30} marginTop={10} />

        {[1, 2, 4, 5].map((_, index) => (
          <View
            key={index.toString()}
            style={[GlobalStyle.Row, {marginTop: 10}]}>
            <SkeletonPlaceholder.Item
              width={20}
              height={20}
              borderRadius={100}
            />
            <SkeletonPlaceholder.Item
              width={'60%'}
              marginLeft={5}
              height={20}
            />
          </View>
        ))}

        <SkeletonPlaceholder.Item />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default DetailSkeleton;
