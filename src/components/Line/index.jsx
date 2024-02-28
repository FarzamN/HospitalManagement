import {View} from 'react-native';
import React from 'react';
import {styles} from './style';

const Index = ({width,marginTop}) => {
  return <View style={[styles.line, {width: width,marginTop:marginTop}]} />;
};

export default Index;
