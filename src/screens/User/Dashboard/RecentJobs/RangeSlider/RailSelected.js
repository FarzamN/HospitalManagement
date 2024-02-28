import React, { memo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Colors } from '../../../../../utils/Colors'

const RailSelected = () => <View style={styles.root} />

export default memo(RailSelected)

const styles = StyleSheet.create({
  root: {
    height: 2,
    backgroundColor: Colors.Purple,
    borderRadius: 2,
    borderColor: Colors.White
  },
})
