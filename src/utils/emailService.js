const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendPasswordResetOTP = async (email, otp) => {
  await transporter.sendMail({
    from: `"SWMPS" <${process.env.EMAIL_USER}>`,

    to: email,

    subject: "SWMPS Password Reset OTP",

    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">

        <h2>SWMPS Password Reset</h2>

        <p>
          We received a request to reset your password.
        </p>

        <p>
          Your OTP is:
        </p>

        <h1
          style="
            letter-spacing: 8px;
            color: #2563eb;
          "
        >
          ${otp}
        </h1>

        <p>
          This OTP will expire in 10 minutes.
        </p>

        <p>
          If you did not request a password reset,
          please ignore this email.
        </p>

        <br/>

        <p>
          Smart Wedding Management System
        </p>

      </div>
    `,
  });
};

module.exports = {
  sendPasswordResetOTP,
};