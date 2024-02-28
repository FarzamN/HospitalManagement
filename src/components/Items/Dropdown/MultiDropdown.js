import {View} from 'react-native';
import React from 'react';
import {MultipleSelectList} from 'react-native-dropdown-select-list';
import {SubHead} from '../../Texts';
import {styles} from './style';
import { Colors } from '../../../utils/Colors';
import Icon, { IconType } from 'react-native-dynamic-vector-icons';

const MultiDropdown = ({
  Heading,
  defaultOption,
  data,
  setSelected,
  label,
  noMt,
  round,
  onSelect,
}) => {
  return (
    <>
      <View style={{marginTop: noMt ? 0 : 15}} />
      {Heading && <SubHead bold text={Heading} />}
      <MultipleSelectList
        setSelected={setSelected}
        data={data}
        onSelect={onSelect}
        save="key"
        search={false}
        label={label}
        boxStyles={[styles.boxStyles, {borderRadius: round ? 100 : 10}]}
        defaultOption={defaultOption}
        inputStyles={styles.inputStyles}
        dropdownStyles={styles.dropdownStyles}
        dropdownTextStyles={styles.TextStyles}
        arrowicon={<Icon type={IconType.Entypo} name="chevron-down" size={22} color={Colors.Blue} />}
      />
    </>
  );
};

export default MultiDropdown;
