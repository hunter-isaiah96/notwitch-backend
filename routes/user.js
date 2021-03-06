


module.exports = (fastify, options, done) => {

    const { User } = fastify.db.models;
    const bcrypt = require('bcrypt');
    const saltRounds = 10;


    fastify.post('/api/user/auth', async (req, res) => {
        try {

        } catch (e) {
            console.log(e);
        }
        return {};
    });

    fastify.post('/api/user/register', async (req, reply) => {
        try {
            let hashedPassword = await new Promise((resolve, reject) => {
                bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                    if (err) reject(err);
                    resolve(hash);
                });
            });

            const newUser = await User.create({
                email: req.body.email,
                username: req.body.username,
                password: hashedPassword
            });

            const jwt = fastify.jwt.sign({
                id: newUser.id
            });

            return reply.code(200).send({
                token: jwt,
                username: newUser.username,
            });

        } catch (e) {
            console.log(e);
            return reply.code(200).send(new Error(e));
        }
    });

    done();
};