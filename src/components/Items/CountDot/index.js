import {View} from 'react-native';
import React from 'react';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import {SubHead} from '../../Texts';

const CountDot = ({visible, title}) => {
  return (
    <>
      {visible && (
        <View
          style={[
            GlobalStyle.notificationDot,
            {display: title == 0 ? 'none' : 'flex'},
          ]}>
          <SubHead text={title} white bold style={{fontSize: 10}} />
        </View>
      )}
    </>
  );
};

export default CountDot;
