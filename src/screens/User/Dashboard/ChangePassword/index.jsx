import {View, ScrollView, StatusBar} from 'react-native';
import React, {useState} from 'react';
import {
  CustomButton,
  Error,
  Heading,
  Loader,
  Logo,
  SubHead,
  Background
} from '../../../../components';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import {useDispatch, useSelector} from 'react-redux';
import Validation from '../../../../components/Validation';
import {useForm} from 'react-hook-form';
import CustomInput from '../../../../components/Inputs';
import {GradientColors} from '../../../../utils/GradientColor';
import { change_password } from '../../../../redux/actions/AuthActions';

const ChangePassword = ({navigation}) => {
  const userDetails = useSelector(state => state.userDetails);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState('');

  const onSubmit = data => {
    if (data.c_password !== data.password) {
      setMsg("password isn't match");
      time();
    } else {
      setLoad(true)
      dispatch(change_password(data,setLoad,setError,setMsg))
    }
  };
  const time = () => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 1500);
  };
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'all'});
  return (
    <Background main>
      <StatusBar
        backgroundColor={GradientColors.darkPink}
        barStyle="light-content"
      />
      <View style={[GlobalStyle.Padding,{marginVertical: 10}]}>
        <Logo end />
        <View style={[GlobalStyle.Padding,{marginTop: 16}]}>
          <Heading white center text={'Change Password'} />
          <SubHead
            center
            white
            text={'After successfully password change we will logout your account'}
          />
        </View>
      </View>
      <View style={GlobalStyle.AuthBox}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={GlobalStyle.WindowHeight} />
          <CustomInput
            white
            password
            control={control}
            name="oldPassword"
            rules={{
              required: 'Current Password is required',
              minLength: {
                value: 8,
                message: 'Password too short (minimum length is 8)',
              },
              maxLength: {
                value: 16,
                message: 'Password too long (maximum length is 16)',
              },
            }}
            placeholder="Current Password"
          />
          <Validation
            visible={errors.oldPassword}
            title={errors?.oldPassword?.message}
          />
          <CustomInput
            white
            password
            control={control}
            name="password"
            rules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password too short (minimum length is 8)',
              },
              maxLength: {
                value: 16,
                message: 'Password too long (maximum length is 16)',
              },
            }}
            placeholder="New Password"
          />
          <Validation
            visible={errors.password}
            title={errors?.password?.message}
          />

          <CustomInput
            white
            password
            control={control}
            name="c_password"
            rules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password too short (minimum length is 8)',
              },
              maxLength: {
                value: 16,
                message: 'Password too long (maximum length is 16)',
              },
            }}
            placeholder="Confirm Password"
          />
          <Validation
            visible={errors.c_password}
            title={errors?.c_password?.message}
          />
          <View style={GlobalStyle.WindowHeight} />
          <CustomButton onPress={handleSubmit(onSubmit)} title={'Continue'} />
        </ScrollView>
      </View>
      <Error message={msg} visible={error} />
      <Loader visible={load} />
    </Background>
  );
};

export default ChangePassword;
