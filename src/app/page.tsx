"use client";

import { useState, useCallback } from "react";
import {
    CONTACTS,
    Contact,
    buildSubjectLine,
    buildEmailBody,
    BCC_EMAIL,
} from "@/lib/contacts";

type SendState = "idle" | "confirming" | "sending" | "sent" | "error";

export default function HomePage() {
    const [contacts, setContacts] = useState<Contact[]>(CONTACTS);
    const [selected, setSelected] = useState<Contact>(CONTACTS[0]);
    const [sendStates, setSendStates] = useState<Record<string, SendState>>({});
    const [modalContact, setModalContact] = useState<Contact | null>(null);
    const [apiKeyMissing, setApiKeyMissing] = useState(false);
    const [filter, setFilter] = useState<"all" | "pending" | "sent">("all");
    const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

    const filteredContacts = contacts.filter((c) => {
        if (filter === "all") return true;
        if (filter === "pending") return c.status === "pending";
        if (filter === "sent") return c.status === "sent";
        return true;
    });

    const showToast = (msg: string, type: "success" | "error") => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 4000);
    };

    const handleSend = useCallback(
        async (contact: Contact) => {
            setSendStates((s) => ({ ...s, [contact.id]: "sending" }));
            setModalContact(null);
            try {
                const res = await fetch("/api/send", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contactId: contact.id,
                        to: contact.email,
                        subject: buildSubjectLine(contact),
                        body: buildEmailBody(contact),
                    }),
                });
                const data = await res.json();
                if (data.success) {
                    setSendStates((s) => ({ ...s, [contact.id]: "sent" }));
                    setContacts((cs) =>
                        cs.map((c) => (c.id === contact.id ? { ...c, status: "sent" } : c))
                    );
                    showToast(`✓ Email sent to ${contact.name} at ${contact.company}`, "success");
                } else {
                    setSendStates((s) => ({ ...s, [contact.id]: "error" }));
                    if (data.error?.message?.includes("API key")) setApiKeyMissing(true);
                    showToast(`Failed: ${data.error?.message || "Unknown error"}`, "error");
                }
            } catch {
                setSendStates((s) => ({ ...s, [contact.id]: "error" }));
                showToast("Network error. Check your connection.", "error");
            }
        },
        []
    );

    const subjectLine = buildSubjectLine(selected);
    const emailBody = buildEmailBody(selected);
    const sentCount = contacts.filter((c) => c.status === "sent").length;

    return (
        <div className="min-h-screen flex flex-col" style={{ background: "var(--navy-900)" }}>
            {/* ── Header ─────────────────────────────────────────────── */}
            <header
                className="flex items-center justify-between px-8 py-4 border-b"
                style={{ borderColor: "var(--glass-border)", background: "var(--navy-800)" }}
            >
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                        style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)" }}>
                        D
                    </div>
                    <div>
                        <h1 className="font-bold text-white text-base leading-tight">Debra L. Friednash</h1>
                        <p className="text-xs" style={{ color: "#64748b" }}>Resume Campaign · {contacts.length} Recipients</p>
                    </div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                        <p className="font-semibold text-white">{sentCount}</p>
                        <p style={{ color: "#64748b", fontSize: "11px" }}>SENT</p>
                    </div>
                    <div className="text-center">
                        <p className="font-semibold" style={{ color: "#fbbf24" }}>{contacts.length - sentCount}</p>
                        <p style={{ color: "#64748b", fontSize: "11px" }}>PENDING</p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs"
                        style={{ background: "rgba(52,211,153,0.1)", color: "#34d399", border: "1px solid rgba(52,211,153,0.2)" }}>
                        <span className="pulse-dot" />
                        BCC: {BCC_EMAIL}
                    </div>
                </div>
            </header>

            {/* ── Body ───────────────────────────────────────────────── */}
            <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 65px)" }}>
                {/* Sidebar */}
                <aside
                    className="flex flex-col border-r overflow-hidden"
                    style={{
                        width: "300px",
                        minWidth: "300px",
                        borderColor: "var(--glass-border)",
                        background: "var(--navy-800)",
                    }}
                >
                    {/* Filters */}
                    <div className="flex gap-1 p-3 border-b" style={{ borderColor: "var(--glass-border)" }}>
                        {(["all", "pending", "sent"] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className="flex-1 py-1 rounded-md text-xs font-medium transition-all"
                                style={{
                                    background: filter === f ? "rgba(139,92,246,0.2)" : "transparent",
                                    color: filter === f ? "#a78bfa" : "#64748b",
                                    border: filter === f ? "1px solid rgba(139,92,246,0.4)" : "1px solid transparent",
                                }}
                            >
                                {f.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    {/* Contact list */}
                    <div className="flex-1 overflow-y-auto p-2 space-y-1">
                        {filteredContacts.map((c) => {
                            const state = sendStates[c.id] || c.status;
                            const isActive = c.id === selected.id;
                            return (
                                <button
                                    key={c.id}
                                    onClick={() => setSelected(c)}
                                    className={`w-full text-left p-3 rounded-xl glass-card ${isActive ? "contact-card-active" : ""}`}
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="min-w-0">
                                            <p className="font-semibold text-sm text-white truncate">{c.name}</p>
                                            <p className="text-xs truncate mt-0.5" style={{ color: "#64748b" }}>{c.company}</p>
                                            <p className="text-xs truncate mt-0.5" style={{ color: "#475569" }}>{c.title}</p>
                                        </div>
                                        <span
                                            className="shrink-0 text-xs px-2 py-0.5 rounded-full font-medium"
                                            style={{
                                                ...(state === "sent" || state === "confirmed"
                                                    ? { background: "rgba(16,185,129,0.15)", color: "#34d399", border: "1px solid rgba(16,185,129,0.3)" }
                                                    : state === "sending"
                                                        ? { background: "rgba(139,92,246,0.15)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.3)" }
                                                        : state === "error"
                                                            ? { background: "rgba(239,68,68,0.15)", color: "#f87171", border: "1px solid rgba(239,68,68,0.3)" }
                                                            : { background: "rgba(245,158,11,0.12)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.25)" }),
                                            }}
                                        >
                                            {state === "sending" ? "⏳" : state === "sent" ? "✓ Sent" : state === "error" ? "✗ Error" : "Draft"}
                                        </span>
                                    </div>
                                    <p className="text-xs mt-2 truncate" style={{ color: "#334155" }}>{c.email}</p>
                                </button>
                            );
                        })}
                    </div>
                </aside>

                {/* Main panel */}
                <main className="flex-1 flex flex-col overflow-hidden">
                    {/* Tab header */}
                    <div
                        className="flex items-center justify-between px-6 py-4 border-b"
                        style={{ borderColor: "var(--glass-border)" }}
                    >
                        <div>
                            <h2 className="font-bold text-white text-lg">{selected.name}</h2>
                            <p className="text-sm mt-0.5" style={{ color: "#64748b" }}>
                                {selected.title} · {selected.company}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                className="btn-ghost"
                                onClick={() => navigator.clipboard.writeText(emailBody)}
                            >
                                📋 Copy Email
                            </button>
                            <button
                                className="btn-secondary"
                                onClick={() => {
                                    const subject = encodeURIComponent(subjectLine);
                                    const body = encodeURIComponent(emailBody);
                                    const bcc = encodeURIComponent(BCC_EMAIL);
                                    window.open(`mailto:${selected.email}?subject=${subject}&body=${body}&bcc=${bcc}`);
                                }}
                            >
                                ✉️ Open in Mail
                            </button>
                            <button
                                className="btn-primary"
                                disabled={sendStates[selected.id] === "sending" || selected.status === "sent"}
                                onClick={() => setModalContact(selected)}
                            >
                                {selected.status === "sent" ? "✓ Sent" : "Send via Resend →"}
                            </button>
                        </div>
                    </div>

                    {/* Two-column content */}
                    <div className="flex-1 overflow-y-auto p-6 grid gap-6" style={{ gridTemplateColumns: "1fr 1fr" }}>
                        {/* Cover Letter */}
                        <div className="glass-card p-5 flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#8b5cf6" }}>Cover Letter</span>
                                <div className="flex-1 h-px" style={{ background: "var(--glass-border)" }} />
                                <span className="text-xs" style={{ color: "#475569" }}>PDF will attach</span>
                            </div>
                            <div className="letter-body overflow-y-auto" style={{ maxHeight: "500px" }}>
                                {selected.coverLetter}
                            </div>
                        </div>

                        {/* Email Preview */}
                        <div className="glass-card p-5 flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#ec4899" }}>Email Preview</span>
                                <div className="flex-1 h-px" style={{ background: "var(--glass-border)" }} />
                            </div>

                            {/* Headers */}
                            <div className="space-y-2 text-sm rounded-lg p-3" style={{ background: "rgba(0,0,0,0.2)", border: "1px solid var(--glass-border)" }}>
                                {[
                                    ["To", `${selected.name} <${selected.email}>`],
                                    ["From", "Debra L. Friednash <denvertrad@aol.com>"],
                                    ["BCC", BCC_EMAIL],
                                    ["Subject", subjectLine],
                                    ["Attachments", "Debra_Friednash_Resume.pdf · Cover_Letter.pdf"],
                                ].map(([label, val]) => (
                                    <div key={label} className="flex gap-2">
                                        <span className="shrink-0 font-semibold" style={{ color: "#64748b", width: "80px" }}>{label}:</span>
                                        <span className="text-xs" style={{ color: label === "Subject" ? "#a78bfa" : "#94a3b8", wordBreak: "break-all" }}>{val}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Body */}
                            <div className="letter-body overflow-y-auto" style={{ maxHeight: "420px" }}>
                                {emailBody}
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* ── Send Confirmation Modal ─────────────────────────────── */}
            {modalContact && (
                <div className="modal-overlay" onClick={() => setModalContact(null)}>
                    <div
                        className="glass-card p-8 max-w-xl w-full mx-4"
                        style={{ background: "var(--navy-800)", border: "1px solid rgba(139,92,246,0.4)" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center"
                                style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)" }}>
                                ✉
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-lg">Confirm Send</h3>
                                <p className="text-sm" style={{ color: "#64748b" }}>Review before sending</p>
                            </div>
                        </div>

                        <div className="space-y-3 mb-6 text-sm p-4 rounded-lg" style={{ background: "rgba(0,0,0,0.3)" }}>
                            <div className="flex gap-2">
                                <span style={{ color: "#64748b", width: "80px" }} className="shrink-0 font-semibold">To:</span>
                                <span className="text-white">{modalContact.name} &lt;{modalContact.email}&gt;</span>
                            </div>
                            <div className="flex gap-2">
                                <span style={{ color: "#64748b", width: "80px" }} className="shrink-0 font-semibold">BCC:</span>
                                <span style={{ color: "#34d399" }}>{BCC_EMAIL}</span>
                            </div>
                            <div className="flex gap-2">
                                <span style={{ color: "#64748b", width: "80px" }} className="shrink-0 font-semibold">Subject:</span>
                                <span style={{ color: "#a78bfa" }}>{subjectLine}</span>
                            </div>
                            <div className="flex gap-2">
                                <span style={{ color: "#64748b", width: "80px" }} className="shrink-0 font-semibold">Files:</span>
                                <span style={{ color: "#94a3b8" }}>Resume PDF + Cover Letter PDF</span>
                            </div>
                        </div>

                        {apiKeyMissing && (
                            <div className="mb-4 p-3 rounded-lg text-xs" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171" }}>
                                ⚠️ RESEND_API_KEY missing. Add it to <code>.env.local</code> to send via Resend, or use "Open in Mail" instead.
                            </div>
                        )}

                        <div className="flex gap-3 justify-end">
                            <button className="btn-secondary" onClick={() => setModalContact(null)}>Cancel</button>
                            <button className="btn-primary" onClick={() => handleSend(modalContact)}>
                                ✉ Send Now
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Toast ───────────────────────────────────────────────── */}
            {toast && (
                <div
                    className="fixed bottom-6 right-6 px-5 py-3 rounded-xl text-sm font-medium shadow-2xl z-50 transition-all"
                    style={{
                        background: toast.type === "success" ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)",
                        border: `1px solid ${toast.type === "success" ? "rgba(16,185,129,0.4)" : "rgba(239,68,68,0.4)"}`,
                        color: toast.type === "success" ? "#34d399" : "#f87171",
                        backdropFilter: "blur(12px)",
                    }}
                >
                    {toast.msg}
                </div>
            )}
        </div>
    );
}
