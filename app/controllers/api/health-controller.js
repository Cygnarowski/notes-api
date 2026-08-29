const healthCheck = (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: Date.now(),
  });
};

export default healthCheck;
