import { keyframes } from 'styled-components';

export const Rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Fade = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  } to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const Move = keyframes`
  from {
    opacity: 0;
    transform: translateX(-35%);
  } to {
    opacity: 1;
    transform: translateX(0%);
  }
`;
