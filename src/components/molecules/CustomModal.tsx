// libraries
import React, { ReactNode } from 'react';
import Modal from 'react-native-modal';
import styled, { useTheme } from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// components
import { CustomIcon } from '@components/atoms';

// style
import { genericStyles } from '@styles/genericStyles';

interface Props {
  isVisible: boolean;
  children: ReactNode;
  onClose: () => void;
}

export const CustomModal = ({ isVisible, children, onClose }: Props) => {
  // variables
  const theme = useTheme();
  const { top } = useSafeAreaInsets();

  // renders
  return (
    <ModalWrapper isVisible={isVisible} onBackdropPress={onClose} backdropOpacity={1}>
      <Container>
        <CloseContainer top={top} onPress={onClose}>
          <CustomIcon name="close" fill={theme.colors.white} type="lined" />
        </CloseContainer>
        {children}
      </Container>
    </ModalWrapper>
  );
};

const ModalWrapper = styled(Modal)({
  margin: 0,
});

const Container = styled.View({
  ...genericStyles.fill,
});

const CloseContainer = styled.Pressable<{ top: number }>(({ theme: { layout }, top }) => ({
  ...genericStyles.positionAbsolute,
  top: top + layout.padding / 2,
  right: layout.padding / 2,
  zIndex: 2,
}));
