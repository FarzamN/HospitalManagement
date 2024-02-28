import {useEffect, useState} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import React from 'react';
import {
  Background,
  Empty,
  Header,
  Skeleton,
  SubHead,
} from '../../../components';
import FavJobCard from './FavJobCard';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import {useDispatch, useSelector} from 'react-redux';
import {bookmark_api, fav_job_api} from '../../../redux/actions/UserAction';
import { Colors } from '../../../utils/Colors';

const FavJob = ({navigation}) => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.get_fav_job);
  const [load, setLoad] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fav_job_api(setLoad));
  }, []);

  const handleBookMark = item => {
   
    dispatch(bookmark_api(item.shift_id, setLoad , typeCard="favJob"));
  };
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fav_job_api(setLoad));
    setRefreshing(false);
  }
  const onDetail = item => {
    navigation.navigate('detail', {item, type: 'no'});
  };
  return (
    <Background>
      <Header title="Favorite Jobs" back gap />
      {load ? (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      ) : (
        <FlatList
          data={data}
          renderItem={({item}) => (
            <FavJobCard
              data={item}
              onPress={() => onDetail(item)}
              onBookMark={() => handleBookMark(item)}
            /> 
          )}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Empty title="Don't have any Favorite Job" />}
          ListHeaderComponent={() => (
            <View style={[GlobalStyle.Space_Between, GlobalStyle.Padding]}>
              <SubHead bold text="All Result" />
              <SubHead
                text={`${data.length} Favorite found`}
                style={{color: '#696969'}}
              />
            </View>
          )}
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

export default FavJob;
