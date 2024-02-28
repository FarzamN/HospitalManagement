import {StyleSheet} from 'react-native';
import {Colors} from '../../../../utils/Colors';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import {Font} from '../../../../utils/font';

export default StyleSheet.create({
  MainModal: {
    justifyContent: 'center',
  },
  ModalContainer: {
    flex: 0.7,
    width: '95%',
    paddingTop: 15,
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: Colors.White,
  },
  Btn: [
    GlobalStyle.Row,
    {
      borderWidth: 1,
      borderRadius: 12,
      borderColor: Colors.Grey,
      backgroundColor: '#F8F8F8',
      height: 50,
      width: '100%',
      paddingHorizontal: 7,
    },
  ],

  ImageBox: {
    width: 170,
    height: 170,
    alignSelf:'center'
  },
  heading:{
    fontFamily:Font.font500,
    paddingHorizontal:15
  }
});
