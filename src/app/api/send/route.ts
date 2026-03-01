import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import { jsPDF } from "jspdf";

function err(message: string, status = 500) {
    return NextResponse.json({ success: false, error: { message } }, { status });
}

function generateCoverPDF(name: string, title: string, company: string, salutation: string, body: string): Buffer {
    // 1 inch = 72 points
    const doc = new jsPDF({ unit: "pt", format: "letter" });

    // --- Letterhead ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(20, 40, 100);
    doc.text("DEBRA L. FRIEDNASH", 72, 72);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(90, 90, 90);
    doc.text("Scottsdale, AZ 85253  |  (480) 717-0553  |  denvertrad@aol.com", 72, 86);

    // Separator line
    doc.setLineWidth(1);
    doc.setDrawColor(20, 40, 100);
    doc.line(72, 100, 72 + 450, 100);

    let y = 140;

    // --- Date + Addressee ---
    doc.setFont("times", "normal");
    doc.setFontSize(11);
    doc.setTextColor(20, 20, 20);

    const dateText = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

    doc.text(dateText, 72, y); y += 24;
    doc.text(name, 72, y); y += 14;
    doc.text(title, 72, y); y += 14;
    doc.text(company, 72, y); y += 24;

    doc.text(`Dear ${salutation},`, 72, y); y += 24;

    // --- Body ---
    const paragraphs = body.split("\n\n");
    for (const p of paragraphs) {
        // splitTextToSize wraps text to a max width (letter width minus margins: 612 - 144 = 468)
        const lines = doc.splitTextToSize(p.trim(), 468);
        doc.text(lines, 72, y);
        y += (lines.length * 14) + 14;
    }

    // --- Signature ---
    y += 10;
    doc.text("Sincerely,", 72, y); y += 40;

    doc.setFont("times", "bold");
    doc.text("Debra L. Friednash", 72, y); y += 14;

    doc.setFont("times", "normal");
    doc.setFontSize(10);
    doc.text("Founder & Executive Assistant to the Chief Executive Officer", 72, y); y += 12;
    doc.text("Integro Bank", 72, y); y += 12;
    doc.text("Office: (602) 805-5088  |  Mobile: (480) 717-0553", 72, y); y += 12;
    doc.text("Email: denvertrad@aol.com", 72, y);

    return Buffer.from(doc.output("arraybuffer"));
}

export async function POST(req: NextRequest) {
    try {
        // We now accept the full contact info so we can generate the PDF dynamically
        const { contactId, name, title, company, salutation, body, to, subject } = await req.json();

        const appPassword = process.env.ICLOUD_APP_PASSWORD;
        if (!appPassword) {
            return err("ICLOUD_APP_PASSWORD is not set. Setup required.");
        }

        const attachments: { filename: string; content: Buffer }[] = [];

        // 1. Load Resume PDF
        const resumePath = path.join(process.cwd(), "public", "Debra_Friednash_Resume.pdf");
        if (fs.existsSync(resumePath)) {
            attachments.push({ filename: "Debra_Friednash_Resume.pdf", content: fs.readFileSync(resumePath) });
        }

        // 2. Generate Cover Letter PDF in memory!
        if (name && company && body) {
            const coverBuffer = generateCoverPDF(name, title, company, salutation, body);
            // Derive a safe filename
            const safeName = company.toLowerCase().replace(/[^a-z0-9]/g, "-");
            attachments.push({ filename: `Cover_Letter_${safeName}.pdf`, content: coverBuffer });
        }

        // 3. Send via iCloud SMTP
        const transporter = nodemailer.createTransport({
            host: "smtp.mail.me.com",
            port: 587,
            secure: false, // STARTTLS
            requireTLS: true,
            auth: {
                user: "ricomiller@icloud.com",
                pass: appPassword.trim(),
            },
        });

        await transporter.sendMail({
            from: '"Debra L. Friednash" <ricomiller@icloud.com>',
            replyTo: "denvertrad@aol.com",
            to,
            bcc: "ricomiller@icloud.com",
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
