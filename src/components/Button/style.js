import {StyleSheet} from 'react-native';
import {Font} from '../../utils/font';
import {Colors} from '../../utils/Colors';

export const styles = StyleSheet.create({
  containerStyle: {
    alignSelf: 'center',
    height: 55,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  title: {
    top: 1,
    fontSize: 15,
    fontFamily: Font.font500,
    textTransform: 'capitalize',
  },
  Press: {
    width: '100%',
    height: 50,
    borderRadius: 100,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  Button: {
    paddingHorizontal: 8,
    height: 30,
    borderRadius: 10,
    backgroundColor: Colors.Purple,
  },
  loading: {
    top: 2,
    fontSize: 16,
    marginLeft: 10,
    color: Colors.White,
    fontFamily: Font.font400,
  },
});
