import React from 'react';
import style from './style';
import {View, Text, TouchableOpacity} from 'react-native';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {Colors} from '../../../../utils/Colors';
import moment from 'moment';

const NotificationCard = ({data,onPress}) => {
  const {subject, status, description, updated_at} = data;
  return (
    <View style={style.Container}>
      <View style={GlobalStyle.Row}>
        {status === 'Unread' && (
          <Icon
            size={20}
            name="dot-fill"
            style={style.mr}
            color={Colors.Purple}
            type={IconType.Octicons}
          />
        )}

        <Text style={style.title}>{subject}</Text>
      </View>
      <Text style={style.detail}>{description}</Text>
      <View style={[GlobalStyle.Space_Between, {marginTop: 10}]}>
        <View style={GlobalStyle.Row}>
          <Icon
            size={17}
            name="clock"
            style={style.mr}
            color={Colors.LightGrey}
            type={IconType.Entypo}
          />
          <Text style={style.time}>
            {moment(updated_at).startOf('hour').fromNow()}
          </Text>
        </View>
        {status === 'Unread' && (
          <TouchableOpacity onPress={onPress}>
            <Text style={style.read}>Make as read</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default NotificationCard;
