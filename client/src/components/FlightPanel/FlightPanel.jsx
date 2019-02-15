import React from 'react';
import PropTypes from 'prop-types';
import BpkCard from 'bpk-component-card';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkSmallLongArrowRightIcon from 'bpk-component-icon/sm/long-arrow-right';
import BpkButton from 'bpk-component-button';
import STYLES from './FlightPanel.scss';
import service from './../../service/service';


const c = className => STYLES[className] || 'UNKNOWN';

const getLogo = (flight, index = 0) => {
  let imageUrl;
  if (flight) {
    if (flight.inboundLeg.carriers[index]) {
      imageUrl = flight.inboundLeg.carriers[index].ImageUrl;
    } else {
      imageUrl = flight.inboundLeg.carriers[0].ImageUrl;
    }
  }
  return imageUrl;
};

const getOutboundTime = (flight) => {
  let timeArr;
  if (flight) {
    timeArr = [flight.outboundLeg.Departure.split('T')[1].slice(0, 5),
      flight.outboundLeg.Arrival.split('T')[1].slice(0, 5)];
  }
  return timeArr;
};

const getInboundTime = (flight) => {
  let timeArr;
  if (flight) {
    timeArr = [flight.inboundLeg.Departure.split('T')[1].slice(0, 5),
      flight.inboundLeg.Arrival.split('T')[1].slice(0, 5)];
  }
  return timeArr;
};

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

const FlightPanel = props =>
  (
    <div className={c('FlightPanel')}>
      <BpkCard>
        <BpkGridContainer>
          <BpkGridRow>
            <BpkGridColumn width={3}>
              <BpkGridRow>
                <BpkGridColumn width={12}>
                  <img className={c('FlightPanel__logo')} alt="Logo" src={getLogo(props.flight, 0)} />
                </BpkGridColumn>
              </BpkGridRow>
            </BpkGridColumn>
            <BpkGridColumn width={6}>
              <BpkGridRow>
                <BpkGridColumn width={5}>
                  <div>{getOutboundTime(props.flight)[0]}</div>
                  <div className={c('FlightPanel__light')}>{service.getPlaceById(props.flight.outboundLeg.OriginStation).Code}</div>
                </BpkGridColumn>
                <BpkGridColumn width={2}>
                  <BpkGridRow>
                    <BpkGridColumn width={12}>
                      <BpkSmallLongArrowRightIcon fill="lightgrey" />
                    </BpkGridColumn>
                  </BpkGridRow>
                </BpkGridColumn>
                <BpkGridColumn width={5}>
                  <div>{getOutboundTime(props.flight)[1]}</div>
                  <div className={c('FlightPanel__light')}>{service.getPlaceById(props.flight.outboundLeg.DestinationStation).Code}</div>
                </BpkGridColumn>
              </BpkGridRow>
            </BpkGridColumn>
            <BpkGridColumn width={3}>
              <BpkGridRow>
                <BpkGridColumn width={12}>
                  <div className={c('FlightPanel__rightAligned--gray')}>{props.flight.outboundLeg.duration}</div>
                  <div className={c('FlightPanel__rightAligned--direct')}>{!props.flight.outboundLeg.Stops.length && 'Direct'}</div>
                  <div className={c('FlightPanel__rightAligned--gray')}>{getStops(props.flight.outboundLeg)}</div>
                </BpkGridColumn>
              </BpkGridRow>
            </BpkGridColumn>
          </BpkGridRow>

          <BpkGridRow>
            <BpkGridColumn width={3}>
              <BpkGridRow>
                <BpkGridColumn width={12}>
                  <img className={c('FlightPanel__logo')} alt="Logo" src={getLogo(props.flight, 1)} />
                </BpkGridColumn>
              </BpkGridRow>
            </BpkGridColumn>
            <BpkGridColumn width={6}>
              <BpkGridRow>
                <BpkGridColumn width={5}>
                  <div>{getInboundTime(props.flight)[0]}</div>
                  <div className={c('FlightPanel__light')}>{service.getPlaceById(props.flight.inboundLeg.OriginStation).Code}</div>
                </BpkGridColumn>
                <BpkGridColumn width={2}>
                  <BpkGridRow>
                    <BpkGridColumn width={12}>
                      <BpkSmallLongArrowRightIcon fill="lightgrey" />
                    </BpkGridColumn>
                  </BpkGridRow>
                </BpkGridColumn>
                <BpkGridColumn width={5}>
                  <div>{getInboundTime(props.flight)[1]}</div>
                  <div className={c('FlightPanel__light')}>{service.getPlaceById(props.flight.inboundLeg.DestinationStation).Code}</div>
                </BpkGridColumn>
              </BpkGridRow>
            </BpkGridColumn>
            <BpkGridColumn width={3}>
              <BpkGridRow>
                <BpkGridColumn width={12}>
                  <div className={c('FlightPanel__rightAligned--gray')}>{props.flight.inboundLeg.duration}</div>
                  <div className={c('FlightPanel__rightAligned--direct')}>{!props.flight.inboundLeg.Stops.length && 'Direct'}</div>
                  <div className={c('FlightPanel__rightAligned--gray')}>{getStops(props.flight.inboundLeg)}</div>
                </BpkGridColumn>
              </BpkGridRow>
            </BpkGridColumn>
          </BpkGridRow>
          <BpkGridRow>
            <BpkGridColumn width={7}>
              <div className={c('FlightPanel__price')}>
                {props.flight.currency.Symbol}{props.flight.PricingOptions[0].Price}
              </div>
              <div className={c('FlightPanel__agent')}>{service.getAgentById(props.flight.PricingOptions[0].Agents[0]).Name}</div>
            </BpkGridColumn>
            <BpkGridColumn width={5}>
              <div className={c('FlightPanel__rightAligned--inherit')}><BpkButton>Select</BpkButton></div>
            </BpkGridColumn>
          </BpkGridRow>
        </BpkGridContainer>
      </BpkCard>
    </div>
  );

FlightPanel.propTypes = {
  flight: PropTypes.isRequired,
};

export default FlightPanel;
