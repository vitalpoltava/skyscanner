import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import BpkSmallLongArrowRightIcon from 'bpk-component-icon/sm/long-arrow-right';
import STYLES from './Direction.scss';

const c = className => STYLES[className] || 'UNKNOWN';

const Direction = props =>
  (
    <div className={c('Direction__body')}>
      <div className={c('Direction__body-header')}>
        {props.config.initialParams.originPlace}
        <BpkSmallLongArrowRightIcon fill="white" />
        {props.config.initialParams.destinationPlace}
      </div>
      <div>
        {moment(props.config.initialParams.outboundDate).format('ddd, MMM D')}
        &nbsp;&minus;&nbsp;
        {moment(props.config.initialParams.inboundDate).format('ddd, MMM D')}
      </div>
    </div>
  );

Direction.propTypes = {
  config: PropTypes.objectOf(PropTypes.object()).isRequired,
};

export default Direction;

