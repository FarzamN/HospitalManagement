import React, {useState, useEffect} from 'react';
import ShiftCards from './Home/ShiftCards';
import {FlatList, RefreshControl} from 'react-native';

import {GlobalStyle} from '../../../Constants/GlobalStyle';
import {Background, Empty, Header} from '../../../components';
import {
  get_personal_shift,
  upcoming_shift_api,
} from '../../../redux/actions/UserAction';
import {useDispatch, useSelector} from 'react-redux';
import SmallSkeleton from '../../../components/Skeletons/SmallSkeleton';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../../utils/Colors';
import PostedShiftCard from './Home/PostedShiftCard';

const AllUpcomingShift = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userDetails = useSelector(state => state.userDetails);

  const upcoming_shift = useSelector(state => state.get_upcoming_shift);
  const personal_shift = useSelector(state => state.personal_shift);

  const staff = userDetails.role_id == '1';
  const facility = userDetails.role_id == '3';
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (staff) {
      dispatch(upcoming_shift_api(setLoad));
    } else {
      dispatch(get_personal_shift(setLoad));
    }
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    if (staff) {
      dispatch(upcoming_shift_api(setLoad));
    } else {
      dispatch(get_personal_shift(setLoad));
    }
    setRefreshing(false);
  };
  const TheData = () => {
    if (staff) {
      return upcoming_shift;
    } else if (facility) {
      return personal_shift;
    }
  };
  return (
    <Background>
      <Header back title={`${staff ? 'Upcoming' : 'Posted'} Shifts`} gap />
      {load ? (
        <>
          <SmallSkeleton invoice />
          <SmallSkeleton invoice />
          <SmallSkeleton invoice />
        </>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={TheData()}
          contentContainerStyle={GlobalStyle.Padding}
          keyExtractor={(_, index) => index.toString()}
          ListEmptyComponent={() => (
            <Empty
              mt={'40%'}
              title={`No ${staff ? 'Upcoming' : 'Posted'} shift`}
            />
          )}
          renderItem={({item}) => {
            return staff ? (
              <ShiftCards
                data={item}
                onPress={() =>
                  navigation.navigate('detail', {item, type: 'yes'})
                }
              />
            ) : (
              <PostedShiftCard
                data={item}
                onPress={() => navigation.navigate('listShiftDetail', {item})}
              />
            );
          }}
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

export default AllUpcomingShift;
