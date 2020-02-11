import React from 'react';
import { css, SerializedStyles } from '@emotion/core';

const banner: SerializedStyles = css`
  position: relative;
  font-weight: bold;
  background-color: var(--info9);
  font-size: var(--font-size-display2);
  color: var(--black0);
  border-radius: 5px;
  text-align: center;
  padding-top: 5px;
`;

const ticketsCta: SerializedStyles = css`
  border-radius: 5.6rem;
  background: var(--color-fill-action);
  color: var(--black0);
  margin-right: var(--space-32);
  position: relative;
`;

const Banner = () => (
  <div css={banner}>
    <p>
      <button css={ticketsCta} type="button">
        Get Tickets
      </button>
      Some new event is happening on some date
    </p>
  </div>
);

export default Banner;
