const welcomeEmail = ({ name, date, url }) => {
    const welcomeMessage = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Welcome to Code Gyani</title>
</head>

<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#f4f4f4">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;margin:30px 0;">

    <!-- Header -->
    <tr>
        <td align="center" bgcolor="#31126B" style="padding:35px;">
            <img src="{{logoUrl}}" alt="Code Gyani" width="80"/>
            <h1 style="color:#ffffff;margin:20px 0 0;font-size:30px;">
                Welcome to Code Gyani!
            </h1>
        </td>
    </tr>

    <!-- Body -->
    <tr>
        <td style="padding:40px;">

            <h2 style="color:#31126B;margin-top:0;">
                Hello ${name},
            </h2>

            <p style="font-size:16px;line-height:28px;color:#555;">
                Thank you for registering with <strong>Code Gyani</strong>.
                Your account has been created successfully.
            </p>

            <p style="font-size:16px;line-height:28px;color:#555;">
                We're excited to have you as part of our growing learning community.
                Whether you're beginning your programming journey or enhancing your existing skills,
                we're here to support you every step of the way.
            </p>

            <table width="100%" cellpadding="10" cellspacing="0" style="margin:30px 0;background:#fafafa;border:1px solid #eeeeee;border-radius:6px;">
                <tr>
                    <td width="150"><strong>Name</strong></td>
                    <td>${name}td>
                </tr>
                <tr>
                    <td><strong>Registered On</strong></td>
                    <td>${date}</td>
                </tr>
            </table>

            <div style="text-align:center;margin:40px 0;">
                <a href=${url}
                   style="background:#FF5A1F;color:#ffffff;text-decoration:none;padding:15px 35px;border-radius:6px;font-size:16px;font-weight:bold;display:inline-block;">
                    Login to Your Account
                </a>
            </div>

            <p style="font-size:16px;color:#555;line-height:28px;">
                If you did not create this account, please contact our support team immediately.
            </p>

            <p style="font-size:16px;color:#555;">
                Happy Learning! 🚀
            </p>

            <p style="font-size:16px;color:#31126B;font-weight:bold;">
                Team Code Gyani
            </p>

        </td>
    </tr>

    <!-- Footer -->
    <tr>
        <td bgcolor="#31126B" align="center" style="padding:25px;color:#dddddd;font-size:14px;">

            <p style="margin:0;">
                © 2026 Code Gyani 
            </p>

            <p style="margin:10px 0;">
                Where Students Become Professional Developers
            </p>

            <p style="margin:0;">
                📧 support@codegyani.com |
                📞 +91 9876543210
            </p>

        </td>
    </tr>

</table>

</td>
</tr>
</table>

</body>
</html>`;
    return welcomeMessage;
};

module.exports = welcomeEmail;