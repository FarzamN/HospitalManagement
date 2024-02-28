import React from 'react';
import {styles} from './style';
import RnModal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {PERSONAL_SHIFT, ROLE_ID, USER_DETAILS} from '../redux/reducer/Holder';
import {useNavigation} from '@react-navigation/native';
import {logout_api} from '../redux/actions/AuthActions';
import {View, FlatList} from 'react-native';
import {AdminMenu, FacMenu, StaffMenu} from '../Constants/Data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabCard from './TabCard';
import {Heading} from '../components';

const Modal = ({visible, onClose}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const staff = userDetails.role_id == '1';
  const admin = userDetails.role_id == '2';
  const facility = userDetails.role_id == '3';

  const onSubmit = async ele => {
    onClose();
    if (ele.nav == 'out') {
      dispatch(logout_api());
      await AsyncStorage.removeItem('userDetails');
      dispatch({type: USER_DETAILS, payload: null});
      await AsyncStorage.removeItem('role_id');
      dispatch({type: ROLE_ID, payload: null});
      dispatch({type: PERSONAL_SHIFT, payload: []});
    } else if (ele.nav == 'terms' || ele.nav == 'privacy') {
      navigation.navigate('term', {type: ele.title});
    } else if (ele.nav == 'manageMember') {
      navigation.navigate('manageMember', {name: ele.name});
    } else {
      navigation.navigate(ele.nav);
    }
  };

  const menu = () => {
    if (staff) {
      return StaffMenu;
    } else if (admin) {
      return AdminMenu;
    } else if (facility) {
      return FacMenu;
    }
  };
  return (
    <RnModal
      testID="modal"
      propagateSwipe
      isVisible={visible}
      statusBarTranslucent
      swipeDirection="down"
      backdropOpacity={0.7}
      animationIn="slideInUp"
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modalStyling}
      animationOut="slideOutDown">
      <View style={styles.ModalContainer}>
        <FlatList
          data={menu()}
          scrollEnabled
          numColumns={3}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, i) => i.toString()}
          contentContainerStyle={{alignSelf: 'center'}}
          ListHeaderComponent={<Heading style={styles.Heading} text="Menu" />}
          renderItem={({item}) => (
            <TabCard data={item} onPress={() => onSubmit(item)} />
          )}
        />
      </View>
    </RnModal>
  );
};

export default Modal;
