import {View, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {SubHead} from '../../../components';
import {Colors} from '../../../utils/Colors';
import {GlobalStyle} from '../../../Constants/GlobalStyle';

const ShiftSwitch = ({rightText, LeftText, index, setIndex}) => {
  return (
    <View style={[GlobalStyle.Space_evenly, styles.Parents]}>
      <Pressable
        android_ripple={GlobalStyle.Ripple}
        onPress={() => setIndex(1)}
        style={[
          styles.Child,
          {
            backgroundColor: index == 2 ? Colors.Non : '#fff',
          },
        ]}>
        <SubHead bold text={LeftText} />
      </Pressable>
      <Pressable
        android_ripple={GlobalStyle.Ripple}
        onPress={() => setIndex(2)}
        style={[
          styles.Child,
          {
            backgroundColor: index == 1 ? Colors.Non : '#fff',
          },
        ]}>
        <SubHead bold text={rightText} />
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  Parents: {
    backgroundColor: '#EAE6EE',
    height: 70,
    borderRadius: 15,
    marginVertical: 15,
    marginHorizontal: 15,
  },
  Child: [
    GlobalStyle.justify,
    {
      width: '47%',
      height: '75%',
      borderRadius: 15,
      overflow: 'hidden',
    },
  ],
});
export default ShiftSwitch;
