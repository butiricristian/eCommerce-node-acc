export default interface CreateUserDTO {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  auth0Id?: string;
  role?: string;
  password?: string;
}