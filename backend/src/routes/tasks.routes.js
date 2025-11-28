//step 4, lets take the router and define the routes for tasks

import { Router } from 'express';
import {getAllTasksController, createTaskController, getTaskByIdController, updateTaskByIdController, deleteTaskByIdController} from '../controllers/tasks.controller.js';
import {asyncHandler} from '../utils/asyncHandler.js';
export const tasksRouter = Router();


// Define routes for tasks
// CRUD operations for tasks
tasksRouter.get('/', asyncHandler(getAllTasksController)); // Get all tasks, used to read data
tasksRouter.post('/', asyncHandler(createTaskController)); // Create a new task is used to create data

tasksRouter.get('/:id', asyncHandler(getTaskByIdController)); // Get a task by ID, used to read data
tasksRouter.put('/:id', asyncHandler(updateTaskByIdController)); // Update a task by ID, used to replace the entire task
tasksRouter.delete('/:id', asyncHandler(deleteTaskByIdController)); // Delete a task by ID, used to remove the task