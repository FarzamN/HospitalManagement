import React, {useState, useEffect} from 'react';
import EditHeader from './EditHeader';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {View, ScrollView} from 'react-native';
import {useImagePicker} from '../../../../hooks';
import Inputs from '../../../../components/Inputs';
import ProfileHeader from '../Profile/ProfileHeader';
import Validation from '../../../../components/Validation';
import {IconType} from 'react-native-dynamic-vector-icons';
import {EmailRegix, NameRegix} from '../../../../utils/url';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import style from '../../../Authentication/Register/style';
import {
  CustomButton,
  Dropdown,
  Error,
  ImagePickerModal,
  Loader,
} from '../../../../components';
import ColorBackground from '../../../../components/Backgrounds/ColorBackground';
import {edit_profile} from '../../../../redux/actions/AuthActions';
import {Colors} from '../../../../utils/Colors';

const EditProfile = ({navigation}) => {
  const dispatch = useDispatch();

  const staff_type = useSelector(state => state.staff_type);
  const userDetails = useSelector(state => state.userDetails);

  const [msg, setMsg] = useState('');
  const [type, setType] = useState('');
  const [cName, setCName] = useState(null);
  const [preCName, setPrevCName] = useState(userDetails.country);
  const [state, setState] = useState(userDetails.state);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const staff = userDetails.role_id == '1'; // staff
  const facility = userDetails.role_id == '3'; // facility
  const admin = userDetails.role_id == '2'; // facility

  const {cameraLaunch, galleryLaunch, image, picker, setPicker} =
    useImagePicker();
  const onCancel = () => navigation.goBack();

  const onSubmit = data => {
    setLoading(true);
    dispatch(
      edit_profile(
        data,
        cName,
        state,
        type,
        image,
        setLoading,
        setError,
        setMsg,
        onCancel,
      ),
    );
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'all'});

  return (
    <ColorBackground>
      <View style={[GlobalStyle.Space_Between, GlobalStyle.Padding]}>
        <EditHeader text="Cancel" onPress={onCancel} />
        <EditHeader text="Save" onPress={handleSubmit(onSubmit)} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader
          name={`${
            userDetails?.facility_name
              ? userDetails?.facility_name
              : userDetails?.name
              ? userDetails?.name
              : userDetails?.first_name + ` ` + userDetails?.last_name
          }`}
          onEdit={() => setPicker(true)}
          image={image ? {uri: image.uri} : {uri: userDetails.profile_image}}
        />

        <View style={GlobalStyle.Padding}>
          {staff ? (
            <>
              <Inputs
                icon
                white
                IconName="user"
                type={IconType.AntDesign}
                control={control}
                defaultValue={userDetails?.first_name}
                name="f_name"
                rules={{
                  required: 'First Name is required',
                  pattern: {
                    value: NameRegix,
                    message: 'Name is not valid',
                  },
                }}
                placeholder="First Name"
              />
              <Validation
                visible={errors.f_name}
                white
                title={errors?.f_name?.message}
              />
              <Inputs
                icon
                white
                IconName="user"
                defaultValue={userDetails?.last_name}
                type={IconType.AntDesign}
                control={control}
                name="l_name"
                rules={{
                  required: 'Last Name is required',
                  pattern: {
                    value: NameRegix,
                    message: 'Name is not valid',
                  },
                }}
                placeholder="Last Name"
              />
              <Validation
                visible={errors.l_name}
                white
                title={errors?.l_name?.message}
              />
            </>
          ) :  admin ? (
            <>
              <Inputs
                icon
                white
                IconName="user"
                type={IconType.AntDesign}
                control={control}
                name="name"
                defaultValue={userDetails?.name }
                rules={{
                  required: 'Name is required',
                }}
                placeholder="Name"
              />
              <Validation
                visible={errors.name}
                white
                title={errors?.name?.message}
              />
            </>
          ) : (
            <>
              <Inputs
                icon
                white
                IconName="user"
                type={IconType.AntDesign}
                control={control}
                name="fac_name"
                defaultValue={userDetails?.facility_name}
                rules={{
                  required: 'Facility Name is required',
                }}
                placeholder="Facility Name"
              />
              <Validation
                visible={errors.fac_name}
                white
                title={errors?.fac_name?.message}
              />
              
            </>
          )}

          <Inputs
            white
            icon
            IconName="mail"
            type={IconType.Feather}
            control={control}
            defaultValue={userDetails?.email || userDetails?.facility_email}
            keyboardType="email-address"
            name="email"
            rules={{
              required: 'Email is required',
              pattern: {
                value: EmailRegix,
                message: 'Email is not valid',
              },
            }}
            placeholder="Email"
          />
          <Validation
            visible={errors.email}
            white
            title={errors?.email?.message}
          />
          <Inputs
            white
            icon
            IconName="phone"
            keyboardType={'number-pad'}
            type={IconType.Feather}
            control={control}
            name="phone"
            defaultValue={userDetails?.phone || userDetails?.phone_number}
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
          {!admin && (<>
          <Inputs
            white
            icon
            IconName="account-details-outline"
            type={IconType.MaterialCommunityIcons}
            control={control}
            name="about"
            defaultValue={staff ? userDetails.about : userDetails.information}
            rules={{
              required: `${staff ? 'About' : 'Information'} is required`,
            }}
            placeholder={staff ? 'About' : 'Information'}
          />
          <Validation
            visible={errors.about}
            white
            title={errors?.about?.message}
          />
          </>)}
          {staff && (
            <Dropdown
              round
              value={type}
              save={'value'}
              items={staff_type}
              placeholder="Type of staff"
              defaultOption={{
                key: userDetails?.type,
                value: userDetails?.type,
              }}
              setValue={value => setType(value)}
            />
          )}
          {!admin && (<>
          <Inputs
            icon
            white
            IconName="send"
            type={IconType.Feather}
            control={control}
            defaultValue={userDetails?.address_1 || userDetails?.Address_line_1}
            name="address"
            rules={{
              required: 'Address is required',
            }}
            placeholder="Address Line 1"
          />
          <Validation
            visible={errors.address}
            white
            title={errors?.address?.message}
          />

          <Inputs
            icon
            white
            IconName="send"
            type={IconType.Feather}
            control={control}
            defaultValue={userDetails?.address_2 || userDetails?.Address_line_2}
            name="addressTwo"
            rules={{
              required: 'Address is required',
            }}
            placeholder="Address Line 2"
          />
          <Validation
            visible={errors.addressTwo}
            white
            title={errors?.addressTwo?.message}
          />
          <CustomButton
            marginTop="5%"
            round
            to
            white
            title={cName?.name ? cName?.name : preCName ? preCName : 'Country'}
            textRestyle={[
              style.textRestyle,
              {
                color: cName?.name
                  ? preCName
                    ? Colors.Black
                    : Colors.Black
                  : Colors.placeholderTextColor,
              },
            ]}
            style={style.btnStyle}
            onPress={() =>
              navigation.navigate('selectCountry', {
                cName: setCName,
              })
            }
          />

          <View style={GlobalStyle.Space_Between}>
            <View style={{width: '47%'}}>
              <CustomButton
                to
                marginTop="15%"
                round
                white
                title={state || 'State'}
                textRestyle={[
                  style.textRestyle,
                  {color: state ? Colors.Black : Colors.placeholderTextColor},
                ]}
                style={style.btnStyle}
                onPress={() =>
                  navigation.navigate('selectState', {
                    get: setState,
                    code: cName,
                    val: userDetails.Country_code
                  })
                }
              />
            </View>
            <View style={{width: '47%'}}>
              <Inputs
                control={control}
                name="zip"
                defaultValue={userDetails?.zip_code}
                keyboardType="numeric"
                rules={{
                  required: 'ZipCode is required',
                }}
                placeholder="Zip Code"
              />
              <Validation
                visible={errors.zip}
                white
                title={errors?.zip?.message}
              />
            </View>
          </View>
          </>)}

          <CustomButton
            style={{marginTop: 25, marginBottom: 20, borderRadius: 100}}
            white
            onPress={handleSubmit(onSubmit)}
            title="Continue"
          />
        </View>
      </ScrollView>
      <ImagePickerModal
        isVisible={picker}
        onClose={() => setPicker(false)}
        PressCamera={cameraLaunch}
        PressPicture={galleryLaunch}
      />
      <Error message={msg} visible={error} />
      <Loader visible={loading} />
    </ColorBackground>
  );
};

export default EditProfile;
