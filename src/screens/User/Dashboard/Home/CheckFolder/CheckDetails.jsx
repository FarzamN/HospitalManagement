import {View, Text, Image, ScrollView} from 'react-native';
import React from 'react';
import {
  Background,
  CustomButton,
  Header,
  Heading,
} from '../../../../../components';
import {GlobalStyle} from '../../../../../Constants/GlobalStyle';
import style from '../style';
import SButton from '../../../Shifts/SButton';
import JobsDetail from '../../../Shifts/Detail/Tabs/Job/JobsDetail';

const CheckDetails = ({navigation, route}) => {
  const {data} = route.params;
  const {user, shift, check_in_time, check_out_time, job_status, review} = data;
  const {profile_image, first_name, last_name, id, role_id} = user;
  const {title, start_time, end_time, job_details} = shift;
  console.log(data);
  const onDone = () => {
    if (review) {
      navigation.navigate('otherProfile', {
        id,
        role: role_id,
      });
    } else {
      navigation.navigate('writeReview', {item: data});
    }
  };
  // const check = () => {
  //   const arr = job_status.split('');
  //   arr.splice(5, 0, ' ');
  //   return arr;
  // };
  return (
    <Background>
      <Header back title="Check Details" gap />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={GlobalStyle.Padding}>
        <View style={style.profile_imageBox}>
          <Image source={{uri: profile_image}} style={GlobalStyle.Image} />
        </View>
        <Heading
          style={{marginTop: 10}}
          center
          bold
          text={first_name + ' ' + last_name}
        />
        <SButton
          title="Job Title"
          placeHolder={title}
          ReStyle={GlobalStyle.fullButton}
        />

        {job_details?.map((item, index) => (
          <JobsDetail key={index.toString()} data={item} />
        ))}

        <View style={GlobalStyle.Space_Between}>
          <SButton title="start time" placeHolder={start_time} />
          <SButton title="end time" placeHolder={end_time} />
        </View>

        <SButton
          title="Current Status"
          placeHolder={job_status}
          ReStyle={GlobalStyle.fullButton}
        />
        <View style={GlobalStyle.Space_Between}>
          <SButton title="Check in time" placeHolder={check_in_time} />
          <SButton title="Check Out time" placeHolder={check_out_time} />
        </View>
        <CustomButton
          title={review ? 'Visit Profile' : 'Write Review'}
          style={{marginVertical: 10}}
          onPress={onDone}
        />
      </ScrollView>
    </Background>
  );
};

export default CheckDetails;
