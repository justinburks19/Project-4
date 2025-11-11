//step 4

import {Router} from 'express';
import {ctrl} from '../controllers/tasks.controller.js';
import {AsynHandler} from '../utils/asyncHandler.js';

export const tasksRouter = Router();

//CRUD operations for tasks
// Define routes for tasks
tasksRouter.get('/', AsynHandler(ctrl.getAllTasks)); // Get all tasks
tasksRouter.post('/', AsynHandler(ctrl.createTask)); // Create a new task
tasksRouter.get('/:id', AsynHandler(ctrl.getTaskById)); // Get a task by ID
tasksRouter.put('/:id', AsynHandler(ctrl.updateTaskById)); // Update a task by ID
tasksRouter.delete('/:id', AsynHandler(ctrl.deleteTaskById)); // Delete a task by ID

export default tasksRouter;