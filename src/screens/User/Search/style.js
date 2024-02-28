import {StyleSheet} from 'react-native';
import {Colors} from '../../../utils/Colors';
import {Font} from '../../../utils/font';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#F4F3F8',
    backgroundColor: Colors.White,
    paddingVertical: 3,
    borderRadius: 5,
  },
  HeaderContainer: {
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  Text: {
    color: Colors.White,
    fontFamily: Font.font600,
    fontSize: 20,
  },
  FilterBox: {
    backgroundColor: Colors.White,
    borderRadius: 7,
    width: 35,
    aspectRatio: 1 / 1,
  },
  InputBox: {
    backgroundColor: Colors.White,
    borderRadius: 6,
    width: '100%',
    paddingHorizontal: 12,
    marginRight: 5,
    height: 38,
  },
  TextInput: {
    color: Colors.Black,
    fontFamily: Font.font500,
    fontSize: 13,
    width: '85%',
    top: 3,
  },
  SearchText: {
    color: Colors.Grey,
    fontFamily: Font.font500,
    fontSize: 14,
  },
  SearchBox: {
    backgroundColor: Colors.White,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 3,
    marginTop: 5,
    marginRight: 5,
  },
  userName: {
    fontSize: 12,
    color: Colors.Grey,
  },
  name: {
    fontSize: 17,
    maxWidth: '77%',
    color: Colors.Blue,
  },
  MainModal: {
    justifyContent: 'center',
  },
  ModalContainer: {
    flex: 0.6,
    width: '95%',
    paddingTop: 15,
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: Colors.White,
  },
  BackButton: {
    width: 30,
    height: 30,
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
