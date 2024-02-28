import { StyleSheet } from 'react-native'
import { Colors } from '../../../../utils/Colors'
import { Font } from '../../../../utils/font'

export default StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginHorizontal: 10,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#F4F3F8',
        backgroundColor: Colors.White,
        paddingVertical: 3,
        borderRadius: 5

    },
    HeaderContainer: {
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        paddingVertical: 20,
        paddingHorizontal:15,
        marginBottom: 15
    },
    Image: {
        width: 42,
        height: 42,
        resizeMode: 'cover',
        borderRadius: 10
    },
    title: {
        fontSize: 16,
        fontFamily: Font.font700,
        maxWidth: '92%',
    },

    pay: {
        fontSize: 14,
        color: Colors.Black,
        fontFamily: Font.font600,
    },
    detail: {
        fontSize: 15,
        color: '#696969',
        fontFamily: Font.font500,
        marginVertical: 5
    },
    BottomTexts: {
        fontSize: 14,
        color: '#696969',
        fontFamily: Font.font500,
        marginLeft: 7
    },
    Text: {
        color: Colors.White,
        fontFamily: Font.font600,
        fontSize: 20
    },
    FilterBox: {
        backgroundColor: Colors.White,
        borderRadius: 7,
        width: 35,
        aspectRatio: 1 / 1
    },
    InputBox: {
        backgroundColor: Colors.White,
        borderRadius: 6,
        width: '100%',
        paddingHorizontal: 12,
        marginRight: 5,
        height: 38
    },
    TextInput: {
        color: Colors.Black,
        fontFamily: Font.font500,
        fontSize: 13,
        width: '85%',
        top: 3
    },
    SearchText: {
        color: Colors.Grey,
        fontFamily: Font.font500,
        fontSize: 14
    },
    SearchBox: {
        backgroundColor: Colors.White,
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 3,
        marginTop: 5, marginRight: 5
    },
    ModalContainer:{
        backgroundColor:Colors.White,
        borderRadius:20,
        height:'80%',
        paddingHorizontal:15
    },
    JobTypeTitle:{
        fontSize:14,
        fontFamily:Font.font500
    },
    jobTypeBox:{
       
        paddingHorizontal:15,
        paddingVertical:10,
        margin:5,
        borderRadius:10
    },
    line:{
        width:'35%',
        height:5,
        backgroundColor:'#ACACAC',
        alignSelf:'center',
        borderRadius:6,marginVertical:10
    },
    BackButton:{
        width: 30,
        height: 30,
        borderRadius: 5,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
      }
})