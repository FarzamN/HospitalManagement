import React, {useState, useRef} from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {GlobalStyle} from '../../../../../../Constants/GlobalStyle';
import {Colors} from '../../../../../../utils/Colors';
import style from './style';

const JobsDetail = ({data, onEdit, onDelete, personal, black}) => {
  const {subject, detail} = data;
  const [show, setShow] = useState(false);
  const color = black ? Colors.Black : Colors.placeholderTextColor;

  const slideAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const toggleShow = () => {
    setShow(!show);
    Animated.timing(slideAnim, {
      toValue: show ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.timing(rotateAnim, {
      toValue: show ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const slideStyle = {
    height: slideAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 100],
    }),
    opacity: slideAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    overflow: 'hidden',
  };

  const rotateStyle = {
    transform: [
      {
        rotate: rotateAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '90deg'],
        }),
      },
    ],
  };

  return (
    <View style={{marginTop: 10}}>
      <View style={GlobalStyle.Space_Between}>
        <TouchableOpacity onPress={toggleShow} style={GlobalStyle.Row}>
          <Animated.View style={rotateStyle}>
            <Icon
              size={20}
              name="caretright"
              type={IconType.AntDesign}
              color={black ? Colors.Purple : Colors.placeholderTextColor}
            />
          </Animated.View>
          <Text style={[style.CardTitle, {color, width: '80%'}]}>
            {subject}
          </Text>
        </TouchableOpacity>
        {personal && (
          <View style={GlobalStyle.Row}>
            <TouchableOpacity onPress={onEdit}>
              <Icon
                size={20}
                color="green"
                name="edit"
                type={IconType.MaterialIcons}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete} style={{marginHorizontal: 5}}>
              <Icon
                size={20}
                color="red"
                name="delete"
                type={IconType.MaterialCommunityIcons}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Animated.View style={slideStyle}>
        <Text style={[style.CardTitle, {color, marginTop: 10}]}>{detail}</Text>
      </Animated.View>
    </View>
  );
};

export default JobsDetail;
