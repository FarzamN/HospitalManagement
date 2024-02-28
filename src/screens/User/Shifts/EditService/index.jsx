import {ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Background, CustomButton, Header} from '../../../../components';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import {useForm} from 'react-hook-form';
import Validation from '../../../../components/Validation';
import SInput from '../SInput';
import {useDispatch} from 'react-redux';
import {edit_service} from '../../../../redux/actions/UserAction';

const EditService = ({route, navigation}) => {
  const {item} = route.params;
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);

  const onSubmit = data => {
    dispatch(edit_service(item, data, setLoad, navigation));
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'all'});
  return (
    <Background>
      <Header back title="Edit Service" gap />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={GlobalStyle.Padding}>
        <SInput
          name="name"
          title="Name of Service"
          defaultValue={item.service_name}
          control={control}
          placeholder="Name of Service"
          rules={{
            required: 'name is required',
          }}
        />
        <Validation visible={errors.name} title={errors?.name?.message} />
        <SInput
          defaultValue={item?.details}
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
          defaultValue={item?.min_amount}
          placeholder="Hourly Rates"
          rules={{
            required: 'Amount is Required',
          }}
        />
        <Validation visible={errors.amount} title={errors?.amount?.message} />

        <CustomButton
          title="Update"
          marginTop={20}
          loader={load}
          onPress={handleSubmit(onSubmit)}
        />
      </ScrollView>
    </Background>
  );
};

export default EditService;
