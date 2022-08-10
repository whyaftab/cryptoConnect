// libraries
import React from 'react';
import styled from 'styled-components/native';

// components
import { CustomText, Spacer } from '@components/atoms';

// styles
import { genericStyles } from '@styles/genericStyles';

type LabelValueTextProps = {
  label: string;
  value: string | undefined;
};

export const LabelValueText = ({ label, value }: LabelValueTextProps) => {
  // returns
  return (
    <Container>
      <CustomText text={label} weight="bodyMedium" />
      <Spacer.Row numberOfSpaces={0.3} />
      <CustomText text={value || ''} weight="bodyRegular" />
    </Container>
  );
};

const Container = styled.View(({ theme: { layout } }) => ({
  ...genericStyles.row,
  paddingBottom: layout.padding / 2,
}));
