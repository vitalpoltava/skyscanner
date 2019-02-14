import React from 'react';
import FlightPanel from './../FlightPanel/FlightPanel';
import BpkButton from 'bpk-component-button';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 10,
      currentPage: 1,
    }
  }

  get getFlightsPerPage(){
    if (this.props.data && this.props.data.length) {
      const chunk = this.props.data.slice(0, this.state.pageSize * this.state.currentPage);
      return chunk.map((flight, index) => <FlightPanel key={index} flight={flight}/>);
    }
  }

  incrementPage(){
    let next = this.state.currentPage + 1;
    this.setState({currentPage: next});
  }

  render() {
    return (
      this.props.data ?
        <div>
          <div>{this.getFlightsPerPage}</div>
          <BpkButton secondary onClick={this.incrementPage.bind(this)}>Show more</BpkButton>
        </div>
        : null
    );
  }
}

export default List;
