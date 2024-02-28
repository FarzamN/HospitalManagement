import React, { useState } from 'react';
import style from './style';
import Modal from 'react-native-modal';
import { View, ScrollView, Pressable, Text, Image, TouchableOpacity } from 'react-native';
import { GlobalStyle } from '../../../../Constants/GlobalStyle';
import SInput from '../SInput';
import Validation from '../../../../components/Validation';
import { useForm } from 'react-hook-form';
import { Colors } from '../../../../utils/Colors';
import Icon, { IconType } from 'react-native-dynamic-vector-icons';
import { CustomButton, Dropdown } from '../../../../components';
import { EmailRegix } from '../../../../utils/url';
import { Select_Module } from '../../../../Constants/Data';

const AddMemberModal = ({ visible, onClose, item, profile, onEdit }) => {
  const isFac = item == 'Facility';
  const [title, setTitle] = useState('');
  const [rate, setRate] = useState('');
  const [fee, setFee] = useState('');
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'all' });


  return (
    <Modal
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      isVisible={visible}
      propagateSwipe
      style={style.MainModal}>
      <View style={style.ModalContainer}>
        <ScrollView style={GlobalStyle.Padding}>
          <View style={style.ImageBox}>
            {/* <Image
          resizeMode="contain"
          source={image}
          style={[
            GlobalStyle.Image,
            {backgroundColor: '#A8D5E4', borderRadius: 365},
          ]}
        /> */}
            {!profile && (
              <TouchableOpacity
                onPress={onEdit}
                style={style.EditBox}>
                <Icon
                  size={20}
                  name="camera"
                  color={Colors.Purple}
                  type={IconType.Entypo}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={GlobalStyle.Space_Between}>
            <Text
              numberOfLines={2}
              style={style.Heading}>{`Add new ${item}`}</Text>
            <Pressable onPress={onClose} android_ripple={GlobalStyle.RedRipple}>
              <Icon
                name="closecircle"
                size={20}
                color={Colors.Grey}
                type={IconType.AntDesign}
              />
            </Pressable>
          </View>
          <SInput
            name="f_name"
            control={control}
            placeholder={isFac ? 'Name of Facility' : 'First name'}
            rules={{
              required: 'required',
            }}
          />
          <Validation visible={errors.title} title={errors?.title?.message} />
          {isFac ? (
            <>
              <SInput
                control={control}
                placeholder="Email of facility."
                name="email"
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: EmailRegix,
                    message: 'Email is not valid',
                  },
                }}
              />
              <Validation
                visible={errors.email}
                title={errors?.email?.message}
              />
            </>
          ) : (
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
          {!isFac && (
            <>
              <SInput
                name="password"
                control={control}
                placeholder="Password"
                rules={{
                  required: 'required',
                }}
              />
              <Validation
                visible={errors.password}
                title={errors?.password?.message}
              />
            </>
          )}
          {isFac && (
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
          )}
          {/*  */}
          <Dropdown
            Heading={'Account Type'}
            placeholder="Account Type"
            items={Select_Module}
            value={title}
            setValue={value => setTitle(value)}
          />

          {isFac && (
            <>
              <SInput
                name="rate"
                control={control}
                placeholder="Hourly Rate"
                rules={{
                  required: 'required',
                }}
              />
              <Validation visible={errors.rate} title={errors?.rate?.message} />
              <Dropdown
                Heading={'Platform fee'}
                placeholder="Platform fee"
                items={Select_Module}
                value={fee}
                setValue={value => setFee(value)}
              />
            </>
          )}
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
            name="city"
            control={control}
            placeholder="City"
            rules={{
              required: 'required',
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
          <CustomButton
            title="Create New Account"
            style={{ height: 50, marginBottom: 10 }}
          />
        </ScrollView>
      </View>
    </Modal>
  );
};

export default AddMemberModal;
