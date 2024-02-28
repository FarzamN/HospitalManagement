import {View, ScrollView, Pressable} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import style from './style';
import {CustomButton, Dropdown, Heading, SimpleButton} from '../../../components';
import {Select_Module} from '../../../Constants/Data';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {Colors} from '../../../utils/Colors';

const SearchFiler = ({visible, onClose}) => {
  const [title, setTitle] = useState('');
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
        <ScrollView style={GlobalStyle.Padding}>
            <View style={GlobalStyle.Space_Between}>
              <Heading text="Filter Result" />
              <Pressable
                onPress={onClose}
                android_ripple={GlobalStyle.RedRipple}>
                <Icon
                  name="closecircle"
                  size={20}
                  color={Colors.Grey}
                  type={IconType.AntDesign}
                />
              </Pressable>
            </View>
            <View style={GlobalStyle.Vertical_Space} />
            <Dropdown
              noMt
              value={title}
              Heading="Filter with Rating"
              items={Select_Module}
              setValue={value => setTitle(value)}
            />
            <Dropdown
              noMt
              value={title}
              Heading="Filter with Speciality"
              items={Select_Module}
              setValue={value => setTitle(value)}
            />
            <View style={GlobalStyle.Vertical_Space} />
            <CustomButton title='Apply' style={{height:50}}/>
            <View style={GlobalStyle.Vertical_Space} />
            <SimpleButton title='Clear'style={{borderWidth:1,borderColor:Colors.Main}}/>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default SearchFiler;
