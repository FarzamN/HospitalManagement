import {StyleSheet} from 'react-native';
import {Colors} from '../../../../utils/Colors';
import {Font} from '../../../../utils/font';

export default StyleSheet.create({
  MainView: {marginTop: 7},
  InputStyles: {
    top: 1,
    width: '96%',
    fontSize: 15,
    paddingLeft: 10,
    color: Colors.Black,
    fontFamily: Font.font500,
  },
  Container: {
    marginTop: 7,
    width: '100%',
    borderWidth: 2,
    borderRadius: 12,
    alignSelf: 'center',
    paddingHorizontal: 8,
    borderColor: '#E9E9E9',
    backgroundColor: '#F8F8F8',
  },
});
