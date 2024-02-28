import {View, ScrollView, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import {useForm} from 'react-hook-form';
import Inputs from '../../../components/Inputs';
import Validation from '../../../components/Validation';
import {EmailRegix, NameRegix} from '../../../utils/url';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import style from './style';
import {
  CustomButton,
  Dropdown,
  Error,
  ImagePickerModal,
  Loader,
  Logo,
  SimpleButton,
} from '../../../components';
import ColorBackground from '../../../components/Backgrounds/ColorBackground';
import {useNavigation, useRoute} from '@react-navigation/native';
import {check_email} from '../../../redux/actions/AuthActions';
import {Colors} from '../../../utils/Colors';
import PickerStyle from '../../User/Dashboard/Profile/style';
import {useImagePicker} from '../../../hooks';

const Index = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {select} = route.params;
  const staff = select == 1;

  const {cameraLaunch, galleryLaunch, image, picker, setPicker} =
    useImagePicker();

  const [error, setError] = useState(false);
  const [typeError, setTypeError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [type, setType] = useState('');
  const [cName, setCName] = useState(null);
  const [state, setState] = useState(null);
  const staff_type = useSelector(state => state.staff_type);
  const navigationType = 'register';

  const onSubmit = data => {
    if (image == null) {
      setMsg('Please select Image');
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 1500);
    } else if (staff && type == '') {
      setTypeError(true);
    } else if (data.password != data.c_password) {
      setMsg('Password does not match');
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 1500);
    } else if (cName == null) {
      setTypeError(true);
    } else if (state == null) {
      setTypeError(true);
    } else {
      dispatch(
        check_email(
          data,
          image,
          type,
          cName,
          state,
          navigationType,
          setLoading,
          setError,
          setMsg,
          select,
          navigation,
        ),
      );
      setLoading(true);
    }
  };
  useEffect(() => {
    if (staff && type != '') {
      setTypeError(false);
    }
    if (cName != null || state != null) {
      setTypeError(false);
    }
  }, [cName, state]);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'all'});
  return (
    <ColorBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={GlobalStyle.Padding}>
        <Logo text />
        <View style={[PickerStyle.ImageBox, {marginTop: 10}]}>
          <Image
            resizeMode="contain"
            source={
              image
                ? {uri: image.uri}
                : require('../../../assets/image/selectimage.png')
            }
            style={[
              GlobalStyle.Image,
              {backgroundColor: '#A8D5E4', borderRadius: 365},
            ]}
          />
          <TouchableOpacity
            onPress={() => setPicker(true)}
            style={PickerStyle.EditBox}>
            <Icon
              size={20}
              name="camera"
              color={Colors.Purple}
              type={IconType.Entypo}
            />
          </TouchableOpacity>
        </View>

        {staff ? (
          <>
            <Inputs
              icon
              white
              IconName="user"
              type={IconType.AntDesign}
              control={control}
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
        ) : (
          <>
            <Inputs
              icon
              white
              IconName="user"
              type={IconType.AntDesign}
              control={control}
              name="fac_name"
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

        <Inputs
          white
          password
          control={control}
          name="password"
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
          placeholder="Password"
        />
        <Validation
          visible={errors.password}
          white
          title={errors?.password?.message}
        />

        <Inputs
          white
          password
          control={control}
          name="c_password"
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
          placeholder="Confirm Password"
        />
        <Validation
          visible={errors.c_password}
          white
          title={errors?.c_password?.message}
        />
        {staff && (
          <>
            <Dropdown
              round
              save={'value'}
              value={type}
              placeholder="Type of staff"
              items={staff_type}
              setValue={value => setType(value)}
            />
            <Validation
              visible={typeError}
              white
              title={'Please select staff type'}
            />
          </>
        )}

        <Inputs
          icon
          white
          IconName="send"
          type={IconType.Feather}
          control={control}
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
          title={cName?.name || 'Country'}
          textRestyle={[
            style.textRestyle,
            {color: cName?.name ? Colors.Black : Colors.placeholderTextColor},
          ]}
          style={style.btnStyle}
          onPress={() =>
            navigation.navigate('selectCountry', {
              cName: setCName,
              val: cName,
            })
          }
        />
        <Validation white visible={typeError} title={'Please select Country'} />
        <View style={[GlobalStyle.Space_Between]}>
          <View style={{width: '47%'}}>
            <CustomButton
              to
              marginTop={15}
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
                  val: state,
                })
              }
            />
            <Validation
              white
              visible={typeError}
              title={'Please select State'}
            />
          </View>
          <View style={{width: '47%'}}>
            <Inputs
              control={control}
              name="zip"
              keyboardType="numeric"
              rules={{
                required: 'ZipCode is required',
              }}
              placeholder="Zip Code"
              maxLength={5}
            />
            <Validation
              visible={errors.zip}
              white
              title={errors?.zip?.message}
            />
          </View>
        </View>

        <CustomButton
          marginTop="12%"
          round
          white
          title="Sign Up"
          onPress={handleSubmit(onSubmit)}
        />
        <SimpleButton
          white
          mv="5%"
          title="Already have an account?"
          onPress={() => navigation.goBack()}
        />
      </ScrollView>
      <Loader visible={loading} />
      <Error visible={error} message={msg} />
      <ImagePickerModal
        isVisible={picker}
        PressCamera={cameraLaunch}
        PressPicture={galleryLaunch}
        onClose={() => setPicker(false)}
      />
    </ColorBackground>
  );
};

export default Index;
