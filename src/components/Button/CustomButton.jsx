import React from 'react';
import {Text,  View} from 'react-native';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {useButtonAnimation} from '../../hooks';
import {styles} from './style';
import {Colors} from '../../utils/Colors';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import { BallIndicator} from 'react-native-indicators';

const CustomButton = ({
  to,
  style,
  onPress,
  small,
  textRestyle,
  title,
  loader,
  icon,
  color,
  name,
  type,
  round,
  white,
  marginTop,
  disabled
}) => {
  const {AniPress,scaleValue, handlePressIn, handlePressOut} = useButtonAnimation();

  return (
      <AniPress
        onPress={onPress}
        disabled={disabled ? disabled : loader}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[to ? GlobalStyle.Space_Between : GlobalStyle.justify, styles.containerStyle,
          {
            borderRadius: round ? 100 : 10,
            paddingHorizontal: to ? 15 : 0,
            marginTop: marginTop ? marginTop : 12,
            width: small ? '48%' : '100%',
            backgroundColor: white
              ? Colors.White
              : loader
              ? Colors.Grey
              : Colors.Purple,
            transform: [{scale: loader ? 0.92 : scaleValue}],
          },
          style,]}>
        {icon && (
          <Icon
            size={20}
            type={type}
            name={name}
            color={color}
            style={{marginRight: 10}}
          />
        )}
        {loader ? (
          <View style={GlobalStyle.Row}>
            <View>
              <BallIndicator size={20} color={Colors.White} />
            </View>
            <Text style={styles.loading}>Lading...</Text>
          </View>
        ) : (
          <Text
            style={[
              styles.title,
              {color: white ? Colors.Grey : Colors.White},
              textRestyle,
            ]}>
            {title}
          </Text>
        )}
        {to && (
          <Icon
            name="chevron-right"
            type={IconType.Entypo}
            size={20}
            color={Colors.Blue}
          />
        )}
      </AniPress>
  );
};

export default CustomButton;
