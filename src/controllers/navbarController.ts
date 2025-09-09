import type { DecodeToken } from "@/interfaces/decodeToken";
import { decodeToken } from "@/utils/auth";
import { Tarjet } from "@/utils/axiosConfig";
import { setCookie } from "@/utils/cookie";

export class NavbarController {
  static async login(usuario: string, contrasenia: string): Promise<DecodeToken | null> {
    try {
      const response = await Tarjet.userApi.login(usuario, contrasenia);
      const token: string = response.data.data;

      const decode: DecodeToken = decodeToken(token);

      setCookie("auth_token", token);

      return decode;
    } catch (error) {
      console.error("Error during login", error);
      return null;
    }
  }
}