import style from './style';
import Job from './JobTabs/Job';
import SendBids from './JobTabs/YourBids';
import {Header,Background} from '../../../../components';
import React, {useState, useEffect} from 'react';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import {TabView, SceneMap} from 'react-native-tab-view';
import {View, Text, Image, useWindowDimensions} from 'react-native';
import renderTabBar from '../../Shifts/Detail/renderTabBar';

const Index = () => {
  const hName = 'Massachusetts General Hospital';
  const FirstRoute = () => <SendBids />;
  const SecRoute = () => <Job />;

  const renderScene = SceneMap({
    First: FirstRoute,
    Second: SecRoute,
  });

  const {width} = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    {key: 'First', title: 'Your Bids'},
    {key: 'Second', title: 'Job'},
  ]);

  useEffect(() => {
    setRoutes([
      {key: 'First', title: 'Your Bids'},
      {key: 'Second', title: 'Job'},
    ]);
  }, []);
  return (
    <Background>
      <Header back title="Detail" gap />
      <View style={[GlobalStyle.Padding, GlobalStyle.Trans_Container]}>
        <View style={style.ImageBox}>
          <Image
            resizeMode="contain"
            style={GlobalStyle.Image}
            source={require('../../../../assets/image/Logos/hospitalicon.png')}
          />
        </View>
        <Text style={style.hName}>{hName}</Text>
        <View style={[GlobalStyle.Row, {alignSelf: 'center'}]}>
          <Image
            resizeMode="contain"
            style={style.Location}
            source={require('../../../../assets/image/Logos/location.png')}
          />
          <Text style={style.location}>Los angles</Text>
        </View>
        <TabView
          initialLayout={{width}}
          onIndexChange={setIndex}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          navigationState={{index, routes}}
        />
      </View>
    </Background>
  );
};

export default Index;
