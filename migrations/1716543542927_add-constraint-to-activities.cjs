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
    pgm.addColumn('activities', {
        place_id: {
            type: 'VARCHAR(50)',
        }
    })

    // pgm.sql('INSERT INTO places(place_id, name) VALUES("lorem", "lorem")')
    // pgm.sql('UPDATE activities SET place_id = "lorem" WHERE place_id IS NULL')

    pgm.addConstraint(
        'activities',
        'fk_activities.place_id_places.place_id',
        'FOREIGN KEY(place_id) REFERENCES places(place_id) ON DELETE CASCADE'
    )
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropConstraint('activities','fk_activities.place_id_places.place_id')
    // pgm.sql('UPDATE activities SET place_id = null WHERE place_id = "lorem"')
    // pgm.sql('DELETE places WHERE id = "lorem"')
};
