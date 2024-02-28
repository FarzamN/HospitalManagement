import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import style from '../style';

const Index = ({visible}) => {
  return (
    <Modal
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      isVisible={visible}
      style={[style.MainModal, style.Modal_Container]}>
      <SafeAreaView style={[style.ModalContainer, { backgroundColor: '#FCFCFC', borderWidth: 0.8 }]}>
        <LottieView
          autoPlay
          style={style.LottieView}
          source={require('../../../assets/lottie/loader.json')}
        />
        <Text style={style.ModalText}>Please Wait...</Text>
      </SafeAreaView>
    </Modal>
  );
};

export default Index