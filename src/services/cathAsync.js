const catchAsync = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (err) {
            console.error(err); // log full error
            return res.status(500).json({
                message: err.message,
                fullErr: err
            });
        }
    };
};

export default catchAsync;