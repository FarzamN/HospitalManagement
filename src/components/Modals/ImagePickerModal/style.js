import { StyleSheet } from 'react-native';
import { Font } from "../../../utils/font";
import { Colors } from "../../../utils/Colors";

export const styles = StyleSheet.create({
    Text: {
        fontSize: 12,
        color: Colors.White,
        fontFamily: Font.font600,
    },
    ModalBtn: {
        flex: 1,
        margin: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    SecCon: {
        flexDirection: 'row',
        paddingVertical: 15,
        width: '100%',
        backgroundColor: Colors.Purple,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,

    },
});