import {StyleSheet} from 'react-native';
import {Colors} from '../../../../utils/Colors';
import {Font} from '../../../../utils/font';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    overflow: 'hidden',
    paddingVertical: 10,
  },
  active: {
    fontSize: 13,
    borderRadius: 20,
    color: '#35435F',
    paddingVertical: 3,
    paddingHorizontal: 8,
    backgroundColor: '#DFE5F0',
    textTransform: 'capitalize',
  },
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
  Heading: {
    width: '90%',
    fontSize: 20,
    color: Colors.Black,
    fontFamily: Font.font600,
  },
  ImageBox: {
    width: 130,
    height: 130,
    borderWidth: 2,
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
});
