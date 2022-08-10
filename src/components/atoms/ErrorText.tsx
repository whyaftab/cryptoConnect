// libraries
import React from 'react';
import styled from 'styled-components/native';

// components
import { CustomText, CustomTextProps, Sizes } from './CustomText';

// types
interface ErrorTextProps extends Omit<CustomTextProps, 'size'> {
  center?: boolean;
  size?: Sizes;
}

// TODO animation: add animation on error show and hide
// error text component to be used by input elements
export const ErrorText = ({ text, ...restProps }: ErrorTextProps) => {
  return text ? <Text color="red" text={text} size={Sizes.Info} {...restProps} /> : null;
};

const Text = styled(CustomText)({
  marginTop: 6,
});
