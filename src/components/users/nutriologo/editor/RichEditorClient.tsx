"use client";

import dynamic from "next/dynamic";

const RichEditorClient = dynamic(() => import("./RichEditor"), {
    ssr: false,
    loading: () => <p className="px-3 text-sm text-gray-500">Cargando editor...</p>,
});

export default RichEditorClient;