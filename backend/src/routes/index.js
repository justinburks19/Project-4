//step 3, create the router to handle different routes
import { Router } from 'express';
import {tasksRouter} from './tasks.js';

const router = Router();

// Mount the tasks router on the /tasks path
router.use('/tasks', tasksRouter);

//lets have the option to add more routes in the future
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

export default router;