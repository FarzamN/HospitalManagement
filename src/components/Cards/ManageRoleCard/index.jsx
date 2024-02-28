import {View} from 'react-native';
import React from 'react';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import {SubHead, SmallButton} from '../../../components';
import {styles} from '../Empty/style';

const ManageRoleCard = ({data, onPress}) => {
  const {value} = data;
  return (
    <View
      style={[
        GlobalStyle.Space_Between,
        GlobalStyle.Padding,
        styles.RoleCardContainer,
      ]}>
      <SubHead bold style={{color: '#9B9B9B'}} text={value} />
      <SmallButton bold title="Manage Roles" onPress={onPress} />
    </View>
  );
};

export default ManageRoleCard;
