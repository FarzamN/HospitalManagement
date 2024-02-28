import {View, Text} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Colors} from '../../utils/Colors';

const StatusSkeleton = ({noMargin}) => {
  return (
    <SkeletonPlaceholder
      speed={1350}
      borderRadius={350}
      highlightColor={Colors.Purple}
      backgroundColor={Colors.OTPContainer}>
      <SkeletonPlaceholder.Item
        width={'60%'}
        aspectRatio={1 / 1}
        marginLeft="20%"
        marginTop={noMargin ? 0 : '30%'}
      />
      <SkeletonPlaceholder.Item
        width={'80%'}
        borderRadius={10}
        height={25}
        marginLeft="15%"
        marginTop={10}
      />
      <SkeletonPlaceholder.Item
        width={'50%'}
        height={23}
        borderRadius={10}
        marginLeft="25%"
        marginTop={5}
      />
    </SkeletonPlaceholder>
  );
};

export default StatusSkeleton;
