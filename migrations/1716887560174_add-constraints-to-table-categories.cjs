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
    pgm.addColumn('categories', {
        place_id: {
            type: 'VARCHAR(50)',
            notNull: true
        }
    })

    pgm.addConstraint('categories',
        'categories.place_id_places.place_id',
        'FOREIGN KEY(place_id) REFERENCES places(place_id) ON DELETE CASCADE'
    )

    pgm.addColumn('testimonials', {
        place_id: {
            type: 'VARCHAR(50)',
            notNull: true
        },
        user_id: {
            type: 'VARCHAR(50)',
            notNull: true
        }
    })

    pgm.addConstraint('testimonials', 
        'testimonials.place_id_places.place_id',
        'FOREIGN KEY(place_id) REFERENCES places(place_id) ON DELETE CASCADE'
    )

    pgm.addConstraint('testimonials',
        'testimonials.user_id_users.id',
        'FOREIGN KEY(place_id) REFERENCES users(id) ON DELETE SET NULL'
    )

    pgm.addColumn('category_items', {
        category_id: {
            type: 'VARCHAR(50)',
            notNull: true
        }
    })

    pgm.addConstraint('category_items',
        'category_items.category_id_categories.category_id',
        'FOREIGN KEY(category_id) REFERENCES categories(category_id) ON DELETE CASCADE'
    )
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropConstraint('categories',
        'categories.place_id_places.place_id'
    )
    pgm.dropConstraint('testimonials',
        'testimonials.place_id_places.place_id'
    )
    pgm.dropConstraint('testimonials',
        'testimonials.place_id_users.id'
    )
    pgm.dropConstraint('category_items',
        'category_items.category_id_categories.category_id'
    )
};
