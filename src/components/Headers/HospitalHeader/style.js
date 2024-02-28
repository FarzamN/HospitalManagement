import { StyleSheet } from 'react-native'
import { Colors } from '../../../utils/Colors'
import { Font } from '../../../utils/font'

export default StyleSheet.create({
    ImageBox: {
        width: 70,
        height: 70,
        alignSelf: 'center'
    },
    hName: {
        fontSize: 15,
        marginTop: '10',
        paddingTop:10,
        textAlign: 'center',
        color: Colors.Black,
        paddingHorizontal: 50,
        fontFamily: Font.font600,
    },
    Location: {
        width: 20,
        height: 20
    },
    location: {
        marginTop:5,
        fontSize: 14,
        color: Colors.LightGrey,
        fontFamily: Font.font400,
    }
})
