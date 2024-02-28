import {View, TextInput, FlatList, RefreshControl} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Background, Empty, Header} from '../../../../components';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {Colors} from '../../../../utils/Colors';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import style from '../../Dashboard/Home/style';
import InBoxCard from './InBoxCard';
import {get_inbox_api} from '../../../../redux/actions/UserAction';
import {useDispatch, useSelector} from 'react-redux';
import SmallSkeleton from '../../../../components/Skeletons/SmallSkeleton';

const ChatInbox = ({navigation}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const get_inbox = useSelector(state => state.get_inbox);
  const toLowerCaseIfDefined = str => (str ? str.toLowerCase() : '');
  const fieldsToFilter = ['name', 'facility_status', 'message', 'status'];
  const filteredData = get_inbox?.filter(item =>
    fieldsToFilter.some(field =>
      toLowerCaseIfDefined(item[field]).includes(value.toLowerCase()),
    ),
  );

  useEffect(() => {
    dispatch(get_inbox_api(setLoad));
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(get_inbox_api(setLoad));
    setRefreshing(false);
  };

  return (
    <Background>
      <Header back title="Messages" gap />
      <View style={[GlobalStyle.Row, style.SearchBox]}>
        <TextInput
          value={value}
          style={style.Input}
          placeholder="Search Contact name"
          onChangeText={text => setValue(text)}
          placeholderTextColor={Colors.placeholderTextColor}
        />
        <Icon
          name="search"
          color={Colors.placeholderTextColor}
          size={20}
          type={IconType.Ionicons}
        />
      </View>
      {load ? (
        <>
          <SmallSkeleton invoice />
          <SmallSkeleton invoice />
          <SmallSkeleton invoice />
        </>
      ) : (
        <FlatList
          data={filteredData}
          key={(_, i) => i.toString()}
          renderItem={({item, index}) => (
            <InBoxCard data={item} i={index} />
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Empty title="No Chat found" />}
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

export default ChatInbox;
