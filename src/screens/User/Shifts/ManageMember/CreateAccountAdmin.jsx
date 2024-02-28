import React, {useState} from 'react';
import {View, ScrollView, Image, TouchableOpacity} from 'react-native';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import SInput from '../SInput';
import style from './style';
import {
  Background,
  Error,
  Header,
  ImagePickerModal,
} from '../../../../components';
import {useForm} from 'react-hook-form';
import {Colors} from '../../../../utils/Colors';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {CustomButton, Dropdown} from '../../../../components';
import {EmailRegix} from '../../../../utils/url';
import Validation from '../../../../components/Validation';
import {useImagePicker} from '../../../../hooks';
import {useDispatch, useSelector} from 'react-redux';
import {
  adminAddNewAdmin,
  adminAddNewStaff,
} from '../../../../redux/actions/UserAction';

const CreateAccountAdmin = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {name} = route.params;
  const staff_type = useSelector(state => state.staff_type);

  const isFac = name == 'Facility';
  const [title, setTitle] = useState('');
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState(null);

  const [role, setRole] = useState(null);
  const get_admin_role = useSelector(state => state.get_admin_role);

  const {cameraLaunch, galleryLaunch, image, picker, setPicker} =
    useImagePicker();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'all'});

  const onSubmit = data => {
    if (image === null) {
      setError(true);
      setErrMsg('Please select image');
      setTimeout(() => {
        setError(false);
      }, 2000);
    } else if (name == 'Admin' && role === null) {
      setError(true);
      setErrMsg('Please a role');
      setTimeout(() => {
        setError(false);
      }, 2000);
    } else {
      if (name == 'Admin') {
        dispatch(
          adminAddNewAdmin(
            data,
            image,
            title,
            name,
            role,
            setLoader,
            setError,
            setErrMsg,
            navigation,
          ),
        );
      } else {
        dispatch(
          adminAddNewStaff(
            data,
            image,
            title,
            name,
            setLoader,
            setError,
            setErrMsg,
            navigation,
          ),
        );
      }
    }
  };
  // const onSubmit = data => {
  //   if (image !== null) {
  //     if (name == 'Admin') {
  //       dispatch(
  //         adminAddNewAdmin(
  //           data,
  //           image,
  //           title,
  //           name,
  //           role,
  //           setLoader,
  //           setError,
  //           setErrMsg,
  //           navigation,
  //         ),
  //       );
  //     } else {
  //       dispatch(
  //         adminAddNewStaff(
  //           data,
  //           image,
  //           title,
  //           name,
  //           setLoader,
  //           setError,
  //           setErrMsg,
  //           navigation,
  //         ),
  //       );
  //     }
  //   } else if (name === 'Admin' && role !== null) {
  //     setError(true);
  //     setErrMsg('Please a role');
  //     setTimeout(() => {
  //       setError(false);
  //     }, 2000);

  //   } else {

  //   }
  // };

  return (
    <Background>
      <Header back title={`Add new ${name}`} gap />
      <ScrollView
        style={GlobalStyle.Padding}
        showsVerticalScrollIndicator={false}>
        <View style={style.ImageBox}>
          <Image
            resizeMode="contain"
            source={image || require('../../../../assets/image/noImage.png')}
            style={[
              GlobalStyle.Image,
              {backgroundColor: '#A8D5E4', borderRadius: 365},
            ]}
          />
          <TouchableOpacity
            onPress={() => setPicker(true)}
            style={style.EditBox}>
            <Icon
              size={20}
              name="camera"
              color={Colors.Purple}
              type={IconType.Entypo}
            />
          </TouchableOpacity>
        </View>

        <SInput
          name="f_name"
          control={control}
          placeholder={
            isFac ? 'Name of Facility' : name == 'Staff' ? 'First name' : 'Name'
          }
          rules={{
            required: `${
              isFac
                ? 'Name of Facility'
                : name == 'Staff'
                ? 'First name'
                : 'Name'
            } is Required`,
          }}
        />
        <Validation visible={errors.f_name} title={errors?.f_name?.message} />

        {name != 'Staff' ? null : (
          <>
            <SInput
              name="l_name"
              control={control}
              placeholder="Last name"
              rules={{
                required: 'required',
              }}
            />
            <Validation
              visible={errors.l_name}
              title={errors?.l_name?.message}
            />
          </>
        )}

        <SInput
          control={control}
          placeholder={isFac ? 'Email of facility.' : 'Email'}
          name="email"
          keyboardType="email-address"
          rules={{
            required: 'Email is required',
            pattern: {
              value: EmailRegix,
              message: 'Email is not valid',
            },
          }}
        />
        <Validation visible={errors.email} title={errors?.email?.message} />
        <SInput
          control={control}
          keyboardType="numeric"
          name="phone"
          rules={{
            required: 'Phone Number is required',
            minLength: {
              value: 8,
              message: 'Phone Number too short (minimum length is 8)',
            },
            maxLength: {
              value: 16,
              message: 'Phone Number too long (maximum length is 16)',
            },
          }}
          placeholder="Phone Number"
        />
        <Validation
          visible={errors.phone}
          white
          title={errors?.phone?.message}
        />
        <SInput
          name="password"
          control={control}
          placeholder="Password"
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password too short (minimum length is 8)',
            },
            maxLength: {
              value: 16,
              message: 'Password too long (maximum length is 16)',
            },
          }}
        />
        <Validation
          visible={errors.password}
          title={errors?.password?.message}
        />
        {/* </>
        )} */}
        {/* {isFac && (
          <>
            <SInput
              name="nameContact"
              control={control}
              placeholder="Name of Contact"
              rules={{
                required: 'required',
              }}
            />
            <Validation
              visible={errors.nameContact}
              title={errors?.nameContact?.message}
            />
          </>
        )} */}
        {/*  */}
        {name != 'Admin' && (
          <Dropdown
            Heading={'Account Type'}
            placeholder="Account Type"
            items={staff_type}
            value={title}
            setValue={value => setTitle(value)}
          />
        )}

        {name != 'Admin' && (
          <>
            <SInput
              name="address_one"
              control={control}
              placeholder="address line 1"
              rules={{
                required: 'required',
              }}
            />
            <Validation
              visible={errors.acc_type}
              title={errors?.acc_type?.message}
            />
            <SInput
              name="address_two"
              control={control}
              placeholder="address line 2"
              rules={{
                required: 'required',
              }}
            />
            <Validation
              visible={errors.acc_type}
              title={errors?.acc_type?.message}
            />

            <SInput
              name="country"
              control={control}
              placeholder="Country"
              rules={{
                required: 'Country is required!',
              }}
            />
            <Validation visible={errors.city} title={errors?.city?.message} />
            <SInput
              name="zip"
              control={control}
              placeholder="Zip code"
              keyboardType={'number-pad'}
              rules={{
                required: 'required',
              }}
            />
            <Validation visible={errors.zip} title={errors?.zip?.message} />
            <SInput
              small
              name="state"
              control={control}
              placeholder="State"
              rules={{
                required: 'required',
              }}
            />
          </>
        )}
        {name == 'Admin' && (
          <Dropdown
            Heading="Select Role"
            placeholder="Select Role"
            items={get_admin_role}
            value={role}
            setValue={value => setRole(value)}
          />
        )}
        <CustomButton
          loader={loader}
          onPress={handleSubmit(onSubmit)}
          title="Create New Account"
          style={{height: 50, marginBottom: 10}}
        />
      </ScrollView>
      <ImagePickerModal
        isVisible={picker}
        PressCamera={cameraLaunch}
        PressPicture={galleryLaunch}
        onClose={() => setPicker(false)}
      />
      <Error message={errMsg} visible={error} />
    </Background>
  );
};

export default CreateAccountAdmin;
