// libraries
import React from 'react';
import { ViewStyle } from 'react-native';

// components
import { CustomActivityIndicator, FullScreenContainer } from '../atoms';

export const FullScreenLoader = ({
  isLoading,
  style,
}: {
  isLoading?: boolean;
  style?: ViewStyle;
}): React.ReactElement | null => {
  if (!isLoading) {
    return null;
  }
  return (
    <FullScreenContainer style={style}>
      <CustomActivityIndicator size="large" />
    </FullScreenContainer>
  );
};
