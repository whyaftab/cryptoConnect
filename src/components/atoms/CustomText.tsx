// libraries
import React, { ReactElement } from 'react';
import styled, { DefaultTheme } from 'styled-components/native';
import { TextProps } from 'react-native';

// misc
import { TextColors } from '@styles/types';
import { fonts } from '@styles/fonts';

// types
export enum Sizes {
  Micro = 8,
  Legend = 10,
  SubTitle = 11,
  Info = 12,
  Body = 14,
  Title = 16,
  Section = 18,
  ModalTitle = 24,
  Big = 32,
}

type Weights = keyof typeof fonts.family;

type TextAlign = 'left' | 'right' | 'center';

export interface CustomTextProps extends TextProps {
  text: string;
  size?: Sizes;
  weight?: Weights;
  color?: TextColors;
  center?: boolean;
  textAlign?: TextAlign;
  opacity?: number;
}

export const CustomText = ({
  size = Sizes.Body,
  color = 'primary',
  text,
  weight = 'bodyRegular',
  center = false,
  textAlign = 'left',
  opacity,
  ...restProps
}: CustomTextProps): ReactElement => {
  return (
    <StyledText
      size={size}
      weight={weight}
      color={color}
      center={center}
      textAlign={textAlign}
      opacity={opacity}
      {...restProps}
      accessibilityRole="none">
      {text}
    </StyledText>
  );
};

const getFontFamily = (weight: Weights) => {
  return fonts.family[weight];
};

const getFontSize = (size: Sizes) => {
  switch (size) {
    case Sizes.Legend:
      return `${Sizes.Legend}px`;
    case Sizes.Info:
      return `${Sizes.Info}px`;
    case Sizes.Body:
      return `${Sizes.Body}px`;
    case Sizes.Title:
      return `${Sizes.Title}px`;
    case Sizes.Section:
      return `${Sizes.Section}px`;
    case Sizes.ModalTitle:
      return `${Sizes.ModalTitle}px`;
    case Sizes.Big:
      return `${Sizes.Big}px`;
    case Sizes.SubTitle:
      return `${Sizes.SubTitle}px`;
    case Sizes.Micro:
      return `${Sizes.Micro}px`;
  }
};

export const getLineHeight = (size: Sizes) => {
  switch (size) {
    case Sizes.Legend:
      return `${Sizes.Legend + 6}px`;
    case Sizes.Info:
      return `${Sizes.Info + 6}px`;
    case Sizes.Body:
      return `${Sizes.Body + 6}px`;
    case Sizes.Title:
      return `${Sizes.Title + 6}px`;
    case Sizes.Section:
      return `${Sizes.Section + 6}px`;
    case Sizes.ModalTitle:
      return `${Sizes.ModalTitle + 6}px`;
    case Sizes.Big:
      return `${Sizes.Big + 6}px`;
    case Sizes.SubTitle:
      return `${Sizes.SubTitle + 6}px`;
    case Sizes.Micro:
      return `${Sizes.Micro + 6}px`;
  }
};

export const getFontColor = (color: TextColors, theme: DefaultTheme) => {
  return theme.colors[color];
};

interface StyledTextProps {
  size: Sizes;
  weight: Weights;
  color: TextColors;
  center: boolean;
  textAlign: TextAlign;
  opacity?: number;
}

const StyledText = styled.Text<StyledTextProps>(
  ({ center, color, size, weight, theme, textAlign, opacity }) => ({
    fontFamily: getFontFamily(weight),
    fontSize: getFontSize(size),
    color: getFontColor(color, theme),
    textAlign: center ? 'center' : textAlign,
    lineHeight: getLineHeight(size),
    opacity,
  }),
);
