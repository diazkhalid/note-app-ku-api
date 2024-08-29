const express = require('express');
const { getAllRolesHandler, createRoleHandler } = require('../handlers/roles.handler');
const { createUserHandler } = require('../handlers/users.handler');
const { loginHandler } = require('../handlers/authentication.handler');
const router = express.Router();

router.get('/roles', getAllRolesHandler) 
router.post('/roles', createRoleHandler) 

router.post('/users', createUserHandler)

router.post('/login', loginHandler)

module.exports = router