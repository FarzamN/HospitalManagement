import { StyleSheet } from 'react-native'
import { Colors } from '../../../../utils/Colors'
import { Font } from '../../../../utils/font'

export default StyleSheet.create({
    Container: {
        borderRadius: 10,
        elevation: 9,
        backgroundColor: Colors.White,
        padding: 15,
        marginHorizontal: 15,
        marginTop: 10,
        marginBottom: 5
    },
    title: {
        fontSize: 17,
        color: Colors.Black,
        fontFamily: Font.font500
    },
    detail: {
        fontSize: 14,
        color: Colors.Black,
        fontFamily: Font.font500
    },
    time: {
        fontSize: 14,
        color: Colors.LightGrey,
        fontFamily: Font.font500
    },
    read: {
        fontSize: 13,
        color: Colors.Purple,
        fontFamily: Font.font500
    },
    mr: {
        marginRight: 5
    }
})