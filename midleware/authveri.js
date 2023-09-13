function verifyCookie(req, res, next) {
    // Check if a specific cookie exists (e.g., "token")
    const token = req.cookies.token;
   
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    console.log("verify cokkies")
    next();
}
module.exports ={verifyCookie}