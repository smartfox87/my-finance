import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import { isFilesArray, isString } from "@/predicates/common";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_LOGIN,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const full_name = formData.get("full_name");
    const message = formData.get("message");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const files = formData.getAll("files");

    if (!isString(message) || !isString(email) || !isString(subject) || !isFilesArray(files) || !isString(full_name)) {
      return NextResponse.json({ success: false, error: "Invalid fields values" }, { status: 400 });
    }

    let attachments = [];
    try {
      attachments = await Promise.all(
        files.map(async (file) => {
          const chunks: Uint8Array[] = [];
          const reader = file.stream().getReader();
          let result;
          while (!(result = await reader.read()).done) {
            chunks.push(result.value);
          }
          return {
            filename: file.name,
            content: Buffer.concat(chunks),
          };
        }),
      );
    } catch (fileError) {
      return NextResponse.json({ success: false, error: "Error processing files" }, { status: 500 });
    }

    const nameText = full_name ? `Name: ${full_name}\n` : "";
    const mailOptions: nodemailer.SendMailOptions = {
      from: email,
      to: process.env.GMAIL_LOGIN,
      subject: subject,
      text: `${nameText}Email: ${email}\nMessage: ${message}`,
      attachments,
    };

    try {
      await transporter.sendMail(mailOptions);
      return NextResponse.json({ success: true });
    } catch (mailError) {
      return NextResponse.json({ success: false, error: "Error sending email" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
