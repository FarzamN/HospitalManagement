import {ScrollView} from 'react-native';
import React from 'react';
import {CustomButton, Header,Background} from '../../../components';
import {useForm} from 'react-hook-form';
import {STORE_jOB_DETAIL} from '../../../redux/reducer/Holder';
import SInput from './SInput';
import Validation from '../../../components/Validation';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import {useDispatch} from 'react-redux';

const AddShiftDetail = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {item, index} = route.params;

  const {
    reset,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'all'});

  const onSubmit = data => {
    if (index || index == 0) {
      dispatch({
        type: STORE_jOB_DETAIL,
        payload: state => {
          state.store_job_detail[index] = data;
          return [...state.store_job_detail];
        },
      });
    } else {
      dispatch({
        type: STORE_jOB_DETAIL,
        payload: state => [...state.store_job_detail, data],
      });
    }
    reset();
    navigation.goBack();
  };

  return (
    <Background>
      <Header back title="Add Shift Detail" gap />

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
              value: 20,
              message: 'minimum length is 20',
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

export default AddShiftDetail;
