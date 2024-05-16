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
    pgm.createTable("users", {
        id: {
            type: "VARCHAR(50)",
            primaryKey: true,
        },
        username: {
            type: "VARCHAR(50)",
            notNull: true,
        },
        birth_date: {
            type: "DATE",
        },
        fullname: {
            type: "VARCHAR(50)",
            notNull: true,
        },
        phone_number: {
            type: "VARCHAR(50)"
        },
        address: {
            type: "TEXT"
        },
        is_verified: {
            type: "bool",
            default: "false"
        },
        password: {
            type: "VARCHAR(100)",
            notNull: true
        },
        email: {
            type: "VARCHAR(50)",
            notNull: true
        }
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable("users")
};
