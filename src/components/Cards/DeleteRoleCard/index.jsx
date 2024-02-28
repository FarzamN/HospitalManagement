import React from 'react';
import { Colors } from '../../../utils/Colors';
import {useButtonAnimation} from '../../../hooks';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {GlobalStyle} from '../../../Constants/GlobalStyle';

const DeleteRoleCard = ({onPress}) => {
  const {AniPress, handlePressIn, handlePressOut, scaleValue} =
    useButtonAnimation();
  return (
    <AniPress
    onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        GlobalStyle.TrashCan,
        GlobalStyle.justify,
        {transform: [{scale: scaleValue}]},
      ]}>
      <Icon
        size={25}
        name="delete"
        color={Colors.White}
        type={IconType.MaterialCommunityIcons}
      />
    </AniPress>
  );
};

export default DeleteRoleCard;
