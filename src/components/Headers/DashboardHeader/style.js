import {StyleSheet} from 'react-native';
import { GlobalStyle } from '../../../Constants/GlobalStyle';

export default StyleSheet.create({
  Container: {
    marginTop: 10,
  },
  ImageBox: {
    width: 70,
    aspectRatio: 1 / 1,
    overflow: 'hidden',
    borderRadius: 100,
  },
  greet: {
    color: '#9C8BB2',
  },
  chatImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  Icon: {
    padding: 5,
  },

});
