import {StyleSheet} from 'react-native';
import {Colors} from '../../../../../utils/Colors';
import {Font} from '../../../../../utils/font';

export default StyleSheet.create({
  Container: {
    borderRadius: 15,
    padding: 5,
    borderWidth: 1.3,
    borderColor: Colors.Grey,
    width: '100%',
    marginBottom: 10,
  },
  FirstBox: {
    width: '77%',
  },
  ImageBox: {
    width: 55,
    aspectRatio: 1 / 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 3,
  },
  bigTitle: {
    fontSize: 15,
    color: Colors.Black,
    fontFamily: Font.font600,
    marginTop:-20,
    paddingLeft:10,
  },
  facilityName: {
    fontSize: 10,
    color: Colors.Black,
    fontFamily: Font.font600,
    paddingLeft:15,
  },
  price: {
    fontSize: 17,
    color: Colors.Purple,
    fontFamily: Font.font600,
    paddingRight:10,
    textAlign:'right',
  },
  Estprice: {
    fontSize: 9,
    color: Colors.Purple,
    textAlign:'right',
    paddingRight:10,
    fontFamily: Font.font600,
  },
  detail: {
    fontSize: 12,
    color: Colors.Black,
    paddingLeft:10,
    fontFamily: Font.font500,
  },
  line: {
    marginVertical: 5,
    borderTopWidth: 2,
    borderColor: '#F0F0F0',
  },
  dates: {
    color: '#36195C',
    fontFamily: Font.font600,
    fontSize: 12,
  },
  dateKey: {
    color: '#36195C',
    fontSize: 12,
    fontFamily: Font.font500,
    marginRight: 5,
  },
  detailText: {
    color: '#7939CB',
    fontSize: 14,
    fontFamily: Font.font600,
  },
  BottomView: {paddingHorizontal: 7, marginTop: 10},
  CompleteBox: {
    paddingLeft: 8,
    paddingRight: 20,
    position: 'absolute',
    top: -10,
    right: 10,
    borderRadius: 3,
    backgroundColor: Colors.Purple,
  },
  Completed: {
    color: Colors.White,
    fontSize: 13,
    fontFamily: Font.font500,
  },
});
