import { ScrollView, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import style from './style';
import JobsDetail from './JobsDetail';
import { useDispatch, useSelector } from 'react-redux';
import DetailSkeleton from '../../../../../../components/Skeletons/DetailSkeleton';
import { single_shift_api } from '../../../../../../redux/actions/UserAction';

const Job = ({item}) => {
  const {id, shift_id} = item;

  const dispatch = useDispatch();
  const [load, setLoad] = useState(true);
  const get_single_shift = useSelector(state => state.get_single_shift);
  const {description, fee_platform, job_details,title , service_amount, state , country} = get_single_shift;

  const theID =  shift_id ? shift_id : id

  useEffect(() => {
    dispatch(single_shift_api(theID, setLoad));
  }, []);

  return load ? (
    <DetailSkeleton  />
  ) : (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={style.ProjectText}>Estimated Amount: ${Number(service_amount).toFixed(2)}/hr</Text>
        <Text style={style.detail}>Location: {state}, {country}</Text>
        <Text style={style.detail}>Description: {description}</Text>
        <Text style={style.Facility}>Job detail</Text>

        {job_details?.map((item, index) => (
          <JobsDetail key={index.toString()} data={item} />
        ))}
      </ScrollView>
    </>
  );
};

export default Job;
