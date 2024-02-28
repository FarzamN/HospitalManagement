import {Pressable, Text} from 'react-native';
import React from 'react';
import style from './style';
import {SubHead} from '../../Texts';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import actStyle from '../../../screens/User/Shifts/ManageMember/style';

const CreateServiceCard = ({data, i, onPress, onLongPress, onStatus}) => {
  const {service_name, status} = data;
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      android_ripple={GlobalStyle.Ripple}
      style={[style.container, {marginTop: i === 0 ? 15 : 0}]}>
      <SubHead bold text={service_name} />
      <Pressable onPress={onStatus} android_ripple={GlobalStyle.Ripple}>
        <SubHead style={actStyle.active} text={status} />
      </Pressable>
    </Pressable>
  );
};

export default CreateServiceCard;
