import { StyleSheet } from 'react-native'
import { Font } from '../../utils/font';
import { Colors } from '../../utils/Colors';

const top = 1
export const styles = StyleSheet.create({
    subHead: {
        top,
        fontSize: 15,
    },
    Heading: {
        fontSize: 22,
        fontFamily: Font.font600,
    },

    values: {
        fontSize: 12,
        color: Colors.Black,
        fontFamily: Font.font500,
    },
});
