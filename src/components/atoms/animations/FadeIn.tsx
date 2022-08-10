import { Animated, StyleProp, ViewStyle } from 'react-native';
import React, { useEffect, useRef } from 'react';

interface FadeInProps {
  style?: StyleProp<ViewStyle>;
  duration?: number;
}

export const FadeIn: React.FC<FadeInProps> = ({ style, children, duration = 500 }) => {
  // variables
  const fadeInAnimation = useRef(new Animated.Value(0)).current;

  // hooks
  useEffect(() => {
    Animated.timing(fadeInAnimation, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, []);

  // renders
  return <Animated.View style={[style, { opacity: fadeInAnimation }]}>{children}</Animated.View>;
};
