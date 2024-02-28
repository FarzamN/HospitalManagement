import React from 'react';
import {View, Text, Pressable, Animated} from 'react-native';
import style from './style';
import {GradientColors} from '../../../utils/GradientColor';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import {Colors} from '../../../utils/Colors';
import {SubHead} from '../../../components';
import {useButtonAnimation} from '../../../hooks';

const Selector = ({data, onPress, focus}) => {
  const {title, des} = data;
  const {handlePressIn, handlePressOut, scaleValue} = useButtonAnimation();
  return (
    <Animated.View
      style={[
        style.MainContainer,
        [
          {
            transform: [
              {
                scale: scaleValue,
              },
            ],
            backgroundColor: focus ? '#DFE5F0' : '#F6F6F6',
            borderColor: focus ? GradientColors.darkPink : '#EAEBEC',
          },
        ],
      ]}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={style.Container}
        onPress={onPress}>
        <View
          style={[
            style.IconBox,
            GlobalStyle.justify,
            {backgroundColor: focus ? Colors.White : '#EFEFEF'},
          ]}>
          {data.id == 1 ? (
            <Icon
              name="briefcase-outline"
              type={IconType.Ionicons}
              size={30}
              color={focus ? '#2A3855' : '#ACACAF'}
            />
          ) : (
            <Icon
              size={30}
              name="chalkboard-teacher"
              type={IconType.FontAwesome5}
              color={focus ? '#2A3855' : '#ACACAF'}
            />
          )}
        </View>
        <Text style={style.title}>{title}</Text>
        <SubHead
          center
          underline
          style={[style.sub, {fontSize: 12, paddingHorizontal: 15}]}
          text={des}
        />
      </Pressable>
    </Animated.View>
  );
};

export default Selector;
