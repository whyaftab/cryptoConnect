// libraries
import styled from 'styled-components/native';

// styles
import { genericStyles } from '@styles/genericStyles';

export const FullScreenContainer = styled.View(({ theme: { colors, layout } }) => ({
  ...genericStyles.fullContentCenter,
  ...genericStyles.positionAbsolute,
  width: layout.screen.width,
  height: layout.screen.height,
  backgroundColor: colors.primaryBackground,
  opacity: 0.4,
  zIndex: 1000,
}));
