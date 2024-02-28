import {View, Text} from 'react-native';
import React from 'react';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import Icon from 'react-native-dynamic-vector-icons';
import { Colors } from '../../../../utils/Colors';
import { SubHead } from '../../../../components';
import style from './style';

const ProfileView = ({title, type, name}) => {
  return (
    <View style={[GlobalStyle.Row,style.PVContainer]}>
      <Icon
        name={name}
        size={20}
        type={type}
        color={Colors.Black}
      />
      <SubHead style={style.PVTitle} text={title}/>
    </View>
  );
};

export default ProfileView;
