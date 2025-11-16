// src/services/tasks.service.js
// where to put the business logic, know how to catch/save/ update!
//step 6, implement the business logic for each CRUD operation
import { type } from 'node:os';
import storage from '../../data/info.js';
import { randomUUID } from 'node:crypto'; // for generating unique IDs
// in-memory storage for tasks
//let idCounter = storage.length + 1; // simple counter to assign unique IDs if i didnt have to delete tasks

// Get all tasks
const getAllTasks = async () => {
    return storage;
};

//what are the clients trying to set?
// clients are trying to set the task data (title, completed, description) as per info.js
const set = ({ playercard, desc, age, active } = {}) => { //set the array of objects with only the allowed properties to a new object
    const task = {};

    const ageCheck = Number(age); // convert age to number
    
    //validate and assign only allowed properties

    //playercard validation
    if (typeof playercard === 'string' && playercard.trim() !== '') {
        task.playerCard = playercard.trim(); // assign trimmed playercard to task object
    }

    //description validation
    if (typeof desc === 'string' && desc.trim() !== '') {
        task.desc = desc.trim(); // assign trimmed desc to task object
    }

    //age validation
    if (!Number.isNaN(ageCheck) && ageCheck > 0 && ageCheck < 120) {
        task.age = ageCheck; // assign age to task object
    
    } else {
        throw new Error('ValidationError: Age must be a number between 1 and 119');
    }

    //active validation
    if (active !== undefined) {
        //can send true, false, "true", "false", 1, 0, "1", "0"
        //We can handle numbers and strings for boolean values?
        //Boolean check ✅
        //Number check ✅
        if (typeof active === 'boolean') {//stricly boolean (true/false)
            task.active = active; // assign boolean active to task object
        } 
        //handle strings
        else if (typeof active === 'string') {
            const lower = active.toLowerCase(); // convert string to lowercase
            if (lower === 'true' || lower === '1' || lower === 'yes' || lower === 'on') {
                task.active = true;
            } else if (lower === 'false' || lower === '0' || lower === 'no' || lower === 'off') {
                task.active = false;
            }
        }
        //handle numbers
        else if (typeof active === 'number') {
                task.active = active === 1; //  only if active is 1, set to true, else false. 0 === 1 false, 2 === 1 false 1 === 1 true
            }
    }

    return task; // return the new task object with only the allowed properties
};

//const body = set(req.body); // use the set function to filter the request body

// Create a new task
// activatedd by POST /api/tasks
const createTask = async (taskData = {}) => {
    
    // create a new task object, assign a unique ID and add createdAt timestamp
    const newTask = {
        // do not use -> ...taskData // spread the task data (title, completed, description)
        ...set(taskData), // spread the task data (playerCard, desc, age, active)
        id: randomUUID(), // generate a unique ID
        createdAt: new Date().toISOString(), // add createdAt timestamp //iso standardized string format known as ISO 8601
    };

    storage.push(newTask); // add the new task to storage
    return newTask; // return the newly created task

};

// Get a task by ID
// activated by GET /api/tasks/:id
// 
const getTaskById = async (id) => {
    /*
    const task = parseInt(id, 10); // convert id to integer, base of 10
    if (Number.isNaN(task)) return null; // if Number as in not a number, return null
    return storage.find(t => t.id === task) || null; // find and return the task with the matching ID or null if not found
    */ // updated to use randomUUID which is a string
    //verify id is a string
    if (typeof id !== 'string' || id.trim() === '') return null; // if id is not a string or is empty, return null
    //give it a key to hold the trimmed id
    const key = id.trim(); // trim any extra spaces from the id
    if (!key) return null; // if key is empty after trimming, return null
    
    return storage.find(item => item.id === key) || null; // find and return the task with the matching ID or null if not found
};

// Update/ Replace a task by ID
// activated by PUT /api/tasks/:id
// we can also display the new update task after updating
const updateTaskById = async (id, taskData = {}) => {
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
    if (!key) return null; // if key is empty after trimming, return null

    const index = storage.findIndex(item => item.id === key); // find the index of the task with the matching ID
    if (index < 0 ) return null; // if not found, return null
    const originalTask = storage[index]; // get the original task
    const updatedTask = {...originalTask,id: key, ...set(taskData), updatedAt: new Date().toISOString() }; // create the updated task object with only the allowed properties
    storage[index] = updatedTask; // replace the task in storage
    return updatedTask; // return the updated task

};

// Delete a task by ID. we can also return the deleted task if needed
// activated by DELETE /api/tasks/:id
const deleteTaskById = async (id) => {
    const taskID = id.trim(); // trim any extra spaces from the id
    if (typeof taskID !== 'string' || taskID === '') return false; // if taskID is not a string or is empty, return false
    const index = storage.findIndex(t => t.id === taskID); // find the index of the task with the matching ID

    if (index < 0 ) return false; // if not found, return false
    const [deletedTask] = storage.splice(index, 1); // remove the task from storage
    return deletedTask || null; // return true if deleted, else null

};

export default {
    getAllTasks,
    createTask,
    getTaskById,
    updateTaskById,
    deleteTaskById
};