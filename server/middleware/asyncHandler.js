//asynHandler is a middleware which modify code,to reduce try catch block code written again and again
//asyncHandler will take a async function,which always return a promise
//it returns a new anonymous function which executes a function when called(this anonymous function gets used as middleware in express route) ,the function beign executed is a modified version of original async function with a .catch()
const asyncHandler = (func)=>{
    return (req,res,next)=>{
       // `Promise.resolve(fn(req, res, next))` ensures that `fn` is treated as a promise,work even for synchronous function
        Promise.resolve(func(req,res,next))//original function gets executed here when anonymous function is called
        .catch(next);// `next` is the error-handling middleware function
    }
}

export default asyncHandler;