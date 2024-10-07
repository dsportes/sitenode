const http = require('http')
const express = require('express')
const port = 3000

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.laposte.net',
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: 'daniel.sportes',
    pass: 'Ds__3542_lapo',
  },
  tls : { rejectUnauthorized: false }
});

// async..await is not allowed in global scope, must use a wrapper
async function email(to, site, org, sub) {
  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: 'daniel.sportes@laposte.net', // sender address
      to: to,
      subject: 'AsocialApp - [' + site + '] '  + org + ' : ' + sub // Subject line
      // text: "Hello world" // plain text body
      // html: "<b>Hello world?</b>", // html body
    })
    return 'OK: ' + info.messageId
  } catch (e) {
    return 'KO: ' + e.toString()
  }
}

const app = express()

app.get('/:site/:org/:to/:sub', async (req, res) => {
  const r = await email(req.params.to, req.params.site, req.params.org, req.params.sub)
  res.status(200).send(r)
})

// Create an HTTP server using the Express app
const server = http.createServer(app)

server.listen(port, () => {
  console.log(`Server running`)
})
