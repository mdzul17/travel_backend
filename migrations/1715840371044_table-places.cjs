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
    pgm.createTable('places', {
        place_id: {
            type: 'VARCHAR(50)',
            notNull: true,
            primaryKey: true
        },
        name: {
            type: 'VARCHAR(200)',
            notNull: true,
        },
        country: {
            type: 'VARCHAR(50)',
        },
        city: {
            type: 'VARCHAR(50)'
        },
        price: {
            type: 'INTEGER'
        },
        unit: {
            type: 'VARCHAR(50)'
        },
        isPopular: {
            type: 'boolean',
            default: false
        },
        hasBackyard: {
            type: 'boolean',
            default: false
        },
        description: {
            type: 'TEXT',
        },
        imageUrl: {
            type: 'VARCHAR(100)'
        }
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable('places')
};
