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
    }
}