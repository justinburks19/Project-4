// src/services/tasks.service.js
// where to put the business logic, know how to catch/save/ update!
//step 6, implement the business logic for each CRUD operation
import { type } from 'node:os';
import {storage} from '../../data/dataBase.js';
import { randomUUID } from 'node:crypto'; // for generating unique IDs
// in-memory storage for tasks
//let idCounter = storage.length + 1; // simple counter to assign unique IDs if i didnt have to delete tasks

// Get all tasks
export const getAllTasks = async () => {
    if (storage.length === 0) {
        console.log('No tasks found in storage.'); // log if no tasks found
        return []; // return empty array if no tasks
    }
    console.log('Storage contents:', storage); // log the current storage contents
    return storage; // return all tasks from storage
};

//what are the clients trying to set?
// clients are trying to set the task data (playerCard, desc, age, active) as per info.js
const set = ({ playerCard, desc, age, active } = {}) => { //set the array of objects with only the allowed properties to a new object
    const task = {}; // A empty object to hold the new task properties

    //Maybe rename and validate inputs
    const playerCardCheck = String(playerCard) || Number(playerCard); // convert playerCard to string or can take numbers. IDC!!!
    const descCheck = String(desc) || Number(desc); // convert desc to string or can take numbers. IDC!!!
    const ageCheck = Number(age); // convert age to number
    active = true; //standardize active to true if sent any value
    const activeCheck = Boolean(active); // convert active to boolean
    //validate and assign only allowed properties

    //playercard validation
    if (!playerCardCheck ) {
        throw new Error('ValidationError: playerCard is required and must be a non-empty string with letters and mixed in with numbers.'); 
    } else {
        task.playerCard = playerCardCheck.trim(); // assign trimmed playerCard to task object
        console.log('playerCard set to:', task.playerCard); // log the set playerCard
    }

    //desc validation
    if (!descCheck) {
        throw new Error('ValidationError: desc is required and must be a non-empty string with letters and mixed in with numbers.');
    } else {
        task.desc = descCheck.trim(); // assign trimmed desc to task object
    }

    //age validation
    if (!ageCheck) { //check age is valid
        throw new Error('ValidationError: age is required.');
    } else if (isNaN(ageCheck)) { //check if not a number
        throw new Error('ValidationError: age must be a valid number.');
    } else if (ageCheck < 10 || ageCheck > 80) { // check if age is within a reasonable range
       throw new Error('ValidationError: age must be between 10 and 80.');
    } else { // valid age finally reached
        task.age = ageCheck; // assign age to task object
    }

    if (activeCheck) {
    task.activeCheck = true;    //standardize active to boolean
    }
    //active would always be sent as string from client side


    return task; // return the new task object with only the allowed properties
};

//const body = set(req.body); // use the set function to filter the request body

// Create a new task
// activatedd by POST /api/tasks
export const createTask = async (taskData = {}) => {
    
    // create a new task object, assign a unique ID and add createdAt timestamp
    const newTask = {
        // do not use -> ...taskData // spread the task data (title, completed, description)
        ...set(taskData), // spread the task data (playerCard, desc, age, active)
        id: randomUUID(), // generate a unique ID
        createdAt: new Date().toISOString(), // add createdAt timestamp //iso standardized string format known as ISO 8601
    };

    storage.push(newTask); // add the new task to storage
    console.log('New task added to storage:', newTask); // log the new task added to storage
    console.log('Updated storage contents:', storage); // log the updated storage contents
    return newTask; // return the newly created task

};

// Get a task by ID
// activated by GET /api/tasks/:id
// 
export const getTaskById = async (id) => {
    /*
    const task = parseInt(id, 10); // convert id to integer, base of 10
    if (Number.isNaN(task)) return null; // if Number as in not a number, return null
    return storage.find(t => t.id === task) || null; // find and return the task with the matching ID or null if not found
    */ // updated to use randomUUID which is a string
    //verify id is a string
    if (typeof id !== 'string'){
        console.error('Invalid ID type:', typeof id); // log the invalid ID type
        return null;
    } else if (id.trim() === '')
        {
        console.error('ID is empty'); // log the empty ID
        return null;
    }
    //give it a key to hold the trimmed id
    const value = id.trim(); // trim any extra spaces from the id
    if (!value) {
        console.error('ID is empty after trimming'); // log the empty ID
        return null;
    }; // if key is empty after trimming, return null
    
    return storage.find(item => item.id === value) || null; // find and return the task with the matching ID or null if not found
};

// Update/ Replace a task by ID
// activated by PUT /api/tasks/:id
// we can also display the new update task after updating
export const updateTaskById = async (id, taskData = {}) => {
    /*
    const taskID = parseInt(id, 10); // convert id to integer, base of 10
    if (Number.isNaN(taskID)) return null; // if Number as in not a number, return null
    const index = storage.findIndex(t => t.id === taskID); // find the index of the task with the matching ID
    if (index < 0 ) return null; // if not found, return null
    const updatedTask = { id: taskID, ...taskData }; // create the updated task object
    storage[index] = updatedTask; // replace the task in storage
    return updatedTask; // return the updated task
    */ // updated to use randomUUID which is a string
    if (typeof id !== 'string' || id.trim() === '') return null; // if id is not a string or is empty, return null
    
    const key = id.trim(); // trim any extra spaces from the id
    if (!key) {
        console.error('ID is empty after trimming'); // log the empty ID
        return null;
    }; // if key is empty after trimming, return null

    const index = storage.findIndex(item => item.id === key); // find the index of the task with the matching ID
    if (index < 0 ) { // if not found, return null
        console.error('Task not found for ID:', key); // log the task not found
        return null;
    };

    const originalTask = storage[index]; // get the original task
    const updatedTask = {...originalTask,id: key, ...set(taskData), updatedAt: new Date().toISOString() }; // create the updated task object with only the allowed properties
    storage[index] = updatedTask; // replace the task in storage
    return updatedTask; // return the updated task

};

// Delete a task by ID. we can also return the deleted task if needed
// activated by DELETE /api/tasks/:id
export const deleteTaskById = async (id) => {
    const taskID = id.trim(); // trim any extra spaces from the id
    //Validate id first
    if (typeof taskID !== 'string') {
        console.error('Invalid ID for deletion:', id); // log the invalid ID
        console.log('Test any of these id"\"s in storage for reference:', storage.map(item => item.id)); // log the current IDs in storage for reference
        return null;
    }; // if taskID is not a string return null

    
    if (!taskID) {
        console.error('ID is empty after trimming for deletion'); // log the empty ID
        return null;
    }; // if taskID is empty after trimming, return null

    //Lets have a index, find the index of the task with the matching ID
    const index = storage.findIndex(item => item.id === taskID); // find the index of the task with the matching ID

    if (index < 0 ) { // if not found, return null
        console.error('Task not found for deletion with ID:', taskID); // log the task not found
        return null;
    };

    //Remove the task from storage
    const [deletedTask] = storage.splice(index, 1); // remove the task from storage and get the deleted task, lets say index is 5, remove 1 item

    //Optionally, we can keep track of deleted tasks in a separate storage if needed
    const deletedTasksStorage = getDeletedTasksStorage([]); // get the deleted tasks storage
    deletedTasksStorage.push(deletedTask); // add the deleted task to the deleted tasks storage
    console.log('Deleted task:', deletedTask); // log the deleted task
    console.log('Updated storage contents after deletion:', storage); // log the updated storage contents after deletion
    return deletedTask; // return the deleted task


};

const getDeletedTasksStorage =  (deletedTasks) => {
    const deletedTasksUpdate = [];
    deletedTasksUpdate.push(...deletedTasks);
    return deletedTasksUpdate;
}