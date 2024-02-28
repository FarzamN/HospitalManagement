import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {Background, Header, Heading, SubHead} from '../../../../components';
import ProfileHeader from './ProfileHeader';
import {useSelector} from 'react-redux';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';

const Profile = ({navigation}) => {
  const userDetail = useSelector(state => state.userDetails);
  const {profile_image, about, information} = userDetail;
  const onEdit = () => navigation.navigate('editProfile');

  return (
    <Background>
      <Header title="Profile" back text={'Edit'} onPress={onEdit} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader
          profile
          name={`${
            userDetail?.facility_name
              ? userDetail?.facility_name
              : userDetail?.name
              ? userDetail?.name
              : userDetail?.first_name + " " + userDetail?.last_name
          }`}
          join={userDetail.updated_at}
          image={{uri: profile_image}}
        />
        <View style={GlobalStyle.Padding}>
          {about && (
            <>
              <Heading text={'About'} />
              <SubHead text={about} />
            </>
          )}
          {information && (
            <>
              <Heading text={'Information'} />
              <SubHead text={information} />
            </>
          )}
        </View>
      </ScrollView>
    </Background>
  );
};

export default Profile;
