const otpTemplate = ({ name, otp, expiryMinutes, date }) => {
    const template = `
            <html>
                <head>
                    <meta charset="UTF-8">
                        <title>Your OTP Code - Code Gyani</title>
                </head>

                <body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">

                    <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#f4f4f4">
                        <tr>
                            <td align="center">

                                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;margin:30px 0;">

                                    <!-- Header -->
                                    <tr>
                                        <td align="center" bgcolor="#31126B" style="padding:35px;">
                                            <img src="{{logoUrl}}" alt="Code Gyani" width="80" />
                                            <h1 style="color:#ffffff;margin:20px 0 0;font-size:30px;">
                                                Verify Your Identity
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
                                                Use the One-Time Password (OTP) below to complete your verification on
                                                <strong>Code Gyani</strong>. This code is valid for a limited time only.
                                            </p>

                                            <div style="text-align:center;margin:35px 0;">
                                                <span style="display:inline-block;background:#fafafa;border:2px dashed #31126B;
                             color:#31126B;font-size:36px;font-weight:bold;letter-spacing:10px;
                             padding:18px 30px;border-radius:8px;">
                                                    ${otp}
                                                </span>
                                            </div>

                                            <table width="100%" cellpadding="10" cellspacing="0" style="margin:20px 0 30px;background:#fafafa;border:1px solid #eeeeee;border-radius:6px;">
                                                <tr>
                                                    <td width="150"><strong>Valid For</strong></td>
                                                    <td>${expiryMinutes} minutes</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Requested On</strong></td>
                                                    <td>${date}</td>
                                                </tr>
                                            </table>

                                            <div style="text-align:center;margin:40px 0;">
                                                <a href="https://google.com"
                                                    style="background:#FF5A1F;color:#ffffff;text-decoration:none;padding:15px 35px;border-radius:6px;font-size:16px;font-weight:bold;display:inline-block;">
                                                    Verify Now
                                                </a>
                                            </div>

                                            <p style="font-size:16px;color:#555;line-height:28px;">
                                                Please do not share this OTP with anyone, including Code Gyani staff.
                                                If you did not request this code, you can safely ignore this email or
                                                contact our support team immediately.
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
                                                📧 support@codegyani.com
                                            </p>

                                        </td>
                                    </tr>

                                </table>

                            </td>
                        </tr>
                    </table>

                </body>
            </html>`;

    return template;
};

module.exports = otpTemplate;