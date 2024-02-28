import { StyleSheet } from 'react-native';
import { Colors } from '../../../utils/Colors';
import { Font } from '../../../utils/font';

export const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    Image: {
        width: '100%',
        height: '100%',
    },
    ImageBox: {
        width: 200,
        height: 200,
        marginVertical: 10,
    },
    text: {
        fontSize: 22,
        color: Colors.Purple,
        fontFamily: Font.font500Italic,
        textAlign: 'center',
    },
    RoleCardContainer:{
        backgroundColor: '#F8F8F8',
        marginBottom: 10,
        paddingVertical: 10,
        borderRadius: 10,
      }
});
