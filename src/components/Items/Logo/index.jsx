import {View, Image} from 'react-native';
import React from 'react';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import {SubHead} from '../../Texts';

const index = ({colored, end, text}) => {
  return (
    <View>
      <View
        style={{width: 80, height: 80, alignSelf: end ? 'flex-end' : 'center',marginHorizontal:15}}>
        <Image
          resizeMode="contain"
          style={GlobalStyle.Image}
          source={
            colored
              ? require('../../../assets/image/Logos/colorlogo.png')
              : require('../../../assets/image/Logos/logo.png')
          }
        />
      </View>
      {text && <SubHead center bold white={!colored} text={`Nurse Staffing & ${`\n`} Concierge Services`} />}
    </View>
  );
};

export default index;
