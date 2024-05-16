import styled from 'styled-components';
import * as ReactModal from 'react-modal';

const fontSizeBase = '1rem';
const fontSizeLarge = '1.25rem';
const headingsFontWeight = '500';
const lineHeightComputed = '1rem';

const colorDanger = '#DF2721';
const colorDangerDark = 'var(--color-danger-dark, #AE1010)';
const colorBlueLight = 'var(--color-blue-light, #54a1f3)';
const colorWhite = 'var(--color-white, #FFF)';
const colorPrimary = 'var(--color-primary, #0F70D7)';
const colorLink = `var(--color-link, ${colorPrimary})`;
const colorGrayLighter = 'var(--color-gray-lighter, #A7B3BD)';
const colorGrayDark = 'var(--color-gray-dark, #06172A)';
const colorGray = 'var(--color-gray, #4E5A66)';
const colorGrayLabel = `var(--color-gray-label, ${colorGray})`;
const colorText = `var(--color-text, ${colorGray})`;

const borderSize = '2px';
const borderSizeLarge = '3px';
const mdPaddingY = '.45rem';
const mdPaddingX = '1rem';
const lgPaddingX = '1.25rem';
const lgPaddingY = '0.6rem';

const smPaddingY = '.3rem';
const smPaddingX = '.75rem';

const borderRadius = '.2rem';

const borderSizeSmall = '1px';

const btnSpacing = '.35rem';

const smallOnly = 'only screen and (max-width: 40em)';

export {
  fontSizeBase,
  lgPaddingY,
  fontSizeLarge,
  headingsFontWeight,
  smPaddingX,
  mdPaddingY,
  colorBlueLight,
  lineHeightComputed,
  smPaddingY,
  lgPaddingX,
  colorWhite,
  colorPrimary,
  colorLink,
  colorGrayDark,
  colorGrayLighter,
  colorGray,
  colorGrayLabel,
  borderRadius,
  borderSize,
  borderSizeLarge,
  mdPaddingX,
  colorText,
  smallOnly,
  btnSpacing,
  colorDanger,
  colorDangerDark,
  borderSizeSmall,
};

const ModalScrollboxVertical = styled(ReactModal)`
  position: relative;
  z-index: 1000 !important;

  outline: transparent;
  outline-width: 2px;
  outline-style: solid;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.7);
  background-color: #FFF !important;
  max-width: 60vw;
  max-height: 100%;
  border-radius: .2rem;
  overflow: auto;

  overflow-y: hidden;

  background-repeat: no-repeat;
  background-color: transparent;
  background-size: 100% 40px, 100% 40px, 100% 14px, 100% 14px;
  background-attachment: local, local, scroll, scroll;

  &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
  }
  &::-webkit-scrollbar-button {
      width: 0;
      height: 0;
  }
  &::-webkit-scrollbar-thumb {
      background: rgba(0,0,0,.25);
      border: none;
      border-radius: 50px;
  }
  &::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,.5); }
  &::-webkit-scrollbar-thumb:active { background: rgba(0,0,0,.25); }
  &::-webkit-scrollbar-track {
      background: rgba(0,0,0,.25);
      border: none;
      border-radius: 50px;
  }
  &::-webkit-scrollbar-track:hover { background: rgba(0,0,0,.25); }
  &::-webkit-scrollbar-track:active { background: rgba(0,0,0,.25); }
  &::-webkit-scrollbar-corner { background: 0 0; }

  @media only screen and (max-width: 40em) {
      max-width: 95vw;
  }

  @media only screen and (min-width: 40.063em) {
      max-width: 80vw;
  }
`;

const TypedCaptionsModal = styled(ModalScrollboxVertical)`
  min-height: 30vh;
`;

const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: .3rem 0 0.5rem 0;
`;

const CloseButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  width: fit-content;
  align-self: end;
`;

const BaseButton = styled.button`
  margin: 0;
  display: block;
  position: absolute;
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

  &[aria-disabled="true"] > span {
    cursor: not-allowed;
    opacity: .65;
    box-shadow: none;
  }

  & > span {
    display: block;
    text-align: center;
    white-space: nowrap;
    border: ${borderSizeSmall} solid transparent;
  }

  font-size: ${fontSizeBase};
  padding: ${lgPaddingY} ${lgPaddingX};

`;

const StartBtn = styled(BaseButton)`
  align-self: center;
`;

const ErrorLabel = styled.span`
  font-size: ${fontSizeBase};
  margin-top: ${lgPaddingY};
  color: ${colorDanger};
`;

const WriterMenuSelect = styled.div`
  width: 40%;

  & > select {
    background-color: ${colorWhite};
    border: ${borderSize} solid ${colorWhite};
    border-radius: ${borderSize};
    border-bottom: 0.1rem solid ${colorGrayLighter};
    color: ${colorGrayLabel};
    width: 100%;
    height: 1.75rem;
    padding: 1px;

    &:hover {
      outline: transparent;
      outline-style: dotted;
      outline-width: ${borderSize};
    }

    &:focus {
      outline: none;
      box-shadow: inset 0 0 0 ${borderSizeLarge} ${colorPrimary};
      border-radius: ${borderSize};
      outline: transparent;
      outline-width: ${borderSize};
      outline-style: solid;
    }
  }
`;

export default {
  ErrorLabel,
  CloseButton,
  BaseButton,
  TypedCaptionsModal,
  Content,
  StartBtn,
  WriterMenuSelect,
};
