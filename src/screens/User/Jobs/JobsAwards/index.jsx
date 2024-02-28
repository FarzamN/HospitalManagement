import {FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import AwardedJobCard from './AwardedJobCard';
import {useDispatch, useSelector} from 'react-redux';
import {RecentJobData} from '../../../../Constants/Data';
import {Header, Background} from '../../../../components';

import {
  upcoming_shift_api,
} from '../../../../redux/actions/UserAction';
const JobAwards = () => {
  
  const upcoming_shift = useSelector(state => state.get_upcoming_shift);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(true);

  const [select, setSelect] = useState([]);


  useEffect(() => {
      dispatch(upcoming_shift_api(setLoad));
  }, []);

  const handleMark = item => {
    select.includes(item.id)
      ? setSelect(select.filter(ele => ele !== item.id))
      : setSelect([...select, item.id]);
  };
  return (
    <Background>
      <Header back title="Jobs Awarded List" gap />
      <FlatList
        data={upcoming_shift}
        renderItem={({item}) => (
          <AwardedJobCard
            data={item}
            focus={select.includes(item.id)}
            onBookMark={() => handleMark(item)}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </Background>
  );
};

export default JobAwards;
