//custom error Handler ,every error thrown will be catched by this code
const errorHandler = (err, req, res, next) => {
    //error will have a status code
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    //error will have a message
    let message = err.message;

    // If Mongoose not found error, set to 404 and change message
    //catch error thrown by mongoose
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = 'Resource not found';
    }

    //send the response after handling error
    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
}
//not found middleware which throws route not found error
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

export {notFound,errorHandler};