import {StyleSheet} from 'react-native';
import {Colors} from '../../../../utils/Colors';

export default StyleSheet.create({
  line: {
    borderWidth: 0.5,
    marginVertical: 20,
    borderColor: Colors.LightGrey,
  },
  right: {
    textAlign: 'right',
    marginRight: 10,
  },

  // ===============================================
  image: {
    width: 120,
    height: 120,
    borderRadius: 100,
    alignSelf: 'center',
  },
  name: {marginTop: 7, paddingHorizontal: 20},
});
