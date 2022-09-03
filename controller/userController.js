const fs = require('fs');

module.exports.getAllUsers = (req, res, next) => {
  fs.readFile('./public/data.json', (err, data) => {
    if (err) {
      res.write('Failed to read data !!!');
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
};
