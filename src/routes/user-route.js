const express = require('express');
const { postUser, getUserList } = require('../services/user-list');

const router = express.Router();

router.get('/', getUserList);
router.post('/', postUser);
router.get('/users', getUserList);
router.post('/users', postUser);
router.get('/list', getUserList);

module.exports = router;
