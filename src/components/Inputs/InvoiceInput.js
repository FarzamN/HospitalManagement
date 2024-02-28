import {View, TextInput} from 'react-native';
import React, {forwardRef} from 'react';
import {useController} from 'react-hook-form';
import {Colors} from '../../utils/Colors';
import {styles} from './styles';
// import {  } from 'react-native-paper';

const InvoiceInput = forwardRef((props, ref) => {
  const {
    placeholder,
    keyboardType,
    restyle,
    control,
    defaultValue,
    name,
    rules,
    width,
    height,
    multiline,
  } = props;

  const {field} = useController({
    control: control,
    defaultValue: defaultValue || '',
    name: name,
    rules: rules,
  });
  return (
    <View style={{width, height}}>
      <TextInput
        ref={ref}
        value={field.value}
        multiline={multiline}
        returnKeyType={'done'}
        placeholder={placeholder}
        cursorColor={Colors.Purple}
        keyboardType={keyboardType}
        onChangeText={field.onChange}
        style={[styles.InvoiceInputStyles, restyle]}
        selectionColor="rgba(155, 100, 224, 0.5)"
        placeholderTextColor={Colors.placeholderTextColor}
      />
    </View>
  );
});

export default InvoiceInput;
