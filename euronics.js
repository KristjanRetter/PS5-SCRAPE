const puppeteer = require("puppeteer");
var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		// saatja gmail, tee uus eraldi kasuaja
		user: "email",
		pass: "pass",
	},
	host: "https://mail.google.com/", // hostname
	secure: false, // use SSL
	port: 25, // port for secure SMTP

	tls: {
		rejectUnauthorized: false,
	},
});

var mailOptions = {
	from: "saatjakasutja mis panid üleval",
	to: "sinu email",
	subject: "PS5 Euronics",
	text: "https://www.euronics.ee/meelelahutus/mangukonsoolid/playstation/711719709596/mangukonsool-sony-playstation-5",
};

(async () => {
	[];
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto("https://www.euronics.ee/meelelahutus/mangukonsoolid/playstation/711719709596/mangukonsool-sony-playstation-5");
	const alert = await page.$x("/html/body/div[8]/div[1]/div/div/div[2]/div/p");
	if (alert.length) {
		console.log("pole");
	} else {
		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log("Email sent: " + info.response);
			}
		});
	}

	await browser.close();
})();
