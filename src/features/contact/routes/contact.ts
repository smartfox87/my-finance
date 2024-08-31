import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import { isError, isFilesArray, isString } from "@/predicates/common";
import { GMAIL_LOGIN, GMAIL_PASSWORD } from "@/constants/config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_LOGIN,
    pass: GMAIL_PASSWORD,
  },
});

export async function sendEmail(request: NextRequest): Promise<NextResponse> {
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
      to: GMAIL_LOGIN,
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
    return NextResponse.json({ success: false, error: isError(error) ? error.message : "Server error" }, { status: 500 });
  }
}
