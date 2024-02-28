import React from 'react';
import style from './style';
import Modal from 'react-native-modal';
import {View, Image, ScrollView} from 'react-native';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import {CustomButton, Heading, SubHead} from '../../../../components';
const SuccessBoost = ({visible, onClose}) => {
  return (
    <Modal
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      isVisible={visible}
      propagateSwipe
      style={style.MainModal}>
      <View style={style.ModalContainer}>
        <ScrollView>
          <View style={GlobalStyle.Padding}>
            <View style={style.ImageBox}>
              <Image
                source={require('../../../../assets/image/boost.png')}
                resizeMode="contain"
                style={GlobalStyle.Image}
              />
            </View>

            <View style={GlobalStyle.Vertical_Space} />

            <Heading
              text="Successfully! You Boost Your Job"
              center
              style={style.heading}
            />
            <SubHead
              center
              text={
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a imperdiet tortor. Mauris sed nisl id odio dictum pulvinar non finibus nibh. Aenean aliquet nulla nec lorem porta luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a imperdiet tortor. Mauris sed nisl id odio dictum pulvinar non finibus nibh. Aenean aliquet nulla nec lorem porta luctus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a imperdiet tortor. Mauris sed nisl id odio dictum pulvinar non finibus nibh. Aenean aliquet nulla nec lorem porta luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a imperdiet tortor. Mauris sed nisl id odio dictum pulvinar non finibus nibh. Aenean aliquet nulla nec lorem porta luctus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a imperdiet tortor. Mauris sed nisl id odio dictum pulvinar non finibus nibh. Aenean aliquet nulla nec lorem porta luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a imperdiet tortor. Mauris sed nisl id odio dictum pulvinar non finibus nibh. Aenean aliquet nulla nec lorem porta luctus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a imperdiet tortor. Mauris sed nisl id odio dictum pulvinar non finibus nibh. Aenean aliquet nulla nec lorem porta luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a imperdiet tortor. Mauris sed nisl id odio dictum pulvinar non finibus nibh. Aenean aliquet nulla nec lorem porta luctus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a imperdiet tortor. Mauris sed nisl id odio dictum pulvinar non finibus nibh. Aenean aliquet nulla nec lorem porta luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a imperdiet tortor. Mauris sed nisl id odio dictum pulvinar non finibus nibh. Aenean aliquet nulla nec lorem porta luctus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a imperdiet tortor. Mauris sed nisl id odio dictum pulvinar non finibus nibh. Aenean aliquet nulla nec lorem porta luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a imperdiet tortor. Mauris sed nisl id odio dictum pulvinar non finibus nibh. Aenean aliquet nulla nec lorem porta luctus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a imperdiet tortor. Mauris sed nisl id odio dictum pulvinar non finibus nibh. Aenean aliquet nulla nec lorem porta luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a imperdiet tortor. Mauris sed nisl id odio dictum pulvinar non finibus nibh. Aenean aliquet nulla nec lorem porta luctus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a imperdiet tortor. Mauris sed nisl id odio dictum pulvinar non finibus nibh. Aenean aliquet nulla nec lorem porta luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a imperdiet tortor. Mauris sed nisl id odio dictum pulvinar non finibus nibh. Aenean aliquet nulla nec lorem porta luctus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a imperdiet tortor. Mauris sed nisl id odio dictum pulvinar non finibus nibh. Aenean aliquet nulla nec lorem porta luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a imperdiet tortor. Mauris sed nisl id odio dictum pulvinar non finibus nibh. Aenean aliquet nulla nec lorem porta luctus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a imperdiet tortor. Mauris sed nisl id odio dictum pulvinar non finibus nibh. Aenean aliquet nulla nec lorem porta luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a imperdiet tortor. Mauris sed nisl id odio dictum pulvinar non finibus nibh. Aenean aliquet nulla nec lorem porta luctus.'
              }
            />
            <CustomButton round title="Boost More" style={{width: '80%',marginBottom: 10}} />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default SuccessBoost;
