import {FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  Background,
  Empty,
  ShiftsHeader,
  Skeleton,
} from '../../../../components';
import ShiftDetailCard from './ShiftDetailCard';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import BottomTab from '../../../../navigation/BottomTab';
import ShiftSwitch from '../ShiftSwitch';
import {useDispatch, useSelector} from 'react-redux';
import {
  completed_shift_api,
  pending_shift_api,
} from '../../../../redux/actions/UserAction';

const Shift = ({navigation}) => {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(1);
  const [load, setLoad] = useState(true);
  const val = index == 1;
  const get_pending_shift = useSelector(state => state.get_pending_shift);
  const get_completed_shift = useSelector(state => state.get_completed_shift);

  const onDetail = item => {
    navigation.navigate('detail', {item, type: 'no'});
  };
  const onMessage = item => {
    navigation.navigate('chat', {id: item.facility_id, role: item.facility.role_id});
  };

  useEffect(() => {
    dispatch(pending_shift_api(setLoad));
    dispatch(completed_shift_api(setLoad));
  }, []);

  return (
    <>
      <Background>
        <ShiftsHeader title="Shifts" />
        <ShiftSwitch
          index={index}
          setIndex={setIndex}
          LeftText="Recent Shifts"
          rightText="Completed Shifts"
        />
        {load ? (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={GlobalStyle.Padding}
            data={val ? get_pending_shift : get_completed_shift}
            ListEmptyComponent={() => (
              <Empty title={`No ${val ? 'Recent' : 'Completed'} Shift`} />
            )}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({item}) => (
              <ShiftDetailCard
                message
                data={item}
                onMessage={() => onMessage(item)}
                onDetailPress={() => onDetail(item)}
              />
            )}
          />
        )}
      </Background>
      <BottomTab shift />
    </>
  );
};

export default Shift;
