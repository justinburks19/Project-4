//step 2, create the server using http module and the express app
//this will run the express app on the server 

import express from 'express';
import router from './routes';
import notFound from './middlewares/notFound.js';
import errorHandler from './middlewares/errorHandler.js';

// Initialize Express app
const app = express();

// Use middleware
app.use(express.json()); // for parsing application/json
app.use('/api', router); // use the imported router for API routes will be prefixed with /api
app.use(notFound); // handle 404 errors
app.use(errorHandler); // handle other errors

export default app;
