module.exports = department => {
  return function(req, res, next) {
    if (
      req.decodedJwt.departments &&
      req.decodedJwt.departments.includes(department)
    ) {
      next();
    } else {
      res.status(403).json({ you: "you have no power here!" });
    }
  };
};
