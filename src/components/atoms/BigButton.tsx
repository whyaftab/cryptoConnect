// libraries
import React, { ReactElement, ReactNode } from 'react';
import { ActivityIndicator, TextStyle } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { useSelector } from 'react-redux';

// component
import { Sizes as TextSizes } from '@components/atoms/CustomText';
import { CustomPressable } from './CustomPressable';

// misc
import { genericStyles } from '@styles/genericStyles';

// styles
import { fonts } from '@styles/fonts';
import { selectTheme } from '@styles/selectors';

// types
interface BigButtonProps {
  testID?: string;
  text: string;
  onPress: () => void;
  outline?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  leftIcon?: ReactNode;
  titleStyle?: TextStyle;
  backgroundColor?: string;
}

export const BigButton = ({
  text,
  onPress,
  outline = false,
  isLoading = false,
  isDisabled = false,
  leftIcon,
  titleStyle,
  backgroundColor,
  testID,
}: BigButtonProps): ReactElement => {
  // variables
  const theme = useTheme();
  const themeMode = useSelector(selectTheme);

  // renders
  return (
    <Container
      testID={testID}
      onPress={onPress}
      disabled={isLoading || isDisabled}
      color={backgroundColor}
      outline={outline && themeMode !== 'dark'}>
      {!!leftIcon === true && <Icon>{leftIcon}</Icon>}
      {isLoading ? (
        <ActivityIndicator
          color={outline ? theme.colors.primary : theme.colors.primaryBackground}
          animating={isLoading}
        />
      ) : (
        <Title outline={outline} style={titleStyle}>
          {text}
        </Title>
      )}
    </Container>
  );
};

interface ContainerProps {
  outline: boolean;
  disabled: boolean;
  color?: string;
}

const Container = styled(CustomPressable)<ContainerProps>(
  ({ outline, theme: { colors, layout }, disabled, color }) => ({
    ...genericStyles.row,
    background: outline ? colors.transparent : color || colors.buttonBackground,
    height: layout.buttons.height,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: outline ? 1 : 0,
    borderColor: outline ? colors.white : colors.primaryBackground,
    alignSelf: 'stretch',
    opacity: disabled ? 0.4 : 1,
    borderRadius: layout.borderRadius / 2,
    overflow: 'hidden',
    paddingLeft: layout.padding / 1.5,
    paddingRight: layout.padding / 1.5,
  }),
);

const Title = styled.Text<{ outline: boolean }>(({ outline, theme: { colors } }) => ({
  color: outline ? colors.secondary : colors.white,
  fontFamily: fonts.family.bodyMedium,
  fontSize: TextSizes.Section,
  textAlign: 'center',
}));

const Icon = styled.View(({ theme: { layout } }) => ({
  paddingRight: layout.padding / 2,
}));
