import {View, Text, Platform} from 'react-native';
import React from 'react';
import {GlobalStyle} from '../Constants/GlobalStyle';
import {styles} from './style';
import Icon from 'react-native-dynamic-vector-icons';
import {useButtonAnimation} from '../hooks';
import {useSelector} from 'react-redux';
import {CountDot, SubHead} from '../components';

const TabCard = ({data, onPress}) => {
  const {AniPress, handlePressIn, handlePressOut, scaleValue} =
    useButtonAnimation();
  const {type, icName, title, nav} = data;

  const c_c = useSelector(state => state.chat_count);
  const n_c = useSelector(state => state.notification_count);
  const size = nav == 'check' ? 35 : 23;

  return (
    <AniPress
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      android_ripple={Platform.Version >= 30 && GlobalStyle.Ripple}
      style={[
        styles.Container,
        {
          transform: [{scale: scaleValue}],
        },
      ]}>
      <View style={styles.IconBox}>
        <Icon size={size} color="white" type={type} name={icName} />
        <CountDot visible={title == 'Notification'} title={n_c} />
        {/* {title == 'Notification' && (
          <>
            <View
              style={[
                GlobalStyle.notificationDot,
                {display: n_c == 0 ? 'none' : 'flex'},
              ]}>
              <SubHead text={n_c} white bold style={{fontSize: 10}} />
            </View>
          </>
        )} */}
        {title == 'Messages' && (
          <>
            <View
              style={[
                GlobalStyle.notificationDot,
                {display: c_c == 0 ? 'none' : 'flex'},
              ]}>
              <SubHead text={c_c} white bold style={{fontSize: 10}} />
            </View>
          </>
        )}
      </View>
      <View style={styles.TextBox}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </AniPress>
  );
};

export default TabCard;
