app.use((req, res, next) => {
    // Check if a specific cookie exists (e.g., "token")
    const token = req.cookies.token;
  
    if (!token) {
      // Cookie does not exist
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
});