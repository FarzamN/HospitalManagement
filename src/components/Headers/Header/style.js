import {
    StyleSheet,
} from 'react-native';
import { Font } from '../../../utils/font';
import { Colors } from '../../../utils/Colors';

export const styles = StyleSheet.create({
    Container: {
        height:60,
        marginTop: 10,
        paddingBottom: 15,
      },
    backBtn: {
        width:40,
        borderWidth: 1,
        aspectRatio:1/1,
        borderRadius: 7,
        overflow:'hidden',
        borderColor: '#E8E8E8',
    },
    Text: {
        color: Colors.Black,
        fontFamily: Font.font600,
        textTransform:'capitalize'
      },
      lastSeen: {
        fontSize:12,
        color: Colors.Grey,
        fontFamily: Font.font500,
        textAlign:'center'
      },
})