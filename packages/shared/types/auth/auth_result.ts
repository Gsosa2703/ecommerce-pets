export type AuthResult = {
  accessToken: string;
  user: {
    id: string;
    name: string;
  }
}