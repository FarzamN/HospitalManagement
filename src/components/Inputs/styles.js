import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/Colors';
import {Font} from '../../utils/font';
import {iOS} from '../../Constants/Responsive';

const top = iOS ? 0 : 1.3;
export const styles = StyleSheet.create({
  MainView: {
    marginTop: 15,
  },
  label: {
    fontSize: 15,
    color: Colors.Black,
    paddingHorizontal: 5,
    fontFamily: Font.font400,
  },
  InputStyles: {
    top,
    width: '96%',
    fontSize: 15,
    height: '100%',
    paddingLeft: 10,
    color: Colors.Black,
    fontFamily: Font.font500,
  },
  Line: {
    width: 1.5,
    height: 25,
    marginHorizontal: 7,
    backgroundColor: Colors.Purple,
  },
  Container: {
    height: 53,

    marginTop: 7,
    width: '100%',
    borderWidth: 1,
    borderRadius: 100,
    alignSelf: 'center',
    paddingHorizontal: 15,
    borderColor: Colors.Purple,
    justifyContent: 'center',
    backgroundColor: Colors.White,
  },
  InvoiceInputStyles: {
    color: Colors.Black,
    fontSize: 14,
    fontFamily: Font.font500,
  },
});
