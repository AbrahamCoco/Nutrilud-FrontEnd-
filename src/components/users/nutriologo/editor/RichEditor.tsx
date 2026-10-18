"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PartialBlock } from "@blocknote/core";
import * as locales from "@blocknote/core/locales";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

export type EditorContent = PartialBlock[];
type SaveStatus = "idle" | "saving" | "saved" | "error";

interface RichEditorProps {
    initialContent?: EditorContent;
    /** Se llama en cada cambio, sin debounce (para mantener el estado del formulario). */
    onContentChange?: (content: EditorContent) => void;
    /** Autoguardado con debounce. Debe lanzar error si falla. */
    onSave?: (content: EditorContent) => Promise<void>;
    /** Sube un archivo y devuelve su URL pública. */
    onUploadFile?: (file: File) => Promise<string>;
    editable?: boolean;
    debounceMs?: number;
    theme?: "light" | "dark";
}

const STATUS_LABEL: Record<SaveStatus, string> = {
    idle: "",
    saving: "Guardando...",
    saved: "Guardado",
    error: "No se pudo guardar.",
};

export default function RichEditor({
    initialContent,
    onContentChange,
    onSave,
    onUploadFile,
    editable = true,
    debounceMs = 1000,
    theme = "light",
}: RichEditorProps) {
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [status, setStatus] = useState<SaveStatus>("idle");

    const editor = useCreateBlockNote({
        initialContent: initialContent?.length ? initialContent : undefined,
        dictionary: locales.es,
        uploadFile: onUploadFile,
    });

    useEffect(() => {
        return () => {
            if (timer.current) clearTimeout(timer.current);
        };
    }, []);

    const handleChange = useCallback(() => {
        const doc = editor.document as EditorContent;
        onContentChange?.(doc);
        if (!onSave) return;

        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(async () => {
            setStatus("saving");
            try {
                await onSave(doc);
                setStatus("saved");
            } catch {
                setStatus("error");
            }
        }, debounceMs);
    }, [editor, onContentChange, onSave, debounceMs]);

    return (
        <div>
            <BlockNoteView editor={editor} editable={editable} theme={theme} onChange={handleChange} />
            {onSave && (
                <p role="status" aria-live="polite" className="mt-2 px-3 text-sm text-gray-500">
                    {STATUS_LABEL[status]}
                </p>
            )}
        </div>
    );
}