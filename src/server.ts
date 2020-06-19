import https from 'https';
import fs from 'fs';
import { Model } from 'objection';

import app from './app';
import { db } from './db';

const start = async () => {
  Model.knex(db);
  const options = {
    key: fs.readFileSync('localhost.key'),
    cert: fs.readFileSync('localhost.crt')
  };
  https.createServer(options, app.callback()).listen(3031, () => {
    console.log('Listing on port 3031');
  });
};

start();
