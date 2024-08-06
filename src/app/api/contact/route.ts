import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_LOGIN,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  const formData = await request.formData();
  const full_name = formData.get("full_name") as string | null;
  const message = formData.get("message") as string | null;
  const email = formData.get("email") as string | null;
  const subject = formData.get("subject") as string | null;
  const files = formData.getAll("files") as File[] | null;

  if (!message || !email || !subject) {
    return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
  }

  const attachments = await Promise.all(
    files?.map(async (file) => {
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
    }) || [],
  );

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
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
