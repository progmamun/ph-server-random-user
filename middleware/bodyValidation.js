const fs = require('fs');

const bodyValidation = (req, res, next) => {
  const userData = req.body;

  userData?.map((user) => {
    if (!user.id) {
      req.error = 'error';
      res.status(400).json({ error: 'please provide user id' });
      next();
    }

    if (
      !user.gender &&
      !user.name &&
      !user.contact &&
      !user.address &&
      !user.photoUrl
    ) {
      req.error = 'error';
      res.status(400).json({ error: 'please provide user information' });
      next();
    }
  });

  if (!req.error) {
    next();
  }
};

module.exports = bodyValidation;
