const mailer = require("nodemailer")
const config = require("../../app.config.js").default.mailer

async function sendEmail(from,name,msg) {
    let transporter = mailer.createTransport(config.transport);

    const fullMsg = msg + " Email: " + from+ " Name: " + name

    return await transporter.sendMail({
        from: '"Info" <info@vjalicin.com>',
        to: config.to,
        subject: "vjalicin.com Contact",
        text: fullMsg
    })
  }

  export {sendEmail}
