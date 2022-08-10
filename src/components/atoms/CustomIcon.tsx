// libraries
import React from 'react';
import { SvgProps } from 'react-native-svg';
import styled, { useTheme } from 'styled-components/native';

// components
import { CustomPressable } from './CustomPressable';
import { ConditionalWrap } from './ConditionalWrap';
import { CustomActivityIndicator } from './CustomActivityIndicator';

// misc
import { IconNames, Icons, IconType } from '@assets/icons';
import { genericStyles } from '@styles/genericStyles';

// types
interface IconProps extends SvgProps {
  name: IconNames;
  isError?: boolean;
  isDisabled?: boolean;
  type: keyof IconType;
  raised?: boolean;
  reverse?: boolean;
  color?: string;
  isLoading?: boolean;
}

export const CustomIcon = ({
  name,
  isError,
  isDisabled,
  width = 20,
  height = 20,
  type,
  raised,
  onPress,
  reverse,
  isLoading,
  color,
  ...restProps
}: IconProps) => {
  // variables
  const { colors } = useTheme();
  const IconSource = getIconSource();

  // functions
  const getIconColor = () => {
    if (reverse) return colors.secondary;
    else if (isDisabled) return colors.primary50;
    else if (isError) return colors.red;
    else if (color) return color;
    return colors.primary;
  };

  function getIconSource() {
    if (!type) return null;
    return Icons[name] && Icons[name][type];
  }

  // renders
  return IconSource ? (
    <ConditionalWrap
      condition={onPress !== undefined}
      wrap={children => (
        <CustomPressable hitSlop={!raised ? 10 : undefined} onPress={onPress}>
          {children}
        </CustomPressable>
      )}>
      <ConditionalWrap
        condition={raised}
        wrap={children => <Container reverse={reverse}>{children}</Container>}>
        {isLoading ? (
          <CustomActivityIndicator color={getIconColor()} />
        ) : (
          <IconSource
            fill={getIconColor()}
            width={width}
            height={height}
            {...restProps}
            onPress={onPress}
          />
        )}
      </ConditionalWrap>
    </ConditionalWrap>
  ) : null;
};

const Container = styled.View<{ reverse?: boolean }>(({ theme: { colors, layout }, reverse }) => ({
  ...genericStyles.shadow,
  backgroundColor: reverse ? colors.primary : colors.secondary,
  padding: layout.padding * 0.4,
  borderRadius: 100,
}));
