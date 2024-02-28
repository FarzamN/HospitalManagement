import React, {useState, useEffect} from 'react';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import {TabView, SceneMap} from 'react-native-tab-view';
import {View, useWindowDimensions} from 'react-native';
import renderTabBar from '../Detail/renderTabBar';
import ListShiftsTab from './ListTabs/ListShiftsTab';
import StaffMemberBits from './ListTabs/StaffMemberBits';
import {
  AwAlert,
  Background,
  Header,
  HospitalHeader,
} from '../../../../components';
import {useDispatch} from 'react-redux';
import {
  delete_shift_api,
  single_shift_api,
} from '../../../../redux/actions/UserAction';
import {FloatingAction} from 'react-native-floating-action';
import {Colors} from '../../../../utils/Colors';
import {EditOrDelete} from '../../../../Constants/Data';

const ListShiftDetail = ({navigation, route}) => {
  const {item} = route.params;
  const {id, profile_image, facility_name, country} = item;

  console.log("item data ===========" , item)

  const dispatch = useDispatch();
  const FirstRoute = () => <ListShiftsTab item={item} />;
  const SecRoute = () => <StaffMemberBits item={item} />;

  const renderScene = SceneMap({
    First: FirstRoute,
    Second: SecRoute,
  });
  const [load, setLoad] = useState(true);
  const [showDelete, setShowDelete] = useState(false);

  const {width} = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    {key: 'First', title: 'Shift Details'},
    {key: 'Second', title: 'Staff member Bits'},
  ]);

  useEffect(() => {
    setRoutes([
      {key: 'First', title: 'Shift Details'},
      {key: 'Second', title: 'Staff Bits'},
    ]);
  }, []);

  useEffect(() => {
    dispatch(single_shift_api(id, setLoad));
  }, []);

  const onEdit = name => {
    if (name == 'edit') {
      navigation.navigate('editShift', {item});
    } else if (name == 'delete') {
      setShowDelete(true);
    }
  };

  const onClose = () => setShowDelete(false);
  const onConfirmDetail = () => {
    dispatch(delete_shift_api(id, onClose, navigation, setLoad));
  };
  return (
    <Background>
      <Header back title="Detail" gap onPress={onEdit} />
      <View style={[GlobalStyle.Padding, GlobalStyle.Trans_Container]}>
        <HospitalHeader
          source={{uri: profile_image}}
          hName={facility_name}
          location={country}
        />
        <TabView
          initialLayout={{width}}
          onIndexChange={setIndex}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          navigationState={{index, routes}}
          swipeEnabled={true}
        />
      </View>
      <FloatingAction
        iconWidth={27}
        visible={index == 0 && !load}
        iconHeight={26}
        animated={false}
        color={Colors.Purple}
        actions={EditOrDelete}
        overlayColor="rgba(0,0,0,0.8)"
        onPressItem={name => onEdit(name)}
        floatingIcon={require('../../../../assets/image/Floats/menu.png')}
      />
      <AwAlert
        onClose={onClose}
        confirmColor="red"
        visible={showDelete}
        cancelText="No, Thanks"
        confirmText="Yes, Delete"
        onPress={onConfirmDetail}
        cancelColor={Colors.Success}
        title={'Sure You wanna delete this Shift..?'}
      />
    </Background>
  );
};

export default ListShiftDetail;
