import {StyleSheet} from 'react-native';
import {Colors} from '../../../../utils/Colors';
import {Font} from '../../../../utils/font';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';

export default StyleSheet.create({
  ProjectText: {
    fontSize: 18,
    marginTop: 10,
    color: Colors.Black,
    fontFamily: Font.font600,
  },
  detail: {
    fontSize: 14,
    marginTop: 10,
    color: Colors.LightGrey,
    fontFamily: Font.font500,
  },
  Facility: {
    fontSize: 14,
    marginTop: 10,
    color: Colors.Black,
    fontFamily: Font.font500,
  },
  Dp: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 12,
  },
  BigDp: {
    width: 130,
    height: 130,
    borderRadius: 100,
    alignSelf: 'center',
  },
  userName: {
    fontSize: 12,
    color: Colors.Grey,
   
  },
  name: {
    fontSize: 17,
    color: Colors.Blue,
  },
  price: {
    fontSize: 14,
    color: Colors.Blue,
    textAlign: 'right',
    fontFamily: Font.font500,
  },

  MainModal: {
    margin: 0,
    justifyContent: 'center',
  },
  ModalContainer: {
    width: '95%',
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: Colors.White,
    flex: 0.7,
    paddingTop: 15,
    overflow: 'hidden',
  },
  ignore: [
    GlobalStyle.justify,
    {
      width: '50%',
      height: 50,
      overflow: 'hidden',
    },
  ],
  BtnBorder: {
    borderTopWidth: 1,
    borderColor: Colors.Grey,
    marginTop: 10,
  },
});
