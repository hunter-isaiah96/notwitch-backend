// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true });
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://user:password123@127.0.0.1:5432/postgres');

const User = require('./models/User')(sequelize, DataTypes);

// const User = sequelize.define('User', {
//     // Model attributes are defined here
//     firstName: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     lastName: {
//         type: DataTypes.STRING
//         // allowNull defaults to true
//     }
// }, {
//     // Other model options go here
// });

// Declare a route
fastify.get('/', async (req, res) => {
    return { hello: 'world' };
});

// Run the server!
const start = async () => {
    try {
        await fastify.listen(3000);
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();