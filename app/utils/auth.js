import jwt from "jsonwebtoken";

export function decodeToken(token) {
  if (!token) return null;

  try {
    const decode = jwt.decode(token);
    return decode;
  } catch (error) {
    console.log("Error al decodificar el token", error);
    return null;
  }
}
