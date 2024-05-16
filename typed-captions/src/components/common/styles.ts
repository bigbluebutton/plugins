import styled from 'styled-components';
import {
  borderRadius,
  borderSize,
  borderSizeSmall,
  colorLink,
  colorWhite,
  fontSizeBase,
  lgPaddingX,
  lgPaddingY,
  mdPaddingX,
} from '../modal/styles';

// const BaseButton = styled.button`
//   margin: 0;
//   display: block;
//   position: absolute;
//   bottom: ${mdPaddingX};
//   color: ${colorWhite} !important;
//   background-color: ${colorLink} !important;
//   cursor: pointer;

//   &:focus {
//     outline: none !important;
//   }

//   & > i {
//     color: #3c5764;
//   }

//   border: none;
//   overflow: visible !important;
//   display: inline-block;
//   cursor: pointer;

//   &:focus,
//   &:hover {
//     outline: transparent;
//     outline-style: dotted;
//     outline-width: ${borderSize};
//   }

//   &:focus {
//     outline-style: solid;
//   }

//   &:-moz-focusring {
//     outline-color: transparent;
//     outline-offset: ${borderRadius};
//   }

//   &:active {
//     &:focus {
//       span:first-of-type::before {
//         border-radius: 50%;
//         outline: transparent;
//         outline-width: ${borderSize};
//         outline-style: solid;
//       }
//     }
//   }

//   line-height: 1.5;
//   text-align: center;
//   white-space: nowrap;
//   vertical-align: middle;
//   background: none;

//   &[aria-disabled="true"] > span {
//     cursor: not-allowed;
//     opacity: .65;
//     box-shadow: none;
//   }

//   & > span {
//     display: block;
//     text-align: center;
//     white-space: nowrap;
//     border: ${borderSizeSmall} solid transparent;
//   }

//   font-size: ${fontSizeBase};
//   padding: ${lgPaddingY} ${lgPaddingX};

// `;

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

export default {
  BaseButton,
};
