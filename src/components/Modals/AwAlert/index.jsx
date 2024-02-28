import React from 'react';
import style from '../style';
import AwesomeAlert from 'react-native-awesome-alerts';

const AwAlert = ({
  visible,
  title,
  onClose,
  confirmText,
  onPress,
  cancelText,
  cancelColor,
  confirmColor,
}) => {
  return (
    <AwesomeAlert
      title={title}
      show={visible}
      showCancelButton
      showConfirmButton
      showProgress={false}
      cancelText={cancelText}
      onCancelPressed={onClose}
      confirmText={confirmText}
      onConfirmPressed={onPress}
      titleStyle={style.titleStyle}
      closeOnTouchOutside={false}
      closeOnHardwareBackPress={false}
      overlayStyle={style.overlayStyle}
      cancelButtonStyle={{backgroundColor: cancelColor}}
      contentContainerStyle={style.contentContainerStyle}
      confirmButtonStyle={{backgroundColor: confirmColor}}
    />
  );
};

export default AwAlert;
