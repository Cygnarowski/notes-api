const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse({
      params: req.params,
      body: req.body,
      query: req.query,
    });
    if (!result.success) {
      return res.status(400).json({
        error: "Validation error",
        details: result.error.issues,
      });
    }
    req.validated = result.data;
    next();
  };
};

export default validate;
