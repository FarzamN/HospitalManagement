import React from 'react';
import {Colors} from '../../utils/Colors';
import {StyleSheet, View} from 'react-native';
import Slider from 'react-native-custom-slider';

const CustomSlider = ({value, onChange}) => {
  return (
    <Slider
      value={value}
      minimumValue={0}
      maximumValue={100}
      style={styles.Main}
      trackStyle={styles.track}
      thumbStyle={styles.thumb}
      minimumTrackTintColor={Colors.Purple}
      onValueChange={onChange}
      customThumb={<View style={styles.customThumb} />}
    />
  );
};

export default CustomSlider;

const styles = StyleSheet.create({
  track: {
    height: 7,
    borderRadius: 4,
    backgroundColor: "#a4a8b380",
  },
  thumb: {
    width: 16,
    height: 16,
    borderRadius: 10,
    backgroundColor: Colors.Main,
  },
  Main: {
    marginVertical: 10,
    marginHorizontal:5
  },
});
