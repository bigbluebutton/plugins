import styled from 'styled-components';
import {
  borderRadius,
  fontSizeBase,
  mdPaddingY,
  smPaddingX,
  smPaddingY,
} from '../../modal/styles';

const CaptionMessagesListWrapper = styled.div`
  display: flex;
  height: 100%;
  margin-bottom: ${mdPaddingY};
  flex-direction: column;
  overflow-y: auto;
`;

const CaptionMessageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${fontSizeBase};
  border-radius: ${borderRadius};
  margin-bottom: ${smPaddingY};
  padding: ${smPaddingY} ${smPaddingX};
  &:hover {
    background-color: #eaeaea;
  }
`;

const CaptionMessageItem = styled.span`
  color: #666;
`;

export default {
  CaptionMessagesListWrapper,
  CaptionMessageWrapper,
  CaptionMessageItem,
};
