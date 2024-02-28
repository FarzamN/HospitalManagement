import {style} from './style';
import {Colors} from '../../../utils/Colors';
import React, {useState, useEffect} from 'react';
import {Country} from 'country-state-city';
import {
  View,
  FlatList,
  TextInput,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {
  Empty,
  Header,
  CheckButton,
  CustomButton,
  Error,
  Background,
  SmallSkeleton,
} from '../../../components';
import {useSelector} from 'react-redux';

const SelectCountry = ({navigation, route}) => {
  const {cName, val} = route.params;
  const userDetail = useSelector(state => state.userDetails);

  const [data, setData] = useState([]);
  const [select, setSelect] = useState(
    userDetail?.country || val?.name || null,
  );

  const [page, setPage] = useState(30);
  const [value, setValue] = useState('');
  const [loadingMore, setLoadingMore] = useState(false);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let fetchedData = [];
        fetchedData = await Country.getAllCountries();
        const set = new Set();
        fetchedData = fetchedData.filter(item => {
          const duplicate = set.has(item.name);
          set.add(item.name);
          return !duplicate;
        })

        setData(fetchedData);
        setLoad(false);
      } catch (error) {
        console.log(error);
        setLoad(false);
      }
    };
    fetchData();
  }, []);

  const loadMoreData = async () => {
    if (!loadingMore) {
      setLoadingMore(true);
      setTimeout(async () => {
        let newData = [];
        newData = await Country.getAllCountries({page: page + 1});

        if (newData.length > 0) {
          setData([...data, ...newData]);
          setPage(page + 1);
        }
        setLoadingMore(false);
      }, 1000);
    }
  };

  const renderFooter = () =>
    loadingMore ? (
      <View style={style.footer}>
        <ActivityIndicator size="large" color={Colors.Purple} />
      </View>
    ) : null;

  const onSubmit = () => {
    const selectedCountry = data.find(item => item.name === select);
    cName(selectedCountry);
    navigation.goBack();
  };

  const handleSearch = text => {
    const searchTerm = text.toLowerCase();

    const filteredData = data.filter(item =>
      item.name.toLowerCase().includes(searchTerm),
    );

    setValue(text);
    setData(filteredData);
  };

  return (
    <Background>
      <StatusBar backgroundColor={Colors.White} barStyle="dark-content" />
      <Header title="Select Country" gap back />
      {load ? (
        <>
          <SmallSkeleton />
          <SmallSkeleton />
          <SmallSkeleton />
          <SmallSkeleton />
        </>
      ) : (
        <>
          <TextInput
            value={value}
            style={style.Input}
            placeholder="Search"
            cursorColor={Colors.Purple}
            onChangeText={handleSearch}
            selectionColor="rgba(155, 100, 224, 0.5)"
            placeholderTextColor={Colors.placeholderTextColor}
          />
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            ListEmptyComponent={() => <Empty />}
            renderItem={({item}) => {
              return (
                <CheckButton
                  flag={item.flag}
                  name={item.name}
                  focus={select === item.name}
                  onPress={() => setSelect(item.name)}
                />
              );
            }}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
          />
          <CustomButton
            title={select ? `Continue with ${select}` : 'Continue'}
            style={[style.btnStyle, {display: select ? 'flex' : 'none'}]}
            onPress={onSubmit}
          />
        </>
      )}
    </Background>
  );
};

export default SelectCountry;
