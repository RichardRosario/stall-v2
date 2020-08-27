// message flasher middleware

const flasherMiddleware = (req, res, next) => {
  if (req.method === "GET") {
    if (req.session.flashData) {
      for (const key in req.session.flashData) {
        // access the value of flashData in key and assign to res.locals
        res.locals[key] = req.session.flashData[key];
      }
      req.session.flashData = null;
    }
  }
  return next();
};

module.exports = flasherMiddleware;
