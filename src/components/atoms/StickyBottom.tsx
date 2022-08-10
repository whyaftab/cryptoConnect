// libraries
import { genericStyles } from '@styles/genericStyles';
import React from 'react';
import { ViewStyle } from 'react-native';
import styled from 'styled-components/native';

// types
interface Props {
  style?: ViewStyle;
  children: React.ReactNode;
}

export const StickyBottom = ({ children, style }: Props): React.ReactElement => {
  // renders
  return <Container style={style}>{children}</Container>;
};

const Container = styled.View({
  ...genericStyles.stickyBottom,
});
