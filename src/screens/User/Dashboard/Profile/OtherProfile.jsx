import {View, ScrollView, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Background,
  Header,
  Heading,
  Loader,
  SubHead,
} from '../../../../components';
import ProfileHeader from './ProfileHeader';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import {IconType} from 'react-native-dynamic-vector-icons';
import {useDispatch, useSelector} from 'react-redux';
import {get_profile_api} from '../../../../redux/actions/UserAction';
import PV from './ProfileView';
import {Colors} from '../../../../utils/Colors';

const OtherProfile = ({route}) => {
  const {id,role} = route.params;
  const dispatch = useDispatch();
  const get_user_profile = useSelector(state => state.get_user_profile);

  const {
    profile_image,
    facility_name,
    first_name,
    last_name,
    country,
    email,
    phone,
    Address_line_1,
    Address_line_2,
    updated_at,
    state,
    role_id,
    facility_email,
    phone_number,
    address_1,
    address_2,
    about,
    information,
  } = get_user_profile;
  const staff = role_id == '1';
  const fac = role_id == '3';

  console.log('Other profile role_id', {fac, staff});

  const [load, setLoad] = useState(true);
  useEffect(() => {
    dispatch(get_profile_api(id,role, setLoad));
  }, []);

  return (
    <Background>
      <Header gap back title="Profile" />
      <StatusBar backgroundColor={Colors.White} barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader
          profile
          name={staff ? first_name + ' ' + last_name : facility_name}
          join={updated_at}
          image={
            profile_image
              ? {uri: profile_image}
              : require('../../../../assets/image/selectimage.png')
          }
        />
        <View style={GlobalStyle.Vertical_Space} />
        <View style={GlobalStyle.Padding}>
          <PV
            type={IconType.AntDesign}
            name={'user'}
            title={staff ? first_name + ' ' + last_name : facility_name}
          />
          <PV
            type={IconType.Zocial}
            name={'email'}
            title={staff ? email : facility_email}
          />
          <PV
            type={IconType.FontAwesome}
            name={'phone'}
            title={staff ? phone : phone_number}
          />

          {about || information ? (
            <PV
              type={IconType.Entypo}
              name={'info'}
              title={about || information}
            />
          ) : null}

          <PV
            type={IconType.Feather}
            name={'send'}
            title={staff ? Address_line_1 : address_1}
          />
          <PV
            type={IconType.Feather}
            name={'send'}
            title={staff ? Address_line_2 : address_2}
          />
          <PV type={IconType.FontAwesome} name={'building-o'} title={country} />
          <PV type={IconType.FontAwesome} name={'building-o'} title={state} />
        </View>
      </ScrollView>
      <Loader visible={load} />
    </Background>
  );
};

export default OtherProfile;
