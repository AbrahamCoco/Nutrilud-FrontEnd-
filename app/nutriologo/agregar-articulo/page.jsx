"use client";
import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/navigation";
import { AgregarArticuloController } from "./agregarArticuloController";
import Image from "next/image";

export default function AgregarArticulo() {
  const [contenido, setContenido] = useState("");
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editorRef = useRef(null);
  const router = useRouter();
  const pica = require("pica")();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const subirImagen = async () => {
    if (!selectedFile) return null;

    const formData = new FormData();
    const img = document.createElement("img");
    img.src = URL.createObjectURL(selectedFile);

    const generarBlob = (canvas) =>
      new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob), "image/jpeg");
      });

    const procesarImagen = () =>
      new Promise((resolve, reject) => {
        img.onload = async () => {
          try {
            const canvas = document.createElement("canvas");
            const maxWidth = 800;
            const maxHeight = 400;
            canvas.width = maxWidth;
            canvas.height = maxHeight;

            await pica.resize(img, canvas, {
              unsharpAmount: 80,
              unsharpThreshold: 2,
              transferable: true,
            });

            const blob = await generarBlob(canvas);
            formData.append("nombre", sessionStorage.getItem("nombre"));
            formData.append("apellido", sessionStorage.getItem("primer_apellido"));
            formData.append("id", sessionStorage.getItem("id"));
            formData.append("file", blob, selectedFile.name);
            resolve();
          } catch (error) {
            reject(error);
          }
        };
      });

    try {
      await procesarImagen();
      const response = await AgregarArticuloController.uploadImage(formData);
      return response.data;
    } catch (error) {
      console.error("Error al procesar o subir la imagen", error);
      return null;
    }
  };

  const handleAgregarArticulo = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const imageUrl = await subirImagen();
      if (!imageUrl) {
        setError("Error al subir la imagen");
        setIsSubmitting(false);
        return;
      }

      await AgregarArticuloController.AddArticulo({
        contenido,
        foto: imageUrl,
        nutriologo_id: sessionStorage.getItem("id_nutriologo"),
      });

      setContenido("");
      setSelectedFile(null);
      setPreviewImage(null);
      router.push("/");
    } catch (error) {
      setError("Error al guardar el artículo");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto px-2 sm:px-2 lg:px-3 py-3">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Crear Nuevo Artículo</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
          <p>{error}</p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3">
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <Editor
              apiKey="z2ucrddcmykd18x0265ytd6lhueypl1lr84sa6c4dua7cqk7"
              onInit={(_evt, editor) => (editorRef.current = editor)}
              initialValue="<p>Escribe el contenido de tu artículo aquí...</p>"
              onEditorChange={(content) => setContenido(content)}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "help",
                  "wordcount",
                ],
                toolbar: "undo redo | blocks | bold italic backcolor | " + "alignleft aligncenter alignright alignjustify | " + "bullist numlist outdent indent | removeformat | help",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
              }}
            />
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Imagen de portada</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  {previewImage ? (
                    <>
                      <Image src={previewImage} alt="Preview" className="mx-auto h-48 object-cover rounded-md" />
                      <div className="flex text-sm text-gray-600 justify-center mt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedFile(null);
                            setPreviewImage(null);
                          }}
                          className="font-medium text-red-600 hover:text-red-500 focus:outline-none"
                        >
                          Cambiar imagen
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                        >
                          <span>Sube una imagen aquí</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 5MB</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  onClick={handleAgregarArticulo}
                  disabled={isSubmitting || !contenido || !selectedFile}
                  className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                    isSubmitting || !contenido || !selectedFile ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Publicando...
                    </>
                  ) : (
                    "Publicar Artículo"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
