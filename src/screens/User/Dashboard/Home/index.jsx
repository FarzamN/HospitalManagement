import React, {useEffect, useState} from 'react';
import ShiftCards from './ShiftCards';
import DashboardCard from './DashboardCard';
import {Colors} from '../../../../utils/Colors';
import {
  StatusBar,
  ScrollView,
  View,
  FlatList,
  RefreshControl,
} from 'react-native';
import {
  DashboardHeader,
  Empty,
  ShowMore,
  Background,
  SmallSkeleton,
} from '../../../../components';
import BottomTab from '../../../../navigation/BottomTab';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import Awards from './Awards';
import {useDispatch, useSelector} from 'react-redux';
import Graph from './Graph';
import moment from 'moment';
import SButton from '../../Shifts/SButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  admin_dashboard_api,
  checkStatus,
  get_personal_shift,
  graph_api,
  notification_count,
  todays_shift,
  upcoming_shift_api,
  user_dashboard_api,
} from '../../../../redux/actions/UserAction';
import {useNavigation} from '@react-navigation/native';
import PostedShiftCard from './PostedShiftCard';
import {useAppStatus} from '../../../../hooks';
import CheckSystem from './CheckFolder/CheckSystem';

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {appStateVisible} = useAppStatus();

  const ts = useSelector(state => state.get_todays_shift);
  const userDetails = useSelector(state => state.userDetails);
  const upcoming_shift = useSelector(state => state.get_upcoming_shift);
  const personal_shift = useSelector(state => state.personal_shift);

  console.log("In list ========" ,personal_shift)

  const [showDate, setShowDate] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [date, setDate] = useState('');
  const staff = userDetails.role_id == '1';
  const admin = userDetails.role_id == '2';
  const facility = userDetails.role_id == '3';

  const handleDate = date => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setDate(formattedDate);
    setShowDate(false);
  };

  useEffect(() => {
    checkStatus(appStateVisible);
  }, [appStateVisible]);

  useEffect(() => {
    if (staff) {
      dispatch(upcoming_shift_api(setLoad));
      dispatch(todays_shift(setLoad));
    } else if (facility) {
      dispatch(get_personal_shift(setLoad));
    }else if (admin) {
      dispatch(admin_dashboard_api(date));
    }
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    checkStatus(appStateVisible);
    if (staff) {
      dispatch(upcoming_shift_api(setLoad));
      dispatch(todays_shift(setLoad));
      dispatch(user_dashboard_api());
    } else if (facility) {
      dispatch(user_dashboard_api());
      dispatch(get_personal_shift(setLoad));
    }  else if (admin) {
      dispatch(graph_api(date, setLoad));
      dispatch(admin_dashboard_api(date));
    }
    setRefreshing(false);
  };
  useEffect(() => {
    dispatch(notification_count());
    StatusBar.setBackgroundColor(Colors.White);
    StatusBar.setBarStyle('dark-content');
  }, [StatusBar]);
  
  return (
    <Background>
      <DashboardHeader greet icon />
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={refreshing}
            colors={[Colors.Purple]}
            tintColor={Colors.Main}
            progressBackgroundColor={Colors.OTPContainer}
          />
        }
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        style={[GlobalStyle.Trans_Container, GlobalStyle.Padding]}>
        {admin ? (
          <View style={GlobalStyle.Space_Between}>
            <View />
            <SButton
              onPress={() => setShowDate(true)}
              placeHolder={date || 'Select Date'}
            />
          </View>
        ) : staff ? (
          <Awards />
        ) : null}

        {staff && (
          <>
            {load ? (
              <SmallSkeleton invoice full />
            ) : (
              <>{ts.length > 0 && <CheckSystem />}</>
            )}
          </>
        )}

        <DashboardCard income={'$1500'} />
        {admin ? (
          <Graph date={date}/>
        ) : (
          <>
            <ShowMore
              mb={8}
              more="See More"
              text={`${staff ? 'Upcoming' : 'Posted'} Shifts`}
              onPress={() => navigation.navigate('allUpcomingShift')}
              hide={upcoming_shift.length > 5 || personal_shift.length > 5}
            />
            {load ? (
              <>
                <SmallSkeleton invoice full />
                <SmallSkeleton invoice full />
                <SmallSkeleton invoice full />
              </>
            ) : (
              <FlatList
                nestedScrollEnabled
                scrollEnabled={false}
      
                data={staff ? upcoming_shift : personal_shift}
                ListEmptyComponent={() => (
                  <Empty
                    mt="0%"
                    title={`No ${staff ? 'Upcoming' : 'Posted'} shift`}
                  />
                )}
                keyExtractor={(_, i) => i.toString()}
                renderItem={({item, index}) => {
                  return staff
                    ? index <= 3 && (
                        <ShiftCards
                          data={item}
                          onPress={() =>
                            navigation.navigate('detail', {item, type: 'no' , screen:"dashboard"})
                          }
                        />
                      )
                    : index <= 3 && (
                        <PostedShiftCard
                          data={item}
                          onPress={() =>
                            navigation.navigate('listShiftDetail', {item})
                          }
                        />
                      );
                }}
              />
            )}
          </>
        )}
        <View style={GlobalStyle.Vertical_Space} />
      </ScrollView>
      <BottomTab home />
      <DateTimePickerModal
        themeVariant="light"
        isVisible={showDate}
        mode="date"
        onConfirm={date => handleDate(date)}
        onCancel={() => setShowDate(false)}
      />
    </Background>
  );
};

export default Home;
