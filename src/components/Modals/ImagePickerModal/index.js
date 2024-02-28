import { styles } from './style';
import Modal from 'react-native-modal';
import { Colors } from '../../../utils/Colors';
import Snackbar from 'react-native-snackbar';
import Toast from 'react-native-simple-toast';
import React, { useState, useEffect } from 'react';
import Icon, { IconType } from 'react-native-dynamic-vector-icons';
import { Text, View, TouchableOpacity, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const ImagePickerModal = ({ isVisible, onClose, PressPicture, PressCamera, VidType, CamType }) => {
  const white = Colors.White;
  const cameraPermissionConstant = Platform.select({
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA,
  });
  const [cameraPermission, setCameraPermission] = useState(RESULTS.UNAVAILABLE);

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const checkCameraPermission = async () => {
    const result = await check(cameraPermissionConstant);
    setCameraPermission(result);
  };

  const handleCameraPress = async () => {
    if (cameraPermission === RESULTS.GRANTED) {
      PressCamera();
    } else if (cameraPermission === RESULTS.DENIED) {
      requestCameraPermission();
    } else {
      Snackbar.show({
        text: 'Camera permission is not available.',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'red',
        textColor: Colors.White,
        action: {
          text: 'OK',
          textColor: Colors.White,
          onPress: () => {
            requestCameraPermission();
          },
        },
      });
    }
  };

  const requestCameraPermission = async () => {
    const result = await request(cameraPermissionConstant);

    if (result === RESULTS.GRANTED) {
      PressCamera();
    } else {
      Toast.show('Please grant camera permission to take a picture.');
      requestCameraPermission();
    }
  };

  return (
    <Modal
      testID={'modal'}
      statusBarTranslucent
      isVisible={isVisible}
      backdropOpacity={0.5}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      animationIn={'slideInUp'}
      animationInTiming={700}
      style={{
        margin: 0,
        justifyContent: 'flex-end',
      }}>
      <View style={styles.SecCon}>
        <TouchableOpacity onPress={PressPicture} style={styles.ModalBtn}>
          <Icon
            size={32}
            name="photo"
            color={white}
            type={IconType.MaterialIcons}
          />
          <Text style={styles.Text}>{VidType ? 'Upload Video' : 'Upload picture'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCameraPress} style={styles.ModalBtn}>
          <Icon size={30} name="camera" color={white} type={IconType.Entypo} />
          <Text style={styles.Text}>{CamType ? 'Upload picture' : 'Take a picture'}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ImagePickerModal;
