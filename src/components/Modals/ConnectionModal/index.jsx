import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';

import Modal from 'react-native-modal';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import NetInfo from '@react-native-community/netinfo';
import {Colors} from '../../../utils/Colors';
import styles from './styles';

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected == false) {
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <Modal
      style={styles.ToEnd}
      backdropOpacity={0.3}
      animationInTiming={400}
      isVisible={isConnected}
      animationIn="fadeInUpBig"
      animationOutTiming={1500}
      animationOut="fadeOutDownBig"
      onBackdropPress={() => setIsConnected(false)}>
      <View style={styles.MainModalBox}>
        <View style={styles.IconBox}>
          <Icon
            type={IconType.MaterialIcons}
            name="wifi-tethering-error"
            size={30}
            color={Colors.White}
          />
        </View>
        <View style={styles.TextBox}>
          <Text style={styles.text}>No Internet Connection</Text>
        </View>
      </View>
    </Modal>
  );
};

export default Index;
