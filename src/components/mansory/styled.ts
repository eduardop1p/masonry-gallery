/* eslint-disable @typescript-eslint/no-unused-vars */
import { styled, css } from 'styled-components';

interface Props {
  $columnWidth: number;
  $marginColumn: string;
}

export const MasonryContainer = styled.div<Props>`
  ${({ $marginColumn, $columnWidth }) => css`
    display: flex;
    justify-content: center;
    /* min-width: 1519px; */
    /* margin: 0 1rem; */

    & > :not(:last-child) {
      margin-right: ${$marginColumn};
    }

    & > .masonry-column {
      width: calc(100% / 6.5);
      flex: none;

      @media (max-width: 1400px) {
        width: calc(100% / 5.5);
      }
      @media (max-width: 1100px) {
        width: calc(100% / 4.5);
      }
      @media (max-width: 850px) {
        width: calc(100% / 3.5);
      }
      @media (max-width: 500px) {
        width: calc(100% / 2.5);
      }

      & > .pin-container {
        position: relative;
        margin-bottom: ${$marginColumn};
        transition: height 30ms linear;

        & > .pin {
          border-radius: 1rem;
        }
      }
    }
  `}
`;
