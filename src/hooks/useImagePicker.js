import { useState } from 'react';
import { Platform } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

/* 
    const galleryOptions = props?.galleryOptions || defaultGalleryOptions;
    let defaultGalleryOptions = {
    mediaType: 'photo',
    selectionLimit: 1,
};
*/



const useImagePicker = () => {
  const [image, setImage] = useState(null);
  const [picker, setPicker] = useState(false);
  const galleryLaunch = () => {
    let options = {
      storageOptions: {
        mediaType: 'photo',
        path: 'image',
        includeExtra: true,
      },
      selectionLimit: 1,
    };
    launchImageLibrary(options, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.errorMessage) {
        console.log('ImagePicker Error:', res.errorMessage);
      } else {
        const ele = res.assets[0];
        setImage({
          name: ele.fileName,
          uri: ele.uri,
          type: ele.type,
        });
        setPicker(false);
      }
    });
  };

  const cameraLaunch = async () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    try {
      // const cameraPermission = await request(PERMISSIONS.IOS.CAMERA);
      // if (cameraPermission === 'granted') {
      launchCamera(options, res => {
        if (res.didCancel) {
          console.log('User cancelled image picker');
        } else if (res.errorMessage) {
          console.log('ImagePicker Error: ', res.errorMessage);
        } else {
          const ele = res.assets[0];
          setImage({
            name: ele.fileName,
            uri: ele.uri,
            type: ele.type,
          });
          setPicker(false);
        }
      });
      // } else {
      //   console.log('Camera permission denied');
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const requestCameraPermission = async () => {
    try {
      const permission =
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
          : PERMISSIONS.IOS.PHOTO_LIBRARY;

      const result = await request(permission, {
        title: 'App Gallery Permission',
        message: 'App needs access to your gallery ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });

      if (result === RESULTS.GRANTED) {
        console.log('You can use the camera');
        setPicker(true);
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err, 'catch error camera picker');
    }
  };

  return {
    picker,
    image,
    cameraLaunch,
    galleryLaunch,
    setPicker,
    requestCameraPermission
  };
};

export default useImagePicker;
