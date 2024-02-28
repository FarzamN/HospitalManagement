import React from 'react';

import { GlobalStyle } from '../../../../../Constants/GlobalStyle';
import style from '../style';
import { View, Image, FlatList, Touchable, TouchableOpacity, } from 'react-native';
import { Heading, SubHead } from '../../../../../components';
import SmallButton from '../../../../../components/Button/SmallButton';
import { useButtonAnimation } from '../../../../../hooks';
import { StarRating } from '../../../../../components';

const MemberBitCard = ({ data, index, onPress, onProfile }) => {
  const { profile_image, description, user_name, reviews } = data;
  const { AniPress, scaleValue, handlePressIn, handlePressOut } = useButtonAnimation();
  let totalrattings;
  if(reviews.length > 0){
    let totalReviews = reviews.length;
    let totalratings = 0;
    reviews.forEach(ratings => {
      totalratings += parseFloat(ratings.stars)
    }); 
     totalrattings = parseFloat(totalratings/totalReviews).toFixed(1)
 }else{
    totalrattings = 0;
 }


 

  return (
    <AniPress
      onPress={onProfile}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        GlobalStyle.Space_Between,
        {
          marginTop: index == 0 ? 15 : 10,
          transform: [{ scale: scaleValue }]
        },
      ]}>
      <View style={GlobalStyle.Row}>
        {profile_image ? (
          <Image style={style.Dp} source={{ uri: profile_image }} />
        ) : (
          <Image
            style={style.Dp}
            source={require('../../../../../assets/image/noImage.png')}
          />
        )}

        <View style={{ width: '59%' }}>
          <Heading text={user_name} style={style.name} />

          <TouchableOpacity style={{ ...GlobalStyle.Row, width: '35%' }} >
            <StarRating
              size={16}
              styles={{ paddingBottom: 5 }}
              rating={parseInt(totalrattings)
              }
            />

            <SubHead
              numberOfLines={1}
              text={" (" + totalrattings + ")"}
              style={{ ...style.userName, fontWeight: 'bold', fontSize: 14, marginTop: -7 }}
            />
          </TouchableOpacity>

          <SubHead
            numberOfLines={1}
            text={description}
            style={style.userName}
          />
        </View>
        <SmallButton onPress={onPress} title="View Bits" />

      </View>
    </AniPress >
  );
};

export default MemberBitCard;
