let transformedData;
let places;

/**
 * @name serialize
 * @inner
 * @type {Function}
 * @description
 * Serialize params for sending in GET request
 *
 * @param {Object} obj
 * @returns {string}
 */
const serialize = (obj) => {
  const str = [];
  for (let p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};

/**
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
  } else {
    const leg = legId && legs.find(item => item.Id === legId);
    findLeg[legId] = leg;
    return leg;
  }
};

/**
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
    for (let i = 0; i < ids.length; i++) {
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

/**
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
    for (let i = 0; i < ids.length; i++) {
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

const getPlaceById = (id = 0) => {
  return places.find(item => item.Id === id);
};

/**
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
    for (let i = 0; i < itineraries.length; i++){

      // add Legs
      itineraries[i].outboundLeg = findLeg(legs, itineraries[i].OutboundLegId);
      itineraries[i].inboundLeg = findLeg(legs, itineraries[i].InboundLegId);

      // add Segments and Carriers
      if (itineraries[i].outboundLeg) {
        itineraries[i].outboundLeg.segments = findSegments(segments, itineraries[i].outboundLeg.SegmentIds);
        itineraries[i].outboundLeg.carriers = findCarriers(carriers, itineraries[i].outboundLeg.Carriers);
      }
      if (itineraries[i].inboundLeg) {
        itineraries[i].inboundLeg.segments = findSegments(segments, itineraries[i].inboundLeg.SegmentIds);
        itineraries[i].inboundLeg.carriers = findCarriers(carriers, itineraries[i].inboundLeg.Carriers);
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
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return Promise.resolve(response)
        } else {
          return Promise.reject(new Error(response.statusText))
        }
      })
      .then(data => data.json())
      .then((results) => {
        console.log('Data is arrived...');
        transformedData = transformData(results);
        places = results.Places;
        return transformedData;
      })
      .catch(err => {
        throw err;
      });
  },

  getPlaceById,
};

export default service;
