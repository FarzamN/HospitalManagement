import {StyleSheet} from 'react-native';
import {Font} from '../../../utils/font';
import {Colors} from '../../../utils/Colors';

export const style = StyleSheet.create({
  footer: {
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'center',
  },
  btnStyle: {
    width: '90%',
    marginBottom: 10,
    alignSelf: 'center',
   
  },
  Input: {
    padding: 10,
    fontSize: 14,
    borderWidth: 1,
    marginBottom:10,
    borderRadius: 10,
    color: Colors.Black,
    marginHorizontal: 10,
    fontFamily: Font.font400,
    borderColor: Colors.Purple,
  },
});
