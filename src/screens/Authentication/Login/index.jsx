import React, {useState} from 'react';
import {Pressable, StatusBar, ScrollView, View} from 'react-native';
import {useForm} from 'react-hook-form';

import {useDispatch} from 'react-redux';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import {Colors} from '../../../utils/Colors';
import style from './style';
import Inputs from '../../../components/Inputs';

import {
  CustomButton,
  Error,
  Heading,
  SubHead,
  Background,
  SimpleButton,
  Logo,
} from '../../../components';
import Validation from '../../../components/Validation';
import {IconType} from 'react-native-dynamic-vector-icons';
import {EmailRegix} from '../../../utils/url';
import {login_api} from '../../../redux/actions/AuthActions';
import {iOS} from '../../../Constants/Responsive';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async data => {
    dispatch(login_api(data, setLoading, setMsg, setError));
  };
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'all'});

  return (
    <Background style={GlobalStyle.Padding}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.White} />
      <View style={iOS && GlobalStyle.Margin}>
        <Logo colored end />
        <Heading center text="Welcome Back" style={style.Heading} />

        <ScrollView showsVerticalScrollIndicator={false}>
          <SubHead
            bold
            center
            style={style.sub}
            text="Nurse Staffing & Concierge Services to Login"
          />

          <Inputs
            icon
            defaultValue="fac@gmail.com"
            IconName="email"
            type={IconType.Fontisto}
            control={control}
            keyboardType="email-address"
            name="email"
            rules={{
              required: 'Email is required',
              pattern: {
                value: EmailRegix,
                message: 'Email is not valid',
              },
            }}
            placeholder="Email"
          />
          <Validation visible={errors.email} title={errors?.email?.message} />
          <Inputs
            defaultValue="12345678"
            password
            control={control}
            name="password"
            onSubmitEditing={handleSubmit(onSubmit)}
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

          <CustomButton
            marginTop="7%"
            title={'Continue'}
            loader={loading}
            onPress={handleSubmit(onSubmit)}
          />
          <Pressable
            android_ripple={GlobalStyle.Ripple}
            style={[GlobalStyle.Row, style.reset]}
            onPress={() => navigation.navigate('findAccount')}>
            <SubHead style={style.forgot} text="Forgot your password? " />
            <SubHead text="Reset here" underline />
          </Pressable>

          <SimpleButton
            mv="7%"
            title="Create new account"
            onPress={() => navigation.navigate('accountType')}
          />
        </ScrollView>
        <Error visible={error} message={msg} />
      </View>
    </Background>
  );
};

export default Login;
