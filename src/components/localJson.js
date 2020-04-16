
/**
 * @function
 * @param {string<localStorage[name]>} name
 * @param {string} defaultValue
 * @return {Object<localStorage[name]>}
 */
function getLocalJSON (name, defaultValue) {
  let json = {}

  try {
    const _json = JSON.parse(window.localStorage[name])
    typeof _json === 'object' && (json = _json)
  } catch ( e ) {

    json = typeof defaultValue !== 'undefined'
      ? JSON.parse(defaultValue)
      : json

  }

  return json
}


/**
 * @function
 * @param {string<localStorage[name]>} name
 * @param {Object} json
 */
function setLocalJSON (name, json) {
  try {
    window.localStorage[name] = JSON.stringify(json)
  } catch ( e ) {}
}

export default {
  getLocalJSON,
  setLocalJSON
}

export { getLocalJSON, setLocalJSON }
