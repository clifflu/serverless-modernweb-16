'use strict'

/**
 *
 * @param evt
 * @param evt.identity
 * @param ctx
 * @param cb
 * @returns {*}
 */
function handler (evt, ctx, cb) {
  if (evt.identity && evt.identity.sourceIp) {
    return cb(null, {sourceIp: evt.identity.sourceIp})
  }

  cb('unknown sourceIp')
}

module.exports = {
  handler: handler
}
