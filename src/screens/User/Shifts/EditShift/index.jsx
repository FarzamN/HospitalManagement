import {Pressable, ScrollView, View} from 'react-native';
import React, {useState} from 'react';
import {
  CustomButton,
  Dropdown,
  Header,
  Loader,
  SubHead,
  AwAlert,
  Background
} from '../../../../components';
import {useForm} from 'react-hook-form';
import SInput from '../SInput';
import Validation from '../../../../components/Validation';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {Colors} from '../../../../utils/Colors';
import JobsDetail from '../Detail/Tabs/Job/JobsDetail';
import {useSelector, useDispatch} from 'react-redux';
import SButton from '../SButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {edit_shift} from '../../../../redux/actions/UserAction';

const EditShift = ({navigation,route}) => {
  const {item} = route.params;
  const dispatch = useDispatch();

  const staff_type = useSelector(state => state.staff_type);
  const service_type = useSelector(state => state.service_type);
  const get_single_shift = useSelector(state => state.get_single_shift);
  const [load, setLoad] = useState(false);
  const [localDetail, setLocalDetail] = useState(get_single_shift.job_details);
  const [showAlert, setShowAlert] = useState({visible: false, index: null});
  const [showMonth, setShowMonth] = useState(false);
  const [showTimeIn, setShowTimeIn] = useState(false);
  const [showTimeOut, setShowTimeOut] = useState(false);

  const [title, setTitle] = useState(null);
  const [staff, setStaff] = useState(null);
  const [month, setMonth] = useState(null);
  const [timeIn, setTimeIn] = useState(null);
  const [timeOut, setTimeOut] = useState(null);
  const handleMonth = date => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setMonth(formattedDate);
    setShowMonth(false);
  };

  const handleIn = time => {
    const formattedTime = moment(time).format('HH:mm');
    setTimeIn(formattedTime);
    setShowTimeIn(false);
  };

  const handleOut = time => {
    const formattedTime = moment(time).format('HH:mm');
    setTimeOut(formattedTime);
    setShowTimeOut(false);
  };

  const onConfirmDetail = () => {
    setLocalDetail(localDetail.filter((_, i) => i != showAlert.index));
    setShowAlert({visible: false, index: null});
  };
  const  onSubmit = (data) => {
    setLoad(true);
    dispatch(
      edit_shift(
        item,
        localDetail,
        data,
        title,
        staff,
        month,
        timeIn,
        timeOut,
        setLoad,
        navigation,
      ),
    );
  }

  const {
    reset,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'all'});
  return (
    <Background>
      <Header back title={`edit ${get_single_shift.title}`} gap />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={GlobalStyle.Padding}>
        <SInput
          name="title"
          title="Title"
          control={control}
          placeholder="Title"
          rules={{
            required: 'Title is required',
          }}
          defaultValue={get_single_shift.title}
        />
        <Validation visible={errors.title} title={errors?.title?.message} />

        <SInput
          des
          defaultValue={get_single_shift.description}
          name="des"
          title="Description"
          control={control}
          placeholder="Description"
          rules={{
            required: 'Description is required',
          }}
        />
        <Validation visible={errors.des} title={errors?.des?.message} />

        <View
          style={[
            GlobalStyle.Space_Between,
            {marginVertical: 10, paddingHorizontal: 3},
          ]}>
          <SubHead bold text="Add Job Detail" />
          <Pressable
            onPress={() =>
              navigation.navigate('editShiftDetail', {
                item: null,
                index: null,
                setLocalDetail,
              })
            }
            android_ripple={GlobalStyle.Ripple}>
            <Icon
              size={20}
              name="plus-circle"
              color={Colors.Black}
              type={IconType.Feather}
            />
          </Pressable>
        </View>
        {localDetail.map((item, index) => {
          return (
            <JobsDetail
              black
              personal
              data={item}
              key={index.toString()}
              onDelete={() => {
                setShowAlert({visible: true, index});
              }}
              onEdit={() =>
                navigation.navigate('editShiftDetail', {
                  item,
                  index,
                  setLocalDetail,
                })
              }
            />
          );
        })}
        <Dropdown
          value={title}
          Heading="Service Type"
          defaultOption={{
            key: get_single_shift.service_type,
            value: get_single_shift.service_type,
          }}
          items={service_type}
          setValue={value => setTitle(value)}
        />

        <Dropdown
          value={staff}
          Heading="Staff Type"
          items={staff_type}
          defaultOption={{
            key: get_single_shift.staff,
            value: get_single_shift.staff,
          }}
          setValue={value => setStaff(value)}
        />

        <SButton
          onPress={() => setShowMonth(true)}
          placeHolder={month ? month : get_single_shift.opening_date}
          title="Select Date"
          ReStyle={{width: '100%'}}
        />
        <View style={GlobalStyle.Vertical_Space} />

        <View style={GlobalStyle.Space_Between}>
          <SButton
            onPress={() => setShowTimeIn(true)}
            placeHolder={timeIn ? timeIn : get_single_shift.start_time}
            title="Shift Timing in"
          />
          <SButton
            placeHolder={timeOut ? timeOut : get_single_shift.end_time}
            title="Shift Timing out"
            onPress={() => setShowTimeOut(true)}
          />
        </View>
        <CustomButton onPress={handleSubmit(onSubmit)} title="Continue" />
        <View style={GlobalStyle.Vertical_Space} />
      </ScrollView>

      <DateTimePickerModal
        mode="date"
        themeVariant="light"
        isVisible={showMonth}
        onConfirm={date => handleMonth(date)}
        onCancel={() => setShowMonth(false)}
      />

      <DateTimePickerModal
        mode="time"
        themeVariant="light"
        isVisible={showTimeIn}
        onConfirm={time => handleIn(time)}
        onCancel={() => setShowTimeIn(false)}
      />
      <DateTimePickerModal
        themeVariant="light"
        isVisible={showTimeOut}
        mode="time"
        onConfirm={time => handleOut(time)}
        onCancel={() => setShowTimeOut(false)}
      />
      <Loader visible={load} />
      <AwAlert
        confirmColor={'red'}
        cancelText="No, Thanks"
        confirmText="Yes, Delete"
        onPress={onConfirmDetail}
        visible={showAlert.visible}
        cancelColor={Colors.Success}
        onClose={() => setShowAlert({visible: false})}
        title={'Sure You wanna delete this "Job Detail"'}
      />
    </Background>
  );
};

export default EditShift;
