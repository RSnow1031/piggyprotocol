
/**
 * @param {number} seconds Format seconds to MM:SS
 * @return {string} '05:30'
 */
const formatSecondsToMMSS = (seconds: number) => new Date(seconds * 1000).toISOString().substr(11, 8)

export default formatSecondsToMMSS
