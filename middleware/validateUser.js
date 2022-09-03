const validateUser = (req, res, next) => {
  const { id, gender, name, contact, address, photoUrl } = req.body || {};

  if (id && gender && name && contact && address && photoUrl) {
    next();
  } else {
    if (!id) {
      res.status(400).json({ error: 'please enter user id' });
    }

    if (!gender) {
      res.status(400).json({ error: 'please enter user gender' });
    }

    if (!name) {
      res.status(400).json({ error: 'please enter user name' });
    }

    if (!contact) {
      res.status(400).json({ error: 'please enter user contact' });
    }

    if (!address) {
      res.status(400).json({ error: 'please enter user address' });
    }

    if (!photoUrl) {
      res.status(400).json({ error: 'please enter user photoUrl' });
    }
    req.error = 'error';
    next();
  }
};
module.exports = validateUser;
