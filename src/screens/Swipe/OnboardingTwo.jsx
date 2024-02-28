import {StatusBar, Image, View} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Colors';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {Background, CustomButton, Heading, SubHead} from '../../components';
import {useDispatch} from 'react-redux';
import {SECOND_SPLASH} from '../../redux/reducer/Holder';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from './style';

const OnboardingTwo = () => {
  const dispatch = useDispatch();

  const onSubmit = async () => {
    dispatch({type: SECOND_SPLASH, payload: 'vv'});
    await AsyncStorage.setItem('second_splash', 'true');
  };
  return (
    <Background style={{
    marginHorizontal:15
    }}>
      <StatusBar backgroundColor={Colors.White} barStyle="dark-content" />
      <View style={style.ImageBox}>
        <Image
          source={require('../../assets/image/Backgrounds/search.png')}
          style={GlobalStyle.Image}
          resizeMode="contain"
        />
      </View>
      <Heading  center text="Get your Staff here, immediately." />
      <SubHead
        
        center
        text="We will help you to setup plan your financial things computerize. And it’s free!"
      />
      <CustomButton marginTop='10%' title="Continue" onPress={onSubmit} />
    </Background>
  );
};

export default OnboardingTwo;
