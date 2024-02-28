import { View, Image, ScrollView } from 'react-native'
import React from 'react'
import style from '../style'
import { GlobalStyle } from '../../../../../Constants/GlobalStyle'
import { CustomButton, Heading, SubHead } from '../../../../../components'
import { Colors } from '../../../../../utils/Colors'
import ReactNativeModal from 'react-native-modal'

const AcceptModal = ({ isVisible, item, onClose, onPress }) => {
    return (
        <ReactNativeModal
            onBackButtonPress={onClose}
            onBackdropPress={onClose}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            isVisible={isVisible}
            propagateSwipe
            style={style.MainModal}>
            <View style={style.ModalContainer}>
                <ScrollView showsVerticalScrollIndicator={false} style={GlobalStyle.Padding}>
                    <View style={GlobalStyle.Padding}>

                        <Image style={style.BigDp} source={{ uri: item?.image }} />
                        <Heading center text={item?.name} style={style.name} />
                        <View style={GlobalStyle.Vertical_Space} />

                        <Heading center text={`Successfully! Your Award This job`} />
                        <View style={GlobalStyle.Vertical_Space} />
                    </View>
                    <SubHead center style={{ color: Colors.Grey }} text="Thank you for taking the time to share your valuable feedback. Your review has been successfully submitted and will be helpful for other shoppers seeking insights about this product. We appreciate your contribution to our community." />
                    <CustomButton round style={{ width: '80%', backgroundColor: '#B955FF', height: 55 }} title='Explore' onPress={onPress}/>

                </ScrollView>
            </View>
        </ReactNativeModal>
    )
}

export default AcceptModal