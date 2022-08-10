// libraries
import React from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

// components
import { BigButton, StickyBottom } from '@components/atoms';
import { LabelValueText } from './components/LabelValueText';

// styles
import { genericStyles } from '@styles/genericStyles';

// misc
import { useAuth } from '@hooks/useAuth';

export const HomeScreen = () => {
  // variables
  const { reset, user } = useAuth();

  // returns
  return (
    <Container>
      <LabelValueText label="ID:" value={user?.id.toString()} />
      <LabelValueText label="Nom:" value={user?.name.toString()} />
      <LabelValueText label="Nom d'utilisateur:" value={user?.username.toString()} />
      <LabelValueText label="Email:" value={user?.email.toString()} />
      <StickyBottom>
        <BigButton testID="logout" text="Log Out" onPress={reset} />
      </StickyBottom>
    </Container>
  );
};

const Container = styled(SafeAreaView)(({ theme: { layout } }) => ({
  ...genericStyles.fill,
  paddingHorizontal: layout.contentPadding / 2,
  paddingBottom: layout.contentPadding / 2,
}));
