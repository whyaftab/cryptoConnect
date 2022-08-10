import { Animated, StyleProp, ViewStyle } from 'react-native';
import React, { useEffect, useRef } from 'react';

interface SlideDownProps {
  style?: StyleProp<ViewStyle>;
  delay?: number;
  startPosition?: number;
  toValue?: number;
}

export const SlideDown: React.FC<SlideDownProps> = ({
  style,
  children,
  startPosition = -200,
  delay,
  toValue = 0,
}) => {
  // variables
  const slideDownAnimation = useRef(new Animated.Value(startPosition)).current;

  // hooks
  useEffect(() => {
    Animated.spring(slideDownAnimation, {
      toValue,
      useNativeDriver: true,
      delay,
    }).start();
  }, []);

  // renders
  return (
    <Animated.View
      style={[
        style,
        {
          transform: [
            {
              translateY: slideDownAnimation,
            },
          ],
        },
      ]}>
      {children}
    </Animated.View>
  );
};
