import {
  View,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {
  Background,
  CustomButton,
  Error,
  Header,
  ImagePickerModal,
  SubHead,
} from '../../../../components';
import {Active} from '../../../../Constants/Data';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {Colors} from '../../../../utils/Colors';
import SInput from '../SInput';
import {useForm} from 'react-hook-form';
import Validation from '../../../../components/Validation';
import {useDispatch} from 'react-redux';
import {
  adminEditAdmin,
  adminEditStaff,
} from '../../../../redux/actions/UserAction';
import {useImagePicker} from '../../../../hooks';

const EditMember = ({navigation, route}) => {
  const {item, name} = route.params;
  const dispatch = useDispatch();

  const checkstats = item?.role_id == 3 ? item?.account_status : item?.status;
  const [select, setSelect] = useState(checkstats == 'Inactive' ? 2 : 1);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const {
    cameraLaunch,
    galleryLaunch,
    image,
    picker,
    setPicker,
    requestCameraPermission,
  } = useImagePicker();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'all',
    defaultValues: {
      f_name: item?.first_name
        ? item?.first_name
        : item?.facility_name
        ? item?.facility_name
        : item?.name,
      l_name: item?.last_name ? item?.last_name : item?.last_name,
      phone: item?.phone ? item?.phone : item?.phone_number,
    },
  });

  const onSubmit = data => {
    if (name == 'Admin') {
      dispatch(
        adminEditAdmin(
          item,
          data,
          select,
          name,
          image,
          setLoader,
          setError,
          setErrMsg,
          navigation,
        ),
      );
    } else if (name == 'Staff') {
      dispatch(
        adminEditStaff(
          item,
          data,
          select,
          name,
          image,
          setLoader,
          setError,
          setErrMsg,
          navigation,
        ),
      );
    } else if (name == 'Facility') {
      const hourlyRated = Object.entries(data)
        .filter(([key]) => !['f_name', 'l_name', 'phone'].includes(key))
        .map(([type, amount]) => ({type, amount}));

      dispatch(
        adminEditStaff(
          item,
          data,
          select,
          name,
          image,
          setLoader,
          setError,
          setErrMsg,
          navigation,
          hourlyRated,
        ),
      );
    }
  };

  return (
    <Background>
      <Header back gap title={`Edit ${name}`} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={GlobalStyle.Padding}>
          <View style={styles.ImageBox}>
            <Image
              resizeMode="contain"
              source={{uri: image?.uri ? image?.uri : item?.profile_image}}
              style={[
                GlobalStyle.Image,
                {backgroundColor: '#A8D5E4', borderRadius: 365},
              ]}
            />
            <TouchableOpacity
              onPress={requestCameraPermission}
              style={styles.EditBox}>
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
              name == 'Facility'
                ? 'Facility name'
                : name == 'Staff'
                ? 'First name'
                : 'Name'
            }
            rules={{
              required: 'required',
            }}
          />
          <Validation visible={errors.title} title={errors?.title?.message} />
          {name == 'Staff' && (
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
          {name == 'Facility' && (
            <>
              <SubHead style={{marginTop: 10}} text="Platform fee" />
              <SInput
                noHeading
                control={control}
                MainRestyle={{marginTop: 0}}
                name={'platform_fee'}
                keyboardType="numeric"
                defaultValue={item.platform_fee}
                rules={{
                  required: 'Platform fee is required',
                }}
                placeholder={'Platform fee'}
              />
              <Validation
                visible={errors.platform_fee}
                white
                title={errors?.platform_fee?.message}
              />
              {item?.hourly_rate?.map((ele, i) => {
                return (
                  <View key={i.toString()}>
                    <SubHead style={{marginTop: 10}} text={ele.type} />
                    <SInput
                      noHeading
                      control={control}
                      MainRestyle={{marginTop: 0}}
                      name={ele.type}
                      keyboardType="numeric"
                      defaultValue={ele.amount}
                      rules={{
                        required: 'required',
                      }}
                      placeholder={ele.amount}
                    />
                  </View>
                );
              })}
            </>
          )}
          <View style={[GlobalStyle.Space_Between, {marginVertical: 10}]}>
            {Active.map(item => (
              <Pressable
                android_ripple={GlobalStyle.Ripple}
                style={[GlobalStyle.Row, {overflow: 'hidden'}]}
                key={item.id.toString()}
                onPress={() => setSelect(item.id)}>
                <SubHead
                  bold
                  style={{marginHorizontal: 10, fontSize: 16.6}}
                  text={item.name}
                />
                <Icon
                  name={
                    item.id == select
                      ? 'radio-button-checked'
                      : 'radio-button-off'
                  }
                  color={item.id == select ? Colors.Success : 'red'}
                  size={20}
                  type={IconType.MaterialIcons}
                />
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      <ImagePickerModal
        isVisible={picker}
        PressCamera={cameraLaunch}
        PressPicture={galleryLaunch}
        onClose={() => setPicker(false)}
      />
      <Error message={errMsg} visible={error} />

      <CustomButton
        loader={loader}
        onPress={handleSubmit(onSubmit)}
        title="Confirm"
        style={{height: 50, width: '90%', marginBottom: 10}}
      />
    </Background>
  );
};

const styles = StyleSheet.create({
  ImageBox: {
    width: 130,
    height: 130,
    borderWidth: 2,
    borderRadius: 365,
    alignSelf: 'center',
    borderColor: Colors.Main,
  },
  EditBox: {
    right: 10,
    bottom: -5,
    padding: 5,
    zIndex: 99,
    borderWidth: 1,
    borderRadius: 100,
    position: 'absolute',
    borderColor: Colors.Purple,
    backgroundColor: Colors.White,
  },
});

export default EditMember;
