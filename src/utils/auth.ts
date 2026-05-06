import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";

export function decodeToken(token: string): any | null {
  if (!token) return null;

  try {
    const decode = jwt.decode(token, { complete: true });
    return decode;
  } catch (error) {
    console.log("Error al decodificar el token", error);
    return null;
  }
}

export const getAuthPayload = () => {
  const token = getCookie("auth_token") as string | undefined;
  if (!token) return null;

  const decoded = decodeToken(token);
  return decoded?.payload ?? null;
};
