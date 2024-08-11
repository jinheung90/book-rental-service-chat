export interface JwtInfo {
  sub: string;
  Authorities: Array<string>;
  iss: string;
  exp: number;
}
