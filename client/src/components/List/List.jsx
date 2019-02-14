import React from 'react';
import PropTypes from 'prop-types';
import BpkButton from 'bpk-component-button';
import FlightPanel from './../FlightPanel/FlightPanel';
import STYLES from './List.scss';

const c = className => STYLES[className] || 'UNKNOWN';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 10,
      currentPage: 1,
    };
  }

  get getFlightsPerPage() {
    let list;
    if (this.props.data && this.props.data.length) {
      const chunk = this.props.data.slice(0, this.state.pageSize * this.state.currentPage);
      list = chunk.map(flight => <FlightPanel key={flight.toString()} flight={flight} />);
    }
    return list;
  }

  incrementPage = () => {
    const next = this.state.currentPage + 1;
    this.setState({ currentPage: next });
  };

  render() {
    return (
      this.props.data ?
        <div>
          <div>{this.getFlightsPerPage}</div>
          <div className={c('List__centerAligned')}>
            <BpkButton secondary onClick={this.incrementPage}>Show more</BpkButton>
          </div>
        </div>
        : null
    );
  }
}

List.propTypes = {
  data: PropTypes.isRequired,
};

export default List;
