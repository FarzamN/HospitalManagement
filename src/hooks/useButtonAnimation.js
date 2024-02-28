import {useRef, useState} from 'react';
import {Animated, Pressable} from 'react-native';

const useButtonAnimation = () => {
  const [isPressed, setIsPressed] = useState(false);
  const scaleValue = useRef(new Animated.Value(1)).current;
  const AniPress = Animated.createAnimatedComponent(Pressable);

  const handlePressIn = () => {
    Animated.timing(scaleValue, {
      toValue: 0.93,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start(() => setIsPressed(!isPressed));
  };

  return {
    AniPress,
    scaleValue,
    handlePressIn,
    handlePressOut,
  };
};

export default useButtonAnimation;
