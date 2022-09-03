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
  const query = req.query;
  fs.readFile('./public/data.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'internal error' });
    } else {
      const myData = JSON.parse(data);
      let page, limit;
      if (query.page && query.limit) {
        page = query.page;
        limit = query.limit;
      } else {
        page = 1;
        limit = myData.length;
      }
      const allUser = myData.slice(page - 1, limit * page);
      if (allUser.length !== 0) {
        res.status(200).send(allUser);
      } else {
        res.status(200).json({ message: 'No data found' });
      }
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

module.exports.updateUser = (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  const { error, user } = req || {};
  if (error) {
    res.status(500).json({ error: 'internal server error' });
  } else {
    const newUser = { ...user, ...newData };
    fs.readFile('./public/data.json', 'utf-8', (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'internal error' });
      } else {
        const allUser = JSON.parse(data);
        const newUserArr = allUser.filter((user) => user.id != id);
        const updatedUser = JSON.stringify([...newUserArr, newUser]);
        fs.writeFile('./public/data.json', updatedUser, (error) => {
          if (error) {
            res.status(500).json({ message: 'internal error' });
          } else {
            res.status(201).json({ message: 'user updated' });
          }
        });
      }
    });
  }
};

module.exports.balkUpdate = (req, res) => {
  const error = req.error;
  const updateData = req.body;
  if (!error) {
    fs.readFile('./public/data.json', 'utf-8', (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'internal error' });
      } else {
        let allUser = JSON.parse(data);
        for (const updateInfo of updateData) {
          const updateIndex = allUser?.findIndex(
            (user) => user.id == updateInfo.id
          );
          const updateDataIndex = updateData?.findIndex(
            (user) => user.id == updateInfo.id
          );
          if (updateIndex > -1) {
            allUser[updateIndex] = {
              ...allUser[updateIndex],
              ...updateData[updateDataIndex],
            };
            fs.writeFile(
              './public/data.json',
              JSON.stringify(allUser),
              (error) => {
                if (error) {
                  res.status(500).json({ message: 'internal error' });
                } else {
                  res.status(201).json({ message: 'users Updated' });
                }
              }
            );
          } else {
            throw new Error("Didn't find the user!");
            return;
          }
          console.log(allUser);
        }
      }
    });
  }
};

module.exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const error = req.error;

  if (!error) {
    fs.readFile('./public/data.json', 'utf-8', (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'internal error' });
      } else {
        const myData = JSON.parse(data);
        const newData = myData.filter((user) => user.id != id);
        fs.writeFile('./public/data.json', JSON.stringify(newData), (error) => {
          if (error) {
            res.status(500).json({ message: 'internal error' });
          } else {
            console.log(newData);
            res.status(200).json({ message: 'user deleted' });
          }
        });
      }
    });
  }
};
