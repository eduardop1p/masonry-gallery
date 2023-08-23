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
    min-width: 519px;
    /* margin: 0 1rem; */

    & > :not(:last-child) {
      margin-right: ${$marginColumn};
    }

    & > .masonry-column {
      width: 233px;
      flex: none;

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
