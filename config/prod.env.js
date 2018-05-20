'use strict'

require('dotenv').config()

module.exports = {
  NODE_ENV: '"production"',
  APIKEY: JSON.stringify(process.env.APIKEY)
}
