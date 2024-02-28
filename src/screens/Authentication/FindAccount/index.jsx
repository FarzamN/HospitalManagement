import React, {useState} from 'react';
import {
  Background,
  CustomButton,
  Error,
  Heading,
  Loader,
  Logo,
  SubHead,
} from '../../../components';
import {View, ScrollView, StatusBar, SafeAreaView} from 'react-native';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import Validation from '../../../components/Validation';
import {useForm} from 'react-hook-form';
import Inputs from '../../../components/Inputs';
import {GradientColors} from '../../../utils/GradientColor';
import {IconType} from 'react-native-dynamic-vector-icons';
import {EmailRegix} from '../../../utils/url';
import {useDispatch} from 'react-redux';
import {find_email} from '../../../redux/actions/AuthActions';

const Index = ({navigation}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigationType = 'forget';
  const onSubmit = data => {
    setLoading(true);
    dispatch(
      find_email(data, navigationType, setLoading, setError, navigation),
    );
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'all'});
  return (<>
    <Background main noPadding>
      <StatusBar
        backgroundColor={GradientColors.darkPink}
        barStyle={'light-content'}
      />

      <View style={{marginVertical: 10}}>
        <Logo end />
        <View style={{marginTop: 16}}>
          <Heading white center text={'Find Account'} />
          <SubHead white center text="Provide Email to find your account" />
        </View>
      </View>
      <View style={GlobalStyle.AuthBox}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={GlobalStyle.WindowHeight} />
          <Inputs
            icon
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

          <View style={GlobalStyle.WindowHeight} />
          <CustomButton onPress={handleSubmit(onSubmit)} title={'Submit'} />
        </ScrollView>
      </View>
      <Error message="email not found" visible={error} />
      <Loader visible={loading} />
    </Background>
    <SafeAreaView style={GlobalStyle.WhiteStatus}/>
    </>
  );
};

export default Index;
