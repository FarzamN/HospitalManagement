import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Colors } from '../../utils/Colors';

const Skeleton = ({ ChangeBorderRadius }) => {
  return (
    <SkeletonPlaceholder
      speed={1350}
      borderRadius={ChangeBorderRadius ? 350 : 12}
      highlightColor={Colors.Purple}
      backgroundColor={Colors.OTPContainer}>
      <SkeletonPlaceholder.Item marginTop={15} flexDirection="row" alignItems="center">
        <SkeletonPlaceholder.Item
          width={'92%'}
          height={130}
          marginLeft='4%'
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};
export default Skeleton;
