import {Alert, FlatList, RefreshControl} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  Background,
  CreateServiceCard,
  Empty,
  Header,
  ManageServiceModal,
  SmallSkeleton,
} from '../../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../../../utils/Colors';
import {
  get_service_api,
  service_status,
} from '../../../../redux/actions/UserAction'; 

const ManageService = ({navigation}) => {
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails);
  const get_service_data = useSelector(state => state.get_service_data);

  const hasAdd = userDetails.permissions.add.includes('Service');
  const hasView = userDetails.permissions.view.includes('Service');
  const hasUpdate = userDetails.permissions.update.includes('Service');

  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(get_service_api(setLoad));
  }, []);

  const handleStatus = item => {
    dispatch(service_status(item, setLoad));
  };

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(get_service_api(setLoad));
    setRefreshing(false);
  };
  const isAdminPermission = hasAdd || hasView || hasUpdate;

  return (
    <Background>
      <Header
        back
        bold
        gap={!hasAdd}
        manage={hasAdd}
        fontSize={13}
        bTitle="Create New"
        title="Service Type"
        onPress={() => setShow(true)}
      />
      {isAdminPermission ? (
        <>
          {load ? (
            <>
              <SmallSkeleton />
              <SmallSkeleton />
              <SmallSkeleton />
            </>
          ) : (
            <FlatList
              data={get_service_data}
              keyExtractor={(_, i) => i.toString()}
              ListEmptyComponent={<Empty title="No service found" />}
              renderItem={({item, index}) => (
                <CreateServiceCard
                  data={item}
                  i={index}
                  onStatus={() => handleStatus(item)}
                  onPress={() => {
                    !hasUpdate
                      ? navigation.navigate('editService', {item})
                      : Alert.alert(
                          'Permission Denied',
                          "You don't have permission to edit Service",
                        );
                  }}
                />
              )}
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
        </>
      ) : (
        <Empty title={`You don't have\npermission to View\nthis page`} />
      )}
      <ManageServiceModal visible={show} onClose={() => setShow(false)} />
    </Background>
  );
};

export default ManageService;
