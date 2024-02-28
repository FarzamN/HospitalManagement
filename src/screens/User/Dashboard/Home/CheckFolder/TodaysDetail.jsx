import React, {useState, useEffect} from 'react';
import {StatusBar, View, useWindowDimensions} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';
import {
  Background,
  CustomButton,
  Header,
  HospitalHeader,
  Loader,
} from '../../../../../components';
import {Colors} from '../../../../../utils/Colors';
import {GlobalStyle} from '../../../../../Constants/GlobalStyle';
import renderTabBar from '../../../Shifts/Detail/renderTabBar';
import SendBids from '../../../Shifts/Detail/Tabs/SendBids';
import Job from '../../../Shifts/Detail/Tabs/Job';
import {check_job_status} from '../../../../../redux/actions/UserAction';
import {useDispatch} from 'react-redux';

const TodaysDetail = ({navigation, route}) => {
  const {item} = route.params;
  const dispatch = useDispatch();
  const {facility, job_status , shift_id ,id} = item;
  const {profile_image, facility_name, country} = facility;

  const [load, setLoad] = useState(false);
  const [status, _] = useState(
    job_status !== 'CheckIn' ? 'CheckIn' : 'CheckOut',
  );
  const FirstRoute = () => <SendBids item={item} />;
  const SecRoute = () => <Job item={item} />;
  const renderScene = SceneMap({
    First: FirstRoute,
    Second: SecRoute,
  });

  const {width} = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    {key: 'First', title: 'Bids'},
    {key: 'Second', title: 'Job'},
  ]);

  useEffect(() => {
    setRoutes([
      {key: 'First', title: 'Bids'},
      {key: 'Second', title: 'Job'},
    ]);
  }, []);
  const handleCheck = () => {
    dispatch(check_job_status(status, shift_id , navigation, setLoad));
    // setStatus(status !== "CheckIn" ? "CheckIn" : "CheckOut");
  };

  const big = () => {
    const sp = status.split("");
    sp.splice(5, 0, ' ');
    return sp;
  };
  return (
    <Background>
      <Header back gap title="Today's shift" />
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
        <CustomButton
          style={{marginBottom: 10}}
          title={big()}
          onPress={handleCheck}
          textRestyle={{textTransform: 'none'}}
        />
      </View>
      <Loader visible={load} />
    </Background>
  );
};

export default TodaysDetail;
