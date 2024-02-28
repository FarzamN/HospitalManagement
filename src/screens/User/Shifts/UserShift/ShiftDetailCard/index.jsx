import React, { useState } from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import style from './style';
import {GlobalStyle} from '../../../../../Constants/GlobalStyle';
import ImageIndicator from '../../../../../components/Items/ImageIndicator';

const ShiftDetailCard = ({
  data,
  onDetailPress,
  boost,
  onBoost,
  message,
  onMessage,
  index,
  noDetail,
}) => {
  const {
    title,
    total_service_amount,
    description,
    opening_date,
    start_time,
    Complete,
    profile_image,
    facility,
  } = data;
  const [load, setLoad] = useState(true);

  return (
    <View style={[style.Container, {marginTop: index == 0 ? 10 : 0}]}>
      <View style={GlobalStyle.Space_Between}>
        <View style={[GlobalStyle.Row, style.FirstBox]}>
          <View style={style.ImageBox}>
          <ImageIndicator visible={load} />
            <Image
              style={GlobalStyle.Image}
              onLoadEnd={() => setLoad(false)}
              source={
                profile_image
                  ? {uri: profile_image}
                  : facility?.profile_image
                  ? {uri: facility?.profile_image}
                  : require('../../../../../assets/image/noImage.png')
              }
            />
          </View>
          <View>
            <Text numberOfLines={2} style={style.bigTitle}>
              {title}
            </Text>
            <Text numberOfLines={1} style={style.facilityName}>
              {facility?.facility_name}
            </Text>
          </View>
        </View>
        <View>
        <Text style={style.price}>
          ${Number(total_service_amount).toFixed(2)}
        </Text>
        <Text style={style.Estprice}>
            Est Amount
        </Text>
        </View>
      </View>
      <View style={style.line} />
      <Text style={[style.detail]}>{description}</Text>
      <View style={[GlobalStyle.Space_Between, style.BottomView]}>
        <View>
          <View style={GlobalStyle.Row}>
            <Text style={style.dateKey}>Shift Date</Text>
            <Text style={style.dates}>{opening_date}</Text>
          </View>
          <View style={GlobalStyle.Row}>
            <Text style={style.dateKey}>Shift Timing</Text>
            <Text style={style.dates}>{start_time}</Text>
          </View>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          {!noDetail && (
            <TouchableOpacity onPress={onDetailPress}>
              <Text style={style.detailText}>Details</Text>
            </TouchableOpacity>
          )}
          {boost ? (
            <TouchableOpacity onPress={onBoost}>
              <Text style={style.detailText}>Boost your job</Text>
            </TouchableOpacity>
          )  : null}
        </View>
      </View>
      {Complete && (
        <View style={style.CompleteBox}>
          <Text style={style.Completed}>Completed</Text>
        </View>
      )}
    </View>
  );
};

export default ShiftDetailCard;
