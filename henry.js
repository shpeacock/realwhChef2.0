require('dotenv').config()

module.exports = {
    consumer_key:         process.env.HENRY_KEY,
    consumer_secret:      process.env.HENRY_SECRET,
    access_token:         process.env.HENRY_TOKEN,
    access_token_secret:  process.env.HENRY_TOKEN_SECRET,
}