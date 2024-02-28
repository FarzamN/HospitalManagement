import {useDispatch, useSelector} from 'react-redux';
import React, {useState} from 'react';
import {
  CustomButton,
  Error,
  Heading,
  Loader,
  Logo,
  SubHead,
  Background
} from '../../../components';
import {View, ScrollView, StatusBar} from 'react-native';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import Validation from '../../../components/Validation';
import {useForm} from 'react-hook-form';
import Inputs from '../../../components/Inputs';
import {GradientColors} from '../../../utils/GradientColor';
import {reset_password} from '../../../redux/actions/AuthActions';

const Index = ({navigation}) => {
  const id = useSelector(state => state.get_id);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState('');

  const onSubmit = data => {
    if (data.password === data.c_password) {
      setLoad(true);
      reset_password(data, id, setLoad, navigation);
    } else {
      setMsg('password does not match');
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'all'});
  return (
    <Background main noPadding>
      <StatusBar
        backgroundColor={GradientColors.darkPink}
        barStyle={'light-content'}
      />

      <View style={{marginVertical: 10}}>
        <Logo end />
        <View style={{marginTop: 16}}>
          <Heading white center text={'Forgot Password'} />
          <SubHead white center text={`feel free to forget your password`} />
        </View>
      </View>
      <View style={GlobalStyle.AuthBox}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={GlobalStyle.WindowHeight} />
          <Inputs
            white
            password
            control={control}
            name="password"
            label="Password"
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
            placeholder="Password"
          />
          <Validation
            visible={errors.password}
            title={errors?.password?.message}
          />

          <Inputs
            white
            password
            control={control}
            name="c_password"
            label="Confirm Password"
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
          <CustomButton onPress={handleSubmit(onSubmit)} title={'Submit'} />
        </ScrollView>
      </View>
      <Error message={msg} visible={error} />
      <Loader visible={load} />
    </Background>
  );
};

export default Index;
