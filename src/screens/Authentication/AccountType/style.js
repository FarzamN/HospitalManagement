import { StyleSheet } from 'react-native'
import { Font } from '../../../utils/font'
import { Colors } from '../../../utils/Colors'

export default StyleSheet.create({
    heading: {
        fontSize: 33,
        marginTop: '5%',
        fontFamily: Font.font500
    },
    sub: {
        color: Colors.Grey
    },

    // === Card === 

    Container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    MainContainer: {
        width: '47%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:2,
        borderRadius:20,
        marginTop:'10%'
    },
    title:{
        fontSize:15,
        color:Colors.Black,
        fontFamily:Font.font500
    },
    IconBox:{
            borderRadius:10,
            padding:15
   ,marginBottom:5 }
})