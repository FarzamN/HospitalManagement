import {AppState} from 'react-native';
import {useRef, useState,useEffect} from 'react';

const useAppStatus = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
          if (
            appState.current.match(/inactive|background/) &&
            nextAppState === 'active'
          ) {
            setAppStateVisible('Active');
          } else {
            setAppStateVisible('Inactive');
          }
    
          appState.current = nextAppState;
          // setAppStateVisible(appState.current);
        });
    
        return () => {
          subscription.remove();
        };
      }, [appStateVisible]);
    
  return {
    appStateVisible
  }
}

export default useAppStatus