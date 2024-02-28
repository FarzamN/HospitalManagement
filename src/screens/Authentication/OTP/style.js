import {StyleSheet} from 'react-native';
import {Font} from '../../../utils/font';
import {Colors} from '../../../utils/Colors';
import {GlobalStyle} from '../../../Constants/GlobalStyle';

export default StyleSheet.create({
  cell: {
    fontSize: 22,
    color: Colors.Black,
    fontFamily: Font.font400,
  },
  OTPMainBox: [
    GlobalStyle.justify,
    {
      width: '20%',
      aspectRatio: 1 / 1,
      borderRadius: 8,
      borderWidth: 1.5,
      borderColor: Colors.Main,
    },
  ],
  ResendButton: [
    GlobalStyle.justify,
    {
      height: 50,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: Colors.Grey,
      overflow: 'hidden',
    },
  ],
});
