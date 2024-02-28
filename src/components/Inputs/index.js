import {styles} from './styles';
import {Colors} from '../../utils/Colors';
import {useController} from 'react-hook-form';
import React, {forwardRef, useState} from 'react';
import {GlobalStyle} from '../../Constants/GlobalStyle';
import {TextInput, View, Text, Pressable} from 'react-native';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';

const CustomInput = forwardRef((props, ref) => {
  const {
    phone,
    control,
    defaultValue,
    name,
    rules,
    pattern,
    onFocus,
    maxLength,
    placeholder,
    keyboardType,
    placeholderStyle,
    restyle,
    icon,
    IconName,
    type,
    password,
    white,
    onSubmitEditing
  } = props;
  const [show, setShow] = useState(true);
  const {field} = useController({
    control: control,
    defaultValue: defaultValue || '',
    name: name,
    rules: rules,
  });

  const iconColor = white ? Colors.placeholderTextColor : Colors.Purple
  return (
    <View style={styles.MainView}>
      <View style={styles.Container}>
        <View style={[GlobalStyle.Row, {width: '90%'}]}>
          {icon && (
            <Icon
              name={IconName}
              type={type}
              size={18}
              color={iconColor}
            />
          )}
          {password && (
            <Icon
              name="lock-open"
              type={IconType.SimpleLineIcons}
              size={16}
              color={iconColor}
            />
          )}
          {phone && (
            <>
              <View style={GlobalStyle.Row}>
                <Text style={styles.label}>+91</Text>
                <View style={styles.Line} />
              </View>
            </>
          )}
          <TextInput
            ref={ref}
            pattern={pattern}
            onFocus={onFocus}
            value={field.value}
            maxLength={maxLength}
            returnKeyType={'done'}
            onSubmitEditing={onSubmitEditing}
            placeholder={placeholder}
            cursorColor={Colors.Purple}
            keyboardType={keyboardType}
            onChangeText={field.onChange}
            placeholderStyle={placeholderStyle}
            style={[styles.InputStyles, restyle]}
            selectionColor="rgba(155, 100, 224, 0.5)"
            secureTextEntry={password ? show : false}
            placeholderTextColor={Colors.placeholderTextColor}
          />
          {password && (
            <Pressable
              android_ripple={GlobalStyle.Ripple}
              onPress={() => setShow(prev => !prev)}>
              <Icon
                size={20}
                color={Colors.Purple}
                type={IconType.Entypo}
                name={show ? 'eye' : 'eye-with-line'}
              />
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
});

export default CustomInput;
