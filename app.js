const http = require('http')
const express = require('express')
const port = 3000

const from = 'daniel.sportes@laposte.net'

const nodemailer = require('nodemailer');

const cnx = {
  transporter : null
}

// async..await is not allowed in global scope, must use a wrapper
async function email(pwd, to, sub, txt) {
  if (!cnx.transporter) {
    cnx.transporter = nodemailer.createTransport({
      host: 'smtp.laposte.net',
      port: 465,
      secure: true, // true for port 465, false for other ports
      auth: {
        user: 'daniel.sportes',
        pass: pwd,
      },
      tls : { rejectUnauthorized: false }
    })
  }
  try {
    // send mail with defined transport object
    const info = await cnx.transporter.sendMail({
      from: from, // sender address
      to: to,
      subject: sub, // Subject line
      text: txt || '-' // plain text body
      // html: "<b>Hello world?</b>", // html body
    })
    return 'OK: ' + info.messageId
  } catch (e) {
    return 'KO: ' + e.toString()
  }
}

const app = express()
app.use(express.urlencoded({ extended: true }))

app.post('/alertes', async (req, res) => {
  const r = await email(req.body.pwd, req.body.to, req.body.sub, req.body.txt)
  res.status(200).send(r)
})

const server = http.createServer(app)

server.listen(port, () => {
  console.log(`Server running on port `, port)
})
