const bcrypt = require('bcrypt');
const { getUsersByUsername } = require('../models/users.model');
const jwt = require('jsonwebtoken');


async function loginHandler(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            status: 400,
            message: 'username and password are required'
        });
    }

    const user = await getUsersByUsername(username);
    if (!user) {
        return res.status(401).json({
            status: 401,
            message: 'Invalid username or password'
        });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).json({
            status: 401,
            message: 'Invalid username or password'
        });
    }
    let token
    try {
        token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: user.role
            }, 
            process.env.SECRET_KEY,
            { expiresIn: `${process.env.EXP_TIME}h` }
        )
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: 'Failed to generate token'
        })
    }

    return res.status(201).json({
        status: 201,
        message: 'success',
        token
    });
}

module.exports = { loginHandler }