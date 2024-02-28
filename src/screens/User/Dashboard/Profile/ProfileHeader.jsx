import React from 'react';
import style from './style';
import {Colors} from '../../../../utils/Colors';
import {Heading, SubHead} from '../../../../components';
import {View, TouchableOpacity, Image} from 'react-native';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import moment from 'moment';
import {useSelector} from 'react-redux';

const ProfileHeader = ({image, onEdit, profile, name, join}) => {
  const userDetail = useSelector(state => state.userDetails);
  const {role_id} = userDetail;
  return (
    <View
      style={[
        style.HeaderContainer,
        {backgroundColor: profile ? '#F0F3F9' : '#E0BCD6'},
      ]}>
      <View style={style.ImageBox}>
        <Image
          resizeMode="contain"
          source={image}
          style={[
            GlobalStyle.Image,
            {backgroundColor: '#A8D5E4', borderRadius: 365},
          ]}
        />
        {!profile && (
          <TouchableOpacity onPress={onEdit} style={style.EditBox}>
            <Icon
              size={20}
              name="camera"
              color={Colors.Purple}
              type={IconType.Entypo}
            />
          </TouchableOpacity>
        )}
      </View>
      <Heading text={name} center />

      <SubHead center text={`Joined at: ${moment(join).format('MMMM-YYYY')}`} />
      
      {role_id == '1' ? (
        <>
          {profile && (
            <View style={[GlobalStyle.Row, GlobalStyle.justify, style.JobBox]}>
              <Icon
                size={20}
                name="star"
                color={Colors.White}
                type={IconType.AntDesign}
                style={{marginHorizontal: 10}}
              />
              <Heading white text={'35 Jobs Completed'} />
            </View>
          )}
        </>
      ) : null}
    </View>
  );
};

export default ProfileHeader;
