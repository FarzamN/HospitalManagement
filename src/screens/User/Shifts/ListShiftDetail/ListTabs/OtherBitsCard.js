import React from 'react';

import {GlobalStyle} from '../../../../../Constants/GlobalStyle';
import style from '../style';
import {View, Image, ActivityIndicator} from 'react-native';
import {Heading, SubHead} from '../../../../../components';
import moment from 'moment';
import {useButtonAnimation} from '../../../../../hooks';
import {useState} from 'react';
import {Colors} from '../../../../../utils/Colors';

const OtherBitsCard = ({data, index, onPress}) => {
  const {profile_image, user_name, about, created_at} = data;
  const {AniPress, scaleValue, handlePressIn, handlePressOut} =
    useButtonAnimation();
  const [load, setLoad] = useState(true);
  return (
    <AniPress
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        GlobalStyle.Space_Between,
        {
          marginTop: 15,
          transform: [{scale: scaleValue}],
        },
      ]}>
      <View style={GlobalStyle.Row}>
        {profile_image ? (
          <View style={style.Dp}>
            {load && (
              <ActivityIndicator
                size="large"
                color={Colors.Main}
                style={GlobalStyle.ImageLoad}
              />
            )}
            <Image
              onLoadEnd={() => setLoad(false)}
              style={[
                GlobalStyle.Image,
                {
                  borderRadius: 12,
                },
              ]}
              source={{uri: profile_image}}
            />
          </View>
        ) : (
          <Image
            style={style.Dp}
            source={require('../../../../../assets/image/noImage.png')}
          />
        )}

        <View>
          <Heading text={user_name} style={style.name} />
          <SubHead text={about} style={style.userName} />
        </View>
      </View>
      <SubHead
        text={moment(created_at).format('Do-MMM-Y')}
        style={style.userName}
      />
    </AniPress>
  );
};

export default OtherBitsCard;
