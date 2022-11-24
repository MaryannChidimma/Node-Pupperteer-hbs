import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

import { connectToDatabase } from './databaseConnection';
import { loadDatabase } from './generateData';
import hbs from 'hbs'
import { findAll, findOne, viewOrder, downloadOrder } from './controllers/order.controller';

dotenv.config();

const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500');

const app = express();

 const helpers =   {
    round: function (number) {
      return Math.round(number) / 100;
    },
    date: function (dateString) {
      const date = new Date(dateString);

      return `${date.getMonth() + 1}/${date.getDate() + 1}/${date.getFullYear()}`;
    },
  }

  for (let helper in helpers){
   hbs.registerHelper(helper, helpers[helper])
  } 

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World!' });
});

app.get('/orders', findAll);
app.get('/orders/:id', findOne);
app.get('/orders/:id/view', viewOrder)
app.get('/orders/:id/download', downloadOrder);

app.listen(PORT, async () => {
  await connectToDatabase();

  await loadDatabase(process.env.FAKER_LOCALE, process.env.CLEAN_DB === 'true');

  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});
