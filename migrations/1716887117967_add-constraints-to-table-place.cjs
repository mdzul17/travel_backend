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
    pgm.addColumn('places', {
        ptype_id: {
            type: 'VARCHAR(50)',
            notNull: true
        },
        utype_id: {
            type: 'VARCHAR(50)',
            notNull: true
        }
    })

    pgm.addConstraint('places',
        'places.ptype_id_place_types.ptype_id',
        'FOREIGN KEY(ptype_id) REFERENCES place_types(ptype_id) ON DELETE CASCADE'
    )

    pgm.addConstraint('places',
        'places.utype_id_unit_types.utype_id',
        'FOREIGN KEY(utype_id) REFERENCES unit_types(utype_id) ON DELETE CASCADE'
    )
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropConstraint('places', 'places.ptype_id_place_types.ptype_id')
    pgm.dropConstraint('places', 'places.utype_id_unit_types.utype_id')
};
