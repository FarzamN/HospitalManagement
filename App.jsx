import React, {useState, useEffect, useRef} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch, useSelector} from 'react-redux';
import {
  FIRST_SPLASH,
  ROLE_ID,
  SECOND_SPLASH,
  USER_DETAILS,
} from './src/redux/reducer/Holder';
import AuthNavigator from './src/navigation/AuthNavigator';
import UserNavigator from './src/navigation/UserNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Splash from './src/screens/SplashScreen';
import Onboarding from './src/screens/Swipe/Onboarding';
import OnboardingTwo from './src/screens/Swipe/OnboardingTwo';
import OneSignal from 'react-native-onesignal';
import {
  get_service_type,
  get_staff_type,
} from './src/redux/actions/AuthActions';
import {useAppStatus} from './src/hooks';
import {
  admin_dashboard_api,
  checkStatus,
  get_chat_count_api,
  get_role_api,
  graph_api,
  user_dashboard_api,
} from './src/redux/actions/UserAction';

const App = () => {
  const dispatch = useDispatch();
  const {appStateVisible} = useAppStatus();

  const [loading, setLoading] = useState(true);
  const [_, setLoad] = useState(true);
  const first_splash = useSelector(state => state.first_splash);
  const second_splash = useSelector(state => state.second_splash);
  const userDetails = useSelector(state => state.userDetails);
  // console.log(userDetails)

  const firstSplash = async () => {
    const getData = await AsyncStorage.getItem('first_splash');
    dispatch({type: FIRST_SPLASH, payload: getData});
  };

  const secondSplash = async () => {
    const getData = await AsyncStorage.getItem('second_splash');
    dispatch({type: SECOND_SPLASH, payload: getData});
  };
  const checkLoginState = async () => {
    const data = await AsyncStorage.getItem('userDetails');
    const role = await AsyncStorage.getItem('role_id');
    const userData = JSON.parse(data);
    if (userData != null) {
      dispatch({type: USER_DETAILS, payload: userData});
      dispatch({type: ROLE_ID, payload: role});
    }
  };

  useEffect(() => {
    secondSplash();
    firstSplash();
    checkLoginState();
    dispatch(get_staff_type());
    dispatch(get_service_type());
    dispatch(graph_api(null, setLoad));
    dispatch(get_role_api());
  }, []);

  useEffect(() => {
    if (userDetails != null) {
      checkStatus(appStateVisible);
      dispatch(get_chat_count_api());
      dispatch(admin_dashboard_api(null));
    }
  }, []);

  useEffect(() => {
    if (userDetails != null) {
      const admin = userDetails.role_id == 2;
      if (!admin) {
        dispatch(user_dashboard_api());
      }
    }
  }, []);

  useEffect(() => {
    OneSignal.setAppId('a444a90e-416e-4c61-bb3b-5e5263693896');
    // OneSignal.promptForPushNotificationsWithUserResponse()
    OneSignal.setNotificationWillShowInForegroundHandler(
      notificationReceivedEvent => {
        let notification = notificationReceivedEvent.getNotification();
        OneSignal.add;
        const data = notification.additionalData;

        notificationReceivedEvent.complete(notification);
      },
    );
    OneSignal.addSubscriptionObserver(async event => {
      if (event.to.isSubscribed) {
        const state = await OneSignal.getDeviceState();
        await AsyncStorage.setItem('onesignaltoken', state.userId);
        console.log('state.userId', state.userId);
      }
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 300);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {loading ? (
        <Splash />
      ) : (
        <>
          {userDetails == null &&
            first_splash == null &&
            second_splash == null && <Onboarding />}
          {userDetails == null &&
            first_splash != null &&
            second_splash == null && <OnboardingTwo />}

          {userDetails == null &&
            first_splash != null &&
            second_splash != null && <AuthNavigator />}
          {userDetails != null && <UserNavigator />}
        </>
      )}
    </>
  );
};
export default App;
