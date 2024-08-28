const { getAllRoles, createRole } = require('../models/roles.model')
async function getAllRolesHandler(req, res){
    const roles = await getAllRoles();
    res = res.status(200).json({
        status: 200,
        message: 'success',
        data: roles
    });
    return res;
}


async function createRoleHandler(req, res){
    const { title } = req.body;
    const role = await createRole(title);
    res = res.status(201).json({
        status: 201,
        message: 'success',
        data: role
    });
    return res;
}


module.exports = { getAllRolesHandler, createRoleHandler }