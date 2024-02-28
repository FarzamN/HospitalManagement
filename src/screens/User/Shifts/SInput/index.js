import {View, TextInput} from 'react-native';
import React from 'react';
import style from './style';
import {useController} from 'react-hook-form';
import {Colors} from '../../../../utils/Colors';
import {SubHead} from '../../../../components';

const SInput = props => {
  const {
    des,
    name,
    rules,
    pattern,
    control,
    restyle,
    onFocus,
    noHeading,
    maxLength,
    placeholder,
    MainRestyle,
    keyboardType,
    defaultValue,
    placeholderStyle,
  } = props;

  const {field} = useController({
    control: control,
    defaultValue: defaultValue || '',
    name: name,
    rules: rules,
  });
  return (
    <View style={style.MainView}>
      {!noHeading && <SubHead bold text={placeholder} />}
      <View
        style={[
          style.Container,
          {
            height: des ? 150 : 55,
            justifyContent: des ? 'flex-start' : 'center',
          },
          MainRestyle,
        ]}>
        <TextInput
          multiline={des}
          pattern={pattern}
          onFocus={onFocus}
          value={field.value}
          maxLength={maxLength}
          returnKeyType={'done'}
          placeholder={placeholder}
          cursorColor={Colors.Purple}
          keyboardType={keyboardType}
          onChangeText={field.onChange}
          placeholderTextColor="#9B9B9B"
          placeholderStyle={placeholderStyle}
          style={[style.InputStyles, restyle]}
          selectionColor="rgba(155, 100, 224, 0.5)"
        />
      </View>
    </View>
  );
};

export default SInput;
