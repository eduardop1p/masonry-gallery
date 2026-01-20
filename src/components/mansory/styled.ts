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
    /* min-width: 519px; */
    /* margin: 0 1rem; */

    & > :not(:last-child) {
      margin-right: ${$marginColumn};
    }

    & > .masonry-column {
      width: calc(100% / ${$columnWidth});
      flex: none;

      & > .pin-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: ${$marginColumn};

        & > .pin-container {
          position: relative;
          margin-bottom: 8px;
          /* transition: height 30ms linear; */

          & > .pin {
            border-radius: 1rem;
          }
        }

        & > h4 {
          display: -webkit-box;
          overflow: hidden;
          width: 100%;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
        }
      }
    }
  `}
`;
