import { View, Image } from 'react-native'
import React from 'react'
import RNModal from 'react-native-modal'
import style from './ModalStyle'
import { GlobalStyle } from '../../../../Constants/GlobalStyle'
import { CustomButton, Heading, SimpleButton, SubHead } from '../../../../components'
import { Colors } from '../../../../utils/Colors'

const Modal = ({ visible, onClose,onPress,onNo }) => {
    return (
        <RNModal
            isVisible={visible}
            backdropOpacity={0.4}
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            statusBarTranslucent
            swipeDirection='down'
            onSwipeComplete={onClose}
            onBackButtonPress={onClose}
            onBackdropPress={onClose}
            style={[style.MainModal, style.Modal_Container]}>
            <View style={style.ModalContainer}>
                <View style={style.ImageBox}>
                    <Image style={GlobalStyle.Image} source={require('../../../../assets/image/boost.png')} />
                </View>
                <Heading text='Boost Your Shift' />
                <SubHead style={{color:Colors.Grey}} text='The extra fee they will pay to the platform' />
                <CustomButton onPress={onPress} title='Boost Shift' round style={{ height: 50 }} />
                <SimpleButton title='No Thanks' onPress={onNo} mv={12} textStyle={{ color: Colors.Purple }} />
            </View>
        </RNModal>
    )
}

export default Modal