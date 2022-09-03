const fs = require('fs');

module.exports.getRandomUser = (req, res, next) => {
  fs.readFile('./public/data.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'internal error' });
    } else {
      const myData = JSON.parse(data);
      if (myData.length === 0) {
        res.status(200).json({ message: 'no data found' });
      } else {
        const dataCount = myData.length;
        const randomUserIndex = Math.floor(Math.random() * dataCount);
        res.status(200).send(myData[randomUserIndex]);
      }
    }
  });
};

module.exports.getAllUsers = (req, res, next) => {
  fs.readFile('./public/data.json', 'utf-8', (err, data) => {
    if (err) {
      res.write('Failed to read data !!!');
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
};

module.exports.postSaveUser = (req, res, next) => {
  const newData = req.body;
  const error = req.error;
  if (error) {
    res.send('error');
  } else {
    fs.readFile('./public/data.json', 'utf-8', (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'internal error' });
      } else {
        const myData = JSON.stringify([...JSON.parse(data), newData]);
        fs.writeFile('./public/data.json', myData, (error) => {
          if (error) {
            res.status(500).json({ message: 'internal error' });
          } else {
            res.status(201).json({ message: 'user created' });
          }
        });
      }
    });
  }
};

module.exports.deleteUser = (req, res) => {};
