module.exports = async (req, res, next) => {
    const validationErrors = await req.getValidationResult();

    if(!validationErrors.isEmpty()) {
        return res.status(422).json(validationErrors.mapped());
    }

    next();
};
