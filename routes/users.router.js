const express = require('express');
const UsersService = require('./../services/users.service');

const router = express.Router();
const userService = new UsersService;

router.get('/', (req, res) => {
  const users = userService.getUsers();
  res.json(users);
});

router.get('/:id', (req, res, next) => {
  try {
    const user = userService.getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/', (req, res) => {
  const newUser = userService.createUser(req.body);
  res.json(newUser);
});

router.delete('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const resp = userService.deleteUser(id);
    res.json({ resp });

  } catch (error) {
    next(error);
  }
});

router.patch('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const body  = req.body;
    const user = userService.updateUser(id,body);
    res.json(user);
  } catch (error) {
    next(error);
  }

})

module.exports = router;
