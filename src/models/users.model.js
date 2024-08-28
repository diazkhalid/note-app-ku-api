const pool = require("../lib/dbConfig");
const bcrypt = require('bcrypt');

async function checkUsernameAvailability(username) {
    const query = {
        text: 'SELECT * FROM users WHERE username = $1',
        values: [username]
    };
    const result = await pool.query(query);
    return result.rowCount === 0;
}

async function createUser(username, password, roleId) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = {
        text: 'INSERT INTO users(username, password, role_id) VALUES($1, $2, $3) RETURNING *',
        values: [username, hashedPassword, roleId]
    };
    const result = await pool.query(query);
    return result.rows[0];
}

module.exports = { checkUsernameAvailability, createUser }