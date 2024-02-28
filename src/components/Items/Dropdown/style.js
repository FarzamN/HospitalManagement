import {StyleSheet} from 'react-native';
import {Colors} from '../../../utils/Colors';
import {Font} from '../../../utils/font';

export const styles = StyleSheet.create({
  boxStyles: {
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1.2,
    borderColor: '#E9E9E9',
    backgroundColor: '#F8F8F8',
  },
  inputStyles: {
    fontSize: 14,
    color: Colors.Grey,
    fontFamily: Font.font500,
  },
  TextStyles: {
    color: Colors.Black,
  },
  dropdownStyles: {
    borderWidth: 1,
    borderColor: '#E9E9E9',
    backgroundColor: '#F8F8F8',
  },
});
