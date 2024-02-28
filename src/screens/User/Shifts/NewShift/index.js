import React, {useReducer, useEffect, useState} from 'react';
import {View, ScrollView, Pressable, RefreshControl} from 'react-native';

import {
  Background,
  CustomButton,
  Dropdown,
  Empty,
  Loader,
  ShiftsHeader,
  StatusSkeleton,
  SubHead,
} from '../../../../components';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import BottomTab from '../../../../navigation/BottomTab';
import SInput from '../SInput';
import {useForm} from 'react-hook-form';
import Validation from '../../../../components/Validation';
import SButton from '../SButton';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Modal from './Modal';
import {
  facility_status_api,
  new_shift,
} from '../../../../redux/actions/UserAction';
import {useDispatch, useSelector} from 'react-redux';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {Colors} from '../../../../utils/Colors';
import {STORE_jOB_DETAIL} from '../../../../redux/reducer/Holder';
import JobsDetail from '../Detail/Tabs/Job/JobsDetail';

const initialState = {
  month: null,
  title: '',
  staff_title: '',
  showMonth: false,
  showType: false,
  type: null,
  timeIn: null,
  timeOut: null,
  showTimeIn: false,
  showTimeOut: false,
  showBoost: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_MONTH':
      return {...state, month: action.payload, showMonth: false};
    case 'SET_YEAR':
      return {...state, year: action.payload, showYear: false};
    case 'SET_TITLE':
      return {...state, title: action.payload};
    case 'SET_TIME_IN':
      return {...state, timeIn: action.payload, showTimeIn: false};
    case 'SET_TIME_OUT':
      return {...state, timeOut: action.payload, showTimeOut: false};
    case 'TOGGLE_MONTH_PICKER':
      return {...state, showMonth: !state.showMonth};
    case 'TOGGLE_DROPDOWN':
      return {...state, showType: !state.showType};
    case 'TOGGLE_TIME_IN_PICKER':
      return {...state, showTimeIn: !state.showTimeIn};
    case 'TOGGLE_TIME_OUT_PICKER':
      return {...state, showTimeOut: !state.showTimeOut};
    case 'TOGGLE_BOOST':
      return {...state, showBoost: !state.showBoost};
    default:
      return state;
  }
};

const NewShift = ({navigation}) => {
  const dispatching = useDispatch();
  const [state, dispatch] = useReducer(reducer, initialState);
  const service_type = useSelector(state => state.service_type);
  const store_job_detail = useSelector(state => state.store_job_detail);
  const staff_type = useSelector(state => state.staff_type);
  const facility_status = useSelector(state => state.facility_status);

  const [selectTitle, setSelectTitle] = useState(false);
  const [selectStaffTitle, setSelectStaffTitle] = useState(false);
  const [showErrorMonth, setShowErrorMonth] = useState(false);
  const [showErrorShiftTimeIn, setShowErrorShiftTimeIn] = useState(false);
  const [showErrorShiftTimeOut, setShowErrorShiftTimeOut] = useState(false);
  const [loader, setLoader] = useState(false);
  const [errorDetail, setErrorDetail] = useState({visible: false, msg: ''});
  const [refreshing, setRefreshing] = useState(false);
  const [sLoad, sSLoad] = useState(false);

  useEffect(() => {
    setSelectTitle(false);
    setSelectStaffTitle(false);
    setShowErrorMonth(false);
    setShowErrorShiftTimeIn(false);
    setShowErrorShiftTimeOut(false);
    setErrorDetail({visible: false});
  }, [
    state.title,
    state.month,
    state.timeIn,
    state.timeOut,
    store_job_detail,
    staff_type,
  ]);

  const handleMonth = date => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    dispatch({type: 'SET_MONTH', payload: formattedDate});
  };

  const handleIn = time => {
    const formattedTime = moment(time).format('HH:mm');
    dispatch({type: 'SET_TIME_IN', payload: formattedTime});
  };

  const handleOut = time => {
    const formattedTime = moment(time).format('HH:mm');
    dispatch({type: 'SET_TIME_OUT', payload: formattedTime});
  };

  const {
    reset,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'all'});

  const onSubmit = data => {
    const boost = 'No'
    dispatching(
      new_shift(
        data,
        state,
        boost,
        store_job_detail,
        reset,
        setLoader,
        navigation,
      ),
    );
  };
  const onBoost = () => {
    if (store_job_detail.length == 0) {
      setErrorDetail({visible: true, msg: 'Please add Job Detail'});
    } else if (state.title == '') {
      setSelectTitle(true);
    } else if (state.month == null) {
      setShowErrorMonth(true);
    } else if (state.timeIn == null) {
      setShowErrorShiftTimeIn(true);
    } else if (state.timeOut == null) {
      setShowErrorShiftTimeOut(true);
    } else {
      dispatch({type: 'TOGGLE_BOOST'});
    }
  };

  useEffect(() => {
    dispatching(facility_status_api(sSLoad));
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    dispatching(facility_status_api(sSLoad));
    setRefreshing(false);
  };

  const onYes = data => {
    navigation.navigate('boost', {
      data,
      state,
      store_job_detail,
    });
  };
  return (
    <Background>
      <ShiftsHeader title="New Shifts" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={GlobalStyle.Padding}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={refreshing}
            colors={[Colors.Purple]}
            tintColor={Colors.Main}
            progressBackgroundColor={Colors.OTPContainer}
          />
        }>
            <SInput
              name="title"
              title="Title"
              control={control}
              placeholder="Title"
              rules={{
                required: 'Title is required',
              }}
            />
            <Validation visible={errors.title} title={errors?.title?.message} />
            <SInput
              des
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
                  navigation.navigate('addShiftDetail', {
                    item: null,
                    index: null,
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

            {store_job_detail?.length == 0 ? null : (
              <>
                {store_job_detail?.map((item, index) => {
                  return (
                    <JobsDetail
                      black
                      personal
                      data={item}
                      key={index.toString()}
                      onEdit={() =>
                        navigation.navigate('addShiftDetail', {item, index})
                      }
                      onDelete={() => {
                        dispatching({
                          type: STORE_jOB_DETAIL,
                          payload: state =>
                            state.store_job_detail.filter((_, i) => i != index),
                        });
                      }}
                    />
                  );
                })}
              </>
            )}
            <Validation visible={errorDetail.visible} title={errorDetail.msg} />
            <Dropdown
              value={state.title}
              Heading="Service Type"
              items={service_type}
              setValue={value => dispatch({type: 'SET_TITLE', payload: value})}
            />
            <Validation visible={selectTitle} title="Select Service Type" />

            {/* <Dropdown
              value={state.staff_title}
              Heading="Staff Type"
              items={staff_type}
              setValue={value =>
                dispatch({type: 'SET_STAFF_TITLE', payload: value})
              }
            />
            <Validation visible={selectStaffTitle} title="Select Staff Type" /> */}

            <SButton
              onPress={() => dispatch({type: 'TOGGLE_MONTH_PICKER'})}
              placeHolder={state.month || 'Date'}
              title="Select Date"
              ReStyle={{width: '100%'}}
            />
            <Validation visible={showErrorMonth} title="Please select date" />

            <View style={GlobalStyle.Vertical_Space} />
            <View style={GlobalStyle.Space_Between}>
              <SButton
                onPress={() => dispatch({type: 'TOGGLE_TIME_IN_PICKER'})}
                placeHolder={state.timeIn || 'Time in'}
                title="Shift Timing in"
              />
              <SButton
                onPress={() => dispatch({type: 'TOGGLE_TIME_OUT_PICKER'})}
                placeHolder={state.timeOut || 'Time Out'}
                title="Shift Timing out"
              />
            </View>
            <Validation
              visible={showErrorShiftTimeIn}
              title="Please Shift Time in"
            />
            <View style={GlobalStyle.Space_Between}>
              <Validation visible={showErrorShiftTimeOut} title="" />
              <Validation
                visible={showErrorShiftTimeOut}
                title="Please Shift Time out"
              />
            </View>
            <CustomButton
              onPress={handleSubmit(onBoost)}
              title="Post  New shift"
            />
            <View style={GlobalStyle.endHeight} />
      </ScrollView>

      <BottomTab shift />
      <Modal
        visible={state.showBoost}
        onClose={() => dispatch({type: 'TOGGLE_BOOST'})}
        // onPress={() => {
        //   setBoost('Yes');
        //   handleSubmit(onSubmit)();
        // }}
        onPress={handleSubmit(onYes)}
        onNo={handleSubmit(onSubmit)}
      />
      <DateTimePickerModal
        themeVariant="light"
        isVisible={state.showMonth}
        mode="date"
        onConfirm={date => handleMonth(date)}
        onCancel={() => dispatch({type: 'TOGGLE_MONTH_PICKER'})}
      />

      <DateTimePickerModal
        themeVariant="light"
        isVisible={state.showTimeIn}
        mode="time"
        onConfirm={time => handleIn(time)}
        onCancel={() => dispatch({type: 'TOGGLE_TIME_IN_PICKER'})}
      />
      <DateTimePickerModal
        themeVariant="light"
        isVisible={state.showTimeOut}
        mode="time"
        onConfirm={time => handleOut(time)}
        onCancel={() => dispatch({type: 'TOGGLE_TIME_OUT_PICKER'})}
      />
      <Loader visible={loader} />
    </Background>
  );
};

export default NewShift;
