import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Colors} from '../../utils/Colors';

const SmallSkeleton = ({invoice,full}) => {
  return (
    <SkeletonPlaceholder
      speed={1350}
      highlightColor={Colors.Purple}
      backgroundColor={Colors.OTPContainer}>
      <SkeletonPlaceholder.Item
          borderRadius={invoice ? 10 :5}
          >
        <SkeletonPlaceholder.Item
          width={full ?'100%' : '90%'}
          height={invoice ? 70 : 50}
          marginTop={7}
          marginLeft={full ? 0 :'5%'}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default SmallSkeleton;
