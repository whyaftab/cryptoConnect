// libraries
import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import { useTheme } from 'styled-components/native';

// types
interface InputAnimationProps {
  isInvalid: boolean;
}

interface InputAnimationReturnProps {
  toggleBlur: () => void;
  toggleFocus: () => void;
  borderColor: Animated.AnimatedInterpolation;
  backgroundColor: Animated.AnimatedInterpolation;
}

export const useInputAnimation = ({
  isInvalid,
}: InputAnimationProps): InputAnimationReturnProps => {
  // variables
  const [isFocused, setIsFocused] = useState(false);
  const { colors } = useTheme();

  // focus animation for input
  const animation = useRef(new Animated.Value(0)).current;
  const ERROR_BORDER_COLOR = colors.red;
  const FOCUS_BORDER_COLOR = colors.secondary;
  const ORIGINAL_BORDER_COLOR = colors.silver;
  const ERROR_BG_COLOR = colors.inputErrorBg;
  const FOCUS_BG_COLOR = colors.transparent;
  const ORIGINAL_BG_COLOR = colors.inputBg;
  const ERROR_VALUE = 2;
  const FOCUS_VALUE = 1;
  const ORIGINAL_VALUE = 0;

  const borderColor = animation.interpolate({
    inputRange: [ORIGINAL_VALUE, FOCUS_VALUE, ERROR_VALUE],
    outputRange: [ORIGINAL_BORDER_COLOR, FOCUS_BORDER_COLOR, ERROR_BORDER_COLOR],
  });

  const backgroundColor = animation.interpolate({
    inputRange: [ORIGINAL_VALUE, FOCUS_VALUE, ERROR_VALUE],
    outputRange: [ORIGINAL_BG_COLOR, FOCUS_BG_COLOR, ERROR_BG_COLOR],
  });

  // hooks
  useEffect(() => {
    if (isInvalid) {
      Animated.timing(animation, {
        toValue: ERROR_VALUE,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else if (isFocused) {
      toggleFocus();
    }
  }, [isInvalid]);

  // functions
  const toggleFocus = () => {
    if (!isInvalid) {
      Animated.timing(animation, {
        toValue: FOCUS_VALUE,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
    setIsFocused(true);
  };

  const toggleBlur = () => {
    if (!isInvalid) {
      Animated.timing(animation, {
        toValue: ORIGINAL_VALUE,
        duration: 200,
        useNativeDriver: false,
      }).start();
      setIsFocused(false);
    }
  };

  return { toggleBlur, toggleFocus, borderColor, backgroundColor };
};
