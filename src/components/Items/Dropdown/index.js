import React from 'react';
import {styles} from './style';
import {Colors} from '../../../utils/Colors';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {SelectList} from 'react-native-dropdown-select-list';
import {SubHead} from '../../Texts';
import {View} from 'react-native';

const Dropdown = ({
  Heading,
  defaultOption,
  items,
  setValue,
  placeholder,
  noMt,
  round,
}) => {
  return (
    <>
      <View style={{marginTop: noMt ? 0 : 15}} />
      {Heading && <SubHead bold text={Heading} />}
      <SelectList
        save={'value'}
        data={items}
        search={false}
        setSelected={setValue}
        placeholder={placeholder}
        boxStyles={[styles.boxStyles, {borderRadius: round ? 100 : 10}]}
        defaultOption={defaultOption}
        inputStyles={styles.inputStyles}
        dropdownStyles={styles.dropdownStyles}
        dropdownTextStyles={styles.TextStyles}
        arrowicon={
          <Icon
            type={IconType.Entypo}
            name="chevron-down"
            size={22}
            color={Colors.Blue}
          />
        }
      />
    </>
  );
};

export default Dropdown;
