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
  if (itineraries.length) {
    for (let i = 0; i < itineraries.length; i++){
      itineraries[i].outboundLeg = findLeg(legs, itineraries[i].OutboundLegId);
      itineraries[i].inboundLeg = findLeg(legs, itineraries[i].InboundLegId);

      if (itineraries[i].outboundLeg) {
        itineraries[i].outboundLeg.segments = findSegments(segments, itineraries[i].outboundLeg.SegmentIds);
      }

      if (itineraries[i].inboundLeg) {
        itineraries[i].inboundLeg.segments = findSegments(segments, itineraries[i].inboundLeg.SegmentIds);
      }
    }
  }
  return [...itineraries];
};

// Main response wrapper
let transformedData;

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
        return transformedData;
      })
      .catch(err => {
        throw err;
      });
  },
};

export default service;
