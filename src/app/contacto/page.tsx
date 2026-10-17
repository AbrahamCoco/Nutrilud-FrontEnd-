import type { Metadata } from "next";
import ContactForm from "@/components/contacto/ContactForm";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Formulario de contacto para consultas, sugerencias o soporte. ¡Estamos aquí para ayudarte!",
  keywords: ["contacto", "soporte", "ayuda", "consultas Nutrilud"],
  openGraph: {
    title: "Contacto - Nutrilud",
    description: "Formulario de contacto",
  },
};

export default function ContactoPage() {
  return <ContactForm />;
}