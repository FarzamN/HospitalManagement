import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';

import {style} from './style';
import {
  Background,
  CustomButton,
  CustomSlider,
  Header,
  Heading,
  HospitalHeader,
} from '../../../../components';
import {Colors} from '../../../../utils/Colors';

import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {useForm} from 'react-hook-form';
import Validation from '../../../../components/Validation';
import SInput from '../SInput';
import {place_bit_api} from '../../../../redux/actions/UserAction';

const PlaceBits = ({navigation, route}) => {
  const {item} = route.params;
  const {profile_image, facility_name, country} = item.facility;
  const [price, setPrice] = useState(0);
  const [load, setLoad] = useState(false);
  const [slideError, setSlideError] = useState(false);

  const onSubmit = data => {
    setLoad(true);
    place_bit_api(data, price, item.id, setLoad, navigation);
    // if (price === 0) {
    //   setSlideError(true);
    // } else {
    // }
  };

  // useEffect(() => {
  //   setSlideError(false);
  // }, [price]);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'all'});
  return (
    <Background>
      <Header back title="Place your bit" gap />
      <HospitalHeader
        source={{uri: profile_image}}
        hName={facility_name}
        location={country}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={GlobalStyle.Padding}>
        <View style={GlobalStyle.Vertical_Space} />
        <View style={GlobalStyle.Vertical_Space} />
        {/* <View style={[GlobalStyle.Row, {alignSelf: 'center'}]}>
          <Heading text={`$${price.toFixed(2)}`} style={style.heading} />
          <Icon
            size={30}
            name="pencil"
            color={Colors.Purple}
            type={IconType.MaterialCommunityIcons}
          />
        </View>
        <CustomSlider
          value={price}
          onChange={value => setPrice(parseFloat(value.toFixed(2)))}
        />
        <Validation visible={slideError} title={'Set price to bit this job'} /> */}

        <SInput
          des
          name="des"
          control={control}
          title="Description"
          placeholder="Description "
          rules={{
            required: 'Description is required',
          }}
        />
        <Validation visible={errors.des} title={errors?.des?.message} />

        <CustomButton
          loader={load}
          title="Bit this job"
          onPress={handleSubmit(onSubmit)}
        />
      </ScrollView>
    </Background>
  );
};

export default PlaceBits;
