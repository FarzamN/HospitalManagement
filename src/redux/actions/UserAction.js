import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ALL_CHECK,
  ALL_COUNTRY_DATA,
  ALL_INVOICE,
  ALL_USERS,
  CHAT_COUNT,
  CHAT_PROFILE,
  COMPLETED_SHIFT,
  FACILITY_STATUS,
  FAV_JOB,
  GET_ADMIN_ROLE,
  GET_BIT_DATA,
  GET_FACILITY_ONGOING,
  GET_INBOX,
  GET_MESSAGES_DATA,
  GET_SERVICE,
  GRAPH_DATA,
  MANAGE_STAFF,
  NOTIFICATION,
  NOTIFICATION_COUNT,
  OTHERS_BITS,
  PENDING_SHIFT,
  PERSONAL_SHIFT,
  RECENT_BITS,
  SINGLE_INVOICE_DATA,
  SINGLE_SHIFT,
  STORE_jOB_DETAIL,
  TODAYS_SHIFT,
  UPCOMING_SHIFT,
  USER_DASHBOARD,
  USER_PROFILE,
} from '../reducer/Holder';
import Toast from 'react-native-simple-toast';
import {BaseUrl} from '../../utils/url';

export const new_shift = (
  data,
  state,
  boost,
  store_job_detail,
  reset,
  load,
  navigation,
  price,
  start,
  end,
) => {
  return async dispatch => {
    load(true);
    try {
      const userDetails = await AsyncStorage.getItem('userDetails');
      const Data = JSON.parse(userDetails);

      const url = `${BaseUrl}create-shift/${Data.id}`;
      let myData = new FormData();

      myData.append('title', data.title);
      myData.append('description', data.des);
      myData.append('start_time', state.timeIn);
      myData.append('end_time', state.timeOut);
      myData.append('service_type', state.title);
      myData.append('job_details', JSON.stringify(store_job_detail));
      myData.append('boost_status', boost);
      myData.append('opening_date', state.month);
      myData.append('staff', state.staff_title);

      myData.append('country', Data.country);
      myData.append('state', Data.state);

      {
        boost == 'Yes' && myData.append('boost_fee', price),
          myData.append('boost_start', start);
        myData.append('boost_end', end);
      }
      const response = await fetch(url, {
        body: myData,
        method: 'POST',
      });
      const responseData = await response.json();
      const res = responseData?.success;
      const err = responseData?.error;
      if (res?.status == 200) {
        reset();
        load(false);
        Toast.show('Shift successfully created');
        navigation.navigate('listedShift');
        dispatch({
          type: STORE_jOB_DETAIL,
          payload: () => [],
        });
      } else if (err?.status == 400) {
        load(false);
        Toast.show(err?.message);
      } else {
        load(false);
        Toast.show('something went wrong');
      }
    } catch (error) {
      load(false);
      console.log('new_shift catch error', error);
      Toast.show('An error occurred please try again later');
    }
  };
};

export const get_personal_shift = load => {
  return async dispatch => {
    load(true);
    try {
      const userDetails = await AsyncStorage.getItem('userDetails');
      const Data = JSON.parse(userDetails);
      const url = `${BaseUrl}get-shift/${Data.id}`;
  
      console.log(url)
      const response = await fetch(url);
      const responseData = await response.json();
      
      

      const res = responseData?.success;
      if (res?.status == 200) {
        load(false);
        dispatch({
          type: PERSONAL_SHIFT,
          payload: res.data.reverse(),
        });
      } else {
        load(false);
      }
    } catch (error) {
      load(false);
      Toast.show('Server side Error');
      console.log('get_personal_shift catch error', error);
    }
  };
};

export const view_bits = (id, load) => {
  return async dispatch => {
    load(true);
    try {
     
      const url = `${BaseUrl}get_bitdata/${id}`;

      const response = await fetch(url);
      const responseData = await response.json();
      if (responseData?.success?.status == 200) {
        load(false);
        dispatch({type: GET_BIT_DATA, payload: responseData.success.data});
      }
    } catch (error) {
      load(false);
      console.log('get_all_shift catch error', error);
      Toast.show('Server side Error');
    }
  };
};

export const edit_shift = (
  item,
  localDetail,
  data,
  title,
  staff,
  month,
  timeIn,
  timeOut,
  load,
  navigation,
) => {
  return async dispatch => {
    try {
      let url = `${BaseUrl}edit-shift/${item.id}`;
      let myData = new FormData();

      myData.append('title', data.title);
      myData.append('description', data.des);
      myData.append('start_time', item.start_time ? item.start_time : timeIn);
      myData.append('end_time', item.end_time ? item.end_time : timeOut);
      myData.append(
        'service_type',
        item.service_type ? item.service_type : title,
      );
      myData.append('job_details', JSON.stringify(localDetail));
      myData.append(
        'opening_date',
        item.opening_date ? item.opening_date : month,
      );
      myData.append('staff', item.staff ? item.staff : staff);

      const response = await fetch(url, {
        body: myData,
        method: 'POST',
      });

      const responseData = await response.json();
      if (responseData?.success?.status == 200) {
        load(false);
        Toast.show('successfully Edited');
        navigation.goBack();
        dispatch({
          type: STORE_jOB_DETAIL,
          payload: () => [],
        });
        dispatch(single_shift_api(item.id, load));
      } else {
        load(false);
        Toast.show('something went wrong');
      }
    } catch (error) {
      load(false);
      console.log('edit_shift catch error', error);
      Toast.show('An error occurred please try again later');
    }
  };
};

export const upcoming_shift_api = load => {
  return async dispatch => {
    load(true);
    try {
      const userDetails = await AsyncStorage.getItem('userDetails');
      const Data = JSON.parse(userDetails);
      const url = `${BaseUrl}ongoing-shifts/${Data.id}`;

      const response = await fetch(url);
      const responseData = await response.json();
      if (responseData?.success?.status == 200) {
        load(false);
        dispatch({
          type: UPCOMING_SHIFT,
          payload: responseData.success.data,
        });
      } else {
        Toast.show('something went wrong');
      }
    } catch (error) {
      load(false);
      Toast.show('Server side Error');
      console.log('catch error in upcoming_shift', error);
    }
  };
};

export const pending_shift_api = load => {
  return async dispatch => {
    load(true);
    try {
      const Data = await AsyncStorage.getItem('userDetails');
      const userData = JSON.parse(Data);
      const url = `${BaseUrl}pending-shift/${userData.id}`;
      const response = await fetch(url);
      const responseData = await response.json();
      const res = responseData?.success;
      if (res?.status == 200) {
        load(false);
        dispatch({
          type: PENDING_SHIFT,
          payload: res.data.reverse(),
        });
      } else {
        Toast.show('something went wrong');
      }
    } catch (error) {
      load(false);
      Toast.show('Server side Error');
      console.log('catch error in pending_shift_api', error);
    }
  };
};

export const completed_shift_api = load => {
  return async dispatch => {
    load(true);
    try {
      const Data = await AsyncStorage.getItem('userDetails');
      const userData = JSON.parse(Data);
      const url = `${BaseUrl}approved-shift/${userData.id}`;

      const response = await fetch(url);
      const responseData = await response.json();
      const res = responseData?.success;
      if (res?.status == 200) {
        load(false);
        dispatch({
          type: COMPLETED_SHIFT,
          payload: res.data.reverse(),
        });
      } else {
        load(false);
        Toast.show('something went wrong');
      }
    } catch (error) {
      load(false);
      Toast.show('Server side Error');
      console.log('catch error in pending_shift_api', error);
    }
  };
};

export const place_bit_api = async (data, price, shiftID, load, nav) => {
  try {
    const Data = await AsyncStorage.getItem('userDetails');
    const userData = JSON.parse(Data);
    const url = `${BaseUrl}store-bit/${userData.id}/${shiftID}`;
    let myData = new FormData();

    myData.append('description', data.des);
    // myData.append('price', price);

    const response = await fetch(url, {
      body: myData,
      method: 'POST',
    });
    const responseData = await response.json();
    if (responseData?.success?.status == 200) {
      Toast.show('Bit placed Successfully');
      setTimeout(() => {
        nav.goBack();
        load(false);
      }, 1000);
    } else if (responseData?.message == 'Bit already exists.') {
      load(false);
      Toast.show('you have already placed Bit in this job');
      setTimeout(() => {
        nav.goBack();
      }, 500);
    } else {
      load(false);
      Toast.show('something went wrong');
    }
  } catch (e) {
    load(false);
    Toast.show('Server side Error');
    console.log('place_bit_api catch error', e);
  }
};

export const user_dashboard_api = () => {
  return async dispatch => {
    try {
      const userDetails = await AsyncStorage.getItem('userDetails');
      const Data = JSON.parse(userDetails);
      const val = Data.role_id == '3' ? 'facility' : 'user';
      const url = `${BaseUrl}${val}-dashboard/${Data.id}`;

      const response = await fetch(url);
      const responseData = await response.json();
      const res = responseData?.success;
      if (res?.status == 200) {
        dispatch({
          type: USER_DASHBOARD,
          payload: res.data,
        });
      }
    } catch (error) {
      Toast.show('Server side Error');
      console.log('user_dashboard_api catch error', error);
    }
  };
};

export const admin_dashboard_api = date => {
  return async dispatch => {
    try {
      const userDetails = await AsyncStorage.getItem('userDetails');
      const Data = JSON.parse(userDetails);
      const url = `${BaseUrl}admin-dashboard/${Data.id}`;

      let myData;
      if (date) {
        myData = new FormData();
        myData.append('date', date);
      }

      const response = await fetch(url, {
        method: 'POST',
        body: myData,
      });
      const responseData = await response.json();
      const res = responseData?.success;
      if (res?.status == 200) {
        dispatch({
          type: USER_DASHBOARD,
          payload: res.data,
        });
      }
    } catch (error) {
      Toast.show('Server side Error');
      console.log('admin_dashboard_api catch error', error);
    }
  };
};

export const graph_api = (date, load) => {
  return async dispatch => {
    try {
      load(true);
      const url = `${BaseUrl}get-dashboard-graph`;
      let myData;
      if (date) {
        myData = new FormData();
        myData.append('date', date);
      }

      const response = await fetch(url, {
        method: 'POST',
        body: myData,
      });
      const responseData = await response.json();
      const res = responseData?.success;
      if (res.status === 200) {
        load(false);
        dispatch({
          type: GRAPH_DATA,
          payload: res.data,
        });
      }
    } catch (error) {
      load(false);
      Toast.show('Server side Error');
      console.log('graph_api error', error);
    }
  };
};

export const others_bits = (id, load) => {
  return async dispatch => {
    try {
      const url = `${BaseUrl}get-bits-users/${id}`;

      const response = await fetch(url);
      const responseData = await response.json();
      if (responseData?.success?.status == 200) {
        load(false);
        dispatch({
          type: OTHERS_BITS,
          payload: responseData.success.data.reverse(),
        });
      }
    } catch (error) {
      load(false);
      Toast.show('Server side Error');
      console.log('others_bits catch error', error);
    }
  };
};

export const get_profile_api = (id, role, load) => {
  return async dispatch => {
    try {
      const url = `${BaseUrl}get-user/${id}/${role}`;
      const response = await fetch(url);
      const responseData = await response.json();
      if (responseData?.success?.status == 200) {
        load(false);
        dispatch({
          type: USER_PROFILE,
          payload: responseData.success.data,
        });
      }
    } catch (error) {
      load(false);
      Toast.show('Server side Error');
      console.log('get_profile_api catch error', error);
    }
  };
};

export const single_shift_api = (id, load) => {
  return async dispatch => {
    
    load(true);
    try {
      const url = `${BaseUrl}get-single-shift/${id}`;

      const response = await fetch(url);
      const responseData = await response.json();
      if (responseData?.success?.status == 200) {
        load(false);
        dispatch({
          type: SINGLE_SHIFT,
          payload: responseData.success.data,
        });
      }
    } catch (error) {
      load(false);
      Toast.show('Server side Error');
      console.log('single_shift_api catch error', error);
    }
  };
};

export const facility_status_api = load => {
  return async dispatch => {
    try {
      load(true);
      const userDetails = await AsyncStorage.getItem('userDetails');
      const Data = JSON.parse(userDetails);
      const url = `${BaseUrl}get-facility/${Data.id}`;

      const response = await fetch(url);
      const responseData = await response.json();
      if (responseData?.success?.status == 200) {
        load(false);
        dispatch({
          type: FACILITY_STATUS,
          payload: responseData.success.data.account_status,
        });
      } else {
        load(false);

        Toast.show('Some thing went wrong please try again latter');
      }
    } catch (error) {
      load(false);
      Toast.show('Server side Error');
      console.log('facility_status_api catch error', error);
    }
  };
};

export const checkStatus = async type => {
  try {
    const userDetails = await AsyncStorage.getItem('userDetails');
    const Data = JSON.parse(userDetails);
    const staff = Data.role_id == '1' ? 'online-status' : 'online-status-fac';

    const url = `${BaseUrl}${staff}/${Data.id}`;
    let myData = new FormData();
    myData.append('status', type);

    await fetch(url, {
      method: 'post',
      body: myData,
    });
  } catch (error) {
    console.log('checkStatus error', error);
  }
};

export const get_inbox_api = load => {
  return async dispatch => {
    load(true);
    try {
      const userDetails = await AsyncStorage.getItem('userDetails');
      const Data = JSON.parse(userDetails);
      const url = `${BaseUrl}inbox/${Data.id}`;

      const response = await fetch(url);
      const responseData = await response.json();
      const res = responseData?.success;

      if (res?.status == 200) {
        load(false);
        dispatch({
          type: GET_INBOX,
          payload: res.lastMessages,
        });
      } else {
        load(false);
      }
    } catch (error) {
      load(false);
      Toast.show('Server side Error');
      console.log('get_inbox_api catch error', error);
    }
  };
};

export const get_chat_count_api = () => {
  return async dispatch => {
    try {
      const userDetails = await AsyncStorage.getItem('userDetails');
      const Data = JSON.parse(userDetails);
      const url = `${BaseUrl}chatCount/${Data.id}`;

      const response = await fetch(url);
      const responseData = await response.json();
      const res = responseData?.success;

      if (res?.status == 200) {
        dispatch({
          type: CHAT_COUNT,
          payload: res.count,
        });
      }
    } catch (error) {
      console.log('get_chat_count_api catch error', error);
    }
  };
};

export const sendMsg = (id, data, type, setText) => {
  return async dispatch => {
    try {
      const userData = await AsyncStorage.getItem('userDetails');
      const Data = JSON.parse(userData);
      const sender_type = Data.role_id == '1' ? 'user' : 'facility';

      const url = `${BaseUrl}store-chat`;
      let myData = new FormData();

      myData.append('reciver_id', id);
      myData.append('sender_id', Data.id);
      myData.append('sender_type', sender_type);
      {
        type == 'audio' && myData.append('audio', data);
      }
      {
        type == 'msg' && myData.append('message', data.trim());
      }
      {
        type == 'media' &&
          data?.length > 0 &&
          data?.forEach((element, index) => {
            myData.append(`media[${index}]`, element);
            console.log({id, sender_type, element}, Data.id);
          });
      }
      const response = await fetch(url, {
        method: 'post',
        body: myData,
      });
      const responseData = await response.json();

      if (responseData?.success?.status == 200) {
        dispatch(getChatMessages(id));
        setText('');
        console.log('message sent', {responseData});
      } else {
        console.log('sendMsg else error');
      }
    } catch (error) {
      console.log('catch error in sendMsg', error);
    }
  };
};

export const getMessageProfile = id => {
  return async dispatch => {
    try {
      const url = `${BaseUrl}get-chat-detail/${id}`;

      const response = await fetch(url);
      const responseData = await response.json();
      const res = responseData?.success;
      if (res?.status == 200) {
        dispatch({
          type: CHAT_PROFILE,
          payload: res.data,
        });
      }
    } catch (error) {
      Toast.show('Server side Error');
      console.log('getMessageProfile catch error', error);
    }
  };
};

export const getChatMessages = id => {
  return async dispatch => {
    try {
      const userData = await AsyncStorage.getItem('userDetails');
      const Data = JSON.parse(userData);
      const url = `${BaseUrl}get-chats/${Data?.id}/${id}`;
      console.log('==>', `${Data?.id}/${id}`);
      const response = await fetch(url);

      const responseData = await response.json();
      const res = responseData?.success;
      if (res?.status == 200) {
        dispatch({
          type: GET_MESSAGES_DATA,
          payload: res.data.reverse(),
        });
      }
    } catch (error) {
      console.log('getChatMessages catch error', error);
      Toast.show('Server side Error');
    }
  };
};

export const BitStaffAction = async (
  id,
  type,
  user_id,
  item,
  showBitsModal,
  setShowBitsModal,
  navigation,
) => {
  try {
    const userDetails = await AsyncStorage.getItem('userDetails');
    const Data = JSON.parse(userDetails);
    const url = `${BaseUrl}confirmed-shifts/${id}/${Data.id}`;
    let myData = new FormData();

    myData.append('type', type);
    myData.append('user_id', user_id);

    const response = await fetch(url, {
      body: myData,
      method: 'post',
    });
    const responseData = await response.json();
    const res = responseData?.success;
    const err = responseData?.error;
    if (res?.status == 200) {
      if (setShowBitsModal) {
        setShowBitsModal({visible: false});
        Toast.show('Bit accepted successfully');
        navigation.goBack();
      } else {
        Toast.show('You declined the bit');
        navigation.goBack();
      }
    } else if (err?.status == 400) {
      Toast.show(err.message);
    } else {
      Toast.show('Some thing went wrong');
    }
  } catch (error) {
    Toast.show('Server side Error');
    console.log('BitStaffAction catch error', error);
  }
};

export const recent_bits = load => {

  return async dispatch => {
    try {
      load(true);
      const userDetails = await AsyncStorage.getItem('userDetails');
      const Data = JSON.parse(userDetails);
      const url = `${BaseUrl}recent-bits/${Data.id}`;
      const response = await fetch(url);

      const responseData = await response.json();
      console.log(responseData)
      if (responseData?.success?.status == 200) {
        dispatch({
          type: RECENT_BITS,
          payload: responseData.success.data.reverse(),
        });
        load(false);
      } else {
        load(false);
        Toast.show(responseData.error.message);
        console.log('recent_bits else error', responseData);
      }
    } catch (error) {
      load(false);
      Toast.show('Server side Error');
      console.log('recent_bits catch error', error);
    }
  };
};

export const delete_shift_api = (id, close, nav, load) => {
  return async dispatch => {
    try {
      const url = `${BaseUrl}delete-shifts/${id}`;
      const response = await fetch(url, {
        method: 'post',
      });

      const responseData = await response.json();
      if (responseData?.success?.status == 200) {
        dispatch(get_personal_shift(load));
        nav.goBack();
        close();
      } else {
        Toast.show(responseData.error.message);
        console.log('delete_shift_api else error', responseData);
      }
    } catch (error) {
      Toast.show('Server side Error');
      console.log('delete_shift_api catch error', error);
    }
  };
};

export const boost_after_post = (id, fee, start, end, load, success, nav) => {
  return async dispatch => {
    try {
      const url = `${BaseUrl}shift-boost/${id}`;
      let myData = new FormData();

      myData.append('boost_fee', fee);
      myData.append('boost_start', start);
      myData.append('boost_end', end);

      const response = await fetch(url, {
        method: 'post',
        body: myData,
      });

      const responseData = await response.json();
      
      

      if (responseData?.success?.status == 200) {
        load(false);
        success(true);
        Toast.show('Shift boosted successfully');
        dispatch(single_shift_api(id, load));
        dispatch;
        nav.goBack();
        // dispatch(upcoming_shift_api(load));        
      } else {
        load(false);
        Toast.show(responseData.error.message);
      }
    } catch (error) {
      load(false);
      console.log('catch error in boost_after_post', error);
    }
  };
};

export const get_notification_data = load => {
  return async dispatch => {
    load(true);
    try {
      const userDetails = await AsyncStorage.getItem('userDetails');
      const Data = JSON.parse(userDetails);

      const url = `${BaseUrl}all-notification/${Data.id}`;

      const response = await fetch(url);
      const responseData = await response.json();
      if (responseData?.success?.status == 200) {
        load(false);
        dispatch({
          type: NOTIFICATION,
          payload: responseData.success.data,
        });
      }
    } catch (error) {
      Toast.show('Server side Error');
      load(false);
      console.log('get_notification_data catch error', error);
    }
  };
};

export const read_notification = (id, load) => {
  return async dispatch => {
    try {
      load(true);
      const url = `${BaseUrl}read-notification/${id}`;

      const response = await fetch(url, {
        method: 'post',
      });
      const responseData = await response.json();
      if (responseData?.success?.status == 200) {
        load(false);
        dispatch(get_notification_data(load));
        dispatch(notification_count());
      }
    } catch (error) {
      load(false);
      Toast.show('Server side Error');
      console.log('read_notification catch error', error);
    }
  };
};

export const notification_count = () => {
  return async dispatch => {
    try {
      const userDetails = await AsyncStorage.getItem('userDetails');
      const Data = JSON.parse(userDetails);

      const url = `${BaseUrl}notification-count/${Data.id}`;

      const response = await fetch(url, {
        method: 'post',
      });
      const responseData = await response.json();
      if (responseData?.success?.status == 200) {
        dispatch({
          type: NOTIFICATION_COUNT,
          payload: responseData.success.data,
        });
        // dispatch(get_notification_data(load));
      }
    } catch (error) {
      Toast.show('Server side Error');
      console.log('notification_count catch error', error);
    }
  };
};

export const todays_shift = load => {
  return async dispatch => {
    try {
      load(true);
      const userDetails = await AsyncStorage.getItem('userDetails');
      const Data = JSON.parse(userDetails);
      const url = `${BaseUrl}user-today-job/${Data.id}`;

      const response = await fetch(url);
      const responseData = await response.json();
      const res = responseData?.success;
      console.log("Todays  ========= >",res)
      if (res?.status == 200) {
        load(false);
        dispatch({
          type: TODAYS_SHIFT,
          payload: res.data.reverse(),
        });
      }
    } catch (error) {
      load(false);
      Toast.show('Server side Error');
      console.log('todays_shift catch error', error);
    }
  };
};

export const all_users_api = load => {
  return async dispatch => {
    try {
      load(true);
      const response = await fetch(`${BaseUrl}get-users`);
      const responseData = await response.json();
      const res = responseData?.success;
      if (res?.status == 200) {
        load(false);
        dispatch({
          type: ALL_USERS,
          payload: responseData.success.data.reverse(),
        });
      }
    } catch (error) {
      load(false);
      Toast.show('Server side Error');
      console.log('all_users_api catch error', error);
    }
  };
};

export const check_job_status = (status, shift_id , nav, load) => {
  return async dispatch => {
    
    try {
      load(true);
      const userDetails = await AsyncStorage.getItem('userDetails');
      const Data = JSON.parse(userDetails);
      const url = `${BaseUrl}user-job-status/${Data.id}`;
      let myData = new FormData();
     
      myData.append('status', status);

   

      myData.append('shift_id', shift_id);
      console.log("check in ----------" ,  url)
      const response = await fetch(url, {
        method: 'post',
        body: myData,
      });
      const responseData = await response.json();
      console.warn(responseData)
      const res = responseData?.success;
      
      
      if (res?.status == 200) {
        load(false);
        nav.goBack();
        dispatch(todays_shift(load));
      } else {
        load(false);
        Toast.show('try again later');
      }
    } catch (error) {
      load(false);
      Toast.show('Server side Error');
      console.log('check_job_status catch error', error);
    }
  };
};

export const all_job_api = load => {
  return async dispatch => {
    try {
      load(true);
      const userDetails = await AsyncStorage.getItem('userDetails');
      const Data = JSON.parse(userDetails);
      const url = `${BaseUrl}get-country-wise-shifts/${Data.id}`;
   
      const response = await fetch(url);
      const responseData = await response.json();
      const res = responseData?.success;
      console.log("test==================,", JSON.stringify(res.data))
      if (res?.status == 200) {
        load(false);
        dispatch({
          type: ALL_COUNTRY_DATA,
          payload: res.data.reverse(),
        });
      }
    } catch (error) {
      load(false);
      Toast.show('Server side Error');
      console.log('all_users_api catch error', error);
    }
  };
};

export const bookmark_api = (id, load , typeCard) => {

  return async dispatch => {
    try {
      load(true);
      const userDetails = await AsyncStorage.getItem('userDetails');
      const Data = JSON.parse(userDetails);
      const user_id  = Data.id;
      
      let myData =  new FormData();
      myData.append("user_id", user_id)
   
      const url = `${BaseUrl}book-marked-shifts/${id}`;

    

      const response = await fetch(url, {
        method: 'POST',
        body:myData
      });
      const responseData = await response.json();

      console.log("Test===================" , responseData)
      const message = responseData?.message;
      const status = responseData?.status;


      if (status == 200) {
        load(false);
        if(typeCard == "favJob"){
          dispatch(fav_job_api(load));
        }else{
          dispatch(recent_bits(load));
        }
        
      } else {
        load(false);
        Toast.show('Try again later');
      }
    } catch (error) {
      load(false);
      Toast.show('Server side Errorr');
      console.log('bookmark_api catch error', error);
    }
  };
};

export const fav_job_api = load => {
  return async dispatch => {
    try {
      load(true);
      const userDetails = await AsyncStorage.getItem('userDetails');
      const Data = JSON.parse(userDetails);
      const url = `${BaseUrl}get-book-marked-shifts/${Data.id}`;
      const response = await fetch(url);
      
      console.log(url)


      const responseData = await response.json();

      

      const res = responseData?.success;
      const err = responseData?.error;
      if (res?.status == 200) {
        dispatch({
          type: FAV_JOB,
          payload: res.data.reverse(),
        });
        load(false);
      } else {
        load(false);
        Toast.show(err.message);
        console.log('fav_job_api else error', responseData);
      }
    } catch (error) {
      load(false);
      Toast.show('Server side Error');
      console.log('fav_job_api catch error', error);
    }
  };
};

export const get_all_check_api = load => {
  return async dispatch => {
    try {
      load(true);
      const userDetails = await AsyncStorage.getItem('userDetails');
      const Data = JSON.parse(userDetails);
      const url = `${BaseUrl}user-job-details/${Data.id}`;
      const response = await fetch(url);

      const responseData = await response.json();
      const res = responseData?.success;
      const err = responseData?.error;
      if (res?.status == 200) {
        dispatch({
          type: ALL_CHECK,
          payload: res.data.reverse(),
        });
        load(false);
      } else {
        load(false);
        Toast.show(err.message);
        console.log('get_all_check_api else error', responseData);
      }
    } catch (error) {
      load(false);
      Toast.show('Server side Error');
      console.log('get_all_check_api catch error', error);
    }
  };
};

export const get_manage_staff_api = (name, load) => {
  return async dispatch => {
    try {
      load(true);
      const val =
        name == 'Staff' ? 'users' : name == 'Facility' ? 'facility' : 'admins';

      const url = `${BaseUrl}get-${val}`;
      const response = await fetch(url);

      const responseData = await response.json();
      const res = responseData?.success;
      if (res?.status == 200) {
        dispatch({
          type: MANAGE_STAFF,
          payload: res.data.reverse(),
        });
        load(false);
      }
    } catch (error) {
      load(false);
      Toast.show('Server side Error');
      console.log('get_manage_staff_api catch error', error);
    }
  };
};

export const get_all_invoice_api = load => {
  return async dispatch => {
    try {
      load(true);
      const url = `${BaseUrl}get-all-invoice-admin`;
      const response = await fetch(url);

      const responseData = await response.json();
      const res = responseData?.success;
      if (res?.status == 200) {
        dispatch({
          type: ALL_INVOICE,
          payload: res.data,
        });
        load(false);
      }
    } catch (error) {
      load(false);
      Toast.show('Server side Error');
      console.log('get_manage_staff_api catch error', error);
    }
  };
};

export const write_review_api = async (state, user_id, shift_id, load, nav) => {
  try {
    load(true);
    const url = `${BaseUrl}store-review/${user_id}`;
    let myData = new FormData();
    myData.append('content', state.value);
    myData.append('stars', state.rate);
    myData.append('recommend', state.select ? 1 : 0);
    myData.append('shift_id', shift_id);

    const response = await fetch(url, {
      method: 'POST',
      body: myData,
    });

    const responseData = await response.json();
    const res = responseData?.success;
    if (res?.status == 200) {
      nav.navigate('home');
      Toast.show('Review Submitted');
      load(false);
    }
  } catch (error) {
    load(false);
    Toast.show('Server side Error');
    console.log('get_manage_staff_api catch error', error);
  }
};

export const adminAddNewStaff = (
  data,
  profile_image,
  type,
  name,
  setLoader,
  setError,
  setErrMsg,
  navigation,
) => {
  return async dispatch => {
    try {
      setLoader(true);
      const userData = await AsyncStorage.getItem('userDetails');
      const parseData = JSON.parse(userData);
      const url = `${BaseUrl}user-registration`;
      let myData = new FormData();

      {
        name != 'Facility' && myData.append('last_name', data?.l_name);
      }
      {
        name != 'Facility'
          ? myData.append('email', data?.email)
          : myData.append('facility_email', data?.email);
      }
      {
        name != 'Facility'
          ? myData.append('first_name', data?.f_name)
          : myData.append('facility_name', data?.f_name);
      }
      {
        name != 'Facility'
          ? myData.append('phone', data?.phone)
          : myData.append('phone_number', data?.phone);
      }
      {
        name != 'Facility'
          ? myData.append('Address_line_1', data?.address_one)
          : myData.append('address_1', data?.address_one);
      }
      {
        name != 'Facility'
          ? myData.append('Address_line_2', data?.address_two)
          : myData.append('address_2', data?.address_two);
      }

      myData.append('password', data?.password);
      myData.append('state', data?.state);
      myData.append('device_name', parseData?.device_name);
      myData.append('device_token', parseData?.device_token);
      myData.append(
        'role_id',
        name == 'Staff' ? 1 : name == 'Facility' ? 3 : 2,
      );
      myData.append('country', data?.country);
      myData.append('zip_code', data?.zip);
      myData.append('profile_image', profile_image?.uri);
      myData.append('type', type);

      const response = await fetch(url, {
        method: 'POST',
        body: myData,
      });

      const responseData = await response.json();

      if (responseData?.success?.status == 200) {
        dispatch(get_manage_staff_api(name, setLoader));
        setTimeout(() => {
          Toast.show('Successfully Added!');
          setLoader(false);
          navigation.goBack();
        }, 1000);
      } else {
        setErrMsg(responseData?.error?.message);
        setLoader(false);
        setTimeout(() => {
          setError(true);
        }, 1000);
        setTimeout(() => {
          setError(false);
        }, 4000);
      }
    } catch (error) {
      setLoader(false);
      console.log('adminAddNewStaff error', error);
    }
  };
};
export const adminAddNewAdmin = (
  data,
  profile_image,
  type,
  name,
  role,
  setLoader,
  setError,
  setErrMsg,
  navigation,
) => {
  return async dispatch => {
    console.log(role);
    try {
      setLoader(true);
      const userData = await AsyncStorage.getItem('userDetails');
      const parseData = JSON.parse(userData);
      const url = `${BaseUrl}admin-register`;
      let myData = new FormData();

      myData.append('name', data?.f_name);
      myData.append('email', data?.email);
      myData.append('phone_number', data?.phone);
      myData.append('password', data?.password);
      myData.append('device_name', parseData?.device_name);
      myData.append('device_token', parseData?.device_token);
      myData.append('profile_image', profile_image?.uri);
      myData.append('roles', role);
      myData.append(
        'role_id',
        name == 'Staff' ? 1 : name == 'Facility' ? 3 : 2,
      );

      const response = await fetch(url, {
        method: 'POST',
        body: myData,
      });

      const responseData = await response.json();
      if (responseData?.success?.status == 200) {
        dispatch(get_manage_staff_api(name, setLoader));
        setTimeout(() => {
          Toast.show('Successfully Added!');
          setLoader(false);
          navigation.goBack();
        }, 1000);
      } else {
        setErrMsg(responseData?.error?.message);
        setLoader(false);
        setTimeout(() => {
          setError(true);
        }, 1000);
        setTimeout(() => {
          setError(false);
        }, 4000);
      }
    } catch (error) {
      setLoader(false);
      console.log('adminAddNewStaff error', error);
    }
  };
};
export const adminEditStaff = (
  userData,
  data,
  status,
  name,
  profile_image,
  setLoader,
  setError,
  setErrMsg,
  navigation,
  hourlyRated,
) => {
  return async dispatch => {
    try {
      setLoader(true);
      const url = `${BaseUrl}update-user/${userData?.id}`;
      let myData = new FormData();

      {
        name != 'Facility' && myData.append('last_name', data?.l_name);
      }
      {
        name != 'Facility'
          ? myData.append('first_name', data?.f_name)
          : myData.append('facility_name', data?.f_name);
      }
      {
        name != 'Facility'
          ? myData.append('phone', data?.phone)
          : myData.append('phone_number', data?.phone);
      }
      {
        name != 'Facility'
          ? myData.append('status', status == 1 ? 'Active' : 'Inactive')
          : myData.append(
              'account_status',
              status == 1 ? 'Active' : 'Inactive',
            );
      }

      {
        profile_image?.uri && myData.append('profile_image', profile_image);
      }
      myData.append('role_id', userData?.role_id);
      {
        name == 'Facility' &&
          (myData.append('hourly_rate', JSON.stringify(hourlyRated)),
          myData.append('platform_fee', data.platform_fee));
      }
      const response = await fetch(url, {
        method: 'POST',
        body: myData,
      });

      const responseData = await response.json();
      if (responseData?.success?.status == 200) {
        dispatch(get_manage_staff_api(name, setLoader));
        setTimeout(() => {
          Toast.show('Successfully Updated!');
          setLoader(false);
          navigation.goBack();
        }, 1000);
      } else {
        setErrMsg(responseData?.error?.message);
        setLoader(false);
        setTimeout(() => {
          setError(true);
        }, 1000);
        setTimeout(() => {
          setError(false);
        }, 4000);
      }
    } catch (error) {
      setLoader(false);
      console.log('adminEditStaff error', error);
    }
  };
};
export const adminEditAdmin = (
  userData,
  data,
  status,
  name,
  profile_image,
  setLoader,
  setError,
  setErrMsg,
  navigation,
) => {
  return async dispatch => {
    try {
      setLoader(true);
      const url = `${BaseUrl}update-user/${userData?.id}`;
      let myData = new FormData();

      {
        profile_image?.uri && myData.append('profile_image', profile_image);
      }
      myData.append('name', data?.f_name);
      myData.append('phone_number', data?.phone);
      myData.append('status', status == 1 ? 'Active' : 'Inactive');
      myData.append('role_id', userData?.role_id);

      const response = await fetch(url, {
        method: 'POST',
        body: myData,
      });

      const responseData = await response.json();

      if (responseData?.success?.status == 200) {
        dispatch(get_manage_staff_api(name, setLoader));
        setTimeout(() => {
          Toast.show('Successfully Updated!');
          setLoader(false);
          navigation.goBack();
        }, 1000);
      } else {
        setErrMsg(responseData?.error?.message);
        setLoader(false);
        setTimeout(() => {
          setError(true);
        }, 1000);
        setTimeout(() => {
          setError(false);
        }, 4000);
      }
    } catch (error) {
      setLoader(false);
      console.log('adminEditStaff error', error);
    }
  };
};

export const create_service = (data, hide, load) => {
  return async dispatch => {
    try {
      const url = `${BaseUrl}create-service`;
      let myData = new FormData();
      myData.append('service_name', data.name);
      myData.append('details', data.detail);
      myData.append('min_amount', data.amount);

      const response = await fetch(url, {
        method: 'POST',
        body: myData,
      });
      const responseData = await response.json();
      const res = responseData?.success;
      if (res?.status == 200) {
        load(false);
        Toast.show('Service Created');
        hide();
        dispatch(get_service_api(load));
      } else {
        load(false);
        Toast.show('Something went wrong');
      }
    } catch (e) {
      Toast.show('Server side Error');
      console.log('create_service error', e);
      load(false);
    }
  };
};

export const get_service_api = load => {
  return async dispatch => {
    load(true);
    try {
      const url = `${BaseUrl}get-services`;
      const response = await fetch(url);
      const responseData = await response.json();
      const res = responseData?.success;
      if (res?.status == 200) {
        dispatch({type: GET_SERVICE, payload: res?.data.reverse()});
        load(false);
      } else {
        load(false);
        Toast.show('Something went wrong');
      }
    } catch (e) {
      Toast.show('Server side Error');
      console.log('get_Service_api error', e);
      load(false);
    }
  };
};

export const service_status = (item, load) => {
  return async dispatch => {
    load(true);
    try {
      const url = `${BaseUrl}suspend-service/${item.id}`;

      const response = await fetch(url, {
        method: 'POST',
      });
      const responseData = await response.json();
      const res = responseData?.success;
      if (res?.status == 200) {
        load(false);
        dispatch(get_service_api(load));
      } else {
        load(false);
        Toast.show('Something went wrong');
      }
    } catch (e) {
      Toast.show('Server side Error');
      console.log('service_status error', e);
      load(false);
    }
  };
};

export const edit_service = (item, data, load, nav) => {
  return async dispatch => {
    load(true);
    try {
      const url = `${BaseUrl}update-service/${item.id}`;
      let myData = new FormData();
      myData.append('service_name', data.name);
      myData.append('details', data.detail);
      myData.append('min_amount', data.amount);

      const response = await fetch(url, {
        method: 'POST',
        body: myData,
      });
      const responseData = await response.json();
      const res = responseData?.success;
      if (res?.status == 200) {
        load(false);
        dispatch(get_service_api(load));
        nav.goBack();
        Toast.show('Service Updated');
      } else {
        load(false);
        Toast.show('Something went wrong');
      }
    } catch (error) {
      Toast.show('Server side Error');
      load(false);
      console.log('edit_service catch error', error);
    }
  };
};

export const edit_invoice_api = (id, data, date, status, nav, load) => {
  return async dispatch => {
    try {
      load(true);
      const url = `${BaseUrl}edit-single-invoice/${id}`;

      let myData = new FormData();

      myData.append('title', data.title);
      myData.append('amount', data.amount);
      myData.append('client', data.client);
      myData.append('telephone', data.telephone);
      myData.append('email', data.email);
      myData.append('company', data.company);
      myData.append('vat', data.vat);
      myData.append('address', data.address);
      myData.append('description', data.details);
      myData.append('bill_to', data.bill_to);
      myData.append('amount_due', data.amount_due);
      myData.append('status ', status);

      {
        date && myData.append('due_date', date);
      }

      const response = await fetch(url, {
        method: 'POST',
        body: myData,
      });
      const responseData = await response.json();
      const res = responseData?.success;
      if (res?.status == 200) {
        load(false);
        nav.goBack();
        dispatch(get_all_invoice_api(load));
        Toast.show('Invoice Created');
      } else {
        load(false);
        Toast.show('Something went wrong');
      }
    } catch (error) {
      load(false);
      Toast.show('Server side Error');
      console.log('create_invoice_api catch error', error);
    }
  };
};
export const create_invoice_api = (data, date, status, nav, load) => {
  return async dispatch => {
    try {
      load(true);
      const UserDetails = await AsyncStorage.getItem('UserDetails');
      const userData = JSON.parse(UserDetails);
      const url = `${BaseUrl}store-admin-invoice/${userData.id}`;

      let myData = new FormData();

      myData.append('transaction_id', data.id);
      myData.append('bank_name', data.bank_name);

      myData.append('title', data.title);
      myData.append('amount', data.amount);
      myData.append('client', data.client);
      myData.append('telephone', data.telephone);
      myData.append('email', data.email);
      myData.append('company', data.company);
      myData.append('vat', data.vat);
      myData.append('address', data.address);
      myData.append('description', data.details);
      myData.append('bill_to', data.bill_to);
      myData.append('amount_due', data.amount_due);
      myData.append('status ', status);

      {
        date && myData.append('due_date', date);
      }

      const response = await fetch(url, {
        method: 'POST',
        body: myData,
      });
      const responseData = await response.json();
      const res = responseData?.success;
      if (res?.status == 200) {
        load(false);
        nav.goBack();
        dispatch(get_all_invoice_api(load));
        Toast.show('Invoice Created');
      } else {
        load(false);
        Toast.show('Something went wrong');
      }
    } catch (error) {
      load(false);
      Toast.show('Server side Error');
      console.log('create_invoice_api catch error', error);
    }
  };
};

export const stole_role_permissions = (name, role_array, load) => {
  return async dispatch => {
    load(true);
    try {
      const url = `${BaseUrl}roles-permission`;
      let myData = new FormData();

      myData.append('roles', name);
      myData.append('permission', JSON.stringify(role_array));

      const response = await fetch(url, {
        method: 'POST',
        body: myData,
      });
      const responseData = await response.json();
      const res = responseData?.success;
      if (res?.status == 200) {
        load(false);
        dispatch(get_role_api());

        Toast.show('Role Permission Updated');
      } else {
        load(false);
        Toast.show('Something went wrong');
      }
    } catch (error) {
      load(false);
      Toast.show('Server side Error');
      console.log('stole_role_permissions catch error', error);
    }
  };
};

export const update_role_permissions = (id,name, role_array, load,nav) => {
  return async dispatch => {
    load(true);
    try {
      const url = `${BaseUrl}edit-role-permission/${id}`;
      let myData = new FormData();

      myData.append('roles', name);
      myData.append('permission', JSON.stringify(role_array));

      const response = await fetch(url, {
        method: 'POST',
        body: myData,
      });
      const responseData = await response.json();
      const res = responseData?.success;
      if (res?.status == 200) {
        load(false);
        dispatch(get_role_api());
        Toast.show('Role Permission Updated');
        nav.goBack();
      } else {
        load(false);
        Toast.show('Something went wrong');
      }
    } catch (error) {
      load(false);
      Toast.show('Server side Error');
      console.log('update_role_permissions catch error', error);
    }
  };
};

export const get_role_api = () => {
  return async dispatch => {
    try {
      const url = `${BaseUrl}get-roles`;
      const response = await fetch(url);
      const responseData = await response.json();
      const res = responseData?.success;
      if (res?.status == 200) {
        const transformedData = responseData.success.data.map(item => {
          return {
            key: item.id.toString(),
            value: item.roles,
            permissions: item.permission,
          };
        });

        dispatch({type: GET_ADMIN_ROLE, payload: transformedData});
      } else {
        Toast.show('Something went wrong');
      }
    } catch (error) {
      Toast.show('Server side Error');
      console.log('get_role_api catch error', error);
    }
  };
};

export const single_invoice_api = (id, invoice_by, load) => {
  load(true);
  return async dispatch => {
    try {
      const url = `${BaseUrl}single-invoice/${id}`;
      let myData = new FormData();
      myData.append('invoice_by', invoice_by);

      const response = await fetch(url, {
        body: myData,
        method: 'POST',
      });
      const responseData = await response.json();
      const res = responseData?.success;
      if (res?.status == 200) {
        dispatch({type: SINGLE_INVOICE_DATA, payload: res.data});
        load(false);
      } else {
        load(false);
        Toast.show('Something went wrong');
      }
    } catch (error) {
      Toast.show('Server side Error');
      console.log('single_invoice_shift catch error', error);
      load(false);
    }
  };
};

export const delete_role_api = (item, load) => {
  return async dispatch => {
    load(true);
    try {
      const url = `${BaseUrl}delete-role/${item.key}`;

      const response = await fetch(url, {
        method: 'POST',
      });
      const responseData = await response.json();
      const res = responseData?.success;
      const err = responseData?.error;
      if (res?.status == 200) {
        load(false);
        dispatch(get_role_api());
        Toast.show('Role Deleted');
      } else if (err.status == 400) {
        load(false);
        Toast.show(err.message);
      } else {
        load(false);
        Toast.show('Something went wrong');
      }
    } catch (error) {
      load(false);
      Toast.show('Server side Error');
      console.log('delete_role_api catch error', error);
    }
  };
};

export const get_facility_completed = load => {
  return async dispatch => {
    try {
      const userDetails = await AsyncStorage.getItem('userDetails');
      const Data = JSON.parse(userDetails);
      const url = `${BaseUrl}facility-ongoing-shifts/${Data.id}`;

      const response = await fetch(url);
      const responseData = await response.json();
      const res = responseData?.success;
      console.log(res.data.completed_shifts);
      if (res?.status == 200) {
        dispatch({
          type: GET_FACILITY_ONGOING,
          payload: res.data.completed_shifts,
        });
        load(false);
      } else {
        load(false);
        Toast.show('Something went wrong');
      }
    } catch (error) {
      load(false);
      Toast.show('Server side Error');
      console.log('get_facility_completed catch error', error);
    }
  };
};

export const get_facility_ongoing = load => {
  load(true);
  return async dispatch => {
    try {
      const userDetails = await AsyncStorage.getItem('userDetails');
      const Data = JSON.parse(userDetails);
      const url = `${BaseUrl}facility-ongoing-shifts/${Data.id}`;

      const response = await fetch(url);
      const responseData = await response.json();
      const res = responseData?.success;
      if (res?.status == 200) {
        dispatch({
          type: GET_FACILITY_ONGOING,
          payload: res.data.ongoing_shifts,
        });
        load(false);
      } else {
        load(false);
        Toast.show('Something went wrong');
      }
    } catch (error) {
      load(false);
      Toast.show('Server side Error');
      console.log('get_facility_completed catch error', error);
    }
  };
};
