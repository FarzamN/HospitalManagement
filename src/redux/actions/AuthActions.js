import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import {
  GET_ID,
  GET_TERMS_DATA,
  OTP,
  PERSONAL_SHIFT,
  ROLE_ID,
  SERVICE_TYPE,
  STAFF_TYPE,
  USER_DETAILS,
} from '../reducer/Holder';
import {BaseUrl} from '../../utils/url';
import {iOS, OS} from '../../Constants/Responsive';

export const login_api = (data, load, msg, error) => {
  return async dispatch => {
    load(true);
    try {
      const notification_token = await AsyncStorage.getItem('onesignaltoken');
      const url = `${BaseUrl}user-login`;
      let myData = new FormData();

      myData.append('email', data.email);
      myData.append('password', data.password);
      myData.append('device_name', OS);
      myData.append('device_token', notification_token);

      const response = await fetch(url, {
        body: myData,
        method: 'POST',
      });
      const responseData = await response.json();
      if (responseData?.success?.status == 200) {
        load(false);
        await AsyncStorage.setItem(
          'userDetails',
          JSON.stringify(responseData.success.data),
        );
        await dispatch({
          type: USER_DETAILS,
          payload: responseData.success.data,
        });

        await AsyncStorage.setItem(
          'role_id',
          JSON.stringify(responseData.success.data.role_id),
        );
        await dispatch({
          type: ROLE_ID,
          payload: responseData.success.data.role_id,
        });
        Toast.show('Successfully login!');
      } else if (responseData?.error?.status == 400) {
        load(false);
        msg(responseData?.error?.message);
        iOS && Toast.show(responseData?.error?.message);
        setTimeout(() => {
          error(true);
        }, 200);
        setTimeout(() => {
          error(false);
        }, 1500);
      } else {
        Toast.show('Something went wrong');
      }
    } catch (e) {
      load(false);
      console.log('login api catch error', e);
      Toast.show('Server side Error');
    }
  };
};

export const register_api = (
  data,
  image,
  type,
  select,
  country,
  state,
  load,
  nav,
) => {
  return async dispatch => {
    const staff = select == 1;
    const fac = select == 3;
    try {
      const notification_token = await AsyncStorage.getItem('onesignaltoken');
      const url = `${BaseUrl}user-registration`;
      let myData = new FormData();

      {
        staff &&
          (myData.append('first_name', data.f_name),
          myData.append('last_name', data.l_name),
          myData.append('phone', data.phone),
          myData.append('email', data.email),
          myData.append('Address_line_1', data.address),
          myData.append('Address_line_2', data.addressTwo));
      }
      {
        fac &&
          (myData.append('facility_name', data.fac_name),
          myData.append('facility_email', data.email),
          myData.append('phone_number', data.phone),
          myData.append('address_1', data.address),
          myData.append('address_2', data.addressTwo));
      }
      myData.append('profile_image', image);
      myData.append('country', country.name);
      myData.append('country_code', country.isoCode);
      myData.append('state', state);
      myData.append('zip_code', data.zip);
      myData.append('password', data.password);
      myData.append('device_name', OS);
      myData.append('device_token', notification_token);

      myData.append('role_id', select);
      {
        type && myData.append('type', type);
      }

      let myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');
      const response = await fetch(url, {
        method: 'POST',
        headers: myHeaders,
        body: myData,
        redirect: 'follow',
      });
      const responseData = await response.json();
      const res = responseData?.success;
      const err = responseData?.error;
      if (res?.status == 200) {
        if (staff) {
          await AsyncStorage.setItem('userDetails', JSON.stringify(res?.data));
          load(false);
          await dispatch({
            type: USER_DETAILS,
            payload: res?.data,
          });
          await dispatch({
            type: ROLE_ID,
            payload: res.role_id,
          });
        } else {
          nav.navigate('login');
        }
      } else if (err?.status == 422) {
        console.log('else error in registering', err?.message);
      } else {
        load(false);
        Toast.show(
          'An error occurred while registering please try again later',
        );
      }
    } catch (error) {
      load(false);
      console.log('register_api catch error', error);
      Toast.show('Server Side Error');
    }
  };
};

export const logout_api = () => {
  return async dispatch => {
    try {
      const userDetails = await AsyncStorage.getItem('userDetails');
      const Data = JSON.parse(userDetails);

      let url = `${BaseUrl}logout-user/${Data.id}`;
      let myData = new FormData();
      myData.append('role_id', Data.role_id);

      const response = await fetch(url, {
        method: 'post',
        body: myData,
      });

      const responseData = await response.json();
      if (responseData?.success?.status === 200) {
        await AsyncStorage.removeItem('userDetails');
        dispatch({type: USER_DETAILS, payload: null});
        dispatch({type: PERSONAL_SHIFT, payload: []});

        await AsyncStorage.removeItem('role_id');
        dispatch({type: ROLE_ID, payload: null});
      } else {
        Toast.show('something went wrong');
      }
    } catch (error) {
      console.log('logout_api catch error', error);
    }
  };
};

export const check_email = (
  data,
  image,
  type,
  country,
  state,
  navigationType,
  load,
  error,
  msg,
  select,
  navigation,
) => {
  return async dispatch => {
    try {
      let myData = new FormData();

      myData.append('email', data.email);
      myData.append('phone', data.phone);

      const response = await fetch(`${BaseUrl}auth`, {
        body: myData,
        method: 'POST',
      });
      const responseData = await response.json();
      const res = responseData?.success;
      if (res?.status == 200) {
        load(false);
        await dispatch({type: OTP, payload: res.OTP});
        navigation.navigate('otp', {
          data,
          image,
          navigationType,
          type,
          select,
          country,
          state,
        });
      } else if (responseData.error.status == 400) {
        load(false);
        msg('email or Phone number already exist');
        setTimeout(() => {
          error(true);
        }, 100);
        setTimeout(() => {
          error(false);
        }, 1500);
      }
    } catch (error) {
      load(false);
      console.log('check_email catch error', error);
      Toast.show('An error occurred please try again later');
    }
  };
};

export const resend = (data, setTime) => {
  return async dispatch => {
    try {
      let url = `${BaseUrl}auth`;
      let myData = new FormData();

      myData.append('email', data.email);
      myData.append('phone', data.phone);

      const response = await fetch(url, {
        body: myData,
        method: 'POST',
      });
      const responseData = await response.json();
      if (responseData?.success?.status == 200) {
        await dispatch({type: OTP, payload: responseData.success.OTP});
        setTime(30);
      }
    } catch (error) {
      console.log('resend catch error', error);
      Toast.show('An error occurred please try again later');
    }
  };
};

export const find_email = (
  data,
  navigationType,
  load,
  setError,
  navigation,
) => {
  return async dispatch => {
    try {
      let url = `${BaseUrl}user-forgot-password`;
      let myData = new FormData();

      myData.append('email', data.email);

      const response = await fetch(url, {
        body: myData,
        method: 'POST',
      });

      const responseData = await response.json();
      if (responseData?.success?.status == 200) {
        load(false);
        await dispatch({type: OTP, payload: responseData.success.OTP});
        navigation.navigate('otp', {data, navigationType});
        await dispatch({type: GET_ID, payload: responseData.success.data});
      } else if (responseData?.error?.status == 400) {
        load(false);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 1500);
      }
    } catch (error) {
      load(false);
      console.log('find_email catch error', error);
      Toast.show('An error occurred please try again later');
    }
  };
};

export const resend_forget = (data, setTime) => {
  return async dispatch => {
    try {
      let url = `${BaseUrl}user-forgot-password`;
      let myData = new FormData();

      myData.append('email', data.email);

      const response = await fetch(url, {
        body: myData,
        method: 'POST',
      });
      const responseData = await response.json();
      if (responseData?.success?.status == 200) {
        await dispatch({type: OTP, payload: responseData.success.OTP});
        setTime(30);
      }
    } catch (error) {
      console.log('resend catch error', error);
      Toast.show('An error occurred please try again later');
    }
  };
};

export const reset_password = async (data, id, load, navigation) => {
  try {
    let url = `${BaseUrl}user-reset-password/${id.id}`;
    let myData = new FormData();

    myData.append('password', data.password);
    myData.append('password_confirmation', data.c_password);
    myData.append('role_id', id.role_id);

    const response = await fetch(url, {
      body: myData,
      method: 'POST',
    });

    const responseData = await response.json();
    if (responseData?.success?.status == 200) {
      load(false);
      navigation.navigate('login');
    }
  } catch (error) {
    load(false);
    console.log('reset_password catch error', error);
    Toast.show('An error occurred please try again later');
  }
};

export const get_staff_type = () => {
  return async dispatch => {
    try {
      const response = await fetch(`${BaseUrl}get-staff`);
      const responseData = await response.json();
      if (responseData?.success?.status == 200) {
        const transformedData = responseData.success.data.map(item => {
          return {key: item.id.toString(), value: item.name};
        });

        dispatch({type: STAFF_TYPE, payload: transformedData});
      }
    } catch (error) {
      console.log('get_staff_type catch error', error);
    }
  };
};

export const change_password = (data, load, error, msg) => {
  return async dispatch => {
    try {
      const userDetails = await AsyncStorage.getItem('userDetails');
      const DATA = JSON.parse(userDetails);
      const url = `${BaseUrl}change-password/${DATA.id}`;
      let myData = new FormData();

      myData.append('current_password', data.oldPassword);
      myData.append('new_password', data.c_password);
      myData.append('role_id', DATA.role_id);

      const response = await fetch(url, {
        body: myData,
        method: 'POST',
      });

      const responseData = await response.json();
      if (responseData?.success?.status == 200) {
        load(false);
        dispatch(logout_api());
        Toast.show('Password successfully changed');
      } else if (responseData?.error?.status == 400) {
        load(false);
        msg(responseData?.error?.message);
        error(true);
        setTimeout(() => {
          error(false);
        }, 1500);
      } else {
        load(false);
        Toast.show('something went wrong');
      }
    } catch (errorr) {
      load(false);
      console.log('change_password catch error', errorr);
      Toast.show('An error occurred please try again later');
    }
  };
};

export const edit_profile = (
  data,
  cName,
  state,
  type,
  image,
  load,
  error,
  msg,
  back,
) => {
  return async dispatch => {
    try {
      const userDetails = await AsyncStorage.getItem('userDetails');
      const Data = JSON.parse(userDetails);
      const staff = Data.role_id == '1';
      const fac = Data.role_id == '3';
      const admin = Data.role_id == '2';
      let url = `${BaseUrl}update-user/${Data.id}`;
      let myData = new FormData();

      {
        staff &&
          (myData.append('first_name', data.f_name),
          myData.append('last_name', data.l_name),
          myData.append('phone', data.phone),
          myData.append('email', data.email),
          myData.append('Address_line_1', data.address),
          myData.append('Address_line_2', data.addressTwo),
          myData.append('about', data.about));
      }
      {
        fac &&
          (myData.append('facility_name', data.fac_name),
          myData.append('facility_email', data.email),
          myData.append('phone_number', data.phone),
          myData.append('address_1', data.address),
          myData.append('address_2', data.addressTwo),
          myData.append('information', data.about));
      }

      {
        !admin &&
          (myData.append('zip_code', data.zip),
          myData.append('country', cName ? cName.name : Data.country));
      }
      myData.append('role_id', Data.role_id);
      {
        image && myData.append('profile_image', image);
      }
      {
        type && myData.append('type', type);
      }

      {
        admin &&
          (myData.append('name', data.name),
          myData.append('email', data.email),
          myData.append('phone_number', data.phone),
          myData.append('roles', 'admin'));
      }

      const response = await fetch(url, {
        body: myData,
        method: 'POST',
      });

      const responseData = await response.json();
      if (responseData?.success?.status == 200) {
        load(false);
        back();
        await AsyncStorage.setItem(
          'userDetails',
          JSON.stringify(responseData.success.data),
        );
        await dispatch({
          type: USER_DETAILS,
          payload: responseData.success.data,
        });

        Toast.show('Profile updated successfully');
      } else {
        load(false);
        Toast.show('Something went wrong');
      }
    } catch (error) {
      load(false);
      console.log('edit_profile catch error', error);
      Toast.show('An error occurred please try again later');
    }
  };
};

export const get_service_type = () => {
  return async dispatch => {
    try {
      let url = `${BaseUrl}get-services`;

      const response = await fetch(url, {
        method: 'GET',
      });
      const responseData = await response.json();
      if (responseData?.success?.status == 200) {
        const transformedData = responseData.success.data.map(item => {
          return {key: item.id.toString(), value: item.service_name};
        });

        dispatch({type: SERVICE_TYPE, payload: transformedData});
      }
    } catch (error) {
      console.log('get_service_type catch error', error);
    }
  };
};

export const getHtml = (type, load) => {
  return async dispatch => {
    try {
      const url = `${BaseUrl}show-setting`;
      let myData = new FormData();
      myData.append('type', type);

      const response = await fetch(url, {
        body: myData,
        method: 'post',
      });
      const responseData = await response.json();
      const res = responseData.success;
      if (res.status === 200) {
        dispatch({type: GET_TERMS_DATA, payload: res.data});
        load(false);
      }
    } catch (error) {
      load(false);
      console.log('error', error);
    }
  };
};
