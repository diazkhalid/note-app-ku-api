exports.up = (pgm) => {
    pgm.createTable('roles', {
        id: {
            type: 'uuid',
            primaryKey: true,
            default: pgm.func('uuid_generate_v4()'),
        },
        title: {
            type: 'TEXT',
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
    pgm.dropTable('roles');
};
