import React, {useState} from 'react';
import {View} from 'react-native';
import SInput from '../SInput';
import Validation from '../../../../components/Validation';
import {useForm} from 'react-hook-form';
import {CustomButton, Loader, MultiDropdown} from '../../../../components';
import {Multi} from '../../../../Constants/Data';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import {stole_role_permissions} from '../../../../redux/actions/UserAction';
import {useDispatch} from 'react-redux';

const CreateNewRole = () => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const [selectedAdd, setSelectedAdd] = useState([]);
  const [selectedView, setSelectedView] = useState([]);
  const [selectedUpdate, setSelectedUpdate] = useState([]);

  const onSubmit = data => {
    let role_array = {
      add: selectedAdd,
      view: selectedView,
      update: selectedUpdate,
    };
    dispatch(stole_role_permissions(data.name, role_array, setLoad));
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'all'});

  return (
    <View>
      <SInput
        name="name"
        title="Role Name"
        control={control}
        placeholder="Role Name"
        rules={{
          required: 'Role Nama is required',
        }}
      />
      <Validation visible={errors.name} title={errors?.name?.message} />

      <MultiDropdown
        data={Multi}
        Heading="Add"
        label="All Adds"
        setSelected={val => setSelectedAdd(val)}
      />

      <MultiDropdown
        data={Multi}
        Heading="View"
        label="All Viewed"
        setSelected={val => setSelectedView(val)}
      />

      <MultiDropdown
        data={Multi}
        Heading="Update"
        label="All Updates"
        setSelected={val => setSelectedUpdate(val)}
      />

      <View style={GlobalStyle.Height} />
      <CustomButton title="Submit" onPress={handleSubmit(onSubmit)} />
      <View style={GlobalStyle.endHeight} />

      <Loader visible={load} />
    </View>
  );
};

export default CreateNewRole;
