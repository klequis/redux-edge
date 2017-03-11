// Not sure if it is needed any more
import React from 'react';
import { PropTypes } from 'react';
import { connect } from 'react-redux';
import KlequisBrand from '../KlequisBrand';
import * as actionCreators from '../../store/actions';
import * as selectors from '../../store/selectors';
import * as style from './style';
import * as util from '../../util/util';

const Footer = ({ location }) => {
  const elevation = location.elevation.toFixed(2);
  console.log('elevation', elevation);
  return (
    <footer id="footer" style={style.footer}>
      <div id="location" style={style.location}>
        <h4>Location Data for {location.full}, {location.country}</h4>
        <div style={style.dataItems}>
          <p style={style.dataItem}><strong>Elevation:</strong> {elevation}</p>
          <p style={style.dataItem}><strong>Latitude:</strong> {location.latitude}</p>
          <p style={style.dataItem}><strong>Longitude:</strong> {location.longitude}</p>
        </div>
      </div>
      <KlequisBrand />
    </footer>
  );
};

const mapStateToProps = (state) => {
  return {
    location: selectors.getLocation(state),
  };
};

export default connect(mapStateToProps, actionCreators)(Footer);
