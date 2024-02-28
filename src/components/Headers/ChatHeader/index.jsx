import { View, Text,TouchableOpacity,Image,Pressable } from 'react-native'
import React from 'react'
import { GlobalStyle } from '../../../Constants/GlobalStyle'
import { Colors } from '../../../utils/Colors'
import { styles } from './style'
import Icon, { IconType } from 'react-native-dynamic-vector-icons'
import { useNavigation } from '@react-navigation/native'

const ChatHeader = ({source,active_status,name,Online,onPress}) => {
    const navigation = useNavigation();
    return (
    <TouchableOpacity onPress={onPress} style={styles.MainCon}>
      <View style={styles.Part1}>
      <Pressable
          android_ripple={GlobalStyle.Ripple}
          onPress={() => navigation.goBack()}
          style={[GlobalStyle.justify, styles.backBtn]}>
          <Icon
            size={20}
            name={'chevron-left'}
            color={Colors.DarkBlue}
            type={IconType.FontAwesome5}
          />
        </Pressable>
      </View>
      <View style={styles.Part2}>
        <View style={styles.ImageCon}>
          <View style={[styles.Online, { backgroundColor: active_status ? '#1f1' : 'red' }]} />
            <Image
              style={styles.Image}
              source={{ uri: source}}
              resizeMode={'contain'}
            />
        </View>
        <View style={styles.NameCon}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.NameText2}>{Online}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ChatHeader