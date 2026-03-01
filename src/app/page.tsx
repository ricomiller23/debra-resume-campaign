"use client";

import { useState, useCallback } from "react";
import {
    CONTACTS,
    Contact,
    buildSubjectLine,
    buildEmailBody,
    BCC_EMAIL,
} from "@/lib/contacts";

type SendState = "idle" | "confirming" | "sending" | "sent" | "error" | "confirmed" | "pending";

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
                    <div className="p-4 flex gap-2 border-b" style={{ borderColor: "var(--glass-border)" }}>
                        {(["all", "pending", "sent"] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                                    filter === f
                                        ? "bg-white text-navy-900 shadow-lg shadow-white/10"
                                        : "text-slate-400 hover:text-white hover:bg-white/5"
                                }`}
                            >
                                {f.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    {/* Contact List */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {filteredContacts.map((c) => {
                            const state = sendStates[c.id] || c.status;
                            const isActive = selected.id === c.id;

                            return (
                                <div
                                    key={c.id}
                                    onClick={() => setSelected(c)}
                                    className={`p-4 border-b cursor-pointer transition-all group ${
                                        isActive ? "bg-white/5" : "hover:bg-white/5"
                                    }`}
                                    style={{ borderColor: "rgba(255,255,255,0.05)" }}
                                >
                                    <div className="flex items-start justify-between mb-1">
                                        <p className={`font-semibold text-sm ${isActive ? "text-white" : "text-slate-200"}`}>
                                            {c.name}
                                        </p>
                                        <span
                                            className="shrink-0 text-xs px-2 py-0.5 rounded-full font-medium"
                                            style={{
                                                background:
                                                    state === "sent" || state === "confirmed"
                                                        ? "rgba(52,211,153,0.1)"
                                                        : state === "sending"
                                                        ? "rgba(59,130,246,0.1)"
                                                        : state === "error"
                                                        ? "rgba(239,68,68,0.1)"
                                                        : "rgba(255,255,255,0.05)",
                                                color:
                                                    state === "sent" || state === "confirmed"
                                                        ? "#34d399"
                                                        : state === "sending"
                                                        ? "#3b82f6"
                                                        : state === "error"
                                                        ? "#ef4444"
                                                        : "#64748b",
                                            }}
                                        >
                                            {state.toUpperCase()}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 truncate">{c.company}</p>
                                </div>
                            );
                        })}
                    </div>
                </aside>

                {/* Main Preview Area */}
                <main className="flex-1 bg-navy-900 overflow-hidden flex flex-col relative">
                    {/* Toolbar */}
                    <div
                        className="flex items-center justify-between px-6 py-3 border-b"
                        style={{ borderColor: "var(--glass-border)", background: "rgba(15,23,42,0.5)" }}
                    >
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-slate-300">Preview Mode</span>
                            <div className="h-4 w-px bg-slate-800" />
                            <span className="text-xs text-slate-500">Contact ID: {selected.id}</span>
                        </div>

                        <div className="flex items-center gap-3">
                            {sendStates[selected.id] === "sent" || selected.status === "sent" ? (
                                <button
                                    disabled
                                    className="px-6 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 text-sm font-semibold border border-emerald-500/30 flex items-center gap-2"
                                >
                                    ✓ EMAIL ALREADY SENT
                                </button>
                            ) : (
                                <button
                                    onClick={() => setModalContact(selected)}
                                    disabled={sendStates[selected.id] === "sending"}
                                    className="px-6 py-2 rounded-lg bg-white text-navy-900 text-sm font-bold hover:bg-slate-100 transition-all shadow-xl shadow-white/5 active:scale-95 disabled:opacity-50"
                                >
                                    {sendStates[selected.id] === "sending" ? "SENDING..." : "CONFIRM & SEND EMAIL"}
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                        <div
                            className="glass-card p-10 max-w-4xl mx-auto shadow-2xl"
                            style={{
                                background: "var(--navy-800)",
                                border: "1px solid var(--glass-border)",
                                borderRadius: "1.5rem",
                            }}
                        >
                            {/* Email Format Header */}
                            <div className="mb-8 pb-6 border-b border-white/5 space-y-3">
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

            {/* ── Send Confirmation Modal ────────────────────────────── */}
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
                            <h2 className="text-xl font-bold text-white">Ready to send?</h2>
                        </div>

                        <p className="text-slate-300 mb-6">
                            You are about to send a confidential email and PDF cover letter to{" "}
                            <span className="text-white font-semibold">{modalContact.name}</span> at{" "}
                            <span className="text-white font-semibold">{modalContact.company}</span>.
                            A copy will be BCC'd to <span className="text-indigo-400 underline">{BCC_EMAIL}</span>.
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => handleSend(modalContact)}
                                className="flex-1 py-3 rounded-xl bg-white text-navy-900 font-bold hover:bg-slate-100 transition-all active:scale-95"
                            >
                                YES, SEND NOW
                            </button>
                            <button
                                onClick={() => setModalContact(null)}
                                className="flex-1 py-3 rounded-xl border border-white/10 text-slate-300 font-semibold hover:bg-white/5 transition-all"
                            >
                                CANCEL
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── API Key Warning ────────────────────────────────────── */}
            {apiKeyMissing && (
                <div className="fixed bottom-6 right-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm max-w-xs shadow-2xl animate-bounce">
                    <p className="font-bold mb-1">⚠️ Missing API Key</p>
                    <p className="text-xs opacity-80">RESEND_API_KEY is not set in environment variables.</p>
                </div>
            )}

            {/* ── Toast ──────────────────────────────────────────────── */}
            {toast && (
                <div
                    className={`fixed top-6 right-6 px-6 py-3 rounded-xl shadow-2xl transition-all animate-in slide-in-from-right font-medium ${
                        toast.type === "success"
                            ? "bg-emerald-500 text-white"
                            : "bg-red-500 text-white"
                    }`}
                >
                    {toast.msg}
                </div>
            )}
        </div>
    );
}
