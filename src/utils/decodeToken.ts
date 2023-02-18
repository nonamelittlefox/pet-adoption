import jwt_decode from 'jwt-decode';

export function decodeToken(token: string) {
  try {
    return jwt_decode(token);
  } catch (e) {
    return null;
  }
}
