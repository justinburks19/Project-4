// step 3, create the router to handle different routes
import { Router } from 'express';
import {tasksRouter} from './tasks.routes.js';   // <-- add this

export const router = Router();

// /api/health
router.get('/health', (_req, res) => res.status(200).json({ status: 'OK' }));

// /api/tasks/*
router.use('/tasks', tasksRouter);

