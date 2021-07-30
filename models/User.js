module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        // Model attributes are defined here
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(25)
        },
        password: {
            type: DataTypes.STRING
        },
        stream_key: {
            type: DataTypes.STRING
        },
    }, {
        // Other model options go here
    });
}