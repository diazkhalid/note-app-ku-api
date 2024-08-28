const { getRoleById } = require("../models/roles.model");
const { checkUsernameAvailability, createUser } = require("../models/users.model");
const validateUUID = require('uuid-validate');

async function createUserHandler(req, res){
    const { username, password } = req.body;
    if(!username || !password){
        return res.status(400).json({
            status: 400,
            message: 'username and password are required'
        })
    }

    const { roleId } = req.query;

    if(!roleId){
        return res.status(400).json({
            status: 400,
            message: 'roleId is required'
        });
    }

    if(!validateUUID(roleId, 4)){
        return res.status(400).json({
            status: 400,
            message: 'roleId is not a valid UUID'
        });
    }

    const role = await getRoleById(roleId);
    if(!role){
        return res.status(404).json({
            status: 404,
            message: 'role not found'
        });
    }
    
    const isAvailable = await checkUsernameAvailability(username);
    if(!isAvailable){
        return res.status(409).json({
            status: 409,
            message: 'username already exists'
        });
    }

    const user = await createUser(username, password, role.id);
    res = res.status(201).json({
        status: 201,
        message: 'success',
        data: user
    });
    return res;
}

module.exports = { createUserHandler }