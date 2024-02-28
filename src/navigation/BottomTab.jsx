import Modal from './Modal';
import {styles} from './style';
import React, {useState} from 'react';
import {GlobalStyle} from '../Constants/GlobalStyle';
import {useNavigation} from '@react-navigation/native';
import {View, Image, Pressable, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {SubHead} from '../components';

const BottomTab = props => {
  const navigation = useNavigation();
  const userDetail = useSelector(state => state.userDetails);
  const chat_count = useSelector(state => state.chat_count);
  const staff = userDetail.role_id == '1';
  const admin = userDetail.role_id == '2';
  const facility = userDetail.role_id == '3';

  const [modal, setModal] = useState(false);
  const onClose = () => setModal(false);

  const handleShifts = () => {
    if (staff) {
      navigation.navigate('Shifts');
    } else if (facility) {
      navigation.navigate('FacStaff');
    } else if (admin) {
      navigation.navigate('AdminStaff');
    }
  };
  return (
    <>
      <View style={[styles.Bar, styles.Row]}>
        <Pressable
          android_ripple={GlobalStyle.Ripple}
          onPress={() => navigation.navigate('Home')}
          style={styles.Boxes}>
          <Image
            style={styles.Img}
            source={
              props.home
                ? require('../assets/image/TabIcon/homeActive.png')
                : require('../assets/image/TabIcon/homeNonActive.png')
            }
          />
        </Pressable>
        <Pressable
          android_ripple={GlobalStyle.Ripple}
          onPress={handleShifts}
          style={styles.Boxes}>
          <Image
            style={styles.Img}
            source={
              props.shift
                ? require('../assets/image/TabIcon/shiftActive.png')
                : require('../assets/image/TabIcon/shiftNonActive.png')
            }
          />
        </Pressable>
        <TouchableOpacity
          activeOpacity={0.8}
          android_ripple={GlobalStyle.Ripple}
          onPress={() => setModal(true)}>
          <View style={styles.IconMainBox}>
            <Image
              resizeMode="contain"
              style={[modal ? styles.closeMidImage : styles.MidImage]}
              source={
                modal
                  ? require('../assets/image/TabIcon/close.png')
                  : require('../assets/image/TabIcon/user.png')
              }
            />
          </View>
        </TouchableOpacity>
        <Pressable
          android_ripple={GlobalStyle.Ripple}
          onPress={() =>
            navigation.navigate(staff ? 'chatInbox' : 'AllInvoice')
          }
          style={styles.Boxes}>
          {staff && (
            <View style={[styles.Notification,{display: chat_count != 0 ? "flex" : "none"}]}>
              <SubHead style={{fontSize: 10}} white text={chat_count} />
            </View>
          )}

          <Image
            style={styles.Img}
            source={
              staff
                ? require('../assets/image/Logos/chats.png')
                : require('../assets/image/TabIcon/bottleNonActive.png')
            }
          />
        </Pressable>
        <Pressable
          android_ripple={GlobalStyle.Ripple}
          onPress={() => navigation.navigate('AllSearch')}
          //staff ? 'recentJobs' :
          style={styles.Boxes}>
          <Image
            style={styles.Img}
            source={require('../assets/image/TabIcon/searchNonActive.png')}
          />
        </Pressable>
      </View>
      <Modal visible={modal} onClose={onClose} />
    </>
  );
};

export default BottomTab;
