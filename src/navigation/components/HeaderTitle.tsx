// libraries
import React from 'react';

// components
import { CustomText, Sizes } from '@components/atoms';
import { genericStyles } from '@styles/genericStyles';

// styles

export const HeaderTitle = ({ title }: { title: string }) => (
  <CustomText
    weight="bodyMedium"
    size={Sizes.Section}
    text={title}
    style={genericStyles.upperCase}
    textAlign="center"
  />
);
