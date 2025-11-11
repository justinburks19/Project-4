// asyncHandler will be used to wrap async route handlers to catch errors and pass them to Express error handlers
export const asyncHandler = (ftype) => {
    return async (req, res, next) => {
        try {
            await ftype(req, res, next);
        } catch (err) {
            next(err);
        }
    };
}