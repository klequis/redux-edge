import React from 'react';
import { PropTypes } from 'react';
import * as style from './style';

const Nav = ({ uiLocation }) => {
  return (
    <div style={style.wrapper}>
      <input
        placeholder="enter city"
        onChange={(event) => uiLocation(event.target.value)}
        />
      <button>Go</button>
    </div>
  );
};

export default Nav;
