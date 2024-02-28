import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import {
  Background,
  CustomButton,
  CustomSlider,
  Header,
  Heading,
  SubHead,
} from '../../../../components';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Colors} from '../../../../utils/Colors';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import moment from 'moment';
import {Font} from '../../../../utils/font';
import SuccessBoost from './SuccessBoost';
import {useDispatch} from 'react-redux';
import {new_shift} from '../../../../redux/actions/UserAction';
import SButton from '../SButton';
import Validation from '../../../../components/Validation';

const Boost = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {data, store_job_detail, state} = route.params;
  console.log(state.month);
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const [end, setEnd] = useState('');
  const [start, setStart] = useState('');

  const [startErr, setStartErr] = useState(false);
  const [endErr, setEndErr] = useState(false);

  const [price, setPrice] = useState(0);
  const [priceErr, setPriceErr] = useState(false);

  const [msg, setMsg] = useState('');

  const [success, setSuccess] = useState(false);
  const [load, setLoad] = useState(false);

  const handleStart = date => {
    const fd = moment(date).format('YYYY-MM-DD');
    setStart(fd);
    setShowStart(false);
  };
  const handleEnd = date => {
    const fd = moment(date).format('YYYY-MM-DD');
    setEnd(fd);
    setShowEnd(false);
  };

  // const onSubmit = () => {
  //   if (start == '') {
  //     setStartErr(true);
  //     setMsg('please select Start date');
  //   } else if (end == '') {
  //     setEndErr(true);
  //     setMsg('please select End date');
  //   } else if (price == 0) {
  //     setPriceErr(true);
  //     setMsg('Please price');
  //   } else {
  //     dispatch(
  //       new_shift(
  //         data,
  //         state,
  //         'Yes',
  //         store_job_detail,
  //         reset,
  //         setLoad,
  //         navigation,
  //         price,
  //         start,
  //         end,
  //       ),
  //     );
  //   }
  // };

  // start should be less than end date
  // start date should be equal to or more then  current date but not greater then state.month
  // end date should be equal to or less then  state.month
  const onSubmit = () => {
    const currentDate = moment().startOf('day');
    const startMoment = moment(start, 'YYYY-MM-DD');
    const endMoment = moment(end, 'YYYY-MM-DD');
    const monthMoment = moment(state.month, 'YYYY-MM-DD');

    if (start === '') {
      setStartErr(true);
      setMsg('Please select the start date.');
    } else if (end === '') {
      setEndErr(true);
      setMsg('Please select the end date.');
    } else if (price === 0) {
      setPriceErr(true);
      setMsg('Please enter the price.');
    } else if (startMoment.isAfter(endMoment)) {
      setStartErr(true);
      setEndErr(true);
      setMsg('Start date cannot be more then end date.');
    } else if (startMoment.isBefore(currentDate)) {
      setStartErr(true);
      setMsg('Start date should be today or later.');
    } else if (startMoment.isAfter(monthMoment)) {
      setStartErr(true);
      setMsg('Start date cannot be after the Opening date.');
    } else if (endMoment.isAfter(monthMoment)) {
      setEndErr(true);
      setMsg('End date cannot be after the Opening date.');
    } else {
      dispatch(
        new_shift(
          data,
          state,
          'Yes',
          store_job_detail,
          reset,
          setLoad,
          navigation,
          price,
          start,
          end,
        ),
      );
    }
  };

  useEffect(() => {
    setStartErr(false);
    setEndErr(false);
    setPriceErr(false);
  }, [start, end, price]);

  const reset = () => console.log('good');
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
            text={`$${price}` || 0}
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
      <SuccessBoost visible={success} onClose={() => setSuccess(false)} />
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

export default Boost;
