import {View, Pressable} from 'react-native';
import React from 'react';
import {SubHead} from '../../../../components';
import style from '../SInput/style';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';

const SButton = ({arrow, ReStyle, title, placeHolder, onPress}) => {
  return (
    <View style={[{marginTop: 7, width: '45%'}, ReStyle]}>
      {title && <SubHead bold text={title} />}
      <Pressable
        android_ripple={onPress && GlobalStyle.Ripple}
        onPress={onPress}
        style={[
          style.Container,
          GlobalStyle.Row,
          GlobalStyle.Padding,
          {height: 55, justifyContent: 'space-between', overflow: 'hidden'},
        ]}>
        <SubHead bold text={placeHolder} style={{color: '#9B9B9B'}} />
        {arrow && (
          <Icon
            name="chevron-down"
            size={20}
            color="#9B9B9B"
            type={IconType.Entypo}
          />
        )}
      </Pressable>
    </View>
  );
};

export default SButton;
