export interface SignupDTO {
  fullName: string;
  phone: string;
  password: string;
}

export interface LoginDTO {
  phone: string;
  password: string;
}

export interface JwtPayload {
  userId: string;
}