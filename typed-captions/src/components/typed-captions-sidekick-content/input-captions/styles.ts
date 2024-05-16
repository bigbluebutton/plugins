/* eslint-disable @typescript-eslint/ban-ts-comment */
import styled from 'styled-components';

import TextareaAutosize from 'react-textarea-autosize';
import {
  borderRadius,
  borderSize,
  borderSizeSmall,
  colorBlueLight,
  colorGrayLighter,
  colorLink,
  colorPrimary,
  colorText,
  colorWhite,
  fontSizeBase,
  mdPaddingX,
  mdPaddingY,
  smPaddingX,
  smPaddingY,
} from '../../modal/styles';

const Form = styled.form`
  align-self: flex-end;
  width: 100%;
  position: relative;
  margin-top: .2rem;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Input = styled(TextareaAutosize)`
  background: #fff;
  background-clip: padding-box;
  width: 100%;
  margin: 0;
  color: ${colorText};
  -webkit-appearance: none;
  padding: calc(${smPaddingY} * 2.5) calc(${smPaddingX} * 1.25);
  resize: none;
  transition: none;
  border-radius: ${borderRadius};
  font-size: ${fontSizeBase};
  line-height: 1;
  min-height: 2.5rem;
  max-height: 10rem;
  border: 1px solid ${colorGrayLighter};
  box-shadow: 0 0 0 1px ${colorGrayLighter};

  &:focus {
    border-radius: ${borderSize};
    box-shadow: 0 0 0 ${borderSize} ${colorBlueLight}, inset 0 0 0 1px ${colorPrimary};
  }

  &:hover,
  &:active,
  &:focus {
    outline: transparent;
    outline-style: dotted;
    outline-width: ${borderSize};
  }
`;

const SendButton = styled.button`
  margin: 0;
  display: block;
  bottom: ${mdPaddingX};
  color: ${colorWhite} !important;
  background-color: ${colorLink} !important;
  cursor: pointer;

  &:focus {
    outline: none !important;
  }

  & > i {
    color: #3c5764;
  }

  border: none;
  overflow: visible !important;
  display: inline-block;
  cursor: pointer;

  &:focus,
  &:hover {
    outline: transparent;
    outline-style: dotted;
    outline-width: ${borderSize};
  }

  &:focus {
    outline-style: solid;
  }

  &:-moz-focusring {
    outline-color: transparent;
    outline-offset: ${borderRadius};
  }

  &:active {
    &:focus {
      span:first-of-type::before {
        border-radius: 50%;
        outline: transparent;
        outline-width: ${borderSize};
        outline-style: solid;
      }
    }
  }

  line-height: 1.5;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  background: none;

  & > span {
    display: block;
    text-align: center;
    white-space: nowrap;
    border: ${borderSizeSmall} solid transparent;
  }

  font-size: ${fontSizeBase};

  margin:0 0 0 ${smPaddingX};
  align-self: center;
  font-size: 0.9rem;
  border-radius: ${borderRadius};
  padding: ${mdPaddingY} ${mdPaddingX} !important;
`;

export default {
  Form,
  Wrapper,
  Input,
  SendButton,
};
