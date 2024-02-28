import React, { useEffect } from 'react';
import {View, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {ShowMore} from '../../../../../components';
import CheckCards from './CheckCards';
import { useState } from 'react';
import { todays_shift } from '../../../../../redux/actions/UserAction';

const CheckSystem = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const [load, setLoad] = useState(true);
  const ts = useSelector(state => state.get_todays_shift);
  
  useEffect(() => {
    dispatch(todays_shift(setLoad))
  }, [])
  
  return (
    <View style={{marginTop: 10}}>
      <ShowMore
        mb={8}
        more="See More"
        hide={ts.length >= 3}
        text="Your today's shift"
        onPress={() => navigation.navigate('allTodaysShift')}
      />
      <FlatList
        data={ts}
        nestedScrollEnabled
        scrollEnabled={false}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({item, index}) => {
          return index <= 3 && (
            <CheckCards
              data={item}
              onPress={() => navigation.navigate('todaysDetail', {item})}
            />
            
          );
        }}
      />
    </View>
  );
};

export default CheckSystem;
