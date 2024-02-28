import {StyleSheet} from 'react-native';
import {Colors} from '../../../../../../utils/Colors';
import {Font} from '../../../../../../utils/font';

export default StyleSheet.create({
  ProjectText: {
    fontSize: 15,
    marginTop: 10,
    color: Colors.Black,
    fontFamily: Font.font600,
  },
  detail: {
    fontSize: 14,
    color: Colors.LightGrey,
    fontFamily: Font.font500,
  },
  Heading: {
    fontSize: 25,
    color: '#5C5C5C',
    marginVertical: 10,
    textAlign: 'center',
    fontFamily: Font.font700,
  },
  TextInputBox: {
    padding: 7,
    height: 170,
    fontSize: 13,
    borderRadius: 10,
    borderWidth: 1.5,
    fontFamily: Font.font400,
    borderColor: Colors.placeholderTextColor,
  },
  TextInput: {
    color: Colors.Black,
    fontFamily: Font.font500,
    fontSize: 15,
    width: '100%',
  },
});
