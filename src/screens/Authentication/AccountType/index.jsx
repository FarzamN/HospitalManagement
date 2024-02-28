import React, {useState} from 'react';
import style from './style';
import {View, StatusBar} from 'react-native';
import {CustomButton,  Heading, Logo, SubHead,Background} from '../../../components';
import {Colors} from '../../../utils/Colors';
import {accType} from '../../../Constants/Data';
import Selector from './Selector';
import {GlobalStyle} from '../../../Constants/GlobalStyle';

const Index = ({navigation}) => {
  const [select, setSelect] = useState('');
  const isNull = select == '';
  return (
    <Background style={GlobalStyle.Padding}>
      <StatusBar backgroundColor={Colors.White} barStyle="dark-content" />
      <Logo text colored />
      <Heading
        center
        style={style.heading}
        text={`Account type${`\n`}selection`}
      />
      <SubHead
        grey
        center
        style={style.sub}
        text="Fusce porttitor, velit volutpat mollis porta, nisi tellus viverra purus, in condimentum metu neque eget diam."
      />
      <View
        style={[GlobalStyle.MapContainer, {justifyContent: 'space-evenly'}]}>
        {accType.map(item => (
          <Selector
            data={item}
            key={item.id}
            focus={select == item.id}
            onPress={() => setSelect(item.id)}
          />
        ))}
      </View>
      <CustomButton
        disabled={isNull}
        style={{
          marginVertical: 20,
          width: !isNull ? '100%' : '90%',
          backgroundColor: !isNull ? Colors.Purple : 'grey',
        }}
        title="Account type selection"
        onPress={() => navigation.navigate('register', {select})}
      />
    </Background>
  );
};

export default Index;
