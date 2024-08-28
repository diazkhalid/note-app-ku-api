exports.up = (pgm) => {
    pgm.createTable('users', {
        id: {
            type: 'uuid',
            primaryKey: true,
            default: pgm.func('uuid_generate_v4()'),
        },
        username: {
            type: 'TEXT',
            notNull: true
        },
        password: {
            type: 'TEXT',
            notNull: true
        },
        role_id: {
            type: 'uuid',
            notNull: true
        },
        _created_date: {
            type: 'timestamptz',
            default: pgm.func('current_timestamp'),
        },
        _updated_date: {
            type: 'timestamptz',
            default: pgm.func('current_timestamp'),
        },
    })
};

exports.down = (pgm) => {
    pgm.dropTable('users');
};
