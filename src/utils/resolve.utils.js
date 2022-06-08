const path = require('path');
const { VERSION, RESOURCE_CONFIG } = require('../config');

const base = path.join(__dirname, '../');

const resolveFromVersion = (version = VERSION['3_0_1'], relative_path = '') => path.join(base, RESOURCE_CONFIG.resourceBase, version, relative_path);

const resolve = (relative_path = '') => path.join(base, relative_path);

/**
 * @name exports
 * @summary helpers for requiring files
 */
module.exports = {
  resolveFromVersion,
  resolve,
};
