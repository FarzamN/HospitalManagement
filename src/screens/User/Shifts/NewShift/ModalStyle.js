import { StyleSheet} from 'react-native'

export default StyleSheet.create({
    MainModal: {
        margin: 0,
        justifyContent: 'flex-end',
    },
    MidModal: {
        justifyContent: 'center',
    },
    Modal_Container: {
        flex: 1,
    },
    ModalContainer: {
        width: '100%',
        alignSelf: 'center',
        borderRadius: 20,
        justifyContent: 'center',
        backgroundColor: '#F2F4F5',
        flex:0.5,
        paddingHorizontal:10,
        alignItems:'center'
    },
    MidModalContainer: {
        width: '100%',
        alignSelf: 'center',
        borderRadius: 20,
        backgroundColor: '#F2F4F5',
        flex:0.6,
        padding:20
    },
    ImageBox:{
        width:130,
        height:130,
        marginBottom:15
    }
})