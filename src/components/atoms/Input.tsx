/* eslint-disable react/display-name */
// libraries
import React, { useCallback, useMemo, ReactNode, useRef, forwardRef } from 'react';
import { TextInputProps, Animated, Keyboard, Platform, TextInput, ViewStyle } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { Control, RegisterOptions, useController } from 'react-hook-form';

// components
import { CustomText, getLineHeight, Sizes } from './CustomText';
import { ErrorText } from './ErrorText';
import { CustomIcon } from './CustomIcon';
import { Spacer } from './Spacer';
import { CustomActivityIndicator } from './CustomActivityIndicator';

// misc
import { IconNames, IconType } from '@assets/icons';
import { genericStyles } from '@styles/genericStyles';

// styles
import { fonts } from '@styles/fonts';
import { useInputAnimation } from '@hooks/animation/useInputAnimation';
import { TextColors } from '@styles/types';

// types
type InputType = 'numeric' | 'string';

export interface InputProps extends TextInputProps {
  testID?: string;
  type?: InputType;
  label?: string;
  icon?: string;
  leftIcon?: IconNames;
  leftIconType?: keyof IconType;
  rightIconType?: keyof IconType;
  rightIcon?: IconNames;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
  prefix?: string;
  control: Control<any, any>;
  name: string;
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
  defaultValue?: string;
  isDisabled?: boolean;
  multiline?: boolean;
  displayValue?: string;
  subtitleComponent?: (isError?: boolean) => ReactNode;
  labelContainerStyle?: ViewStyle;
  isLoading?: boolean;
}

const DEFAULT_ERRORS = {
  required: 'This field is required',
  max: `You've exceeded max length of :max for this field`,
};

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      testID,
      label,
      type,
      leftIcon,
      leftIconType,
      rightIconType,
      prefix,
      name,
      control,
      rules,
      defaultValue = '',
      rightIcon,
      onRightIconPress,
      onLeftIconPress,
      isDisabled = false,
      multiline = false,
      displayValue,
      subtitleComponent,
      labelContainerStyle,
      isLoading,
      ...restProps
    },
    ref,
  ) => {
    // variables
    const { colors } = useTheme();
    const { field, fieldState } = useController({
      name,
      control,
      defaultValue,
      rules,
    });

    const error = useMemo(() => {
      if (fieldState.error) {
        if (fieldState.error?.message) {
          return fieldState.error?.message;
        }
        if (fieldState.error?.type === 'max') {
          return DEFAULT_ERRORS.max.replace(':max', rules?.max?.toString() || '');
        }
        return DEFAULT_ERRORS.required;
      }
    }, [fieldState.error]);

    const inputRef = useRef<TextInput>(null);

    // hooks
    const isInvalid = useMemo(() => !!fieldState.error?.type, [fieldState.error]);
    const { borderColor, backgroundColor, toggleBlur, toggleFocus } = useInputAnimation({
      isInvalid,
    });

    // functions
    const getLabelColor = useCallback((): TextColors => {
      if (isDisabled) return 'primary';
      else if (isInvalid) return 'red';
      return 'primary';
    }, [isDisabled, isInvalid]);

    // renders
    return (
      <Container>
        {!!label === true && (
          <LabelContainer style={labelContainerStyle}>
            <CustomText
              text={label || ''}
              weight="bodyRegular"
              size={Sizes.Info}
              color={getLabelColor()}
            />
            <Spacer.Column numberOfSpaces={0.2} />
          </LabelContainer>
        )}
        <InputContainer style={{ borderColor, backgroundColor }}>
          {leftIcon !== undefined && leftIconType && (
            <LeftIconContainer onPress={onLeftIconPress}>
              <CustomIcon
                name={leftIcon}
                isDisabled={isDisabled}
                isError={isInvalid}
                width={24}
                height={24}
                type={leftIconType}
                fill={colors.primary}
              />
            </LeftIconContainer>
          )}
          {prefix !== undefined && <Prefix isInvalid={isInvalid}>{prefix}</Prefix>}
          <CustomTextInput
            ref={(ref || inputRef) as any}
            testID={testID}
            selectionColor={colors.primary}
            onFocus={toggleFocus}
            onBlur={toggleBlur}
            placeholderTextColor={colors.primary50}
            type={type}
            value={displayValue || field.value}
            onChangeText={field.onChange}
            keyboardType={type === 'numeric' ? 'decimal-pad' : 'default'}
            isDisabled={isDisabled}
            editable={!isDisabled}
            multiline={multiline}
            textAlignVertical="top"
            scrollEnabled={false}
            blurOnSubmit={multiline}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            {...restProps}
            accessibilityRole="text"
          />
          {rightIcon !== undefined && isLoading && rightIconType && (
            <RightIconContainer onPress={onRightIconPress} multiline={multiline}>
              <CustomIcon name={rightIcon} isError={isInvalid} type={rightIconType} />
            </RightIconContainer>
          )}
          {isLoading && (
            <RightIconContainer onPress={onRightIconPress} multiline={multiline}>
              <CustomActivityIndicator />
            </RightIconContainer>
          )}
        </InputContainer>
        {subtitleComponent !== undefined && subtitleComponent(isInvalid)}
        <ErrorText text={isInvalid && error ? error : ''} />
      </Container>
    );
  },
);

const Container = styled.View(({ theme: { layout } }) => ({
  marginBottom: layout.padding * 0.75,
}));

const InputContainer = styled(Animated.View)(() => ({
  ...genericStyles.rowWithCenter,
  paddingHorizontal: 12,
  borderBottomWidth: 2,
}));

interface TextInputStyleProps {
  type?: InputType;
  isInvalid?: boolean;
  isDisabled?: boolean;
  multiline?: boolean;
}

const CustomTextInput = styled.TextInput<TextInputStyleProps>(
  ({ type, theme: { colors }, isDisabled, multiline }) => ({
    fontFamily: type === 'numeric' ? fonts.family.bodyRegular : fonts.family.bodyRegular,
    fontSize: Sizes.Body,
    color: isDisabled ? colors.primary50 : colors.primary,
    flex: 1,
    marginTop: Platform.OS === 'android' ? 5 : 0,
    paddingTop: Platform.OS === 'android' ? 8 : multiline ? 5 : 18,
    paddingBottom: Platform.OS === 'android' ? 8 : multiline ? 5 : 18,
    ...(multiline && { minHeight: 100, lineHeight: getLineHeight(Sizes.Body) }),
  }),
);

const Prefix = styled.Text<TextInputStyleProps>(({ type, isInvalid, theme: { colors } }) => ({
  fontFamily: type === 'numeric' ? fonts.family.bodyRegular : fonts.family.bodyRegular,
  fontSize: Sizes.Title,
  color: isInvalid ? colors.red : colors.primary50,
  marginRight: 12,
}));

const LeftIconContainer = styled.Pressable(({ theme: { layout } }) => ({
  marginRight: layout.padding * 0.5,
}));

const RightIconContainer = styled.Pressable<{ multiline: boolean }>(
  ({ theme: { layout }, multiline }) => ({
    ...(multiline && {
      ...genericStyles.selfStart,
      paddingTop: Platform.OS === 'android' ? 8 : multiline ? 5 : 18,
    }),
    marginLeft: layout.padding * 0.5,
  }),
);

const LabelContainer = styled.View({});
