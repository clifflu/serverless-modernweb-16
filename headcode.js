'use strict'

const request = require('request')
const url = require('url')

function handler (evt, ctx, cb) {
  const queryUrl = evt.query && evt.query.url
  var target

  try {
    target = url.parse(queryUrl)
  } catch (ex) {
    return cb('Invalid or missing `url`')
  }

  if (!target.protocol) {
    if (/^\/\//.test(queryUrl)) {
      target = `https:${queryUrl}`
    } else {
      target = `http://${queryUrl}`
    }
  }

  try {
    target = url.parse(target)
  } catch (ex) {
    return cb('Unable to parse `url`')
  }

  request.head(target.format(), (err, res) => {
    if (err) {
      return cb(err)
    }

    cb(null, {
      url: target.format(),
      statusCode: res.statusCode
    })
  })
}

module.exports = {
  handler: handler
}
