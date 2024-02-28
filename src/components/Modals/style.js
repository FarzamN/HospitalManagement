import {StyleSheet,Dimensions} from 'react-native';
import {Colors} from '../../utils/Colors';
import {Font} from '../../utils/font';

const {width} = Dimensions.get('window');
export default StyleSheet.create({
  ModalText: {
    padding: 20,
    fontSize: 16,
    textAlign: 'center',
    color: Colors.Purple,
    fontFamily: Font.font500Italic,
  },
  ModalContainer: {
    width: '70%',
    alignSelf: 'center',
    borderRadius: 20,
    borderColor: Colors.Main,
    justifyContent: 'center',
    backgroundColor: Colors.White,
  },
  MainModal: {
    margin: 0,
    justifyContent: 'center',
  },
  ModalLine: {
    width: '20%',
    alignSelf: 'center',
    borderRadius: 10,
    height: 5,
    backgroundColor: Colors.Grey,
    marginVertical: 15,
  },
  Modal_Container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  LottieView: {
    height: 150,
    alignSelf: 'center',
  },

  /**
   * @alert_is_here
   **/
  titleStyle: {
    fontSize: 15,
    textAlign: 'center',
    color: Colors.darkFont,
    fontFamily: Font.font500,
  },
  contentContainerStyle: {
    backgroundColor: Colors.White,
    paddingVertical: 20,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.Purple,
    width,
  },
  overlayStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});
