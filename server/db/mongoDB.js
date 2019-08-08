require('dotenv').config();

const mongoose = require('mongoose');
const MONGO_URI = `${process.env.DB_SCHEMA}${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`;

const conn = mongoose.createConnection(MONGO_URI);

mongoose.connect(MONGO_URI, {
  'user': `${process.env.DB_USER}`,
  'pass': `${process.env.DB_PASSWORD}`,
  useNewUrlParser: true})
    .then(() => console.log('Connected to mongod server'))
    .catch((e) => {
      console.log('url : ', MONGO_URI);
      console.error(e)
    }
   );

module.exports = conn;
