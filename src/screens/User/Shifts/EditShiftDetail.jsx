import {ScrollView} from 'react-native';
import React from 'react';
import {CustomButton, Header,Background} from '../../../components';
import SInput from './SInput';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import {useForm} from 'react-hook-form';
import Validation from '../../../components/Validation';

const EditShiftDetail = ({navigation, route}) => {
  const {item, index, setLocalDetail} = route.params;

  const onSubmit = data => {
    if (index || index == 0) {
      setLocalDetail(prev => {
        prev[index] = data;
        return [...prev];
      })
    } else {
      setLocalDetail(prev => [...prev, data])
    }
      reset();
      navigation.goBack()
  };
  const {
    reset,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'all'});
  return (
    <Background>
      <Header back title="Edit Shift Detail" gap />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={GlobalStyle.Padding}>
        <SInput
          name="subject"
          title="Subject"
          control={control}
          placeholder="Subject"
          defaultValue={item?.subject}
          rules={{
            required: 'Subject is required',
            minLength: {
              value: 8,
              message: 'Subject too short (minimum length is 8)',
            },
          }}
        />
        <Validation visible={errors.subject} title={errors?.subject?.message} />

        <SInput
          des
          name="detail"
          title="Detail"
          control={control}
          placeholder="Detail"
          defaultValue={item?.detail}
          rules={{
            required: 'Detail is required',
            minLength: {
              value: 100,
              message: 'minimum length is 100',
            },
          }}
        />
        <Validation visible={errors.detail} title={errors?.detail?.message} />
        <CustomButton
          title="Submit"
          marginTop={20}
          onPress={handleSubmit(onSubmit)}
        />
      </ScrollView>
    </Background>
  );
};

export default EditShiftDetail;
