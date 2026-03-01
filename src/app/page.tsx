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
