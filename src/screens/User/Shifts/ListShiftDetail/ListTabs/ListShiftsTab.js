import {ScrollView, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import style from '../style';
import JobsDetail from '../../Detail/Tabs/Job/JobsDetail';
import {CustomButton, DetailSkeleton} from '../../../../../components';
import {GlobalStyle} from '../../../../../Constants/GlobalStyle';
import {useDispatch, useSelector} from 'react-redux';
import {single_shift_api} from '../../../../../redux/actions/UserAction';
import {useNavigation} from '@react-navigation/native';

const ListShiftsTab = ({item}) => {
  const {id} = item;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [load, setLoad] = useState(true);
  const get_single_shift = useSelector(state => state.get_single_shift);
  const {description, boost_fee, job_details , service_amount , fee_platform , total_service_amount , total_hour} = get_single_shift;


  let PlatformFee = (total_service_amount * fee_platform/100)
 

  useEffect(() => {
    dispatch(single_shift_api(id, setLoad));
  }, []);
  const onBoost = () => navigation.navigate('boostAfterPost', {id});

  return load ? (
    <DetailSkeleton />
  ) : (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={style.ProjectText}>Rate: ${service_amount}/hr</Text>
        <Text style={style.ProjectText}>Boost Charges: ${boost_fee}</Text>
        <Text style={style.ProjectText}>Est Fee: ${PlatformFee}</Text>
        <Text style={style.ProjectText}>Est Hours: ${total_hour}</Text>
        <Text style={style.detail}>{description}</Text>
        <Text style={style.Facility}>Job Detail</Text>

        {job_details?.map((item, index) => (
          <JobsDetail key={index.toString()} data={item} />
        ))}
      </ScrollView>
      <CustomButton title="Boost your shift" onPress={onBoost} />
      <View style={GlobalStyle.Vertical_Space} />
    </>
  );
};

export default ListShiftsTab;
