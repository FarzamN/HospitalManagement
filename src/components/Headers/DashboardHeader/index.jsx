import React  from 'react';

import style from './style';
import {View, Image, Pressable} from 'react-native';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import {useDispatch, useSelector} from 'react-redux';
import {Heading, SubHead} from '../../Texts';
import {useGreet} from '../../../hooks';
import {useNavigation} from '@react-navigation/native';

const DashboardHeader = ({greet, icon}) => {
  const dispatch = useDispatch();
  const userDetail = useSelector(state => state.userDetails);
  const n_c = useSelector(state => state.notification_count);

  const staff = userDetail.role_id == '1'; // staff
  const admin = userDetail.role_id == '2'; // admin
  const facility = userDetail.role_id == '3'; // facility

  const navigation = useNavigation();
  const {greeting} = useGreet();

  return (
    <View
      style={[GlobalStyle.Space_Between, style.Container, GlobalStyle.Padding]}>
      <View style={{width: '80%'}}>
        {greet && (
          <SubHead
            style={style.greet}
            bold
            text={`${greeting} ${
              userDetail?.facility_name
                ? userDetail?.facility_name
                : userDetail?.name
                ? userDetail?.name
                : userDetail?.first_name + ` ` + userDetail?.last_name
            }`}
          />
        )}
        <View style={GlobalStyle.Row}>
          <Heading text="Dashboard" />
          {icon && (
            <>
              <Pressable
                style={style.Icon}
                onPress={() => navigation.navigate('alert')}
                android_ripple={GlobalStyle.Ripple}>
                <View
                  style={[
                    GlobalStyle.notificationDot,
                    {display: n_c == 0 ? 'none' : 'flex'},
                  ]}>
                  <SubHead text={n_c} white bold style={{fontSize: 10}} />
                </View>
                <Image
                  style={style.chatImage}
                  source={require('../../../assets/image/Logos/bell.png')}
                />
              </Pressable>
              {!admin && (
                <Pressable
                  style={style.Icon}
                  onPress={() => navigation.navigate('chatInbox')}
                  android_ripple={GlobalStyle.Ripple}>
                  <Image
                    style={style.chatImage}
                    source={require('../../../assets/image/Logos/chats.png')}
                  />
                </Pressable>
              )}
            </>
          )}
        </View>
      </View>
      <View style={style.ImageBox}>
        <Image
          style={GlobalStyle.Image}
          source={
            userDetail?.profile_image
              ? {uri: userDetail.profile_image}
              : require('../../../assets/image/selectimage.png')
          }
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

export default DashboardHeader;
