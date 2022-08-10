// libraries
import React from 'react';
import { ViewStyle } from 'react-native';
import styled from 'styled-components/native';

// components
import { CustomText } from '@components/atoms';
import { FadeIn } from '@components/atoms';

// styles
import { genericStyles } from '@styles/genericStyles';

interface EmptyListProps {
  style?: ViewStyle;
  children?: React.ReactElement | null;
  text: string;
}

export const EmptyList = ({ text, style, children = null }: EmptyListProps) => {
  // renders
  return (
    <FadeIn style={genericStyles.fill}>
      <Container style={style}>
        <TextStyled weight="bodyItalic" text={text} textAlign="center" color="text50" />
        {children}
      </Container>
    </FadeIn>
  );
};

const Container = styled.View(() => ({
  ...genericStyles.fill,
  ...genericStyles.jcAiCenter,
}));

const TextStyled = styled(CustomText)({
  width: '80%',
});
