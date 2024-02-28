import {State} from 'country-state-city';
import {style} from '../SelectCountry/style';
import {Colors} from '../../../utils/Colors';
import React, {useState, useEffect} from 'react';
import {StatusBar, FlatList, TextInput} from 'react-native';
import {
  Empty,
  Header,
  CheckButton,
  CustomButton,
  Background
} from '../../../components';
import { useSelector } from 'react-redux';

const SelectState = ({navigation, route}) => {
  const {get, code,val} = route.params;
  const userDetail = useSelector(state => state.userDetails);

  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  const [select, setSelect] = useState(userDetail?.country_code ||val || null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedStates = await State.getStatesOfCountry(code?.isoCode);
        setData(fetchedStates);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };
    fetchData();
  }, [code?.isoCode]);

  const onSubmit = () => {
    get(select);
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
      <Header title="Select State" gap back />
      {code ? (
        <>
          <TextInput
            value={value}
            style={style.Input}
            placeholder="Search State"
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
                  name={item.name}
                  focus={select === item.name}
                  onPress={() => setSelect(item.name)}
                />
              );
            }}
          />
           <CustomButton
            onPress={onSubmit}
            title={select ? `Continue with ${select}` : 'Select'}
            style={[style.btnStyle, {display: select ? 'flex' : 'none'}]}
          />
        </>
      ) : (
        <Empty title="Select Country First" />
      )}
    </Background>
  );
};

export default SelectState;
