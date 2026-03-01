import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

function err(message: string, status = 500) {
    return NextResponse.json({ success: false, error: { message } }, { status });
}

export async function POST(req: NextRequest) {
    try {
        const { contactId, to, subject, body } = await req.json();

        const appPassword = process.env.ICLOUD_APP_PASSWORD;
        if (!appPassword) {
            return err(
                "ICLOUD_APP_PASSWORD is not set. Go to appleid.apple.com → Sign-In and Security → App-Specific Passwords and add it as an environment variable."
            );
        }

        // Load attachments
        const attachments: { filename: string; content: Buffer }[] = [];

        const resumePath = path.join(process.cwd(), "public", "Debra_Friednash_Resume.pdf");
        if (fs.existsSync(resumePath)) {
            attachments.push({ filename: "Debra_Friednash_Resume.pdf", content: fs.readFileSync(resumePath) });
        }

        const coverPath = path.join(process.cwd(), "public", "covers", `${contactId}.pdf`);
        if (fs.existsSync(coverPath)) {
            attachments.push({ filename: `Cover_Letter_${contactId}.pdf`, content: fs.readFileSync(coverPath) });
        }

        // iCloud SMTP — works from Vercel and local
        const transporter = nodemailer.createTransport({
            host: "smtp.mail.me.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: "ricomiller@icloud.com",
                pass: appPassword,
            },
        });

        await transporter.sendMail({
            from: '"Debra L. Friednash" <ricomiller@icloud.com>',
            replyTo: "denvertrad@aol.com",
            to,
            subject,
            text: body,
            attachments,
        });

        return NextResponse.json({ success: true });
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : String(e);
        console.error("iCloud SMTP error:", message);
        return err(message);
    }
}
