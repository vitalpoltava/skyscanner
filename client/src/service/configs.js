import moment from 'moment';

const getNextWeekDay = (weekDay = 1) => {
  const dayINeed = weekDay;
  const today = moment().isoWeekday();
  let result;

  if (today <= dayINeed) {
    result = moment().isoWeekday(dayINeed);
  } else {
    result = moment().add(1, 'weeks').isoWeekday(dayINeed);
  }
  return result.format('YYYY-MM-DD');
};

const initialParams = {
  originPlace: 'EDI',
  destinationPlace: 'LHR',
  outboundDate: getNextWeekDay(1),
  inboundDate: getNextWeekDay(2),
  adults: '1',
  children: '0',
  infants: '0',
};

export default {
  initialParams,
};
