/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable('testimonials', {
        testi_id: {
            primaryKey: true,
            unique: true,
            type: 'VARCHAR(50)'
        },
        imageUrl: {
            type: 'JSON',
        },
        title: {
            type: 'VARCHAR(50)',
            unique: true,
        },
        rate: {
            type: 'FLOAT8',
            default: 0
        },
        content: {
            type: 'TEXT'
        }
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable('testimonials')
};
