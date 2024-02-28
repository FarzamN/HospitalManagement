import {View, Text, Pressable, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import {
  Background,
  CustomButton,
  Error,
  Heading,
  Logo,
  SubHead,
} from '../../../components';
import style from './style';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useDispatch, useSelector} from 'react-redux';
import {
  register_api,
  resend,
  resend_forget,
} from '../../../redux/actions/AuthActions';

const Otp = ({navigation, route}) => {
  const {data,image, navigationType, type, select, country, state} = route.params;
  const dispatch = useDispatch();
  const code = useSelector(state => state.otp);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const [time, setTime] = useState(30);

  const CELL_COUNT = 4;

  const [value, setValue] = useState();
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    const timer = time > 0 && setInterval(() => setTime(time - 1), 1000);
    return () => clearInterval(timer);
  }, [time]);

  const onSubmit = () => {
    if (value == code) {
      if (navigationType === 'forget') {
        navigation.navigate('forget');
      } else {
        setLoad(true);
        dispatch(register_api(data,image , type, select, country, state, setLoad,navigation));
      }
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 1500);
    }
  };

  const resendOtp = () => {
    if (time == 0) {
      setTime(30);
      if (navigationType == 'forget') {
        dispatch(resend_forget(data, setTime));
      } else {
        dispatch(resend(data, setTime));
      }
    }
  };

  return (
    <Background main>
      <View style={{marginVertical: 10}}>
        <Logo end />
        <View style={{marginTop: 16}}>
          <Heading white center text={'OTP Verification'} />
          <SubHead
            white
            center
            text={`We have sent you 4 digit OTP at your email${`\n`}${
              data.email
            }--${code}`}
          />
        </View>
      </View>
      <View style={GlobalStyle.AuthBox}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={GlobalStyle.WindowHeight} />
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <View key={index} style={style.OTPMainBox}>
                <Text
                  style={[style.cell]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
          <View style={GlobalStyle.WindowHeight} />
          <CustomButton onPress={onSubmit} title={'Continue'} loader={load}/>
          <>
            <View style={GlobalStyle.WindowHeight2} />

            <Pressable
              android_ripple={time == 0 && GlobalStyle.Ripple}
              onPress={resendOtp}
              style={style.ResendButton}>
              <SubHead
                text={
                  time == 0
                    ? 'Press to Resend Your OPT'
                    : `You can Reset Your OTP in ${time}`
                }
              />
            </Pressable>
          </>
        </ScrollView>
        <Error message="Invalid OTP" visible={error} />
      </View>
    </Background>
  );
};

export default Otp;
