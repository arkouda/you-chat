var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'youchat.confirm@gmail.com',
        pass: 'asdfghjkl12345@'
    }
});

export function generateMailOptionsAndSend(userEmail: string, accessToken: string) {
    const url = 'http://localhost:3000/auth/confirm?token=';
    var mailOptions = {
        from: 'youchat.confirm@gmail.com',
        to: userEmail,
        subject: 'Confirm YouChat Signup',
        html: '</br><a href="' + url + accessToken + '" >Confirm your Email by clicking on this link!</a>'
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
}


