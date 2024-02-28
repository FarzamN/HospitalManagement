import {View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import style from '../style';
import {SubHead} from '../../Texts';
import {useForm} from 'react-hook-form';
import SInput from '../../../screens/User/Shifts/SInput';
import Validation from '../../Validation';
import {CustomButton} from '../../Button';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {Colors} from '../../../utils/Colors';
import {create_service} from '../../../redux/actions/UserAction';
import {useDispatch} from 'react-redux';

const ManageServiceModal = ({visible, onClose}) => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const onSubmit = data => {
    dispatch(create_service(data, onClose, setLoad));
    setLoad(true);
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'all'});
  return (
    <Modal
      isVisible={visible}
      animationIn={'flash'}
      animationOut={'fadeOut'}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}>
      <View style={[style.contentContainerStyle, {width: '100%'}]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={GlobalStyle.Padding}>
          <View style={GlobalStyle.Space_Between}>
            <SubHead bold text="Add New Service" />
            <Icon
              name="closecircle"
              onPress={onClose}
              type={IconType.AntDesign}
              color={Colors.LightGrey}
            />
          </View>
          <SInput
            name="name"
            title="Name of Service"
            control={control}
            placeholder="Name of Service"
            rules={{
              required: 'name is required',
            }}
          />
          <Validation visible={errors.name} title={errors?.name?.message} />
          <SInput
            name="detail"
            title="service Department"
            control={control}
            placeholder="Service Department"
            rules={{
              required: 'Department is required',
            }}
          />
          <Validation visible={errors.detail} title={errors?.detail?.message} />
          <SInput
            name="amount"
            title="Hourly Rates"
            keyboardType={'numeric'}
            control={control}
            placeholder="Hourly Rates"
            rules={{
              required: 'Amount is Required',
            }}
          />
          <Validation visible={errors.amount} title={errors?.amount?.message} />

          <CustomButton
            title="submit"
            marginTop={20}
            loader={load}
            onPress={handleSubmit(onSubmit)}
          />
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ManageServiceModal;
