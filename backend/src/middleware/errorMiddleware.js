export function notFoundMiddleware(req, res) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.path}` });
}

export function errorMiddleware(env) {
  return (error, _req, res, _next) => {
    void _next;
    if (res.headersSent) return;
    if (error.type === "entity.parse.failed") return res.status(400).json({ message: "Request body contains invalid JSON." });
    if (error.name === "ValidationError") return res.status(400).json({ message: "Please check the submitted fields.", errors: Object.values(error.errors).map((item) => item.message) });
    if (error.name === "CastError") return res.status(400).json({ message: "The supplied identifier is invalid." });
    if (error.code === 11000) return res.status(409).json({ message: "That URL slug is already in use. Choose a different slug." });
    if (error.name === "MulterError") return res.status(error.code === "LIMIT_FILE_SIZE" ? 413 : 400).json({ message: error.code === "LIMIT_FILE_SIZE" ? "That file is larger than the configured upload limit." : "The upload could not be processed." });
    if (Number.isInteger(error.status) && error.status >= 400 && error.status < 500) return res.status(error.status).json({ message: error.message });
    if (env.nodeEnv !== "production") console.error(error);
    return res.status(500).json({ message: "The server could not complete this request." });
  };
}
