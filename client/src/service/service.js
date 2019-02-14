let transformedData;
let places;
let agents;

/*
 * @name serialize
 * @inner
 * @type {Function}
 * @description
 * Serialize params for sending in GET request
 *
 * @param {Object} obj
 * @returns {string}
 */
const serialize = (obj = {}) => {
  const str = [];
  Object.keys(obj).forEach((key) => {
    str.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
  });
  return str.join('&');
};

/*
 * @name findLeg
 * @inner
 * @type {Function}
 * @description
 * Finds leg by Id (caching search)
 *
 * @param {Array} legs
 * @param {String} legId
 * @returns {Object|undefined}
 */
const findLeg = (legs = [], legId = '') => {
  if (legId && findLeg[legId]) {
    return findLeg[legId];
  }

  const leg = legId && legs.find(item => item.Id === legId);
  findLeg[legId] = leg;
  return leg;
};

/*
 * @name findSegments
 * @inner
 * @type {Function}
 * @description
 * Finds segments by segment Ids (caching search)
 *
 * @param {Array} segments
 * @param {String} ids
 * @returns {Array<Object>|undefined}
 */
const findSegments = (segments = [], ids = []) => {
  const res = [];
  if (ids.length) {
    for (let i = 0; i < ids.length; i += 1) {
      if (findSegments[ids[i]]) {
        res.push(findSegments[ids[i]]);
      } else {
        const segment = segments.find(item => item.Id === ids[i]);
        findSegments[ids[i]] = segment;
        res.push(segment);
      }
    }
  }
  return res;
};

/*
 * @name findCarriers
 * @inner
 * @type {Function}
 * @description
 * Finds carriers by segment Ids (caching search)
 *
 * @param {Array} carriers
 * @param {String} ids
 * @returns {Array<Object>|undefined}
 */
const findCarriers = (carriers = [], ids = []) => {
  const res = [];
  if (ids.length) {
    for (let i = 0; i < ids.length; i += 1) {
      if (findCarriers[ids[i]]) {
        res.push(findCarriers[ids[i]]);
      } else {
        const carrier = carriers.find(item => item.Id === ids[i]);
        findCarriers[ids[i]] = carrier;
        res.push(carrier);
      }
    }
  }
  return res;
};

/*
 * @name getPlaceById
 * @type {Function}
 * @description
 * Returns Place object by Id
 *
 * @param {Number} id
 * @returns {Object|undefined}
 */
const getPlaceById = (id = 0) => places.find(item => item.Id === id);

/*
 * @name getAgentById
 * @type {Function}
 * @description
 * Returns Agent object by Id
 *
 * @param {Number} id
 * @returns {Object|undefined}
 */
const getAgentById = (id = 0) => agents.find(item => item.Id === id);

/*
 * @name flightTimeInHours
 * @inner
 * @type {Function}
 * @description
 * Returns formatted flight duration
 *
 * @param {Number} durationInMinutes
 * @returns {string}
 */
const flightTimeInHours = (durationInMinutes = 0) => {
  const hours = Math.floor(durationInMinutes / 60);
  const mins = durationInMinutes - (hours * 60) >= 10 ?
    durationInMinutes - (hours * 60) : `0${(durationInMinutes - (hours * 60))}`;

  return `${hours}h ${mins}`;
};

/*
 * @name transformData
 * @inner
 * @type {Function}
 * @description
 * Augments itineraries with refs to Lag and Segments data and returns
 * brand new list.
 *
 * @param {Object} raw
 * @returns {Array}
 */
const transformData = (raw = {}) => {
  const itineraries = raw.Itineraries || [];
  const legs = raw.Legs || [];
  const segments = raw.Segments || [];
  const carriers = raw.Carriers || [];

  if (itineraries.length) {
    for (let i = 0; i < itineraries.length; i += 1) {
      // add Legs
      itineraries[i].outboundLeg = findLeg(legs, itineraries[i].OutboundLegId);
      itineraries[i].inboundLeg = findLeg(legs, itineraries[i].InboundLegId);

      // add currency
      itineraries[i].currency = raw.Currencies[0] || [];

      // add Segments, Carriers, duration
      if (itineraries[i].outboundLeg) {
        itineraries[i].outboundLeg.segments =
          findSegments(segments, itineraries[i].outboundLeg.SegmentIds);
        itineraries[i].outboundLeg.carriers =
          findCarriers(carriers, itineraries[i].outboundLeg.Carriers);
        itineraries[i].outboundLeg.duration =
          flightTimeInHours(itineraries[i].outboundLeg.Duration);
      }
      if (itineraries[i].inboundLeg) {
        itineraries[i].inboundLeg.segments =
          findSegments(segments, itineraries[i].inboundLeg.SegmentIds);
        itineraries[i].inboundLeg.carriers =
          findCarriers(carriers, itineraries[i].inboundLeg.Carriers);
        itineraries[i].inboundLeg.duration =
          flightTimeInHours(itineraries[i].inboundLeg.Duration);
      }
    }
  }
  return [...itineraries];
};

// Service API
const service = {
  getData(paramsObj = {}) {
    const apiLink = 'http://localhost:4000/api/search';

    return fetch(`${apiLink}?${serialize(paramsObj)}`)
      .then((response) => {
        let result;
        if (response.status >= 200 && response.status < 300) {
          result = Promise.resolve(response);
        } else {
          result = Promise.reject(new Error(response.statusText));
        }
        return result;
      })
      .then(data => data.json())
      .then((results) => {
        transformedData = transformData(results);
        agents = results.Agents;
        places = results.Places;

        return transformedData;
      })
      .catch((err) => {
        throw err;
      });
  },

  getPlaceById,
  getAgentById,
};

export default service;
