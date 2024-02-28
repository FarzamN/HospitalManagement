import {useState} from 'react';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {iOS} from '../Constants/Responsive';

const useCameraPermission = () => {
  const [cameraPermission, setCameraPermission] = useState('denied');

  const requestCameraPermission = async () => {
    try {
      let permissionType;
      if (iOS) {
        permissionType = PERMISSIONS.IOS.CAMERA;
      } else {
        permissionType = PERMISSIONS.ANDROID.CAMERA;
      }

      const permissionStatus = await check(permissionType);
      if (permissionStatus === RESULTS.GRANTED) {
        setCameraPermission('granted');
      } else if (permissionStatus === RESULTS.DENIED) {
        const result = await request(permissionType);
        if (result === RESULTS.GRANTED) {
          setCameraPermission('granted');
        }
      }
    } catch (error) {
      console.error('Error while handling camera permission:', error);
    }
  };

  return {
    requestCameraPermission,
    cameraPermission,
  };
};

export default useCameraPermission;
