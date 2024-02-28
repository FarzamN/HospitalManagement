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
      Arrow: {
        height: 43,
        width: 43,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.LightGrey,
        borderWidth: 2,
      },
      MainCon: {
        height: 60,
        alignItems: 'center',
        flexDirection: 'row',
      },
      Part1: {
        height: '100%',
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      Part2: {
        height: '100%',
        width: '80%',
        flexDirection: 'row',
      },
      ImageCon: {
        height: '100%',
        width: '20%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
      },
      Image: {
        height: 45,
        width: 45,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: Colors.Grey,
      },
      NameCon: {
        height: '100%',
        width: '80%',
        justifyContent: 'center',
        paddingHorizontal: 5,
      },
      name: {
        fontFamily: Font.font500,
        fontSize: 14,
        color: Colors.Black,
      },
      NameText2: {
        fontFamily: Font.Inter400,
        fontSize: 11,
        color: Colors.Black,
      },
      Online: {
        height: 12,
        width: 12,
        borderRadius: 100,
        position: 'absolute',
        zIndex: 10,
        right: 5,
        bottom: 10,
      },
})