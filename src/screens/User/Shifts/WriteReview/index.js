import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useReducer, useState} from 'react';
import {
  Background,
  CustomButton,
  Error,
  Header,
  Heading,
  Loader,
  StarRating,
  SubHead,
  YesNoCard,
} from '../../../../components';
import style from './style';
import {Colors} from '../../../../utils/Colors';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import {YNOption} from '../../../../Constants/Data';
import {write_review_api} from '../../../../redux/actions/UserAction';

const initial = {
  rate: null,
  value: null,
  select: null,
  error: false,
  msg: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'RATE':
      return {...state, rate: action.payload, error: false};
    case 'VALUE':
      return {...state, value: action.payload, error: false};
    case 'SELECT':
      return {...state, select: action.payload, error: false};
    case 'MSG':
      return {...state, msg: action.payload, error: true};
    case 'CLEAR_ERROR':
      return {...state, error: false, msg: ''};
    default:
      return state;
  }
};
const WriteReview = ({navigation, route}) => {
  const {item} = route.params;
  const {user,shift} = item;
  const {first_name, last_name, profile_image} = user;
  const name = first_name + ' ' + last_name;
  const [state, dispatch] = useReducer(reducer, initial);
  const [load, setLoad] = useState(false);

  const onSubmit = () => {
    let errorMsg = '';
    switch (null) {
      case state.rate:
        errorMsg = 'Please Rate';
        dispatch({type: 'MSG', payload: errorMsg});
        break;
      case state.value:
        errorMsg = 'Write Review';
        dispatch({type: 'MSG', payload: errorMsg});
        break;
      case state.select:
        errorMsg = 'Please select any one';
        dispatch({type: 'MSG', payload: errorMsg});
        break;
      default:
        write_review_api(state, user.id, shift.id, setLoad, navigation);
        break;
    }

    if (errorMsg) {
      setTimeout(() => {
        dispatch({type: 'CLEAR_ERROR'});
      }, 1500);
    }
  };

  const onCancel = () => navigation.navigate('home');

  return (
    <Background>
      <Header back title="Write Review" gap />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SubHead bold text={`How was your experience with ${name}?`} center />
        <View style={{width: '60%', alignSelf: 'center'}}>
          <StarRating
            rating={state.rate}
            selectedStar={rating => dispatch({type: 'RATE', payload: rating})}
          />
          <Image style={style.BigDp} source={{uri: profile_image}} />
        </View>
        <View style={GlobalStyle.Padding}>
          <Heading style={{fontSize: 16}} text="Write your review" />

          <View style={style.InputBox}>
            <TextInput
              multiline
              value={state.value}
              style={style.Input}
              placeholder="Your review here"
              placeholderTextColor={Colors.placeholderTextColor}
              onChangeText={ele => dispatch({type: 'VALUE', payload: ele})}
            />
          </View>
          <Heading
            style={{fontSize: 16}}
            text={`Would you recommend ${name} to your friend`}
          />
          <View
            style={[GlobalStyle.Space_Between, {width: '50%', marginTop: 5}]}>
            {YNOption.map(ele => (
              <YesNoCard
                data={ele}
                key={ele.name}
                focus={state.select == ele.value}
                onPress={() => dispatch({type: 'SELECT', payload: ele.value})}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={[GlobalStyle.Space_evenly, {marginBottom: 10}]}>
        <CustomButton
          onPress={onCancel}
          title="Cancel"
          textRestyle={{color: '#9164DE'}}
          style={[style.Btn, {backgroundColor: '#fff'}]}
        />
        <CustomButton
          onPress={onSubmit}
          title="Submit"
          style={[style.Btn, {backgroundColor: '#9164DE'}]}
        />
      </View>
      <Loader visible={load} />
      <Error message={state.msg} visible={state.error} />
    </Background>
  );
};

export default WriteReview;
