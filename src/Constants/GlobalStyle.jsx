import {StatusBar, StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../utils/Colors';
import {GradientColors} from '../utils/GradientColor';
const {height} = Dimensions.get('window');

export const GlobalStyle = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  Trans_Container: {
    flex: 1,
  },
  TopStatus: {
    backgroundColor: GradientColors.darkPink,
  },
  BottomStatus: {
    backgroundColor: GradientColors.Purple,
  },
  WhiteStatus: {
    backgroundColor: Colors.White,
  },
  CustomButtonRestyle: {
    width: '85%',
  },
  Padding: {
    paddingHorizontal: 15,
  },
  Margin: {
    marginHorizontal: 15,
  },
  textRestyle: {
    color: Colors.Main,
  },
  Row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Space_Between: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Space_evenly: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  justify: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  Image: {
    width: '100%',
    height: '100%',
  },
  ProfileImage: {
    width: 55,
    aspectRatio: 1 / 1,
    borderRadius: 12,
    backgroundColor:'black',
    overflow: 'hidden',
  },
  Ripple: {
    borderless: true,
    foreground: true,
    color: Colors.Main,
  },
  WhiteRipple: {
    borderless: true,
    foreground: true,
    color: Colors.White,
  },
  RedRipple: {
    borderless: true,
    foreground: true,
    color: 'red',
  },
  Vertical_Space: {
    height: 15,
  },
  Shadow: {
    shadowColor: Colors.Black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  TextShadow: {
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  MapContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  StatusBar: {
    marginTop: StatusBar.currentHeight + 10,
  },
  Height: {
    height: 10,
  },
  WindowHeight: {height: height * 0.1},
  endHeight: {height: 30},
  WindowHeight2: {height: height * 0.25},
  AuthBox: {
    flex: 1,
    marginTop: 15,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.White,
  },
  ImageLoad: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationDot: {
    width: 15,
    height: 15,
    backgroundColor: 'red',
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 100,
    zIndex: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 7,
    height: 7,
    position: 'absolute',
    zIndex: 9,
    borderRadius: 100,
    bottom: 0,
  },
  fullButton: {
    width: '100%',
  },
  TrashCan:{
    backgroundColor: 'red',
    width: 45,
    height: 45,
    borderRadius: 10,
  }
});
