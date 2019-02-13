import React from 'react';
import BpkCard from 'bpk-component-card';

class FlightPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <BpkCard>
          <div className="row">
            <img src={`https://logos.skyscnr.com/images/airlines/favicon/${this.props.flight.inboundLeg.carriers[0].DisplayCode}.png`}/>
          </div>
        </BpkCard>
        <br/>
      </div>
    );
  }
}

export default FlightPanel;
