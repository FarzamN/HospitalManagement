import {FlatList, RefreshControl} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Background, Header, SmallSkeleton} from '../../../../../components';
import {todays_shift} from '../../../../../redux/actions/UserAction';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import CheckCards from './CheckCards';
import { Colors } from '../../../../../utils/Colors';

const AllTodaysShift = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const ts = useSelector(state => state.get_todays_shift);

  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(todays_shift(setLoad));
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(todays_shift(setLoad));
    setRefreshing(false);
  };
  return (
    <Background>
      <Header back title="Your today's shift" gap />

      {load ? (
        <>
          <SmallSkeleton />
          <SmallSkeleton />
          <SmallSkeleton />
        </>
      ) : (
        <FlatList
          data={ts}
          nestedScrollEnabled
          scrollEnabled={false}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({item}) => (
            <CheckCards
              data={item}
              onPress={() => navigation.navigate('todaysDetail', {item})}
            />
          )}
          refreshControl={
            <RefreshControl
              onRefresh={onRefresh}
              refreshing={refreshing}
              tintColor={Colors.Main}
              colors={[Colors.Purple]}
              progressBackgroundColor={Colors.OTPContainer}
            />
          }
        />
      )}
    </Background>
  );
};

export default AllTodaysShift;
