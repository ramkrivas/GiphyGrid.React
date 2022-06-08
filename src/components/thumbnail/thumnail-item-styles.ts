import { css } from '../../style'

export const styles = css`
  .thumbnail {
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    animation: fadeIn 300ms ease-in;
  }

  .thumbnail:focus {
    opacity: 0.6;
  }

  .thumbnail-image {
    display: block;
    width: 100%;
    height: auto;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`
