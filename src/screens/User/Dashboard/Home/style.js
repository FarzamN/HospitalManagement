import {StyleSheet} from 'react-native';
import {Font} from '../../../../utils/font';
import {Colors} from '../../../../utils/Colors';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop:5,
    margin: 5,
    borderRadius: 8,
  },
  Image: {
    width: 45,
    height: 45,
    marginBottom: 5,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  heading: {
    fontSize: 16,
    marginTop: 5,
  },
  SubHead: {
    fontSize: 13,
    textAlign: 'right',
  },
  MainContainer: {
    height: 330,
    marginTop: 15,
    marginBottom: 10,
    flexDirection: 'row',
  },
  CardContainer: {width: '80%', overflow: 'hidden'},
  title: {
    fontSize: 16,
    fontFamily: Font.font600,
  },
  date: {
    fontSize: 13,
    color: Colors.LightGrey,
    fontFamily: Font.font600,
  },
  price: {
    fontSize: 13,
    color: Colors.LightGreen,
    fontFamily: Font.font700,
  },
  ShiftContainer: {
    height: 55,
    marginBottom: 15,
    overflow: 'hidden',
  },
  SearchBox: {
    height: 45,
    marginTop: 7,
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    borderColor: Colors.placeholderTextColor,
  },
  Input: {
    width: '96%',
    fontSize: 13,
    color: Colors.Black,
    fontFamily: Font.font500,
  },
  AwardContainer: {
    height: 150,
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },

  profile_imageBox: {
    width:130,
    height:130,
    borderRadius:100,
    alignSelf:'center',
    overflow:'hidden',
  },
 
});
