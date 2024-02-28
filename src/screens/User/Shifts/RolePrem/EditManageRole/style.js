import { StyleSheet } from 'react-native'
import { Colors } from '../../../../../utils/Colors'
import { Font } from '../../../../../utils/font'


export const style = StyleSheet.create({

    MainModal: {
        justifyContent: 'center',
      },
      ModalContainer: {
        flex: 0.7,
        width: '95%',
        paddingTop: 15,
        borderRadius: 20,
        overflow: 'hidden',
        alignSelf: 'center',
        backgroundColor: Colors.White,
      },
      Heading:{
          fontSize: 20,
           fontFamily: Font.font600,
          color:Colors.Black,
          width:'80%'
      }
})
 