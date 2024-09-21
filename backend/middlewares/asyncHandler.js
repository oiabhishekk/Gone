const asyncHandler = (func) => {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (err) {
      res.status(err.statusCode || 500).json({ error: err.message });
    }
  };
};
export default asyncHandler;
