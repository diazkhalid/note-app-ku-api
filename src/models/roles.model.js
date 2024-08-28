const pool = require('../lib/dbConfig');

async function getAllRoles(){
    const query = `SELECT * FROM roles`;
    const result = await pool.query(query);
    return result.rows;
}

async function getRoleById(id){
    const query = {
        text: 'SELECT * FROM roles WHERE id = $1',
        values: [id]
    }
    
    const result = await pool.query(query);
    return result.rows[0];
}

async function createRole(title){
    const query = {
        text: 'INSERT INTO roles(title) VALUES($1) RETURNING *',
        values: [title]
    };
    const result = await pool.query(query);
    return result.rows[0];
}

module.exports = { getAllRoles, createRole, getRoleById }