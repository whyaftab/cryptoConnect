// libraries
import styled from 'styled-components/native';

const RowSpacer = styled.View<{ numberOfSpaces: number }>(props => ({
  width: props.theme.layout.padding * props.numberOfSpaces,
}));

const ColumnSpacer = styled.View<{ numberOfSpaces: number }>(props => ({
  height: props.theme.layout.padding * props.numberOfSpaces,
}));

const FlexSpacer = styled.View<{ flex?: number }>(({ flex }) => ({
  flex: flex || 1,
}));

export const Spacer = {
  Row: RowSpacer,
  Column: ColumnSpacer,
  Flex: FlexSpacer,
};
