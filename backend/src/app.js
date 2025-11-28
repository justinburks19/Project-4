//step 2, create the server using http module and the express app
//this will run the express app on the server 

import express from 'express';
import {router} from './routes/index.js';
import {notFound} from './middlewares/notFound.js';
import {errorHandle} from './middlewares/errorHandle.js';
import cors from 'cors';
import { getTaskById } from './services/tasks.service.js';
// Initialize Express app
const app = express();

// Use middleware
app.use(express.json()); // for parsing application/json
app.use(cors()); // enable CORS for all routes which allows cross-origin requests
app.use('/api', router); // use the imported router for API routes will be prefixed with /api
app.use('/api/tasks', router); // use the tasks router for /api/tasks routes

//request info
app.use('/api/tasks/:id', getTaskById);

// what will the default will do which is http://127.0.0.1:3000/
app.get('/', (_req, res) => {
  res.type('text').send('API is up');
});

app.use(notFound); // handle 404 errors
app.use(errorHandle); // handle other errors

export default app;
