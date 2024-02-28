import {FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';

import {Empty, SmallSkeleton} from '../../../../../components';
import ViewBitModal from './ViewBitModal';
import {useNavigation} from '@react-navigation/native';
import MemberBitCard from './MemberBitCard';
import {useDispatch, useSelector} from 'react-redux';
import {
  BitStaffAction,
  view_bits,
} from '../../../../../redux/actions/UserAction';

const StaffMemberBits = ({item}) => {
  const {id} = item;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const get_bit_data = useSelector(state => state.get_bit_data);
  const [load, setLoad] = useState(true);
  const [showBitsModal, setShowBitsModal] = useState({
    visible: false,
    item: null,
  });
  const onAccept = ele => {
    BitStaffAction(
      id,
      'Accept',
      ele.user_id,
      item,
      showBitsModal.visible,
      setShowBitsModal,
      navigation,
    );
  };
  const onDec = ele => {
    BitStaffAction(
      id,
      'Decline',
      ele.user_id,
      item,
      showBitsModal.visible,
      null,
      navigation,
    );
  };

  const onView = ele => {
    setShowBitsModal({visible: true, item: ele});
  };
  const onProfile = ele => {
    navigation.navigate('otherProfile', {id: ele.user_id, role: ele.role_id});
  };

  useEffect(() => {
    dispatch(view_bits(id, setLoad));
  }, []);

  return load ? (
    <>
      <SmallSkeleton />
      <SmallSkeleton />
      <SmallSkeleton />
    </>
  ) : (
    <>
      <FlatList
        data={get_bit_data}
        keyExtractor={(_, id) => id.toString()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => <Empty title="No Bits yet" />}
        renderItem={({item: ele, index}) => (
          <MemberBitCard
            data={ele}
            index={index}
            onProfile={() => onProfile(ele)}
            onPress={() => onView(ele)}
          />
        )}
      />

      <ViewBitModal
        item={showBitsModal.item}
        visible={showBitsModal.visible}
        onDec={() => onDec(showBitsModal.item)}
        onPress={() => onAccept(showBitsModal.item)}
        onClose={() => setShowBitsModal({visible: false})}
      />
    </>
  );
};

export default StaffMemberBits;
