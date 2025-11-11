// middlewares/errorHandle.js
export const errorHandle = (err, req, res, next) => { 
    console.error(err.stack); // log the error stack trace
    res.status(500).send('Something broke!'); // send a 500 Internal Server Error response
}
