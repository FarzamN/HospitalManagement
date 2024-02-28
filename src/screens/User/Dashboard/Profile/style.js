import {StyleSheet} from 'react-native';
import {Colors} from '../../../../utils/Colors';
import {Font} from '../../../../utils/font';

export default StyleSheet.create({
  HeaderContainer: {
    marginTop: 60,
    borderRadius: 12,
    paddingVertical: 20,
    marginHorizontal: 18,
    paddingHorizontal: 10,
  },
  ImageBox: {
    width: 130,
    height: 130,
    borderWidth: 2,
    marginTop: -80,
    borderRadius: 365,
    alignSelf: 'center',
    borderColor: Colors.Main,
  },
  EditBox: {
    right: 10,
    bottom: -5,
    padding: 5,
    zIndex: 99,
    borderWidth: 1,
    borderRadius: 100,
    position: 'absolute',
    borderColor: Colors.Purple,
    backgroundColor: Colors.White,
  },
  JobBox: {
    height: 60,
    width: '95%',
    borderRadius: 10,
    marginVertical: 15,
    alignSelf: 'center',
    backgroundColor: '#60687A',
  },
  UpdateBox: {
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: Colors.Black,
  },
  PVContainer: {
    height: 50,
    marginTop:10,
    borderRadius: 10,
    // borderWidth: 1,
    borderBottomWidth: 1,
    paddingHorizontal: 7,
    borderColor: Colors.Blue,
  },
  PVTitle: {
    marginHorizontal: 10,
    fontFamily: Font.font500,
  },
});
