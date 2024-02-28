import {View, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  CustomButton,
  Header,
  SubHead,
  Background,
  Loader,
  Dropdown,
} from '../../../../components';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import {Colors} from '../../../../utils/Colors';
import style from './style';
import {useForm} from 'react-hook-form';
import {create_invoice_api} from '../../../../redux/actions/UserAction';
import InvoiceInput from '../../../../components/Inputs/InvoiceInput';
import Validation from '../../../../components/Validation';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {StatusData} from '../../../../Constants/Data';

const CreateInvoice = () => {
  const nav = useNavigation();
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState(null);
  const [status, setStatus] = useState({
    err: false,
    value: null,
  });
  const handleDate = date => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setDate(formattedDate);
    setShowDate(false);
  };
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = data => {
    if (status.value !== null) {
      dispatch(create_invoice_api(data, date, status.value, setLoad, nav));
    } else {
      setStatus({err: true});
    }
  };
  useEffect(() => {
    setStatus({err: false});
  }, [status.value]);

  return (
    <Background>
      <Header back title="Create Invoice" gap />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={GlobalStyle.Padding}>
        <View style={GlobalStyle.Space_Between}>
          <InvoiceInput
            control={control}
            name="title"
            width={'30%'}
            rules={{
              required: 'Name is required',
            }}
            placeholder="Name"
          />
          <InvoiceInput
            control={control}
            name="amount"
            keyboardType={'number-pad'}
            restyle={[style.right, {color: Colors.Purple}]}
            width={'30%'}
            rules={{
              required: 'Amount is required',
            }}
            placeholder="Amount"
          />
        </View>
        <View style={GlobalStyle.Space_Between}>
          <Validation visible={errors.title} title={errors?.title?.message} />
          <Validation
            visible={errors.amount}
            title={errors?.amount?.message}
            style={{textAlign: 'right'}}
          />
        </View>
        <View style={style.line} />

        <View style={GlobalStyle.Row}>
          <SubHead bold text={'Transaction ID: '} />
          <InvoiceInput
            control={control}
            name="id"
            width={'85%'}
            rules={{
              required: 'Transaction ID is required',
            }}
            placeholder="Transaction ID"
          />
        </View>
        <Validation visible={errors.id} title={errors?.id?.message} />

        <View style={GlobalStyle.Row}>
          <SubHead bold text={'Bank Name: '} />
          <InvoiceInput
            control={control}
            name="bank_name"
            width={'85%'}
            rules={{
              required: 'Bank Name is required',
            }}
            placeholder="Bank Name"
          />
        </View>
        <Validation
          visible={errors.bank_name}
          title={errors?.bank_name?.message}
        />

        <View style={GlobalStyle.Row}>
          <SubHead bold text={'Client: '} />
          <InvoiceInput
            control={control}
            name="client"
            width={'85%'}
            rules={{
              required: 'Client is required',
            }}
            placeholder="Client"
          />
        </View>
        <Validation visible={errors.client} title={errors?.client?.message} />
        <View style={GlobalStyle.Row}>
          <SubHead bold text={'Telephone: '} />
          <InvoiceInput
            control={control}
            keyboardType={'number-pad'}
            name="telephone"
            width={'85%'}
            rules={{
              required: 'Telephone is required',
            }}
            placeholder="Telephone"
          />
        </View>
        <Validation
          visible={errors.telephone}
          title={errors?.telephone?.message}
        />
        <View style={GlobalStyle.Row}>
          <SubHead bold text={'Email: '} />
          <InvoiceInput
            control={control}
            name="email"
            keyboardType={'email-address'}
            width={'85%'}
            rules={{
              required: 'email is required',
            }}
            placeholder="Email"
          />
        </View>
        <Validation visible={errors.email} title={errors?.email?.message} />
        <View style={GlobalStyle.Row}>
          <SubHead bold text={'Company: '} />
          <InvoiceInput
            control={control}
            name="company"
            width={'85%'}
            rules={{
              required: 'Company is required',
            }}
            placeholder="company"
          />
        </View>
        <Validation visible={errors.company} title={errors?.company?.message} />
        <View style={GlobalStyle.Row}>
          <SubHead bold text={'VAT: '} />
          <InvoiceInput
            control={control}
            name="vat"
            width={'85%'}
            rules={{
              required: 'VAT is required',
            }}
            placeholder="VAT"
          />
        </View>
        <Validation visible={errors.vat} title={errors?.vat?.message} />
        <View style={GlobalStyle.Row}>
          <SubHead bold text={'Address: '} />
          <InvoiceInput
            control={control}
            name="address"
            width={'85%'}
            rules={{
              required: 'Address is required',
            }}
            placeholder="Address"
          />
        </View>
        <Validation visible={errors.address} title={errors?.address?.message} />

        <SubHead bold text={'Details:'} />
        <InvoiceInput
          control={control}
          name="details"
          width={'85%'}
          height={80}
          multiline
          rules={{
            required: 'Details is required',
          }}
          placeholder="Details"
        />
        <Validation visible={errors.details} title={errors?.details?.message} />

        <View style={GlobalStyle.Space_Between}>
          <SubHead bold style={{color: Colors.LightGrey}} text="Bill to" />
          <InvoiceInput
            control={control}
            name="bill_to"
            width={'40%'}
            restyle={style.right}
            rules={{
              required: 'Bill to is required',
            }}
            placeholder="Bill"
          />
        </View>
        <Validation visible={errors.bill_to} title={errors?.bill_to?.message} />

        <View style={GlobalStyle.Space_Between}>
          <SubHead bold style={{color: Colors.LightGrey}} text="Amount Due" />
          <InvoiceInput
            control={control}
            name="amount_due"
            keyboardType={'number-pad'}
            width={'40%'}
            restyle={style.right}
            rules={{
              required: false,
            }}
            placeholder="Amount"
          />
        </View>
        <Validation
          visible={errors.amount_due}
          title={errors?.amount_due?.message}
        />

        <TouchableOpacity
          onPress={() => setShowDate(true)}
          style={GlobalStyle.Space_Between}>
          <SubHead bold style={{color: Colors.LightGrey}} text="Payment Due" />
          <SubHead
            bold
            style={{color: date ? Colors.Black : Colors.LightGrey}}
            text={date || 'Due date'}
          />
        </TouchableOpacity>

        {/* <Dropdown
          save="value"
          items={StatusData}
          value={status.value}
          placeholder="Status"
          setValue={value => setStatus({value})}
        />
        <Validation visible={status.err} white title={'Please an Status'} /> */}

        <View style={GlobalStyle.Vertical_Space} />
        <CustomButton
          round
          title="Create Invoice"
          onPress={handleSubmit(onSubmit)}
        />
        <View style={GlobalStyle.Vertical_Space} />
      </ScrollView>
      <Loader visible={load} />
      <DateTimePickerModal
        mode="date"
        themeVariant="light"
        isVisible={showDate}
        onConfirm={date => handleDate(date)}
        onCancel={() => setShowDate(false)}
      />
    </Background>
  );
};

export default CreateInvoice;
