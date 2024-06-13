require('dotenv').config()
const nodemailer = require('nodemailer')
const ejs = require('ejs')

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL,
		pass: process.env.NODEMAILER_PASS
	}
})

async function buildEmailTemplate (fileName, data) {
  return await ejs.renderFile(`views/${fileName}`, data)
}

async function sendMail (option, res) {
	try {
		if (!option) {
			return res.status(400).json({success: false, message: 'Please provide email option'})
		}
		transporter.sendMail(option, (err, info) => {
			if (err) {
				return console.log('Error sending mail:', err.message)
			}
			console.log('Mail sent', info.response);
		})
	} catch (error) {
		console.error(error.message)
	}
}

module.exports = {
    buildEmailTemplate,
    sendMail
}