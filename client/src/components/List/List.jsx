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

  getFlightsPerPage(){
    return this.props.data.slice(0, this.state.pageSize * this.state.currentPage);
  }

  incrementPage(){
    let next = this.state.currentPage;
    this.setState({currentPage: ++next});
  }

  render() {
    return (
      this.props.data ?
        <div>
          <div>{this.getFlightsPerPage().map((flight, index) => <FlightPanel key={index} flight={flight}/>)}</div>
          <BpkButton secondary onClick={this.incrementPage.bind(this)}>Load more</BpkButton>
        </div>
        : null
    );
  }
}

export default List;
