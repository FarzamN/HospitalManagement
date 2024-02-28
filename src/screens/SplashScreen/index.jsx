import React from 'react';
import styles from './style';
import {Colors} from '../../utils/Colors';
import LottieView from 'lottie-react-native';
import FastImage from 'react-native-fast-image';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {GradientColors} from '../../utils/GradientColor';
import LinearGradient from 'react-native-linear-gradient';
import {View, StatusBar, SafeAreaView, Text} from 'react-native';

const Index = () => {
  return (
    <>
      <SafeAreaView style={GlobalStyle.TopStatus} />
      <View style={GlobalStyle.Trans_Container}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor={Colors.Non}
        />
        <LinearGradient
          style={styles.Container}
          colors={[
            GradientColors.darkPink,
            GradientColors.lightPink,
            GradientColors.lightPurple,
            GradientColors.Purple,
          ]}>
          <View style={{alignItems: 'center'}}>
            <View style={styles.ImageBox}>
              <FastImage
                style={GlobalStyle.Image}
                resizeMode={FastImage.resizeMode.contain}
                source={require('../../assets/image/Logos/logo.png')}
              />
            </View>
            <Text style={styles.text}>
              Nurse Staffing & {`\n`} Concierge Services
            </Text>
          </View>
          <LottieView
            autoPlay
            style={styles.LottieView}
            source={require('../../assets/lottie/splash_lottie.json')}
          />
        </LinearGradient>
      </View>
      <SafeAreaView style={GlobalStyle.BottomStatus} />
    </>
  );
};

export default Index;
