import {StyleSheet} from 'react-native';
import {Font} from '../../../../utils/font';
import {Colors} from '../../../../utils/Colors';

export default StyleSheet.create({
  text: {
    color: '#CACED5',
    fontFamily: Font.font500,
  },
  image: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
  },
  HeaderContainer: {
    width: 90,
    aspectRatio: 1 / 1,
    borderRadius: 365,
  },
  BannerContainer: {
    width: '90%',
    marginTop: 25,
    marginBottom: 10,
    borderRadius: 10,
    alignSelf: 'center',
    paddingVertical: 12,
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#DCBFEE',
  },
  bannerText: {
    width: '40%',
    fontSize: 18,
    color: Colors.Black,
    fontFamily: Font.font600,
  },
  Btn: {
    height: 47,
    width: '60%',
    marginTop: 0,
  },
  CardContainer: {
    marginTop: 0,
    borderWidth: 0.5,
    borderRadius: 15,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderColor: Colors.LightGrey,
  },
  CardName: {
    color: Colors.Black,
    fontSize: 15,
    fontFamily: Font.font500,
  },
  CardDate: {
    color: Colors.LightGrey,
    fontSize: 13,
    fontFamily: Font.font500,
  },
  CardPaid: {
    fontSize: 13,
    textAlign: 'right',
    fontFamily: Font.font500,
  },
  CardPrice: {
    fontSize: 17,
    color: Colors.Black,
    fontFamily: Font.font500,
    textAlign: 'right',
  },
});
