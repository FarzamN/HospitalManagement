import { StyleSheet } from 'react-native'
import { Colors } from '../../../../utils/Colors'
import { Font } from '../../../../utils/font'

export default StyleSheet.create({
    BigDp: {
        width: 130,
        height: 130,
        borderRadius: 100,
        alignSelf: 'center',
        marginVertical: 15
    },
    InputBox: {
        width: '100%',
        height: 150,
        borderRadius: 12,
        backgroundColor: "#F5F6FA",
        padding: 5,
        marginVertical: 10
    },
    Input: {
        color: Colors.Black,
        fontFamily: Font.font500,
        fontSize: 15,
    },
    Btn: {
        width: '45%'
        , borderWidth: 1,
        borderColor: '#9164DE',
        height:55
    }
})
