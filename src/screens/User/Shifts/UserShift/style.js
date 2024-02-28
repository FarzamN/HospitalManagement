import { StyleSheet } from 'react-native'
import { Font } from '../../../../utils/font'

export default StyleSheet.create({
    Container: {
        borderRadius: 20,
         paddingHorizontal: 15, 
         height: 70,
         backgroundColor:'#EAE6EE',
         marginVertical:10
         ,paddingVertical:7
    },
    text: {
        top:3,
        fontSize: 16,
        fontFamily: Font.font600,
    }
})