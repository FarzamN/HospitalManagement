import Job from './Tabs/Job';
import SendBids from './Tabs/SendBids';
import {
  Background,
  Complete,
  CustomButton,
  Header,
  HospitalHeader,
  SimpleButton,
} from '../../../../components';
import React, {useState, useEffect} from 'react';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import {TabView, SceneMap} from 'react-native-tab-view';
import {StatusBar, View, useWindowDimensions} from 'react-native';
import renderTabBar from './renderTabBar';
import {Colors} from '../../../../utils/Colors';

const Detail = ({navigation, route}) => {
  const {item, type, screenBefore} = route.params;
  const {profile_image, facility_name, country} = item.facility;

  const FirstRoute = () => <SendBids item={item} />;
  const SecRoute = () => <Job item={item} />;
  const renderScene = SceneMap({
    First: FirstRoute,
    Second: SecRoute,
  });

  const {width} = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    {key: 'First', title: 'Bids Detail'},
    {key: 'Second', title: 'Job Detail'},
  ]);

  useEffect(() => {
    setRoutes([
      {key: 'First', title: 'Bids Detail'},
      {key: 'Second', title: 'Job Detail'},
    ]);
  }, []);

  const handleBits = () => {
    navigation.navigate('placeBits', {item});
  };
  const handleViewBits = () => navigation.navigate('viewBits', {item});

  return (
    <Background>
      {screenBefore == "searchPage"?
      (<Header back title="Detail" gap screen="searchPage"/>)
      :(<Header back title="Detail" gap screen="other"/>)}
      <StatusBar backgroundColor={Colors.White} />
      <View style={[GlobalStyle.Padding, GlobalStyle.Trans_Container]}>
        <HospitalHeader
          source={{uri: profile_image}}
          hName={facility_name}
          location={country}
        />
        <TabView
          initialLayout={width}
          onIndexChange={setIndex}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          navigationState={{index, routes}}
        />
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            display: type == 'no' ? 'none' : 'flex',
          }}>
          <CustomButton title="Bid for  Shift" onPress={handleBits} />

          <SimpleButton
            onPress={handleViewBits}
            mv={10}
            title="View other Bits"
            textStyle={{
              color: Colors.placeholderTextColor,
            }}
          />
        </View>
      </View>
    </Background>
  );
};

export default Detail;
