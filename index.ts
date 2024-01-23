import { config } from 'dotenv';
config();
import bodyParser from 'body-parser';
import express from 'express';
import router from './src/routes/router';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);

app.listen(process.env.PORT || 5658, () => console.log('Server ligado em http://localhost:5657'))