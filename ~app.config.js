//Template for app.config.js
exports.default = {
    mailer: {
        transport: {
            host: "smtp.host.example",
            port: 465,
            secure: true,
            auth: {
                user: "username",
                pass: "password",
            }
        },
        to: "email@example.com"
    },
    secret: "SECRET_KEY",
    admin_hash: "$2a$10$fm.6X0HiSlpaWgVq9LbLKOeJFhXXKVvZTwzhdPKWxpqSAy52RwM.a" //password
}