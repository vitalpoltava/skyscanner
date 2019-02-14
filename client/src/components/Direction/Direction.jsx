import React from 'react';
import moment from 'moment';
import STYLES from './Direction.scss';
import BpkSmallLongArrowRightIcon from 'bpk-component-icon/sm/long-arrow-right';

const c = className => STYLES[className] || 'UNKNOWN';

class Direction extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={c('Direction__body')}>
        <div className={c('Direction__body-header')}>
          {this.props.config.initialParams.originPlace} <BpkSmallLongArrowRightIcon fill="white"/> {this.props.config.initialParams.destinationPlace}
        </div>
        <div>
          {moment(this.props.config.initialParams.outboundDate).format('ddd, MMM D')}
          &nbsp;&minus;&nbsp;
          {moment(this.props.config.initialParams.inboundDate).format('ddd, MMM D')}
        </div>
      </div>
    );
  }
}

export default Direction;

