import React from 'react';
import BpkCard from 'bpk-component-card';

class FlightPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { flight: props.flight };
  }

  render() {
    return (
      <div><BpkCard>1</BpkCard><br/></div>
    );
  }
}

export default FlightPanel;
