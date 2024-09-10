"use client";
import { useRef, useState } from "react";
import { FaImage } from "react-icons/fa";
import { Editor } from "@tinymce/tinymce-react";
import { Image } from "react-bootstrap";
import axiosInstance from "@/app/utils/axiosConfig";
import { useRouter } from "next/navigation";
import { Utils } from "@/app/utils/utils";

export default function AgregarArticulo() {
  const [contenido, setContenido] = useState("");
  const [error, setError] = useState("");
  const [imagePrevisualizada, setImagePrevisualizada] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const editorRef = useRef(null);
  const router = useRouter();

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePrevisualizada(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    try {
      const response = await axiosInstance.post("/upload/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("URL de la Imagen: ", response.data.url);
      return response.data.url;
    } catch (error) {
      Utils.swalError("No se subio ninguna imagen", error.message);
      return null;
    }
  };

  const handleAgregarArticulo = async () => {
    try {
      const response = await axiosInstance.post(
        "/nutriologo/articulos",
        {
          contenido: contenido,
          foto: await uploadImage(),
          nutriologo_id: localStorage.getItem("nutriologo_id"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      setContenido("");
      setSelectedFile(null);
      router.push("/");
      Utils.swalSuccess("Artículo guardado correctamente");
    } catch (error) {
      setError("Error al guardar el artículo. Por favor, inténtalo de nuevo.");
      Utils.swalError("Error al guardar el artículo", error.message);
    }
  };

  return (
    <div className="container">
      <h1>Agregar Artículo</h1>
      <div className="row my-2">
        <div className="col-sm-8 my-1">
          <Editor
            apiKey="z2ucrddcmykd18x0265ytd6lhueypl1lr84sa6c4dua7cqk7"
            onInit={(_evt, contenido) => (editorRef.current = contenido)}
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
              toolbar: "undo redo | blocks | " + "bold italic backcolor | alignleft aligncenter " + "alignright alignjustify | bullist numlist outdent indent | " + "removeformat | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
            }}
          />
        </div>
        <div className="col-sm-4 my-1">
          <label htmlFor="">Subir imagen de portada</label>
          <div
            className={`container bg-cardimage rounded ${dragging ? "drag-over" : ""}`}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}>
            <div className="row">
              <div className="col-sm-4">
                {imagePrevisualizada ? <Image src={imagePrevisualizada} alt="Previsualizacion de la imagen" style={{ width: "100px", height: "100px" }} /> : <FaImage size={100} />}
              </div>
              <div className="col-sm-8 pt-4 text-center">
                <label htmlFor="file-update" className="file-upload-label text-center">
                  Elegir archivo
                </label>
                <input type="file" className="sr-only" id="file-update" name="file-update" onChange={handleImageChange} />
                <label htmlFor="file-update" className="px-2">
                  O
                </label>
                <label htmlFor="file-update" className="text-center">
                  Arrastra aquí el archivo
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row  flex-row-reverse">
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
