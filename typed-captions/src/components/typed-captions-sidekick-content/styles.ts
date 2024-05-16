/* eslint-disable @typescript-eslint/ban-ts-comment */
import styled from 'styled-components';
import { mdPaddingY } from '../modal/styles';

const CaptionsWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const HeaderWrapper = styled.div`
  display: flex;
  margin-bottom: ${mdPaddingY};
`;

const SidekickMenuMinimizer = styled.button`
  background: none;
  border: none;

  color: #050505;
  &:hover {
    cursor: pointer;
  }
`;

export default {
  CaptionsWrapper,
  HeaderWrapper,
  SidekickMenuMinimizer,
};
