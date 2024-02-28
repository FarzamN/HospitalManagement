import {View, ImageBackground, Pressable,TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import style from './style';
import {Heading, SubHead} from '../../../../components';

const Awards = () => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={style.AwardContainer}
      android_ripple={GlobalStyle.WhiteRipple}
      onPress={() => navigation.navigate('jobsAwards')}>
      <ImageBackground
        style={[GlobalStyle.Image,  {justifyContent: 'center',}]}
        source={require('../../../../assets/image/Backgrounds/award.png')}>
        <View style={[GlobalStyle.Space_Between,{paddingHorizontal:10}]}>
          <View>
            <Heading style={{fontSize:17}} text="Awarded Jobs" white/>
            <SubHead  style={{fontSize:14}} text="Congrats your get the new job" white/>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('jobsAwardsDetails')}>
          <Heading style={{fontSize:15}} text="More detail" white/>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

export default Awards;
