import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {Header, Empty, Background, Skeleton} from '../../../../components';
import NotificationCard from './NotificationCard';
import {useDispatch, useSelector} from 'react-redux';
import {
  get_notification_data,
  read_notification,
} from '../../../../redux/actions/UserAction';
import {Colors} from '../../../../utils/Colors';

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.notification);

  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(get_notification_data(setLoad));
  }, []);

  const handleRead = item => {
    dispatch(read_notification(item.id, setLoad));
  };

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(get_notification_data(setLoad));
    setRefreshing(false);
  };
  return (
    <Background>
      <Header back title="Notification" gap />
      {load ? (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      ) : (
        <FlatList
          data={notification}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({item}) => (
            <NotificationCard data={item} onPress={() => handleRead(item)} />
          )}
          ListEmptyComponent={<Empty title="No Notification to Show" />}
          refreshControl={
            <RefreshControl
              onRefresh={onRefresh}
              refreshing={refreshing}
              colors={[Colors.Purple, Colors.Main]}
              tintColor={Colors.Main}
              progressBackgroundColor={Colors.OTPContainer}
            />
          }
        />
      )}
    </Background>
  );
};

export default Notification;
