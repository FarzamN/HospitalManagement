import {View, Text} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import style from '../style';
import LottieView from 'lottie-react-native';

const Complete = ({visible}) => {
  return (
    <Modal
      isVisible={visible}
      animationIn={'flash'}
      animationOut={'fadeOut'}
      style={[style.MainModal, style.Modal_Container]}>
      <View
        style={[
          style.ModalContainer,
          {
            width: '80%',
          },
        ]}>
        <LottieView
          autoPlay
          loop
          style={[style.LottieView, {height: 200, marginTop: 10}]}
          source={require('../../../assets/lottie/jobCompleted.json')}
        />
        <Text style={[style.ModalText]}>Job is Completed</Text>
      </View>
    </Modal>
  );
};

export default Complete;
