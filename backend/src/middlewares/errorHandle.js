// middlewares/errorHandle.js
export const errorHandle = (err, req, res, next) => { 
    console.error('error Middleware caught an error'); // log the error details
    console.error(err.stack); // log the stack trace for debugging, stack trace shows where the error occurred
    
    const status = err.status || 500; // default to 500 Internal Server Error

    res.status(status).json({ // send JSON response with error message
        message: err.message || 'Internal Server Error',
    });
}
