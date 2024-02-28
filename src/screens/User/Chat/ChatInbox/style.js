import {StyleSheet} from 'react-native';
import {Colors} from '../../../../utils/Colors';

export const style = StyleSheet.create({
  ImageBox: {
    width: 70,
    aspectRatio: 1 / 1,
    borderRadius: 10,
    marginRight: 10,
  },
  CardContainer: {
    paddingHorizontal: 15,
    marginBottom: 10,
    paddingVertical: 5,
    overflow: 'hidden',
  },
  Heading: {fontSize: 16},
  sub: {fontSize: 12},
  time: {fontSize: 12, color: Colors.LightGrey},
  Online: {
    position: 'absolute',
    left: -5,
    zIndex: 9,
    bottom: -10,
  },
});
