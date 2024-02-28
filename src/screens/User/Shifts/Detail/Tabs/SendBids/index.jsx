import React, {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {single_shift_api} from '../../../../../../redux/actions/UserAction';
import {GlobalStyle} from '../../../../../../Constants/GlobalStyle';
import SButton from '../../../SButton';
import moment from 'moment';
import {SendBitSkeleton} from '../../../../../../components';

const SendBids = ({item}) => {
  const {id, shift_id} = item;
  const dispatch = useDispatch();
  const [load, setLoad] = useState(true);
  const get_single_shift = useSelector(state => state.get_single_shift);
  const {end_time, start_time, opening_date, updated_at, service_type} =
    get_single_shift;

  const upload = moment(updated_at).format('DD-MMMM-YYYY');
  const opening = moment(opening_date).format('DD-MMMM-YYYY');

  const theID =  shift_id ? shift_id : id

  useEffect(() => {
    dispatch(single_shift_api(theID, setLoad));
  }, []);

  return load ? (
    <SendBitSkeleton />
  ) : (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={GlobalStyle.Space_Between}>
          <SButton
            title="Start time"
            placeHolder={start_time}
            ReStyle={{width: '49%'}}
          />
          <SButton
            title="End time"
            placeHolder={end_time}
            ReStyle={{width: '49%'}}
          />
        </View>
        <SButton
          placeHolder={opening}
          title={'opening date'}
          ReStyle={{width: '100%'}}
        />
        <SButton
          placeHolder={upload}
          title="Job created date"
          ReStyle={{width: '100%'}}
        />
        <SButton
          title="Service type"
          ReStyle={{width: '100%'}}
          placeHolder={service_type}
        />
      </ScrollView>
    </>
  );
};

export default SendBids;
