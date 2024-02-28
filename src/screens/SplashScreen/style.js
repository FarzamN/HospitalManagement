import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../utils/Colors";
import { Font } from "../../utils/font";

const { width } = Dimensions.get('screen');

export default StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    ImageBox: {
        width: width / 2,
        aspectRatio: 1 / 1,
    },
    LottieView: {
        height: 150,
        aspectRatio: 1 / 1,
    },
    text:{
        fontSize:17,
        textAlign:'center',
        color:Colors.White,
        paddingHorizontal:50,
        fontFamily:Font.font500,
    }
})