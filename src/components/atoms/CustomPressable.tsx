import React, { useRef } from 'react';
import { Pressable, Animated, PressableProps, ViewStyle } from 'react-native';

interface CustomPressableProps extends Omit<PressableProps, 'style'> {
  style?: ViewStyle;
  pressableStyle?: PressableProps['style'];
}

export const CustomPressable = ({
  children,
  style,
  pressableStyle,
  ...props
}: CustomPressableProps) => {
  const animated = useRef(new Animated.Value(1)).current;

  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 0.8,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable style={pressableStyle} onPressIn={fadeIn} onPressOut={fadeOut} {...props}>
      <Animated.View style={[style, { opacity: animated, transform: [{ scale: animated }] }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
};
