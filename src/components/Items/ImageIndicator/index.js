import {StyleSheet, ActivityIndicator} from 'react-native';
import React from 'react';
import {Colors} from '../../../utils/Colors';

const ImageIndicator = ({visible}) => {
  return (
    <>
      {visible && (
        <ActivityIndicator
          style={styles.std}
          size="large"
          color={Colors.Purple}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  std: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
export default ImageIndicator;
