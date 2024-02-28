import React, {useState, useEffect} from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import {
  Background,
  Empty,
  Header,
  SmallSkeleton,
  SubHead,
} from '../../../../components';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import ManageCard from './ManageCard';
import AddMemberModal from './AddMemberModal';
import {useDispatch, useSelector} from 'react-redux';
import {get_manage_staff_api} from '../../../../redux/actions/UserAction';
import {Colors} from '../../../../utils/Colors';

const ManageMember = ({navigation, route}) => {
  const {name} = route.params;
  const dispatch = useDispatch();
  const get_manage = useSelector(state => state.get_manage_staff);
  const userDetails = useSelector(state => state.userDetails);
  const hasAdd = userDetails.permissions.add.includes(name);
  const hasView = userDetails.permissions.view.includes(name);
  const hasUpdate = userDetails.permissions.update.includes(name);

  const staff = name == 'Staff';
  const facility = name == 'Facility';
  const admin = name == 'Admin';

  const [load, setLoad] = useState(true);
  const [show, setShow] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(get_manage_staff_api(name, setLoad));
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(get_manage_staff_api(name, setLoad));
    setRefreshing(false);
  };
  const isAdminPermission = hasAdd || hasView || hasUpdate;
  return (
    <Background>
      <Header
        back
        bold
        fontSize={13}
        bTitle={`Add ${name}`}
        title={`Manage ${name}`}
        gap={!hasAdd}
        manage={hasAdd}
        onPress={() => navigation.navigate('createAccountAdmin', {name})}
      />
      {isAdminPermission ? (
        <>
          <View style={[GlobalStyle.Space_Between, GlobalStyle.Padding]}>
            <SubHead bold text="All Result" />
            <SubHead
              text={`${load ? '0' : `${get_manage.length}`} ${name} member`}
              style={{color: '#696969'}}
            />
          </View>
          {load ? (
            <>
              <SmallSkeleton />
              <SmallSkeleton />
              <SmallSkeleton />
            </>
          ) : (
            <FlatList
              data={get_manage}
              renderItem={({item, index}) => (
                <ManageCard
                  data={item}
                  index={index}
                  name={
                    staff
                      ? item.first_name + ' ' + item.last_name
                      : facility
                      ? item.facility_name
                      : item.name
                  }
                  onPress={() => {
                    if (hasUpdate) {
                      navigation.navigate('editMember', {item, name});
                    } else {
                      alert("You don't have permission to edit members");
                    }
                  }}
                />
              )}
              keyExtractor={item => item.id.toString()}
              ListEmptyComponent={() => <Empty />}
              showsVerticalScrollIndicator={false}
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
        <Empty title={`You don't have\npermission to View\n${name} page`} />
      )}

      <AddMemberModal
        item={name}
        visible={show}
        onClose={() => setShow(false)}
      />
    </Background>
  );
};

export default ManageMember;
