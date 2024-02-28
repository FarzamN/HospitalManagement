import { StyleSheet } from 'react-native'
import { Font } from '../../../../utils/font'
import { Colors } from '../../../../utils/Colors'

export default StyleSheet.create({
    ImageBox: {
        width: 70,
        height: 70,
        alignSelf: 'center'
    },
    hName: {
        fontSize: 20,
        marginTop: '10',
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
    },
    ProjectText: {
        fontSize: 18,
        marginTop: 10,
        color: Colors.Black,
        fontFamily: Font.font600,
    },
    detail: {
        fontSize: 14,
        marginTop: 10,
        color: Colors.LightGrey,
        fontFamily: Font.font500,
    },
    Facility: {
        fontSize: 14,
        marginTop: 10,
        color: Colors.Black,
        fontFamily: Font.font500,
    },
  
    CardTitle: {
        fontSize: 14,
        marginLeft:5,
        marginTop: 10,
        fontFamily: Font.font500,
        color: Colors.placeholderTextColor,
    },
})
