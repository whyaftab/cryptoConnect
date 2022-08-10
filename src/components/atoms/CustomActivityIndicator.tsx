// libraries
import { genericStyles } from '@styles/genericStyles';
import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import { useTheme } from 'styled-components/native';

interface Props extends ActivityIndicatorProps {
  center?: boolean;
}

export const CustomActivityIndicator = ({ center, ...restProps }: Props) => {
  // vairables
  const { colors } = useTheme();

  // returns
  return (
    <ActivityIndicator
      color={colors.primary}
      style={center && [genericStyles.selfCenter, genericStyles.w100]}
      {...restProps}
    />
  );
};
