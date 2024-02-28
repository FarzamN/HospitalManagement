import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Background,
  CustomButton,
  CustomSlider,
  Header,
  Heading,
  SubHead,
} from '../../../../components';
import {boost_after_post} from '../../../../redux/actions/UserAction';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {Colors} from '../../../../utils/Colors';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import SButton from '../SButton';

import Validation from '../../../../components/Validation';
import {Font} from '../../../../utils/font';
import {useDispatch} from 'react-redux';

const BoostAfterPost = ({navigation, route}) => {
  const {id} = route.params;
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState('');

  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const [end, setEnd] = useState('');
  const [start, setStart] = useState('');

  const [startErr, setStartErr] = useState(false);
  const [endErr, setEndErr] = useState(false);

  const [price, setPrice] = useState(0);
  const [priceErr, setPriceErr] = useState(false);

  const handleStart = date => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setStart(formattedDate);
    setShowStart(false);
  };
  const handleEnd = date => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setEnd(formattedDate);
    setShowEnd(false);
  };

  const onSubmit = () => {
    if (start == '') {
      setStartErr(true);
      setMsg('please select Start date');
    } else if (end == '') {
      setEndErr(true);
      setMsg('please select End date');
    } else if (price == 0) {
      setPriceErr(true);
      setMsg('Please price');
    } else {
      dispatch(
        boost_after_post(
          id,
          price,
          start,
          end,
          setLoad,
          setSuccess,
          navigation,
        ),
      );
      setLoad(true);
    }
  };

  useEffect(() => {
    setStartErr(false);
    setEndErr(false);
    setPriceErr(false);
  }, [start, end, price]);
  return (
    <Background>
      <Header back title="Boost Your Job" gap />

      <View style={GlobalStyle.Padding}>
        <View style={GlobalStyle.endHeight} />
        <View style={GlobalStyle.Space_Between}>
          <View style={{width: '100%'}}>
            <View style={GlobalStyle.Space_Between}>
              <SButton
                onPress={() => setShowStart(true)}
                placeHolder={start || 'Select Start date'}
                title="Boost Start date"
              />
              <SButton
                onPress={() => setShowEnd(true)}
                placeHolder={end || 'Select End date'}
                title="Boost End date"
              />
            </View>
          </View>
        </View>
        <Validation visible={startErr} title={msg} />
        <View style={GlobalStyle.Space_Between}>
          <View />
          <Validation visible={endErr} title={msg} />
        </View>
        <View style={GlobalStyle.endHeight} />
        <Heading text={'Total budget'} style={{color: Colors.Grey}} />
        <View style={GlobalStyle.Vertical_Space} />
        <SubHead
          center
          text="This amount is for one day of your starting date"
          style={{color: Colors.Grey, paddingHorizontal: 20}}
        />
        <View style={GlobalStyle.endHeight} />

        <View style={[GlobalStyle.Row, {alignSelf: 'center'}]}>
          <Heading
            text={price || 0}
            style={{
              color: Colors.Grey,
              fontFamily: Font.font700,
              marginRight: 10,
            }}
          />
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
        <Validation visible={priceErr} title={msg} />

        <CustomButton loader={load} title="Boost Your Job" onPress={onSubmit} />
      </View>

      <DateTimePickerModal
        themeVariant="light"
        isVisible={showStart}
        mode="date"
        onConfirm={date => handleStart(date)}
        onCancel={() => setShowStart(false)}
      />
      <DateTimePickerModal
        themeVariant="light"
        isVisible={showEnd}
        mode="date"
        onConfirm={date => handleEnd(date)}
        onCancel={() => setShowEnd(false)}
      />
    </Background>
  );
};

export default BoostAfterPost;
