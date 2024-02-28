import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../utils/Colors";

const { height, width } = Dimensions.get('screen')
export default StyleSheet.create({
  ImageBox: {
    width: width / 1.2,
    height: height / 2,
    alignSelf: 'center',
    marginVertical: '10%'
  },
  btn: {
    backgroundColor: Colors.White,
    marginVertical: '10%'
  },
  text: {
    color: Colors.Black
  }
})