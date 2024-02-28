import React, {useState, useEffect} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import ShiftDetailCard from '../UserShift/ShiftDetailCard';
import {Background, Empty, Header, Skeleton} from '../../../../components';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import {useDispatch, useSelector} from 'react-redux';
import {get_personal_shift} from '../../../../redux/actions/UserAction';
import { Colors } from '../../../../utils/Colors';

const ListedShift = ({navigation}) => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const personal_shift = useSelector(state => state.personal_shift);

  useEffect(() => {
    dispatch(get_personal_shift(setLoad));
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(get_personal_shift(setLoad));
    setRefreshing(false);
  };
  return (
    <Background>
      <Header back title="Listed Shift" gap />
      {load ? (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      ) : (
        <FlatList
          data={personal_shift}
          showsVerticalScrollIndicator={false}
          key={(_, i) => i.toString()}
          renderItem={({item, index}) => {
            return (
              <ShiftDetailCard
                data={item}
                index={index}
                boost={item.boost_status == 'No'}
                onBoost={() => navigation.navigate('boostAfterPost',{id: item.id})}
                onDetailPress={() =>
                  navigation.navigate('listShiftDetail', {item})
                }
              />
            );
          }}
          ListEmptyComponent={() => <Empty title="No Posted shift" />}
          contentContainerStyle={GlobalStyle.Padding}
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

export default ListedShift;
