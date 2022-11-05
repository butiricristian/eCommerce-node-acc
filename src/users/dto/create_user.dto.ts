export default interface CreateUserDTO {
  email: string;
  password: string;
  username: string;
  auth0Id?: string;
  role?: string;
}