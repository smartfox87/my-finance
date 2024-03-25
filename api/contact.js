import nodemailer from "nodemailer";
import { IncomingForm } from "formidable";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_LOGIN,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const form = new IncomingForm();

export default function handler(request, response) {
  form.parse(request, async (error, fields, files) => {
    if (error) return response.status(500).send(error);

    const mailOptions = {
      from: fields.email,
      to: process.env.GMAIL_LOGIN,
      subject: fields.subject[0],
      text: `Name: ${fields.full_name}\nEmail: ${fields.email}\nMessage: ${fields.message}`,
      attachments: Object.values(files.files).map(({ originalFilename, filepath }) => ({ filename: originalFilename, path: filepath })),
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) return response.status(500).send(error);
      response.status(200).json({ success: true });
    });
  });
}
