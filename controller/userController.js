// const fs = require('fs');

module.exports.getAllUsers = (req, res, next) => {
  /* const { limit, page } = req.query;
  console.log(limit, page);
  undefined.test();
  res.json(tools.slice(0, limit)); */

  // fs.readFile('../public/data.json', (err, data) => {
  //   if (err) {
  //     res.write('Failed to read data !!!');
  //     res.end();
  //   } else {
  //     res.write(data);
  //     res.end();
  //   }
  // });
  console.log('all user');
  res.send('Hello World');
};
