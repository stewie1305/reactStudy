import apiClient from "../http/apiClient";

//1> dinh nghia
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;

  // ... other fields
}
export interface RegisterDto {
  email: string;
  password: string;
  fullName?: string;
  birthday?: string;
  phone?: string;
}

export interface RegisterResponse {
  accessToken: string;
  refreshToken: string;
}
export const authApi = {
  //Login normalize data -> accessToken/refreshToken
  async login(credentials: {
    email: string;
    password: string;
  }): Promise<AuthTokens> {
    const { data } = await apiClient.post("/auth/login", credentials);
    //backend tra {message, result: {accessToken, refreshToken}}
    //Frontend nhan: {accessToken, refreshToken}
    console.log("data", data);
    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  },
  async getMe(): Promise<User> {
    const responseBody = await apiClient.get("user/me");
    console.log("response", responseBody.data);
    return responseBody.data;
  },
  async register(payload: RegisterDto): Promise<RegisterResponse> {
    const { data } = await apiClient.post("/auth/register", payload);
    console.log("register response raw data", data);
    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  },
};
