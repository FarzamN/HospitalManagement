import {FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Background, Empty, Header, Skeleton} from '../../../../components';
import ShiftDetailCard from '../UserShift/ShiftDetailCard';
import {useDispatch, useSelector} from 'react-redux';
import {get_facility_completed} from '../../../../redux/actions/UserAction';

const FacCompleted = ({navigation}) => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(true);
  const data = useSelector(state => state.get_facility_ongoing);

  useEffect(() => {
    dispatch(get_facility_completed(setLoad));
  }, []);

  const onDetail = item => {
    navigation.navigate('detail', {item, type: 'no'});
  };
  return (
    <Background>
      <Header back gap title="Completed Shift" />
      {load ? (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      ) : (
        <>
          <FlatList
            data={data}
            contentContainerStyle={{padding: 10}}
            keyExtractor={(_, i) => i.toString()}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<Empty title="No Completed Jobs" />}
            renderItem={({item, index}) => (
              <ShiftDetailCard data={item} boost={false} noDetail />
            )}
          />
        </>
      )}
    </Background>
  );
};

export default FacCompleted;
