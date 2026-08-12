const express = require('express');
const { postUser, getUserList } = require('../services/user-list');

const router = express.Router();

router.get('/', getUserList);
router.post('/', postUser);

module.exports = router;