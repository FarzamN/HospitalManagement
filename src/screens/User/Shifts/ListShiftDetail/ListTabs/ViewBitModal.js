import {
  View,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import style from '../style';
import {GlobalStyle} from '../../../../../Constants/GlobalStyle';
import {Heading, SubHead} from '../../../../../components';
import {BtnData} from '../../../../../Constants/Data';
import {Colors} from '../../../../../utils/Colors';
import {useNavigation} from '@react-navigation/native';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
const ViewBitModal = ({visible, item, onClose, onPress, onDec}) => {
  const navigation = useNavigation();

  

  const handleChat = () => {
    onClose()
    navigation.navigate('chat', {
      id: item.user_id,
      role: item.role_id,
    });
  };
  return (
    <Modal
      propagateSwipe
      isVisible={visible}
      animationIn={'fadeIn'}
      style={style.MainModal}
      animationOut={'fadeOut'}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}>
      <View style={style.ModalContainer}>
        <View style={GlobalStyle.Padding}>
          <View style={[GlobalStyle.Space_Between]}>
            <View style={[GlobalStyle.Row, {width: '40%'}]}>
              <Image style={style.Dp} source={{uri: item?.profile_image}} />
              <View>
                <Heading text={item?.user_name} style={style.name} />
              </View>
            </View>

            <View style={GlobalStyle.Row}>
              <TouchableOpacity onPress={handleChat} style={{marginRight: 10}}>
                <Icon
                  size={20}
                  type={IconType.FontAwesome}
                  color={Colors.Purple}
                  name="send-o">
                  
                </Icon>
                <Heading
                  style={{fontSize: 11, color: Colors.Purple}}
                  text="Message"
                  bold
                />
              </TouchableOpacity>
              <View style={{alignItems: 'center'}}>
                {/* <Heading text={`$${Number(item?.price).toFixed(2)}`} />
                <SubHead text={`per hour`} /> */}
              </View>
            </View>
          </View>

          <View style={GlobalStyle.Vertical_Space} />

          <SubHead style={{fontSize: 17}} text="Personal Description" bold />
          <View style={GlobalStyle.Vertical_Space} />
          <SubHead style={{fontSize: 16}} text={item?.description} />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={GlobalStyle.Padding}>
          <SubHead text={item?.des} />
        </ScrollView>
        <View style={[GlobalStyle.Row, style.BtnBorder]}>
          {BtnData.map(item => {
            const {color, backgroundColor, title, id} = item;
            return (
              <Pressable
                android_ripple={
                  id == 1 ? GlobalStyle.RedRipple : GlobalStyle.WhiteRipple
                }
                style={[style.ignore, {backgroundColor}]}
                onPress={id == 1 ? onDec : onPress}>
                <SubHead
                  text={title}
                  style={{color}}
                  white={id == 1}
                  key={id.toString()}
                />
              </Pressable>
            );
          })}
        </View>
      </View>
    </Modal>
  );
};

export default ViewBitModal;
