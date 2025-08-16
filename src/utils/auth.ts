import jwt from "jsonwebtoken";

export function decodeToken(token: string): any | null {
  if (!token) {
    return null;
  }

  try {
    const decode = jwt.decode(token, { complete: true });
    return decode;
  } catch (error) {
    console.log("Error al decodificar el token", error);
    return null;
  }
}