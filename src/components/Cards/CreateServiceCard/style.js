import {StyleSheet} from 'react-native';
import {GlobalStyle} from '../../../Constants/GlobalStyle';

export default StyleSheet.create({
  container: [
    GlobalStyle.Space_Between,
    GlobalStyle.Padding,
    {
      height: 50,
      overflow: 'hidden',
    },
  ],
});
