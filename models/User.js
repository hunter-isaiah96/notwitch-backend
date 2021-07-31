const { DataTypes } = require('sequelize')
module.exports = (fastify, options, done) => {
    const User = fastify.db.define('User', {
        // Model attributes are defined here
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        username: {
            type: DataTypes.STRING(25),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        // Other model options go here
    });
    done()
}