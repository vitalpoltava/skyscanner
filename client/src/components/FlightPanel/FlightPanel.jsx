import React from 'react';
import BpkCard from 'bpk-component-card';
import STYLES from './FlightPanel.scss';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkSmallLongArrowRightIcon from 'bpk-component-icon/sm/long-arrow-right';
import BpkButton from 'bpk-component-button';
import service from './../../service/service';

const c = className => STYLES[className] || 'UNKNOWN';

const getLogo = (flight, index  = 0) => {
  if (flight) {
    if (flight.inboundLeg.carriers[index]){
      return flight.inboundLeg.carriers[index].ImageUrl;
    } else {
      return flight.inboundLeg.carriers[0].ImageUrl;
    }
  }
};

const getOutboundTime = (flight) => {
  if (flight) {
    return [flight.outboundLeg.Departure.split('T')[1].slice(0,5),
      flight.outboundLeg.Arrival.split('T')[1].slice(0,5)]
  }
};

const getInboundTime = (flight) => {
  if (flight) {
    return [flight.inboundLeg.Departure.split('T')[1].slice(0,5),
      flight.inboundLeg.Arrival.split('T')[1].slice(0,5)]
  }
}

const getStops = (leg) => {
  let stopMsg = '';

  if (leg.Stops.length === 1) {
    stopMsg = `${leg.Stops.length} stop in ${service.getPlaceById(leg.Stops[0]).Code}`;
  }

  if (leg.Stops.length > 1) {
    const list = leg.Stops.map(id => service.getPlaceById(id).Code);
    stopMsg = `${leg.Stops.length} stops in ${list.join(', ')}`;
  }

  return stopMsg;
};

class FlightPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={c('FlightPanel')}>
        <BpkCard>
          <BpkGridContainer>
            <BpkGridRow>
              <BpkGridColumn width={3}>
                <BpkGridRow>
                  <BpkGridColumn width={12}>
                    <img className={c('FlightPanel__logo')} src={getLogo(this.props.flight, 0)}/>
                  </BpkGridColumn>
                </BpkGridRow>
              </BpkGridColumn>
              <BpkGridColumn width={6}>
                <BpkGridRow>
                  <BpkGridColumn width={5}>
                    <div>{getOutboundTime(this.props.flight)[0]}</div>
                    <div className={c('FlightPanel__light')}>{service.getPlaceById(this.props.flight.outboundLeg.OriginStation).Code}</div>
                  </BpkGridColumn>
                  <BpkGridColumn width={2}>
                    <BpkGridRow>
                      <BpkGridColumn width={12}>
                        <BpkSmallLongArrowRightIcon fill="lightgrey"/>
                      </BpkGridColumn>
                    </BpkGridRow>
                  </BpkGridColumn>
                  <BpkGridColumn width={5}>
                    <div>{getOutboundTime(this.props.flight)[1]}</div>
                    <div className={c('FlightPanel__light')}>{service.getPlaceById(this.props.flight.outboundLeg.DestinationStation).Code}</div>
                  </BpkGridColumn>
                </BpkGridRow>
              </BpkGridColumn>
              <BpkGridColumn width={3}>
                <BpkGridRow>
                  <BpkGridColumn width={12}>
                    <div className={c('FlightPanel__rightAligned-gray')}>{this.props.flight.outboundLeg.duration}</div>
                    <div className={c('FlightPanel__rightAligned-green')}>{!this.props.flight.outboundLeg.Stops.length && 'Direct'}</div>
                    <div className={c('FlightPanel__rightAligned-gray')}>{getStops(this.props.flight.outboundLeg)}</div>
                  </BpkGridColumn>
                </BpkGridRow>
              </BpkGridColumn>
            </BpkGridRow>

            <BpkGridRow>
              <BpkGridColumn width={3}>
                <BpkGridRow>
                  <BpkGridColumn width={12}>
                    <img className={c('FlightPanel__logo')} src={getLogo(this.props.flight, 1)}/>
                  </BpkGridColumn>
                </BpkGridRow>
              </BpkGridColumn>
              <BpkGridColumn width={6}>
                <BpkGridRow>
                  <BpkGridColumn width={5}>
                    <div>{getInboundTime(this.props.flight)[0]}</div>
                    <div className={c('FlightPanel__light')}>{service.getPlaceById(this.props.flight.inboundLeg.OriginStation).Code}</div>
                  </BpkGridColumn>
                  <BpkGridColumn width={2}>
                    <BpkGridRow>
                      <BpkGridColumn width={12}>
                        <BpkSmallLongArrowRightIcon fill="lightgrey"/>
                      </BpkGridColumn>
                    </BpkGridRow>
                  </BpkGridColumn>
                  <BpkGridColumn width={5}>
                    <div>{getInboundTime(this.props.flight)[1]}</div>
                    <div className={c('FlightPanel__light')}>{service.getPlaceById(this.props.flight.inboundLeg.DestinationStation).Code}</div>
                  </BpkGridColumn>
                </BpkGridRow>
              </BpkGridColumn>
              <BpkGridColumn width={3}>
                <BpkGridRow>
                  <BpkGridColumn width={12}>
                    <div className={c('FlightPanel__rightAligned-gray')}>{this.props.flight.inboundLeg.duration}</div>
                    <div className={c('FlightPanel__rightAligned-green')}>{!this.props.flight.inboundLeg.Stops.length && 'Direct'}</div>
                    <div className={c('FlightPanel__rightAligned-gray')}>{getStops(this.props.flight.inboundLeg)}</div>
                  </BpkGridColumn>
                </BpkGridRow>
              </BpkGridColumn>
            </BpkGridRow>
            <BpkGridRow>
              <BpkGridColumn width={7}>
                <div className={c('FlightPanel__price')}>
                  {this.props.flight.currency.Symbol}{this.props.flight.PricingOptions[0].Price}
                  </div>
                <div className={c('FlightPanel__agent')}>{service.getAgentById(this.props.flight.PricingOptions[0].Agents[0]).Name}</div>
              </BpkGridColumn>
              <BpkGridColumn width={5}>
                <div className={c('FlightPanel__rightAligned-inherit')}><BpkButton>Select</BpkButton></div>
              </BpkGridColumn>
            </BpkGridRow>
          </BpkGridContainer>
        </BpkCard>
      </div>
    );
  }
}

export default FlightPanel;
