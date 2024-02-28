import {View, Pressable, Image, Animated} from 'react-native';
import React, {useState} from 'react';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import {style} from './style';
import {Heading, SubHead} from '../../../../components';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {Colors} from '../../../../utils/Colors';
import ImageIndicator from '../../../../components/Items/ImageIndicator';
import moment from 'moment';
import {useButtonAnimation} from '../../../../hooks';
import {useNavigation} from '@react-navigation/native';

const InBoxCard = ({data, i}) => {
  const {
    profile_pic,
    profile_image,
    name,
    message,
    created_at,
    status,
    facility_status,
    name_user_id,
    role_id,
  } = data;
  const Unread = status == 'unread';
  const UnreadColor = Unread ? Colors.LightGrey : Colors.DarkBlue;

  const [load, setLoad] = useState(true);
  const {AniPress, scaleValue, handlePressIn, handlePressOut} =
    useButtonAnimation();
  const navigation = useNavigation();
  return (
    <AniPress
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() =>
        navigation.navigate('chat', {id: name_user_id, role: role_id})
      }
      style={[
        GlobalStyle.Row,
        style.CardContainer,
        {marginTop: i == 0 ? 15 : 0, transform: [{scale: scaleValue}]},
      ]}>
      <View style={style.ImageBox}>
        <ImageIndicator visible={load} />
        <Image
          onLoadEnd={() => setLoad(false)}
          style={[GlobalStyle.Image, {borderRadius: 10}]}
          source={{uri: profile_pic || profile_image}}
          resizeMode="contain"
        />

        <Icon
          size={25}
          name="dot-fill"
          style={style.Online}
          type={IconType.Octicons}
          color={facility_status == 'Active' ? '#54D969' : 'red'}
        />
      </View>
      <View style={{width: '80%'}}>
        <Heading style={style.Heading} text={name} />
        <SubHead numberOfLines={1} text={message} style={style.sub} />
        <View style={GlobalStyle.Space_Between}>
          <SubHead
            text={moment(created_at).format('DD-MMMM-YYYY')}
            style={style.time}
          />
          <View style={GlobalStyle.Row}>
            <Icon
              size={20}
              name={Unread ? 'check' : 'checkmark-done-outline'}
              color={UnreadColor}
              type={Unread ? IconType.Feather : IconType.Ionicons}
            />
            <SubHead
              style={[
                style.time,
                {
                  color: UnreadColor,
                  marginRight: 10,
                },
              ]}
              text={status}
            />
          </View>
        </View>
      </View>
    </AniPress>
  );
};

export default InBoxCard;
