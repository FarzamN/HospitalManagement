import {
  View,
  Text,
  StatusBar,
  Pressable,
  TextInput,
  FlatList,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import {Colors} from '../../../utils/Colors';
import LinearGradient from 'react-native-linear-gradient';
import style from './style';
import {Background, Empty, Skeleton, SmallSkeleton} from '../../../components';
import UserProfileCard from './UserProfileCard';
import SearchFiler from './SearchFiler';
import {GradientColors as GC} from '../../../utils/GradientColor';
import {useDispatch, useSelector} from 'react-redux';
import {all_job_api, all_users_api} from '../../../redux/actions/UserAction';
import ShiftDetailCard from '../Shifts/UserShift/ShiftDetailCard';

const Search = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.get_all_users);
  const userDetails = useSelector(state => state.userDetails);
  const c_data = useSelector(state => state.get_all_country_data);

  const staff = userDetails.role_id == '1';
  const [load, setLoad] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showFiler, setShowFiler] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onFilter = () => setShowFiler(true);

  const toLowerCaseIfDefined = str => (str ? str?.toLowerCase() : '');
  const fieldsToFilter = [
    'email',
    'type',
    'first_name',
    'last_name',
    'country',
    'state',
  ];
  const filteredData = user?.filter(item =>
    fieldsToFilter.some(field =>
      toLowerCaseIfDefined(item[field]).includes(searchText.toLowerCase()),
    ),
  );

  const staffField = ['title', 'country', 'description', 'opening_date'];
  


  const staff_fd = c_data?.filter(item =>
    staffField.some(field =>
      toLowerCaseIfDefined(item[field]).includes(searchText.toLowerCase()),
    ),
  );
  useEffect(() => {
    StatusBar.setBackgroundColor(GC.lightPink);
    StatusBar.setBarStyle('light-content');
    return () => {
      StatusBar.setBackgroundColor(Colors.White);
      StatusBar.setBarStyle('dark-content');
    };
  }, [StatusBar]);
  useEffect(() => {
    if (staff) {
      dispatch(all_job_api(setLoad));
    } else {
      dispatch(all_users_api(setLoad));
    }
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    if (staff) {
      dispatch(all_job_api(setLoad));
    } else {
      dispatch(all_users_api(setLoad));
    }
    setRefreshing(false);
  };

  const onDetail = item => {
    navigation.navigate('detail', {item, type: 'yes', screen:"searchPage"});
  };
  const onMessage = item => {
    navigation.navigate('chat', {
      id: item.facility_id,
      role: item.facility.role_id,
    });
  };

  return (
    <>
      <SafeAreaView style={{backgroundColor: GC.lightPink}} />
      <Background>
        <LinearGradient
          style={style.HeaderContainer}
          colors={[GC.lightPink, GC.Purple, GC.lightPink]}>
          <View style={GlobalStyle.Space_Between}>
            <Pressable
              android_ripple={GlobalStyle.WhiteRipple}
              onPress={() => navigation.goBack()}
              style={style.BackButton}>
              <Icon
                size={22}
                name="chevron-left"
                color={Colors.White}
                type={IconType.Octicons}
              />
            </Pressable>
            <Text style={style.Text}>Search</Text>
            <View style={{width: 30}} />
          </View>
          <View style={[GlobalStyle.Row, {marginTop: 15}]}>
            <View style={[GlobalStyle.Space_Between, style.InputBox]}>
              <View style={GlobalStyle.Row}>
                <Icon
                  size={22}
                  name="search"
                  color={Colors.Black}
                  type={IconType.Feather}
                />
                <TextInput
                  value={searchText}
                  placeholder="Search"
                  returnKeyType="search"
                  returnKeyLabel="search"
                  style={style.TextInput}
                  onChangeText={setSearchText}
                  placeholderTextColor={Colors.placeholderTextColor}
                />
              </View>
              {searchText && (
                <Pressable
                  onPress={() => {
                    setSearchText('');
                  }}
                  android_ripple={GlobalStyle.RedRipple}>
                  <Icon
                    size={22}
                    name="close"
                    color={Colors.Black}
                    type={IconType.Ionicons}
                  />
                </Pressable>
              )}
            </View>
            {/* <Pressable
              onPress={onFilter}
              android_ripple={GlobalStyle.Ripple}
              style={[GlobalStyle.justify, style.FilterBox]}>
              <Icon
                size={22}
                name="filter"
                color={Colors.Black}
                type={IconType.AntDesign}
              />
            </Pressable> */}
          </View>
        </LinearGradient>
        {load ? (
          <>
            {staff ? (
              <>
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </>
            ) : (
              <>
                <SmallSkeleton />
                <SmallSkeleton />
                <SmallSkeleton />
              </>
            )}
          </>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={staff ? staff_fd : filteredData}
            keyExtractor={(_, i) => i.toString()}
            ListEmptyComponent={
              <Empty title={`No ${staff ? 'Shift' : 'user'} found`} />
            }
            contentContainerStyle={GlobalStyle.Padding}
            renderItem={({item, index}) =>
              staff ? (
                <ShiftDetailCard
                  message
                  data={item}
                  onMessage={() => onMessage(item)}
                  onDetailPress={() => onDetail(item)}
                />
              ) : (
                <UserProfileCard
                  data={item}
                  index={index}
                  onPress={() =>
                    navigation.navigate('otherProfile', {
                      id: item.id,
                      role: item.role_id,
                    })
                  }
                />
              )
            }
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

        <SearchFiler visible={showFiler} onClose={() => setShowFiler(false)} />
      </Background>
    </>
  );
};

export default Search;
