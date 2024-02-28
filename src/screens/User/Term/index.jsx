import {
  View,
  ScrollView,
  StatusBar,
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CustomButton, Heading, Loader} from '../../../components';
import ColorBackground from '../../../components/Backgrounds/ColorBackground';
import {Colors} from '../../../utils/Colors';
import RenderHTML from 'react-native-render-html';
import {Font} from '../../../utils/font';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import {useDispatch, useSelector} from 'react-redux';
import { getHtml } from '../../../redux/actions/AuthActions';

const Term = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {type} = route.params;
  const [loading, setLoading] = useState(true);
  const {width} = Dimensions.get('window');
  const onSubmit = () => {
    navigation.goBack();
  };
  const data = useSelector(state => state.get_terms_data);
  console.log(data)

  useEffect(() => {
    dispatch(getHtml(type,setLoading));
  }, []);

  let result = data?.description?.replace(
    /<div(.*?)>/gi,
    `<div style='color: ${Colors.Black};font-family: ${
      Font.font500
    }; font-size: ${'15px'};'>`,
  );

  const source = {
    html: result,
  };
  return (
    <ColorBackground>
      <View style={styles.MainView}>
        <View
          style={[
            GlobalStyle.Space_Between,
            {borderBottomWidth: 2, borderColor: Colors.Purple},
          ]}>
          <Heading center text={type} />
          <View style={styles.ImageBox}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/image/Logos/colorlogo.png')}
              style={GlobalStyle.Image}
            />
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <RenderHTML contentWidth={width} source={source} />

          <CustomButton
            onPress={onSubmit}
            title="Accept and Continue"
            style={{
              marginBottom: 20,
            }}
          />
        </ScrollView>
        <Loader visible={loading} />
      </View>
    </ColorBackground>
  );
};
const styles = StyleSheet.create({
  ImageBox: {
    height: 60,
    width: 60,
    alignSelf: 'center',
    marginVertical: 10,
  },
  MainView: {
    width: '90%',
    height: '93%',
    backgroundColor: Colors.White,
    borderRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: 15,
    marginTop: StatusBar.currentHeight,
  },
});
export default Term;
