const notFound = (req, res, next) => {
    res.status(404).send({
        message: `Route Not Found - ${req.originalUrl} `
    });
    next();
};

export default notFound;