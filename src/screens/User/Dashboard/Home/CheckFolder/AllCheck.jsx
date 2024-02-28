import { FlatList, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Background,
  Empty,
  Header,
  SmallSkeleton,
} from '../../../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {get_all_check_api} from '../../../../../redux/actions/UserAction';
import {Colors} from '../../../../../utils/Colors';
import AllCheckCards from './AllCheckCards';

const AllCheck = () => {
  const dispatch = useDispatch();
  const get_all_check = useSelector(state => state.get_all_check);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(get_all_check_api(setLoad));
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(get_all_check_api(setLoad));
    setRefreshing(false);
  };
  return (
    <Background>
      <Header back title="All Check In/Out" gap />
      {load ? (
        <>
          <SmallSkeleton />
          <SmallSkeleton />
          <SmallSkeleton />
        </>
      ) : (
        <FlatList
          data={get_all_check}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({item, index}) => <AllCheckCards data={item} i={index}/>}
          ListEmptyComponent={<Empty title="No Check In/Out for today" />}
          refreshControl={
            <RefreshControl
              onRefresh={onRefresh}
              refreshing={refreshing}
              colors={[Colors.Purple]}
              tintColor={Colors.Main}
              progressBackgroundColor={Colors.OTPContainer}
            />
          }
        />
      )}
    </Background>
  );
};

export default AllCheck;
