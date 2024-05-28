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
    pgm.addColumn('features', {
        place_id: {
            type: 'VARCHAR(50)',
            notNull: true
        }
    })

    pgm.addConstraint('features',
        'features.place_id_places.place_id',
        'FOREIGN KEY(place_id) REFERENCES places(place_id) ON DELETE CASCADE'
    )
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropConstraint('features','features.place_id_places.place_id')
};
