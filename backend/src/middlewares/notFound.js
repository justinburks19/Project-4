export const notFound = (req, res) => {
    console.warn(`404 Not Found: ${req.originalUrl}`); // log the not found URL
    res.status(404).send('Not Found');
}
