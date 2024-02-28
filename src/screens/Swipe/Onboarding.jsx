import React from 'react';
import {View, Text, SafeAreaView, StatusBar, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {FIRST_SPLASH} from '../../redux/reducer/Holder';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {GradientColors} from '../../utils/GradientColor';
import {CustomButton, Heading, SubHead} from '../../components';
import {Colors} from '../../utils/Colors';
import {Font} from '../../utils/font';
import Swiper from 'react-native-swiper';

import style from './style';

const Onboarding = () => {
  const dispatch = useDispatch();
  const onSubmit = async () => {
    dispatch({type: FIRST_SPLASH, payload: 'vv'});
    await AsyncStorage.setItem('first_splash', 'true');
  };

  return (
    <>
      <SafeAreaView style={GlobalStyle.TopStatus} />
      <View style={GlobalStyle.Trans_Container}>
        <StatusBar
          backgroundColor={GradientColors.darkPink}
          barStyle="light-content"
        />
        <LinearGradient
          colors={[
            GradientColors.darkPink,
            GradientColors.lightPink,
            GradientColors.lightPurple,
            GradientColors.Purple,
          ]}
          style={[GlobalStyle.Trans_Container, GlobalStyle.Padding]}>
          <View style={style.ImageBox}>
            <Image
              source={require('../../assets/image/Backgrounds/illustration.png')}
              style={GlobalStyle.Image}
              resizeMode="contain"
            />
          </View>
          <Heading white center text="Get your Staff here, immediately." />
          <SubHead
            white
            center
            text="We will help you to setup plan your financial things computerize. And it’s free!"
          />
          <CustomButton
            style={style.btn}
            textRestyle={style.text}
            title="Continue"
            onPress={onSubmit}
          />
        </LinearGradient>
      </View>
      <SafeAreaView style={GlobalStyle.BottomStatus} />
    </>
  );
};

export default Onboarding;
