import {TouchableOpacity} from 'react-native';
import React from 'react';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {SubHead} from '../../Texts';
import {Colors} from '../../../utils/Colors';
import {GlobalStyle} from '../../../Constants/GlobalStyle';

const YesNoCard = ({data, onPress, focus}) => {
  const {name} = data;
  return (
    <TouchableOpacity onPress={onPress} style={GlobalStyle.Row}>
      <Icon
        size={20}
        name={focus ? 'radio-button-on' : 'radio-button-off'}
        color={focus ? Colors.Purple : Colors.Black}
        type={IconType.MaterialIcons}
      />
      <SubHead
        bold
        style={{
          color: focus ? Colors.Purple : Colors.Black,
          marginLeft: 5,
        }}
        text={name}
      />
    </TouchableOpacity>
  );
};

export default YesNoCard;
