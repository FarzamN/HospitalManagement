import {SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {GradientColors} from '../../utils/GradientColor';
import LinearGradient from 'react-native-linear-gradient';

const ColorBackground = ({children}) => {
  return (
    <SafeAreaView style={GlobalStyle.Trans_Container}>
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
        style={GlobalStyle.Trans_Container}>
          {children}
      </LinearGradient>
    </SafeAreaView>
  );
};

export default ColorBackground;
