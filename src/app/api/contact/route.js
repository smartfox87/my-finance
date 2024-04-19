import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_LOGIN,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export async function POST(request) {
  const formData = await request.formData();
  const full_name = formData.get("full_name");
  const message = formData.get("message");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const files = formData.getAll("files");

  const attachments = await Promise.all(
    files.map(async (file) => {
      const chunks = [];
      for await (const chunk of file.stream()) {
        chunks.push(chunk);
      }
      return {
        filename: file.name,
        content: Buffer.concat(chunks),
      };
    }),
  );

  const mailOptions = {
    from: email,
    to: process.env.GMAIL_LOGIN,
    subject: subject,
    text: `Name: ${full_name}\nEmail: ${email}\nMessage: ${message}`,
    attachments,
  };

  const sendMailPromise = new Promise((resolve, reject) => transporter.sendMail(mailOptions, (error) => (error ? reject(error) : resolve())));

  try {
    await sendMailPromise;
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false, error: error.message });
  }
}
