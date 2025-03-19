"use client";
import { AgregarArticuloController } from "@/app/nutriologo/agregar-articulo/agregarArticuloController";
import { useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [primer_apellido, setPrimerApellido] = useState("");
  const [segundo_apellido, setSegundoApellido] = useState("");
  const [usuario, setUsuario] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [cedula_profesional, setCedulaProfesional] = useState("");
  const [trol_id, setTrolId] = useState(null);

  const handleRoleChange = (event) => {
    setTrolId(parseInt(event.target.value));
  };

  const uploadImage = async () => {
    if (!selectedFile) {
      console.log("No se ha seleccionado un archivo");
      return null;
    }

    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("nombre", nombre);
    formData.append("apellido", primer_apellido);
    formData.append("id", sessionStorage.getItem("id_nutriologo"));

    try {
      const response = await AgregarArticuloController.uploadImage(formData);
      return response.data;
    } catch (error) {
      return null;
    }
  };

  const handleRegister = async () => {
    try {
      const imageurl = await uploadImage();

      const userData = {
        trol_id: trol_id,
        nombre: nombre,
        primer_apellido: primer_apellido,
        segundo_apellido: segundo_apellido,
        usuario: usuario,
        correo: correo,
        contrasenia: contrasenia,
      };

      let tipoUsuarioData = null;

      // Agregamos los datos del tipo de usuario al objeto userData
      switch (trol_id) {
        case 1:
          tipoUsuarioData = {
            descripcion: descripcion,
            foto: imageurl,
            telefono: telefono,
          };
          break;
        case 2:
          tipoUsuarioData = {
            descripcion: descripcion,
            foto: imageurl,
            telefono: telefono,
            direccion: direccion,
            cedula_profesional: cedula_profesional,
          };
          break;
      }

      const data = { ...userData, ...tipoUsuarioData };
      console.log(data);

      const response = await PacientesController.addPaciente(data);

      setTrolId(null);
      setNombre("");
      setPrimerApellido("");
      setSegundoApellido("");
      setUsuario("");
      setCorreo("");
      setContrasenia("");

      if (trol_id === 1) {
        setDescripcion("");
        setSelectedImage(null);
        setTelefono("");
      } else if (trol_id === 2) {
        setDescripcion("");
        setSelectedImage(null);
        setTelefono("");
        setDireccion("");
        setCedulaProfesional("");
      }
      return response;
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-sm-6">
          <div className="mb-2">
            <FloatingLabel controlId="floatingInput" label="Nombre" className="mb-3">
              <Form.Control type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </FloatingLabel>
          </div>
          <div className="mb-2">
            <FloatingLabel controlId="floatingInput" label="Primer Apellido" className="mb-3">
              <Form.Control type="text" placeholder="Primer Apellido" value={primer_apellido} onChange={(e) => setPrimerApellido(e.target.value)} />
            </FloatingLabel>
          </div>
          <div className="mb-2">
            <FloatingLabel controlId="floatingInput" label="Segundo Apellido" className="mb-3">
              <Form.Control type="text" placeholder="Segundo Apellido" value={segundo_apellido} onChange={(e) => setSegundoApellido(e.target.value)} />
            </FloatingLabel>
          </div>
          <div className="mb-2">
            <FloatingLabel controlId="floatingInput" label="Usuario" className="mb-3">
              <Form.Control type="text" placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
            </FloatingLabel>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="mb-2">
            <label htmlFor="imagen" className="form-label">
              Imagen
            </label>
            <input type="file" className="form-control" id="image" onChange={(e) => setSelectedFile(e.target.files[0])} />
          </div>
          <div className="mb-2">
            <FloatingLabel controlId="floatingInput" label="Correo" className="mb-3">
              <Form.Control type="email" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
            </FloatingLabel>
          </div>
          <div className="mb-2">
            <FloatingLabel controlId="floatingInput" label="Contraseña" className="mb-3">
              <Form.Control type="password" placeholder="Contraseña" value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} />
            </FloatingLabel>
          </div>
          <label htmlFor="tipoUsuario" className="form-label">
            Tipo de usuario
          </label>
          <div className="mb-2">
            <div className="form-check-inline">
              <label htmlFor="admin-bill" className="form-check-label">
                <input type="radio" className="form-check-input bill" name="bill" id="admin-bill" value={1} checked={trol_id === 1} onChange={handleRoleChange} /> Administrador
              </label>
            </div>
            <div className="form-check-inline">
              <label htmlFor="nutriologo-bill" className="form-check-label">
                <input type="radio" className="form-check-input bill" name="bill" id="nutriologo-bill" value={2} checked={trol_id === 2} onChange={handleRoleChange} /> Nutriologo
              </label>
            </div>
          </div>
        </div>
      </div>
      {trol_id === 1 && (
        <div id="admin" className="row mb-2">
          <div className="col-sm-6">
            <FloatingLabel controlId="floatingInput" label="Descripcion" className="mb-3">
              <Form.Control type="text" placeholder="Descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            </FloatingLabel>
          </div>
          <div className="col-sm-6">
            <FloatingLabel controlId="floatingInput" label="Telefono" className="mb-3">
              <Form.Control type="text" placeholder="Telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
            </FloatingLabel>
          </div>
        </div>
      )}
      {trol_id === 2 && (
        <div id="nutriologo" className="row">
          <div className="col-sm-6">
            <FloatingLabel controlId="floatingInput" label="Descripcion" className="mb-3">
              <Form.Control type="text" placeholder="Descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Direccion" className="mb-3">
              <Form.Control type="text" placeholder="Direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
            </FloatingLabel>
          </div>
          <div className="col-sm-6">
            <FloatingLabel controlId="floatingInput" label="Telefono" className="mb-3">
              <Form.Control type="text" placeholder="Telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Cedula Profesional" className="mb-3">
              <Form.Control type="text" placeholder="Cedula Profesional" value={cedula_profesional} onChange={(e) => setCedulaProfesional(e.target.value)} />
            </FloatingLabel>
          </div>
        </div>
      )}
      <button type="button" className="btn btn-success" onClick={handleRegister}>
        Registrarse
      </button>
    </div>
  );
}
