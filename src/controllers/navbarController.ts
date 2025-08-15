import type { DecodeToken } from "@/interfaces/decodeToken";
import { decodeToken } from "@/utils/auth";
import { Tarjet } from "@/utils/axiosConfig";

export class NavbarController {
  static async login(usuario: string, contrasenia: string): Promise<DecodeToken | null> {
    try {
      const response = await Tarjet.userApi.login(usuario, contrasenia);
      const token: string = response.data.data;

      const decode: DecodeToken = decodeToken(token);

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("id", decode.payload.id.toString());
      sessionStorage.setItem("trol_id", decode.payload.rol_id.toString());
      sessionStorage.setItem("rol", decode.payload.role);
      sessionStorage.setItem("id_admin", decode.payload.id_admin.toString());
      sessionStorage.setItem("id_nutriologo", decode.payload.id_nutriologo.toString());
      sessionStorage.setItem("id_paciente", decode.payload.id_paciente.toString());
      sessionStorage.setItem("nombre", decode.payload.nombre);
      sessionStorage.setItem("primer_apellido", decode.payload.primer_apellido);

      return decode;
    } catch (error) {
      console.error("Error during login", error);
      return null;
    }
  }
}