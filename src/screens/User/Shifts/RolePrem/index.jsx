import {ScrollView} from 'react-native';
import React, {useState} from 'react';
import BottomTab from '../../../../navigation/BottomTab';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import ShiftSwitch from '../ShiftSwitch';
import {
  Background,
  DeleteRoleCard,
  ManageRoleCard,
  ShiftsHeader,
  SmallSkeleton,
} from '../../../../components';
import CreateNewRole from './CreateNewRole';
import ManageModal from './EditManageRole';
import {SwipeListView} from 'react-native-swipe-list-view';

import {useDispatch, useSelector} from 'react-redux';
import {delete_role_api} from '../../../../redux/actions/UserAction';

const RoleNPrem = ({navigation}) => {
  const dispatch = useDispatch();

  const [index, setIndex] = useState(1);
  const [show, setShow] = useState({visible: false, item: null});
  const get_admin_role = useSelector(state => state.get_admin_role);
  const [load, setLoad] = useState(false);

  const handleDelete = item => {
    dispatch(delete_role_api(item, setLoad));
  };
  return (
    <Background>
      <ShiftsHeader title="Roles & Permissions" />
      <ShiftSwitch
        index={index}
        setIndex={setIndex}
        rightText="Manager Role"
        LeftText="Create new Role"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={GlobalStyle.Padding}>
        {index == 1 ? (
          <CreateNewRole />
        ) : (
          <>
            {load ? (
              <>
                <SmallSkeleton />
                <SmallSkeleton />
                <SmallSkeleton />
              </>
            ) : (
              <SwipeListView
              leftOpenValue={55}
                nestedScrollEnabled
                scrollEnabled={false}
                data={get_admin_role}
                keyExtractor={(_, i) => i.toString()}
                renderItem={({item}) => (
                  <ManageRoleCard
                    data={item}
                    // onPress={() => setShow({visible: true, item})}
                    onPress={() => navigation.navigate('editRole', {item})}
                  />
                )}
                renderHiddenItem={({item}) => (
                  <DeleteRoleCard onPress={() => handleDelete(item)} />
                )}
              />
            )}
          </>
        )}
      </ScrollView>
      <BottomTab shift />
      {/* <ManageModal
        item={show.item}
        visible={show.visible}
        onClose={() => setShow({visible: false})}
      /> */}
    </Background>
  );
};

export default RoleNPrem;
