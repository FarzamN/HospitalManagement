import {View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Background,
  Empty,
  Header,
  HospitalHeader,
  SmallSkeleton,
  SubHead,
} from '../../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {others_bits} from '../../../../redux/actions/UserAction';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import OtherBitsCard from '../ListShiftDetail/ListTabs/OtherBitsCard';

const ViewBits = ({navigation, route}) => {
  const {item} = route.params;
  const {id, facility} = item;
  const {profile_image, facility_name, country} = facility;

  const dispatch = useDispatch();
  const [load, setLoad] = useState(true);
  const get_others_bits = useSelector(state => state.get_others_bits);
  useEffect(() => {
    dispatch(others_bits(id, setLoad));
  }, []);

  return (
    <Background>
      <Header back title="View Other Bits" gap />
      <HospitalHeader
        source={{uri: profile_image}}
        hName={facility_name}
        location={country}
      />
      <View style={GlobalStyle.Vertical_Space} />
      <View style={GlobalStyle.Vertical_Space} />
      {load ? (
        <>
          <SmallSkeleton />
          <SmallSkeleton />
          <SmallSkeleton />
        </>
      ) : (
        <FlatList
          data={get_others_bits}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={GlobalStyle.Padding}
          keyExtractor={(_, i) => i.toString()}
          ListEmptyComponent={() => <Empty title="No bits found" />}
          ListHeaderComponent={() => (
            <View style={GlobalStyle.Space_Between}>
              <SubHead bold text="All Result" />
              <SubHead
                text={`${get_others_bits.length} bits found`}
                style={{color: '#696969'}}
              />
            </View>
          )}
          renderItem={({item, index}) => {
            return (
              <OtherBitsCard
                data={item}
                index={index}
                onPress={() =>
                  navigation.navigate('otherProfile', {
                    id: item.user_id,
                    role: item.role_id,
                  })
                }
              />
            );
          }}
        />
      )}
    </Background>
  );
};

export default ViewBits;
