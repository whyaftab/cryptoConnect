// libraries
import React from 'react';
import styled from 'styled-components/native';

export const Divider = () => {
  // renders
  return <DividerContainer />;
};

const DividerContainer = styled.View(({ theme: { colors } }) => ({
  height: 1,
  flex: 1,
  backgroundColor: colors.dividerBorder,
}));
