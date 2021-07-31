// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true });

// https://stackoverflow.com/questions/25540711/docker-postgres-pgadmin-local-connection

const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, 'models');
//passsing directoryPath and callback function

fastify.register(
    require('sequelize-fastify'),
    {
        instance: 'db',
        sequelizeOptions: {
            dialect: 'postgres', /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
            database: 'postgres',
            username: 'user',
            password: 'password123',
            options: {
                host: '127.0.0.1',
                port: '5432'
            }
        }
    }
)
// Register all models
fs.readdirSync('./models').forEach(file => {
    fastify.register(require(`./models/${file}`))
});
// Register all routes
fs.readdirSync('./routes').forEach(file => {
    fastify.register(require(`./routes/${file}`))
});

fastify.register(require('fastify-jwt'), {
    secret: 'supersecret'
})

const start = async () => {
    try {
        await fastify.listen(3000);
        await fastify.db.sync({ force: true });

    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();