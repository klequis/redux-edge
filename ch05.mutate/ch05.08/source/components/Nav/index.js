import React from 'react';
import { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import * as selectors from '../../store/selectors';
import * as style from './style';

const Nav = ({ city, updateCity, requestReadWeather }) => {
  return (
    <div style={style.wrapper}>
      <p>city: {city}</p>
      <input
        placeholder="enter city"
        onChange={(event) => updateCity(event.target.value)}
        />
      <button
        onClick={() => requestReadWeather(city)}
        >
        Go
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  // const city = selectors.getCity(state);
  return {
    city: selectors.getCity(state),
  };
};

export default connect(mapStateToProps, actionCreators)(Nav);
