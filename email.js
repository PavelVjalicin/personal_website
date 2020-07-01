const mailer = require("nodemailer")
const config = require("./app.config.js").default.mailer

async function sendEmail(from,name,msg) {
    let transporter = mailer.createTransport(config.transport);
  
    return await transporter.sendMail({
      from: '"'+name+'" <'+from+'>', 
      to: config.to, 
      subject: "vjalicin.com Contact", 
      text: msg
    });
  }

  exports.default = sendEmail