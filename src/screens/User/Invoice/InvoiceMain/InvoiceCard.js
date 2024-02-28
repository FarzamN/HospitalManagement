import {View, Image, Text} from 'react-native';
import React from 'react';
import style from './style';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import {Colors} from '../../../../utils/Colors';
import {useButtonAnimation} from '../../../../hooks';
import {useNavigation} from '@react-navigation/native';

const InvoiceCard = ({data, i}) => {
  const nav = useNavigation();
  const {due_date, total_amount, status, user, amount} = data;
  const {AniPress, handlePressIn, handlePressOut, scaleValue} =
    useButtonAnimation();

  const handleInvoice = () => {
    nav.navigate('SingleInvoice', {id: data.id, invoice_by: data.invoice_by});
  };
 
  return (
    <AniPress
      onPress={handleInvoice}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        style.CardContainer,
        GlobalStyle.Space_Between,
        {marginTop: i === 0 ? 15 : 0, transform: [{scale: scaleValue}]},
      ]}>
      <View style={[GlobalStyle.Row, {width: '65%'}]}>
        <Image
          style={[GlobalStyle.ProfileImage, {marginRight: 10}]}
          source={
            user?.profile_image
              ? {uri: user?.profile_image}
              : require('../../../../assets/image/noImage.png')
          }
        />
        <View>
          <Text numberOfLines={1} style={style.CardName}>
            {(user?.name || user?.facility_name) ?? 'No Name'}
          </Text>
          <Text style={style.CardDate}>{due_date}</Text>
        </View>
      </View>
      <View>
        <Text
          style={[
            style.CardPaid,
            {
              color:
                status === 'Paid'
                  ? Colors.Success
                  : status === 'Pending'
                  ? Colors.Blue
                  : '#B82828',
            },
          ]}>
          {status}
        </Text>
        <Text style={style.CardPrice}>{`$${Number(
          total_amount || amount,
        ).toFixed(2)}`}</Text>
      </View>
    </AniPress>
  );
};

export default InvoiceCard;
