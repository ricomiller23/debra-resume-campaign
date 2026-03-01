import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
    try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY || "");
        const { contactId, to, subject, body } = await req.json();

        // Load resume PDF
        const resumePath = path.join(process.cwd(), "public", "Debra_Friednash_Resume.pdf");
        let resumeBuffer: Buffer | null = null;
        if (fs.existsSync(resumePath)) {
            resumeBuffer = fs.readFileSync(resumePath);
        }

        // Load cover letter PDF if generated
        const coverPath = path.join(process.cwd(), "public", "covers", `${contactId}.pdf`);
        let coverBuffer: Buffer | null = null;
        if (fs.existsSync(coverPath)) {
            coverBuffer = fs.readFileSync(coverPath);
        }

        const attachments = [];
        if (resumeBuffer) {
            attachments.push({
                filename: "Debra_Friednash_Resume.pdf",
                content: resumeBuffer,
            });
        }
        if (coverBuffer) {
            attachments.push({
                filename: `Cover_Letter_${contactId}.pdf`,
                content: coverBuffer,
            });
        }

        const { data, error } = await resend.emails.send({
            from: `Debra L. Friednash <ricomiller@icloud.com>`,
            reply_to: "denvertrad@aol.com",
            to: [to],
            subject,
            text: body,
            attachments: attachments as never,
        });

        if (error) {
            return NextResponse.json({ success: false, error }, { status: 400 });
        }

        return NextResponse.json({ success: true, data });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}
