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
    pgm.createTable('features', {
        feature_id: {
            type: 'VARCHAR(50)',
            primaryKey: true
        },
        qty: {
            type: 'INTEGER'
        },
        name: {
            type: 'VARCHAR(50)',
        },
        imageUrl: {
            type: 'JSON'
        }
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.createTable('features')
};
