import React from 'react';
import {styles} from './style.js';
import {Colors} from '../../../utils/Colors';
import {View, Text, Pressable} from 'react-native';
import SmallButton from '../../Button/SmallButton';
import {useNavigation} from '@react-navigation/native';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';

const Header = ({
  back,
  title,
  gap,
  chat,
  onPress,
  lastSeen,
  manage,
  bTitle,
  fontSize,
  bold,
  text,
  screen
}) => {
  const navigation = useNavigation();
  


  const navigation_screens = ()=>{ 
    if(screen == "searchPage"){
      navigation.goBack()
      navigation.navigate("AllSearch")
    }else{
      navigation.goBack()
    }
  }

  

  return (
    <View
      style={[
        GlobalStyle.Space_Between,
        GlobalStyle.Padding,
        styles.Container,
      ]}>
      {screen == "searchPage"}  
      {back && (
        <Pressable
          android_ripple={GlobalStyle.Ripple}
          
          onPress={() => navigation_screens()}
          style={[GlobalStyle.justify, styles.backBtn]}>
          <Icon
            size={20}
            name={'chevron-left'}
            color={Colors.DarkBlue}
            type={IconType.FontAwesome5}
          />
        </Pressable>
      )}
      <View>
        {title && (
          <Text style={[styles.Text, {fontSize: chat ? 19 : 20}]}>{title}</Text>
        )}
        {lastSeen && <Text style={styles.lastSeen}>{lastSeen}</Text>}
      </View>
      {gap ? (
        <View style={{width: 40}} />
      ) : chat ? (
        <Pressable
          android_ripple={GlobalStyle.Ripple}
          onPress={onPress}
          style={[GlobalStyle.justify, styles.backBtn]}>
          <Icon
            size={20}
            type={IconType.Entypo}
            color={Colors.DarkBlue}
            name={'dots-three-vertical'}
          />
        </Pressable>
      ) : manage ? (
        <SmallButton
          bold={bold}
          title={bTitle}
          onPress={onPress}
          fontSize={fontSize || 14}
        />
      ) : text ? (
        <Pressable  onPress={onPress} android_ripple={GlobalStyle.Ripple}>
          <Text style={[styles.Text, {fontSize: 16}]}>{text}</Text>
        </Pressable>
      ) : null}
    </View>
  );
};

export default Header;
