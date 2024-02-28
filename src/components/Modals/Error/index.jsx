import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import style from '../style';

const Error = ({message, visible}) => {
  return (
    <Modal
    isVisible={visible}
      animationIn={'flash'}
      animationOut={'fadeOut'}
      style={[style.MainModal, style.Modal_Container]}>
      <SafeAreaView style={style.ModalContainer}>
        <LottieView
          autoPlay
          loop={false}
          style={style.LottieView}
          source={require('../../../assets/lottie/error.json')}
        />
        <Text style={[style.ModalText, {color: 'red'}]}>{message}</Text>
      </SafeAreaView>
    </Modal>
  );
};
export default Error;
