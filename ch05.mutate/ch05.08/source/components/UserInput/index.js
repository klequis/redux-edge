import React from 'react';
import { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import * as selectors from '../../store/selectors';
import * as style from './style';

const UserInput = ({ city, updateCity, requestReadWeather }) => {
  return (
    <div style={style.container_item}>
      <input
        style={style.item}
        placeholder="enter city"
        onChange={(event) => updateCity(event.target.value)}
        />
      <button
        style={style.item}
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

export default connect(mapStateToProps, actionCreators)(UserInput);
