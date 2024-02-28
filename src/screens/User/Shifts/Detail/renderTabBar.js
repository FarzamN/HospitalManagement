import React from 'react';
import {Text, View} from 'react-native';
import {Colors} from '../../../../utils/Colors';
import {Font} from '../../../../utils/font';
import {TabBar} from 'react-native-tab-view';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';

const renderTabBar = props => {
  return (
    <View
      style={{
        width: '100%',
      }}>
      <TabBar
        {...props}
        indicatorStyle={{backgroundColor: Colors.Purple, height: 4}}
        indicatorContainerStyle={{
          backgroundColor: Colors.Black,
          height: 4,
          position: 'absolute0',
          top: 50,
        }}
        // remove this upper line if not responsive

        android_ripple={GlobalStyle.Ripple}
        style={{
          backgroundColor: Colors.White,
          elevation: 0,
          width: '100%',
        }}
        renderLabel={({route}) => (
          <Text
            allowFontScaling
            style={{
              fontSize: 17,
              color: Colors.Black,
              fontFamily: Font.font600,
            }}>
            {route.title}
          </Text>
        )}
        bounces={false}
        scrollEnabled={false}
        activeColor={{color: Colors.Main}}
        inactiveColor={{color: Colors.Grey}}
      />
    </View>
  );
};

export default renderTabBar;
