import {View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {GlobalStyle} from '../../../../../Constants/GlobalStyle';
import {Background, CustomButton, Header} from '../../../../../components';
import {Multi} from '../../../../../Constants/Data';
import {useForm} from 'react-hook-form';
import SInput from '../../SInput';
import {useDispatch} from 'react-redux';
import Validation from '../../../../../components/Validation';
import {update_role_permissions} from '../../../../../redux/actions/UserAction';
import CustomDropdown from '../../../../../components/CustomDropdown/CustomDropdown';

const EditManageRole = ({navigation, route}) => {
  const {item} = route.params;
  const newData = Multi?.filter(elm =>
    item?.permissions?.add?.includes(elm?.key),
  );
  const newData2 = Multi?.filter(elm =>
    item?.permissions?.view?.includes(elm?.key),
  );
  const newData3 = Multi?.filter(elm =>
    item?.permissions?.update?.includes(elm?.key),
  );
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  console.log(item);
  const [select, setSelect] = useState(false);
  const [selectData, setSelectData] = useState(
    newData?.length > 0 ? newData : [],
  );

  const [select2, setSelect2] = useState(false);
  const [selectData2, setSelectData2] = useState(
    newData2?.length > 0 ? newData2 : [],
  );

  const [select3, setSelect3] = useState(false);
  const [selectData3, setSelectData3] = useState(
    newData3?.length > 0 ? newData3 : [],
  );

  const onUpdate = data => {
    let role_array = {
      add: selectData,
      view: selectData2,
      update: selectData3,
    };
    dispatch(
      update_role_permissions(
        item.key,
        data.name,
        role_array,
        setLoad,
        navigation,
      ),
    );
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'all'});

  const handleCheckBox = elmnt => {
    const findData = selectData?.find(mnt => mnt?.key == elmnt?.key);
    if (findData) {
      const findData = selectData?.filter(mnt => mnt?.key != elmnt?.key);
      setSelectData(findData);
    } else {
      setSelectData(prev => [...prev, elmnt]);
    }
  };
  const handleCheckBox2 = elmnt => {
    const findData = selectData2?.find(mnt => mnt?.key == elmnt?.key);
    if (findData) {
      const findData = selectData2?.filter(mnt => mnt?.key != elmnt?.key);
      setSelectData2(findData);
    } else {
      setSelectData2(prev => [...prev, elmnt]);
    }
  };
  const handleCheckBox3 = elmnt => {
    const findData = selectData3?.find(mnt => mnt?.key == elmnt?.key);
    if (findData) {
      const findData = selectData3?.filter(mnt => mnt?.key != elmnt?.key);
      setSelectData3(findData);
    } else {
      setSelectData3(prev => [...prev, elmnt]);
    }
  };

  return (
    <Background>
      <Header back title={`Update ${item?.value}`} gap />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={GlobalStyle.Padding}>
          <SInput
            value={item?.value}
            defaultValue={item?.value}
            name="name"
            title="Role Name"
            control={control}
            placeholder="Role Name"
            rules={{
              required: 'Role Nama is required',
            }}
          />
          <Validation visible={errors.name} title={errors?.name?.message} />

          <CustomDropdown
            Heading="Add"
            data={Multi}
            boxPress={handleCheckBox}
            setSelectData={setSelectData}
            selectData={selectData}
            setSelect={setSelect}
            select={select}
            label="All Adds"
          />

          <CustomDropdown
            Heading="View"
            data={Multi}
            boxPress={handleCheckBox2}
            setSelectData={setSelectData2}
            selectData={selectData2}
            setSelect={setSelect2}
            select={select2}
            label="All Viewed"
          />

          <CustomDropdown
            Heading="Update"
            label="All Updates"
            data={Multi}
            boxPress={handleCheckBox3}
            setSelectData={setSelectData3}
            selectData={selectData3}
            setSelect={setSelect3}
            select={select3}
          />

          {/* <MultiDropdown
            defaultOption={defaultSelectedArray}
            data={Multi}
            Heading="Add"
            label="All Adds"
            setSelected={val => setSelectedAdd(val)}
          /> */}
          {/* <MultiDropdown
            data={Multi}
            Heading="View"
            label="All Viewed"
            setSelected={val => setSelectedView(val)}
            defaultOption={isPermissions(item?.permissions.view)}
          /> */}
          {/* <MultiDropdown
            data={Multi}
            Heading="Update"
            label="All Updates"
            setSelected={val => setSelectedUpdate(val)}
            defaultOption={isPermissions(item?.permissions.update)}
          /> */}
          <CustomButton
            title="Update"
            loader={load}
            onPress={handleSubmit(onUpdate)}
            style={{marginBottom: 10, height: 50}}
          />
        </View>
      </ScrollView>
    </Background>
  );
};

export default EditManageRole;
