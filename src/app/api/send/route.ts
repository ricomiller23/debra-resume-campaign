import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

export async function POST(req: NextRequest) {
    try {
        const { contactId, to, subject, body } = await req.json();

        const appPassword = process.env.ICLOUD_APP_PASSWORD;
        if (!appPassword) {
            return NextResponse.json(
                { success: false, error: "ICLOUD_APP_PASSWORD env var not set. Generate one at appleid.apple.com → Sign-In and Security → App-Specific Passwords." },
                { status: 500 }
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

        // iCloud SMTP transport
        const transporter = nodemailer.createTransport({
            host: "smtp.mail.me.com",
            port: 587,
            secure: false,        // STARTTLS
            requireTLS: true,
            auth: {
                user: "ricomiller@icloud.com",
                pass: appPassword,  // app-specific password from appleid.apple.com
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
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        console.error("iCloud SMTP error:", message);
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
