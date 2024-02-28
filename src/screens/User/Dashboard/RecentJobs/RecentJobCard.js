import React from 'react';
import {View, Pressable, Image} from 'react-native';
import style from './style';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {Colors} from '../../../../utils/Colors';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import {Heading, SubHead} from '../../../../components';
import moment from 'moment';
import {useButtonAnimation} from '../../../../hooks';
import { Text } from 'react-native-svg';


const RecentJobCard = ({data, onPress, onBookMark}) => {
  const {facility, price, description, created_at} = data;
  const {profile_image, facility_name, country, shift} = facility;
  const {book_mark_status , service_amount} = shift;
  const [showFullDescription, setShowFullDescription] = React.useState(false);
  const {AniPress, scaleValue, handlePressIn, handlePressOut} =
    useButtonAnimation();
   
  return (
    <AniPress
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[style.container, {transform: [{scale: scaleValue}]}]}>
      <Pressable
        style={{alignSelf: 'flex-end'}}
        android_ripple={GlobalStyle.Ripple}
        onPress={onBookMark}>
        <Icon
          size={20}
          type={IconType.Fontisto}
          name={book_mark_status ? 'bookmark-alt' : 'bookmark'}
          color={book_mark_status ? Colors.Purple : Colors.LightGrey}
        />
        
      </Pressable>
      <View style={GlobalStyle.Row}>
        <Image
          style={[style.Image, {marginRight: 8, marginBottom: 0}]}
          source={
            profile_image
              ? {uri: profile_image}
              : require('../../../../assets/image/noImage.png')
          }
        />
        <View>
          <Heading style={style.title} text={facility_name} />
          <View style={GlobalStyle.Space_Between}>
            <SubHead style={style.pay} text={`USD ${service_amount}/hr`} />
          </View>
        </View>
      </View>
      <Pressable onPress={() => setShowFullDescription(!showFullDescription)}>
        <SubHead
          style={style.detail}
          text={
            showFullDescription
              ? description
              : description.length <= 100
              ? description
              : description.slice(0, 100) + '...'
          }
        />
      </Pressable>

      <View style={GlobalStyle.Space_Between}>
        <View style={GlobalStyle.Row}>
          <Icon
            name="location"
            color="#696969"
            size={15}
            type={IconType.EvilIcons}
          />
          <SubHead text={country} style={style.BottomTexts} />
        </View>
        <View style={GlobalStyle.Row}>
          <Icon size={15} name="clock" color="#696969" type={IconType.Entypo} />
          <SubHead
            text={moment(created_at).format('DD-MM-YYYY')}
            style={style.BottomTexts}
          />
        </View>
      </View>
    </AniPress>
  );
};

export default RecentJobCard;
