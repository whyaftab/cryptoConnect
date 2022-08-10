// libraries
import React, { useCallback } from 'react';
import { ViewStyle } from 'react-native';
import { Header } from '@react-navigation/elements';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// components
import { HeaderTitle } from './HeaderTitle';
import { CustomIcon } from '@components/atoms';

// variables
export enum HeaderHeight {
  Small = 60,
  Medium = 170,
  Large = 210,
  ProfileHeader = 218,
  SearchHeader = 156,
}

// types
export interface SmallHeadingHeaderProps {
  height: HeaderHeight;
  contentContainerStyle?: ViewStyle;
  content?: React.ReactNode;
  headerLeft?: 'back' | 'menu' | (() => React.ReactNode);
  headerRight?: 'search' | 'bell' | (() => React.ReactNode);
  onPressHeaderRight?: () => void;
}

export const SmallHeadingHeader = ({
  route,
  height,
  contentContainerStyle,
  content,
  navigation,
  headerLeft,
  headerRight,
  onPressHeaderRight,
}: SmallHeadingHeaderProps) => {
  // variables
  const inset = useSafeAreaInsets();


  // returns
  return (
    <Container height={height + inset.top}>
      <Header
        headerTitleAlign="center"
        title={route.name}
        headerStatusBarHeight={inset.top}
        headerTitle={() => <HeaderTitle title={route.name} />}
        headerTransparent
      />
      <ContentContainer style={contentContainerStyle}>{content}</ContentContainer>
    </Container>
  );
};

export const HeaderIconContainer = styled.Pressable(({ theme: { layout } }) => ({
  paddingHorizontal: layout.padding / 2,
}));

const ContentContainer = styled.View({
  justifyContent: 'center',
  alignItems: 'center',
  width: '90%',
  alignSelf: 'center',
  flex: 1,
});

const Container = styled.View<{ height: number; paddingTop?: number }>(
  ({ height, paddingTop, theme: { layout, colors } }) => ({
    minHeight: height,
    paddingTop,
    zIndex: 1,
    width: layout.screen.width,
    backgroundColor: colors.primaryBackground,
  }),
);
