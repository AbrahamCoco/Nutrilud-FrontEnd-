"use client";
import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/navigation";
import { AgregarArticuloController } from "./agregarArticuloController";

export default function AgregarArticulo() {
  const [contenido, setContenido] = useState("");
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const editorRef = useRef(null);
  const router = useRouter();
  const pica = require("pica")();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const subirImagen = async () => {
    const formData = new FormData();

    const img = document.createElement("img");
    img.src = URL.createObjectURL(selectedFile);

    const generarBlob = (canvas) => {
      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob);
        }, "image/jpeg");
      });
    };

    const procesarImagen = () => {
      return new Promise((resolve, reject) => {
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
            formData.append("image", blob, selectedFile.name);

            resolve();
          } catch (error) {
            reject(error);
          }
        };
      });
    };

    try {
      await procesarImagen();
      const response = await AgregarArticuloController.uploadImage(formData);
      return response;
    } catch (error) {
      console.error("Error al procesar o subir la imagen", error);
      return null;
    }
  };

  const handleAgregarArticulo = async (event) => {
    event.preventDefault();
    try {
      const imageUrl = await subirImagen();
      if (!imageUrl) {
        setError("Error al subir la imagen");
        return;
      }

      await AgregarArticuloController.AddArticulo({
        contenido: contenido,
        foto: imageUrl,
        nutriologo_id: sessionStorage.getItem("nutriologo_id"),
      });

      setContenido("");
      setSelectedFile(null);
      router.push("/");
    } catch (error) {
      setError("Error al guardar el artículo");
    }
  };

  return (
    <div className="container">
      <h1>Agregar Artículo</h1>
      <div className="row my-2">
        <div className="col-sm-8 my-1">
          <Editor
            apiKey="z2ucrddcmykd18x0265ytd6lhueypl1lr84sa6c4dua7cqk7"
            onInit={(_evt, editor) => (editorRef.current = editor)}
            initialValue="<p>Contenido del Artículo</p>"
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
        <div className="col-sm-4 my-1">
          <label htmlFor="fileInput">Subir imagen de portada</label>
          <input id="fileInput" type="file" accept="image/*" onChange={handleImageChange} />
        </div>
      </div>
      <div className="row flex-row-reverse">
        <div className="col-sm-12 my-1">
          <button className="btn btn-primary mx-2" onClick={handleAgregarArticulo}>
            Agregar Artículo
          </button>
          <button className="btn btn-secondary">Cancelar</button>
        </div>
      </div>
      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
