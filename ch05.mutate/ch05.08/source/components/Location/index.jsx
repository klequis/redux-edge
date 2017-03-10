// Not sure if it is needed any more
import React from 'react';
import { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import * as selectors from '../../store/selectors';
import * as style from './style';

const Location = ({ location }) => {
  return (
    <div id="footer" style={style.footer}>
      <div id="location" style={style.location}>
        <h4>Location Data for {location.full}, {location.country}</h4>
        <div style={style.dataItems}>
          <p style={style.dataItem}><strong>Elevation:</strong> {location.elevation}</p>
          <p style={style.dataItem}><strong>latitude:</strong> {location.latitude}</p>
          <p style={style.dataItem}><strong>longitude:</strong> {location.longitude}</p>
        </div>
      </div>
      <div style={style.klequisBrand}>
        <div>
          <img style={style.klequisLogo} src="http://klequis.com/images/weather/klequis-logo.png"></img>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    location: selectors.getLocation(state),
  };
};

export default connect(mapStateToProps, actionCreators)(Location);
