import {
  View,
  Pressable,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import RecentJobCard from './RecentJobCard';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import {Background, Empty, Skeleton, SubHead} from '../../../../components';
import {Colors} from '../../../../utils/Colors';
import style from './style';
import {GradientColors as GC} from '../../../../utils/GradientColor';
import {bookmark_api, recent_bits} from '../../../../redux/actions/UserAction';
import {useDispatch, useSelector} from 'react-redux';

const RecentJobs = ({navigation}) => {
  const dispatch = useDispatch();
  const get_recent_bits = useSelector(state => state.get_recent_bits);
  const [select, setSelect] = useState([]);
  const [load, setLoad] = useState(false);
  const [searchText, setSearchText] = useState('');

  const toLowerCaseIfDefined = str => (str ? str.toLowerCase() : '');
  const fieldsToFilter = [
    'country',
    'phone_number',
    'facility_name',
    'facility_email',
  ];

  const fd = get_recent_bits?.filter(item =>
    fieldsToFilter.some(field =>
      toLowerCaseIfDefined(item.facility[field]).includes(
        searchText.toLowerCase(),
      ),
    ),
  );

  const handleMark = item => {
    dispatch(bookmark_api(item.shift_id, setLoad));
  };

  useEffect(() => {
    StatusBar.setBackgroundColor(GC.lightPink);
    StatusBar.setBarStyle('light-content');
    return () => {
      StatusBar.setBackgroundColor(Colors.White);
      StatusBar.setBarStyle('dark-content');
    };
  }, []);

  useEffect(() => {
    dispatch(recent_bits(setLoad));
  }, []);
  const onDetail = item => {
    navigation.navigate('detail', {item, type: 'no'});
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
              style={style.BackButton}
              onPress={() => navigation.goBack()}>
              <Icon
                size={22}
                name="chevron-left"
                color={Colors.White}
                type={IconType.Octicons}
              />
            </Pressable>
            <Text style={style.Text}>Applied Shifts</Text>
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
                  placeholderTextColor={Colors.placeholderTextColor}
                  onChangeText={e => setSearchText(e)}
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
          </View>
        </LinearGradient>
        {load ? (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          <FlatList
            data={fd}
            ListEmptyComponent={<Empty title="No recent jobs" />}
            renderItem={({item}) => (
              <RecentJobCard
                data={item}
                onPress={() => onDetail(item)}
                focus={select.includes(item.id)}
                onBookMark={() => handleMark(item)}
              />
            )}
            keyExtractor={item => item.id.toString()}
            ListHeaderComponent={() => (
              <View style={[GlobalStyle.Space_Between, GlobalStyle.Padding]}>
                <SubHead bold text="Search Result" />
                <SubHead
                  text={`${fd.length} jobs found`}
                  style={{color: '#696969'}}
                />
              </View>
            )}
          />
        )}
      </Background>
    </>
  );
};

export default RecentJobs;
