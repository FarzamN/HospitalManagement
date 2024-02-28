import React, { memo } from 'react'
import { View, StyleSheet } from 'react-native'
import { Colors } from '../../../../../utils/Colors'
const THUMB_RADIUS_LOW = 16
const THUMB_RADIUS_HIGH = 16

const Thumb = ({ name }) => {
    return <View style={name === 'high' ? styles.rootHigh : styles.rootLow} />
}

const styles = StyleSheet.create({
    rootLow: {
        width: THUMB_RADIUS_LOW * 1.3,
        height: THUMB_RADIUS_LOW * 1.3,
        borderRadius: THUMB_RADIUS_LOW,
        borderWidth: 1,
        borderColor: Colors.Purple,
        backgroundColor: Colors.White,
    },
    rootHigh: {
        width: THUMB_RADIUS_HIGH * 1.3,
        height: THUMB_RADIUS_HIGH * 1.3,
        borderRadius: THUMB_RADIUS_HIGH,
        borderWidth: 1,
        borderColor: Colors.Purple,
        backgroundColor: Colors.White,
    },
})

export default memo(Thumb)
