import { StyleSheet } from 'react-native'
import { Colors } from '../utils/Colors';
import { Font } from '../utils/font';

export const styles = StyleSheet.create({
  Bar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 70,
    backgroundColor: '#F6F6F6',
    width: '100%',
    zIndex: 10
  },

  Img: {
    width: 25,
    height: 25,
    resizeMode: 'contain'
  },

  Boxes: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  IconMainBox: {
    alignItems: 'center',
    justifyContent: 'center',
    top: -20,
    backgroundColor: Colors.Purple,
    borderRadius: 15,
    width: 55,
    aspectRatio: 1 / 1
  },
  Line: {
    backgroundColor: Colors.ThemeOrange,
    height: 5,
    position: 'absolute',
    top: 0,
    borderRadius: 100,
  },
  MidImage: { width: 40, height: 40 },
  closeMidImage: { width: 20, height: 20 },

  modalStyling: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  Heading: {
    fontSize: 30,
    marginTop: 15,
    color: Colors.Black,
    marginHorizontal: 30,
    fontFamily: Font.font600Italic,
  },
  ModalContainer: {
    width: '100%',
    height: '55%',
    backgroundColor: '#EBEDF1',
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
  },
  MenuImage: {
    width: 50,
    height: 50,
    alignSelf: 'center'
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    color: Colors.Black,
    fontFamily: Font.font500,

  },
  TextBox: {
    marginTop: 3,
    width: '75%',
    alignSelf: 'center'
  },
  Container: {
    width: 120,
    marginTop: 15
  },
  IconBox:{
    width: 50,
    aspectRatio: 1 / 1,
    backgroundColor: Colors.Purple,
    borderRadius:100,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center'
  },
  Notification: {
    width: 15,
    height: 15,
    top:5,
    right:-5,
    borderRadius: 100,
    position:'absolute',
    backgroundColor: 'red',
    justifyContent:'center',
    alignItems:'center'
  }
});