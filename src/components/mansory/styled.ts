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
    /* padding: 0 1rem; */

    & > :not(:last-child) {
      margin-right: ${$marginColumn};
    }

    & > .masonry-column {
      width: calc(100% / ${$columnWidth});
      flex: none;

      & > .pin-container {
        position: relative;
        margin-bottom: ${$marginColumn};
        transition: height 50ms linear;

        & > .pin {
          border-radius: 1rem;
        }
      }
    }
  `}
`;
