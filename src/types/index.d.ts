export interface ExpToken {
  exp?: number;
  guard?: string;
  iat?: number;
  iss?: string;
  jti?: string;
  nbf?: number;
  prv?: string;
  sub?: number;
}