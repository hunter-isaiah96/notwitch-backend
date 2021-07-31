


module.exports = (fastify, options, done) => {

    const { User } = fastify.db.models
    const bcrypt = require('bcrypt');


    fastify.post('/api/user/auth', async (req, res) => {
        try {

        } catch (e) {
            console.log(e)
        }
        return {}
    });

    fastify.post('/api/user/register', async (req, res) => {
        try {
            console.log(req.body)
            const token = fastify.jwt.sign({
                email: req.body.email,
                username: req.body.username
            })

            // await User.create({
            //     email: 'rhynoboy2009@gmail.com',
            //     username: 'rhynoboy2009',
            //     password: 'rhyno'
            // })
            return token
        } catch (e) {
            console.log(e)
        }
        return { hello: 'world' };
    });

    done()
}