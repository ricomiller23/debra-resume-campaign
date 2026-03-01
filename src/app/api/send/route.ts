import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs";
import os from "os";

const execAsync = promisify(exec);

export async function POST(req: NextRequest) {
    try {
        const { contactId, to, subject, body } = await req.json();

        const resumePath = path.join(process.cwd(), "public", "Debra_Friednash_Resume.pdf");
        const coverPath = path.join(process.cwd(), "public", "covers", `${contactId}.pdf`);

        const hasResume = fs.existsSync(resumePath);
        const hasCover = fs.existsSync(coverPath);

        // Build attachment lines for AppleScript
        const attachLines: string[] = [];
        if (hasResume) attachLines.push(
            `make new attachment with properties {file name:POSIX file "${resumePath}"} at after the last paragraph`
        );
        if (hasCover) attachLines.push(
            `make new attachment with properties {file name:POSIX file "${coverPath}"} at after the last paragraph`
        );

        // Escape for AppleScript string literals (double quotes and backslashes)
        const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

        const script = `
tell application "Mail"
  set theMsg to make new outgoing message with properties {sender:"Debra L. Friednash <ricomiller@icloud.com>", subject:"${esc(subject)}", content:"${esc(body)}", visible:false}
  tell theMsg
    make new to recipient with properties {address:"${esc(to)}"}
    ${attachLines.join("\n    ")}
  end tell
  send theMsg
end tell
`.trim();

        // Write to temp .scpt file to avoid shell quoting issues
        const tmpFile = path.join(os.tmpdir(), `debra-send-${Date.now()}.applescript`);
        fs.writeFileSync(tmpFile, script, "utf8");

        try {
            const { stderr } = await execAsync(`osascript "${tmpFile}"`);
            if (stderr?.trim()) console.warn("AppleScript warning:", stderr.trim());
        } finally {
            fs.unlinkSync(tmpFile); // cleanup
        }

        return NextResponse.json({ success: true });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        console.error("Send error:", message);
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
