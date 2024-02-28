import React from 'react';
import {SafeAreaView} from 'react-native';
import {Colors} from '../../utils/Colors';
import {GradientColors} from '../../utils/GradientColor';

const Background = ({children, main, style}) => {
  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: main ? GradientColors.darkPink : Colors.White,
        },
        style,
      ]}>
      {children}
    </SafeAreaView>
  );
};

export default Background;
