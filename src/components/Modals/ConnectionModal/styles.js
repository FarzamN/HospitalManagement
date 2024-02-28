import { StyleSheet } from 'react-native'
import { Font } from "../../../utils/font";
import { Colors } from "../../../utils/Colors";

export default StyleSheet.create({
    MainModalBox: {
        height: 52,
        width: "95%",
        backgroundColor: 'red',
        borderRadius: 12,
        bottom: 20,
        overflow: "hidden",
        flexDirection: "row",
        alignSelf: "center",
      },
      ModalMain: {
        height: 70,
        backgroundColor: Colors.Main,
        borderRadius: 10,
        marginTop: 20,
        flexDirection: "row",
      },
      ToEnd: {
        flex: 1,
        justifyContent: "flex-end",
      },
      text: {
        color: Colors.White,
        fontSize: 14,
        fontFamily: Font.font500,
      },
      TextBox: { flex: 3, justifyContent: "center" },
      IconBox: {
        flex: 0.6,
        justifyContent: "center",
        alignItems: "center",
      },
})