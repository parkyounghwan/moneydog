require('dotenv').config();

import mongoose from 'mongoose';

const MONGO_URI = `${process.env.DB_SCHEMA}${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`;

// connect 하는 부분
const mongoConnect = () => {
  if (process.env.NODE_ENV === 'test') {
    const Mockgoose = require('mockgoose').Mockgoose;
    const mockgoose = new Mockgoose(mongoose);
    mockgoose.prepareStorage()
      .then(() => {
        mongoose.connect(MONGO_URI, {useNewUrlParser: true})
          .then(() => console.log('Connected test mongo db using mockgoose'))
          .catch((e) => {
            console.error(e);
          });
      });
  } else {
    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
    })
      .then(() => console.log('Connected mongo server'))
      .catch((e) => {
        console.error(e);
      });
  }
};

// mongo 연결 해제 부분
const mongoDisConnect = () => {
  mongoose.disconnect()
    .then(() => console.log('Disconnected mongo server'))
    .catch((e) => {
      console.error(e);
    });
};

export {mongoConnect, mongoDisConnect};
