const mailer = require("nodemailer")
const config = require("./app.config.js").default.mailer

async function sendEmail(from,name,msg) {
    let transporter = mailer.createTransport(config.transport);

    const fullMsg = msg + " Email: " + from+ " Name: " + name

    const email = await transporter.sendMail({
      from: '"Info" <info@vjalicin.com>',
      to: config.to, 
      subject: "vjalicin.com Contact", 
      text: fullMsg
    });
    return email
  }

  exports.default = sendEmail