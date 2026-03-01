import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Optional: you can set this in Vercel or locally
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
});

const SYSTEM_PROMPT = `
You are Debra L. Friednash. You are writing professional, personalized cover letters to banking executives in Arizona to express your interest in supporting them as a Senior Executive Assistant.

Here is your career context (use this to sound authentic):
- You have over 20 years of experience as a Senior Executive Assistant and Corporate Secretary in the banking sector.
- You currently work at Integro Bank as Executive Assistant to the CEO, Secretary of the Board, and President of the Integro Bank Foundation.
- You manage schedules for the CEO and five C-suite executives, handle board governance and regulatory compliance (zero deficiencies track record).
- You previously worked at Scottsdale Capital Advisors (managed FINRA compliance, Series 7 and 63).
- You are known for proactive anticipation, operational rigor, and discretion.

Your task is to write EXACTLY THREE PARAGRAPHS for a cover letter to a specific banking executive. 
- Paragraph 1: The opening hook. Address their specific bank and role. Why are you interested in them? Make it sound like you researched their specific bank's market position or reputation in Arizona.
- Paragraph 2: Your core value proposition. Highlight your Integro Bank responsibilities (CEO support, Board Secretary, Foundation President) and how that fits their specific needs (e.g. if they are a lender, you know lending ops; if they are market president, you know community relations).
- Paragraph 3: The closing. Reiterate your strengths (proactive, regulatory fluency, 98% scheduling efficiency) and ask for a conversation.

DO NOT include the greeting ("Dear Mr. Smith") or the sign-off ("Sincerely, Debra"). ONLY write the three body paragraphs, separated by double newlines.
`;

export async function POST(req: NextRequest) {
    try {
        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                { success: false, error: "OPENAI_API_KEY environment variable is not set. Please add it to your .env.local or Vercel settings." },
                { status: 500 }
            );
        }

        const { company, name, title } = await req.json();

        if (!company || !name || !title) {
            return NextResponse.json({ success: false, error: "Missing company, name, or title." }, { status: 400 });
        }

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", // fast and capable
            messages: [
                { role: "system", content: SYSTEM_PROMPT.trim() },
                { role: "user", content: `Write the three-paragraph cover letter body for ${name}, ${title} at ${company}.` }
            ],
            temperature: 0.7,
        });

        const body = response.choices[0].message?.content?.trim();

        if (!body) {
            throw new Error("OpenAI returned an empty response.");
        }

        return NextResponse.json({ success: true, body });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        console.error("OpenAI generation error:", message);
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
